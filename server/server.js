const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const connectDB = require("./config/database");
const passport = require("./config/passportConfig");

// env file
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
require("dotenv").config({ path: envFile });

// connect to database
connectDB();

// start express server
const app = express();

// parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set up passport middleware
app.use(
  session({
    secret: "members",
    name: "connect.sid",
    cookie: {
      secure: true, 
      sameSite: "None", 
      httpOnly: true, 
    },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// cors
const currentOrigin = process.env.CORS_ORIGIN;
app.use(
  cors({
    origin: currentOrigin,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// route handlers
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");

// use routes
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);

// error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("An error occurred!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
