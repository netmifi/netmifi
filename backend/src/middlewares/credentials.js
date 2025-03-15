const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    // this function permitts credentials from client to impact the server and vise versa
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('ACCESS-CONTROL-ALLOW-CREDENTIALS', true);  // allow all credentials 
        res.header('X-POWERED-BY', 'NETMIFI BRIDGE'); // just for fun
    }
    next();
}
module.exports = credentials;