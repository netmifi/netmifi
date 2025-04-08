//  This is our general cookie options to be used on every cookie
require('dotenv').config();

const stage = process.env.NODE_ENV;
// if the enviroment is on production/build stage extra security should be provided
const isProductionStage = stage === 'production';

module.exports = {
    secured: isProductionStage, // secured will be true if  isProductionStage true
    // sameSite: 'lax', // This allows the cookie to be sent in cross-site requests
    path: '/', // This ensures the cookie is accessible from all paths
    httpOnly: isProductionStage, // https only when in production
}