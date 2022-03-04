const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
router.delete("/user/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  try {
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.send(user);
  } catch (err) {
    res.status(404).send(err);
  }
});
module.exports = router;
