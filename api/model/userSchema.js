const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  emailVerificationCode: { type: Number },
  isEmailVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
