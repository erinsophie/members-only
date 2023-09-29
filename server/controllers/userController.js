require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { validationResult } = require("express-validator");

// add new user to database
exports.signUp = async (req, res) => {
  // check for express-validator errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // check if user already exists
    const userExists = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });

    if (userExists) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email or password already exist" }] });
    }

    // if user does not already exist
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    // save to database
    await user.save();
    res.status(201).json({ message: "Sign up successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = (req, res, next) => {
  // check for express-validator errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json(info);

      // start session
      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(200).json({ message: "Login successful" });
      });
    })(req, res, next);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// change status to member
exports.becomeMember = async (req, res) => {
  const secretCode = process.env.SECRET_CODE;
  const userID = req.params.id;

  try {
    if (req.body.userInput !== secretCode) {
      return res.status(403).json({ message: "Invalid secret code" });
    }
    const user = await User.findByIdAndUpdate(
      userID,
      { isMember: true },
      { new: true }
    );
    res.status(200).json({ message: "Status updated to member" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// either add or remove admin status
exports.updateRole = async (req, res) => {
  const memberId = req.params.id;
  const newRole = req.body.newRole;

  try {
    const user = await User.findByIdAndUpdate(
      memberId,
      { isAdmin: newRole === "admin" },
      { new: true }
    );

    res.status(200).json({ message: "Member role updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserInfo = (req, res) => {
  try {
    // check if user is authenticated
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all members
exports.getMembers = async (req, res) => {
  try {
    const members = await User.find({ isMember: true });
    return res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// logout
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed", error: err });
    }
    res.status(200).json({ message: "Logged out successfully" });
  });
};
