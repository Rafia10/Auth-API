const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
require("../model/userSchema");
const router = express.Router();

router.get("/", verifyToken, (req, res) => {
  console.log("world");
  return res.json({
    user: req.user,
    options: {
      limit: parseInt(req.query.limit),
      skip: parseInt(req.query.skip),
    },
  });
});

module.exports = router;
