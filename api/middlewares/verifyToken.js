const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    //check the type
    if (!token) {
      return res.status(403).json({ error: "Authentication unsuccessful" });
    }

    const bearerToken = token.split(" ")[1]; //separate spaces

    const decoded = jwt.verify(bearerToken, "secretKey");

    const user = await User.findOne({
      _id: decoded.id,
      "tokens.token": bearerToken,
    }).select("-password -__v");

    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
    req.user = user;
    req.token = bearerToken;
    next();
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = {
  verifyToken,
};
