import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
// import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';

const app = express();
const PORT = process.env.PORT || 3000;
const dbURI = process.env.DATABASE_URI || '';
const stageEnv = process.env.NODE_ENV;

if (stageEnv === 'development') {
    app.use(
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'", 'localhost:*'],
                    imgSrc: ["'self'", 'localhost:*', 'https://example.com'],
                    scriptSrc: ["'self'", 'https://trusted-scripts.com'],
                },
            },
        })
    );
} else {
    app.use(helmet()); // Use default settings in production
}

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({
    extended: true
}));


// app.use('/', );
app.use('/auth', authRoutes);

mongoose.connect(dbURI)
    .then(() => {
        app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`))
    })
    .catch((reason) => console.log(`Database connection error ${reason}`));