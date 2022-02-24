const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"]; //get auth verification header value
  //check the type
  if (!bearerHeader) {
    return res.status(403).json({ error: "Authentication error" });
  }

  const bearer = bearerHeader.split(" "); //separate spaces
  const bearerToken = bearer[1]; //get token from an array

  jwt.verify(bearerToken, "secretKey", async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Authentication error" });
    }

    const existingUser = await User.findOne({ id: decoded.id }).select(
      "-password -__v"
    );

    if (!existingUser) {
      return res.status(403).json({ message: "Authentication error" });
    }

    req.user = existingUser;

    next();
  });
}

module.exports = {
  verifyToken,
};
