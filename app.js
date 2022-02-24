const express = require("express");
const app = express();

const auth = require("./api/routes/auth");
const user = require("./api/routes/user");

app.use(express.json());

app.use("/auth", auth);
app.use("/user", user);

app.use((req, res) => {
  res.status(404).json({
    error: "Bad request",
  });
});

module.exports = app;
