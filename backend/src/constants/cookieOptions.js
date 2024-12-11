require('dotenv').config();

const stage = process.env.NODE_ENV;
const isDevelopmentStage = stage === 'development';

module.exports = {
    secured: isDevelopmentStage,
    httpOnly: isDevelopmentStage,
}