function validation() {
  body("email").isEmail(), body("password").isLength({ min: 9 });
}
module.exports = { validation };
