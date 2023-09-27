const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");

// populate req.user with user id and store in cookie
passport.serializeUser((user, done) => {
  console.log('user in serializer:', user)
  done(null, user.id);
});

// use stored user id to query database for full user document
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    // extract only necessary data
    const userData = {
      name: user.name,
      username: user.username,
      isMember: user.isMember,
      isAdmin: user.isAdmin,
      _id: user._id,
    };
    console.log('userData:', userData)
    done(null, userData);
  } catch (err) {
    done(err);
  }
});

// check if username and password are in database
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      // use bycrypt to compare hashed passwords
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
