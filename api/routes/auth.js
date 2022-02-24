const express = require("express");

const { validation } = require("../controller/validation");
const { userSignup } = require("../controller/userSignup");
const { userLogin } = require("../controller/userLogin");
const router = express.Router();

router.post("/signup", validation, userSignup);

router.post("/login", userLogin);

module.exports = router;
