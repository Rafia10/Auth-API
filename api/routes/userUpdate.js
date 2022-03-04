const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
router.patch("/user/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) {
    return res.status(404).send({ error: "Invalid updates" });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(404).send({ error: "Nothing to update" });
    }
    res.send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});
module.exports = router;
