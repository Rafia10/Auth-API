const express = require("express");
const app = express();
const User = require("./api/model/userSchema");
const auth = require("./api/routes/auth");
const user = require("./api/routes/getUser");
const updateUser = require("./api/routes/userUpdate");
const deleteUser = require("./api/routes/deleteUser");
app.use(express.json());

app.use("/auth", auth);
app.use("/user", user);
app.use(updateUser);
app.use(deleteUser);

module.exports = app;
