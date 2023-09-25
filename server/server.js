const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const connectDB = require("./config/database");

// connect to database
connectDB();

// start express server
const app = express();

// parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
