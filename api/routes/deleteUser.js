const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const User = require("../model/userSchema");

const router = express.Router();
router.delete("/user/me", verifyToken, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(404).send(err);
  }
});
module.exports = router;
