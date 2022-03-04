const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  console.log("world");
  return res.json({
    message: "user login successfully",
    user: req.user,
  });
});

module.exports = router;
