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
    res.status(201).json(user);
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
      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.status(200).json({ message: "Login successful", user });
      });
      
    })(req, res, next);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

