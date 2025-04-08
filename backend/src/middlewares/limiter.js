const rateLimit = require("express-rate-limit");
// this file prevents too many requets from server
// ____ this is very important to protect against automatic repetitive requests/attacks such as BRUTE FORCE attacks  

// please check express-rate-limit documentation for more info
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // this suspends requests for the next 10 minutes after max is reached
    max: 100, // Limit each IP to 100 requests per `windowMs`
    message: 'Too many requests, please try again later.',
});

module.exports = limiter;