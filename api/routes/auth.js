const express = require("express");
const { body } = require("express-validator");
const { userSignup } = require("../controller/userSignup");
const { userLogin } = require("../controller/userLogin");
const { verifyToken } = require("../middlewares/verifyToken");
const { logout } = require("../controller/userLogout");
const { logoutAll } = require("../controller/userLogoutAll");

const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 9 }),
  userSignup
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 9 }),
  userLogin
);

router.post("/logout", verifyToken, logout);

router.post("/logoutAll", verifyToken, logoutAll);

module.exports = router;
