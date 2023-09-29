const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { body } = require("express-validator");

// get
router.get("/members", userController.getMembers);
router.get("/info", userController.getUserInfo);

// post
router.post(
  "/",
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

router.post("/logout", userController.logout);

// put
router.put("/:id/membership", userController.becomeMember);
router.put("/:id/role", userController.updateRole);

module.exports = router;
