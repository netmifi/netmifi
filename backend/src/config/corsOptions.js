//  This provides cors with a list of accepted origins like our client server
const allowedOrigins = require('./allowedOrigins');
const corsOption = {
    origin: (origin, callback) => {
        //  if origin that makes a request to our serve-side is not in the allowed origins
        //  !origin would be removed pending production because it allows any origin http requests. 
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
            // Allow origin to make request
        } else {
            console.error("Blocked by cors");
            callback(new Error('Not allowed by cors'));
        }
    },
    credentials: true,
    // allow headers, cookies, response type etc to be received from client
    withCredentials: true,
    // allow credentials such as headers, sessions and cookies to be sent to client
    optionSuccessStatus: 200,
}

module.exports = corsOption;