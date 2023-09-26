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
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    // save to database
    await user.save();
    res.status(201).json({message: 'Sign up successful'});
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

  try {
    if (req.body.userInput !== secretCode) {
      return res.status(403).json({ message: "Invalid secret code" });
    }
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { isMember: true },
      { new: true }
    );
    res.status(200).json({ message: "Status updated to member" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// become admin
exports.becomeAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body._id,
      { isAdmin: true },
      { new: true }
    );
    res.status(200).json({ message: "Member is now admin" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// remove admin
exports.removeAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body._id,
      { isAdmin: false },
      { new: true }
    );
    res.status(200).json({ message: "Member is no longer admin" });
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
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed", error: err });
      }
      res.status(204).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
