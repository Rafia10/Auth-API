const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  res.json({
    message: "user login successfully",
    user: req.user,
  });
});

module.exports = router;
