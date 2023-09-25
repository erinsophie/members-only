const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const connectDB = require("./config/database");
const passport = require("./config/passportConfig");

// connect to database
connectDB();

// start express server
const app = express();

// parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set up passport middleware
app.use(session({ secret: "members", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
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

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
