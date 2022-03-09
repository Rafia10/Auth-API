async function logoutAll(req, res) {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send({ message: "User logged out  from all devices" });
  } catch (err) {
    res.status(500).send(console.log(err));
  }
}
module.exports = { logoutAll };
