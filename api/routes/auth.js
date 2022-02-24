const express = require("express");

const { body } = require("express-validator");
const { userSignup } = require("../controller/userSignup");
const { userLogin } = require("../controller/userLogin");
const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 9 }),
  userSignup
);

router.post("/login", userLogin);

module.exports = router;
