const allowedOrigins = require('./allowedOrigins');
const corsOption = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            console.error("Blocked by cors");
            callback(new Error('Not allowed by cors'));
        }
    },
    credentials: true,
    withCredentials: true,
    optionSuccessStatus: 200,
}

module.exports = corsOption;