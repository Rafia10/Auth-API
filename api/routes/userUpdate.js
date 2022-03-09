const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const User = require("../model/userSchema");
const router = express.Router();
router.patch("/user/me", verifyToken, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) {
    return res.status(404).send({ error: "Invalid updates" });
  }
  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body);
    //const user = await User.findById(req.user._id);
    updates.forEach(() => {
      req.user[updates] = req.body[updates];
    });
    await req.user.save();
    if (!req.user) {
      return res.status(404).send({ error: "Nothing to update" });
    }
    res.send(req.user);
  } catch (err) {
    res.status(404).send(err);
  }
});
module.exports = router;
