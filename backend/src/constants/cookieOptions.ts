import 'dotenv/config';

const stage = process.env.NODE_ENV;
const isDevelopmentStage = stage === 'development';

export const cookieOptions = {
    secured: isDevelopmentStage,
    httpOnly: isDevelopmentStage,
}