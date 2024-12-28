require('dotenv').config();

const stage = process.env.NODE_ENV;
const isProductionStage = stage !== 'production';

module.exports = {
    secured: isProductionStage,
    sameSite: 'lax', // This allows the cookie to be sent in cross-site requests
    path: '/', // This ensures the cookie is accessible from all paths
    httpOnly: isProductionStage,
}