const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    emailVerificationCode: { type: Number },
    isEmailVerified: { type: Boolean, default: false },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);
// userSchema.methods.generateAuthToken = async function () {
//   const user = this;
//   const token = jwt.sign(
//     {
//       id: user.id,
//     },
//     "secretKey"
//   );
//   user.tokens = user.tokens.concat({ token });

//   return token;
// };

// userSchema.pre("save", async function (next) {
//   const user = this;
//   console.log("After sometime");
//   next();
// });

module.exports = mongoose.model("User", userSchema);
