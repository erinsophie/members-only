const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

// create a new user
router.post(
  "/sign-up",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .isAlphanumeric()
      .withMessage("Username should contain only numbers and letters"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email address")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  userController.signUp
);
