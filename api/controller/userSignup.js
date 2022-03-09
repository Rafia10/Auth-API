const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../services/EmailServices");
const User = require("../model/userSchema");
async function userSignup(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  let hash;

  try {
    hash = await bcrypt.hash(req.body.password, 10);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hash,
    isEmailVerified: false,
    emailVerificationCode: Math.floor(1000 + Math.random() * 9000),
  });

  const token = jwt.sign({ id: user.id }, "secretKey");
  user.tokens = user.tokens.concat({ token });
  sendEmail(
    "noreply@gmail.com",
    user.email,
    "Email Verification",
    `${user.emailVerificationCode}`
  );

  return res.status(201).json({ user, token });
}

module.exports = { userSignup };
