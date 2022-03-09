const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
async function userLogin(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.json({ message: "Invalid email or password" });
    }

    const cmp = await bcrypt.compare(req.body.password, user.password);

    if (!cmp) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user.id,
      },
      "secretKey"
    );
    user.tokens = [...user.tokens, { token }];

    await user.save();

    return res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = { userLogin };
