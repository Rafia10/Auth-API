async function logout(req, res) {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    // console.log(req.user);
    res.send({ message: "User logged out " });
  } catch (err) {
    res.status(500).send(console.log(err));
  }
}
module.exports = { logout };
