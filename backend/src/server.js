require('module-alias/register');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const instructorRoutes = require('./routes/instructorRoutes');
const servicesRoutes = require('./routes/servicesRoutes');
const searchRoutes = require('./routes/searchRoutes');
const cartRoutes = require('./routes/cartRoutes');
const courseRoutes = require('./routes/courseRoutes');
const limiter = require('./middlewares/limiter');
const corsOptions = require('./config/corsOptions');
const autoDeleteExpiredCodes = require('./scripts/autoDeleteExpiredCodes');
const path = require('path');
const verifyJwt = require('./middlewares/verifyJwt');
const app = express();
const passport = require("passport");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const dbURI = process.env.DATABASE_URI || '';
const stageEnv = process.env.NODE_ENV;

app.use(cors(corsOptions));
app.use(require('./middlewares/credentials'));

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

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cookieParser());

app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use('/uploads/profile/*', express.static(path.join(__dirname, 'uploads', 'profile')));

app.use(limiter);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/search', searchRoutes);
app.use('/instructor', verifyJwt, instructorRoutes);
app.use('/cart', verifyJwt, cartRoutes);
app.use('/services', verifyJwt, servicesRoutes);
app.use('/courses', courseRoutes);

mongoose.connect(dbURI)
    .then(() => {
        autoDeleteExpiredCodes();
        app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`))
    })
    .catch((reason) => console.log(`Database connection error ${reason}`));