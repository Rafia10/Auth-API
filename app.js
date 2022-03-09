const express = require("express");
const app = express();

const auth = require("./api/routes/auth");
const user = require("./api/routes/getUser");
const updateUser = require("./api/routes/userUpdate");
const deleteUser = require("./api/routes/deleteUser");
const multer = require("multer");
const upload = multer({
  dest: "images", //destination
});
app.post("/upload", upload.single("Upload"), (req, res) => {
  res.send(200);
});
app.use(express.json());
// app.use((req, res, next) => {
//   res.status(503).send({
//     error:
//       "Sorry for inconvenience the site is under maintenance please try later",
//   });
// });
app.use("/auth", auth);
app.use("/user", user);
app.use(updateUser);
app.use(deleteUser);

module.exports = app;
