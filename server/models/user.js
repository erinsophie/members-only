const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unqiue: true, required: true },
  email: { type: String, unqiue: true, required: true },
  password: { type: String, required: true },
  isMember: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
