require("module-alias/register");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const limiter = require("./middlewares/limiter");
const corsOptions = require("./config/corsOptions");
const autoDeleteExpiredCodes = require("./scripts/autoDeleteExpiredCodes");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const dbURI = process.env.DATABASE_URI || "";
const stageEnv = process.env.NODE_ENV;

app.use(require("./middlewares/credentials"));
app.use(cors(corsOptions));

if (stageEnv === "development") {
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'", "localhost:*"],
          imgSrc: ["'self'", "localhost:*", "https://example.com"],
          scriptSrc: ["'self'", "https://trusted-scripts.com"],
        },
      },
    })
  );
} else {
  app.use(helmet()); // Use default settings in production
}

app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// app.use('/uploads/*', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  console.log(req.cookies);
  res.send("hello everyone");
});

app.use("/auth", limiter, authRoutes);
app.use("/user", limiter, userRoutes);

mongoose
  .connect(dbURI)
  .then(() => {
    autoDeleteExpiredCodes();
    app.listen(PORT, () =>
      console.log(`App running on http://localhost:${PORT}`)
    );
  })
  .catch((reason) => console.log(`Database connection error ${reason}`));
