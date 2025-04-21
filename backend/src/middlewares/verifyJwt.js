// This file checks if user is signed in by checking the jwt cookie
//  then is updates req.user so any handler with this function has access to user's data

const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');


const verifyJwt = (req, res, next) => {
    const cookies = req.cookies;
    const token = cookies?.jwt;

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!token) {
        // Checking if the token is not present.
        res.status(401).json({
            message: "You have to be signed in to access this feature",
            state: queryState.blocked,
            data: undefined
        });
        // If no token is found, respond with a 401 status and a JSON message indicating the user must be signed in.
        return;
    }

    jwt.verify(
        token,
        accessTokenSecret,
        async (err, decoded) => {
            // Verifying the JWT token using the secret key. This is an asynchronous operation.

            try {
                if (err) {
                    // If there is an error during verification (e.g., token is invalid or expired).

                    console.log(err);
                    // Log the error to the console.

                    res.status(401).json({
                        message: "unauthorized access",
                        state: queryState.blocked,
                        data: undefined
                    });
                    // Respond with a 401 status and a JSON message indicating unauthorized access.
                    return;
                }

                const user = await User.findOne({ email: decoded?.user?.email });
                // Find the user in the database using the email from the decoded token.

                req.user = user;
                // Attach the user object to the request object for further use in the request lifecycle.

                req.roles = user.roles;
                // Attach the user's roles to the request object for access level checks.

                if (!cookies.user) {
                    //  if jwt cookie but no user cookie add it
                    res.cookie('user', JSON.stringify(user), {
                        ...cookieOptions,
                        maxAge: 60 * 60 * 1000 * 24 * 5
                    });
                    // Set a user cookie with the user data, with specified options and a max age of 5 days.
                }

                next();
                // Call the next middleware function in the stack.
            } catch (error) {
                console.log(err);
                // Log any error that occurs during the process.
                res.status(401).json({
                    message: error.message,
                    state: queryState.error,
                    data: undefined
                });
                // Respond with a 401 status and a JSON message indicating the error.
                return;
            }
        }
    );
}

module.exports = verifyJwt;
// Export the verifyJwt middleware function for use in other parts of the application.
