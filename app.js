const express = require("express");
const app = express();
const User = require("./api/model/userSchema");
const auth = require("./api/routes/auth");
const user = require("./api/routes/getUser");
const updateUser = require("./api/routes/userUpdate");
const deleteUser = require("./api/routes/deleteUser");
const sharp = require("sharp");
const multer = require("multer");
const { verifyToken } = require("./api/middlewares/verifyToken");
const upload = multer({
  dest: "images", //destination
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    //limit by file extension
    if (!file.originalname.match(/.(doc|docx)$/)) {
      return cb(new Error("File must be a docx"));
    }

    cb(undefined, true);
    // cb(undefined, false);
  },
});
app.post(
  "/upload",
  upload.single("Upload"),
  (req, res) => {
    res.send(200);
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);
const profilePic = multer({
  // dest: "avatar", //destination
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    //limit by file extension
    if (!file.originalname.match(/.(jpeg|png|jpg)$/)) {
      return cb(new Error("Format not specified"));
    }

    cb(undefined, true);
  },
});
app.post(
  "/profilePic/me/avatar",
  verifyToken,
  profilePic.single("profilePic"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.status(200).send({ message: "File successfully uploaded" });
  },
  (err, req, res, next) => {
    res.status(400).send({ error: err.message });
  }
);
app.get("/user/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error({ error: "user avatar not found" });
    }
    res.set("Content-Type", "avatar/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
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
