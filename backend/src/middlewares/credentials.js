const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('ACCESS-CONTROL-ALLOW-CREDENTIALS', true);
        res.header('X-POWERED-BY', 'Netmifi Bridge');
    }
    next();
}
module.exports = credentials;