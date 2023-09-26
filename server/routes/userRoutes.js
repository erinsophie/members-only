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
      .withMessage("Password must be at least 8 characters long")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase character")
      .matches(/\d/)
      .withMessage("Password must contain at least one number"),
  ],
  userController.signUp
);

// log user into their account
router.post(
  "/login",
  [
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .escape(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .escape(),
  ],
  userController.login
);

// assign member
router.post("/become-member", userController.becomeMember);
// become admin
router.post("/become-admin", userController.becomeAdmin);
// become admin
router.post("/remove-admin", userController.removeAdmin);
// get user info
router.get("/info", userController.getUserInfo);
// get a list of all members
router.get("/members", userController.getMembers);
// log user out
router.post("/logout", userController.logout);

module.exports = router;
