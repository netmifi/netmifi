// This file checks if user is signed in by checking the jwt cookie
//  then is updates req.user so any handler with this function has access to user's data

const { queryState } = require('../constants/queryState'); 
const User            = require('../models/User');
const jwt             = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');

const verifyJwt = (behavior = 'strict') => {
  return async (req, res, next) => {
    // 1) make sure cookies are parsed
    const token = req.cookies?.jwt;
    // 2) bail early if no token & strict
    if (!token && behavior === 'strict') {
      return res
        .status(401)
        .json({
          message: "You have to be signed in to access this feature",
          state: queryState.blocked,
        });
    }

    // 3) if we have a token, verify it
    if (token) {
      const secret = process.env.ACCESS_TOKEN_SECRET;
      if (!secret) {
        console.error("⚠️ ACCESS_TOKEN_SECRET is not set!");
        return res
          .status(500)
          .json({ message: "Server misconfiguration", state: queryState.error });
      }

      let decoded;
      try {
        // this will throw if invalid/expired
        decoded = jwt.verify(token, secret);
      } catch (err) {
        console.warn("JWT verification failed:", err);
        return res
          .status(401)
          .json({ message: "Unauthorized access", state: queryState.blocked });
      }

      // 4) lookup the user
      let user;
      try {
        // adjust this to match your actual payload!
        const email = decoded.email ?? decoded.user?.email;
        user = await User.findOne({ email });
        if (!user) {
          return res
            .status(401)
            .json({ message: "User not found", state: queryState.blocked });
        }
      } catch (dbErr) {
        console.error("Database error in verifyJwt:", dbErr);
        return res
          .status(500)
          .json({ message: "Database error", state: queryState.error });
      }

      // 5) attach and continue
      req.user  = user;
      req.roles = user.roles;

      // ensure a ‘user’ cookie if you really need it
      if (!req.cookies.user) {
        res.cookie('user', JSON.stringify(user), {
          ...cookieOptions,
          maxAge: 1000 * 60 * 60 * 24 * 5,
        });
      }

      return next();
    }

    // 6) behavior === 'pass' and no token
    next();
  };
};

module.exports = verifyJwt;
