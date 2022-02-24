const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
async function userLogin(req, res) {
  try {
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

    return res.json({
      token: token,
    });
  } catch (error) {
    res.status(500).send("Internal Server error Occured");
  }
}
module.exports = { userLogin };
