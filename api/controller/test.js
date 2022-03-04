const User = require("../model/userSchema");
// const deleteUser = User.findByIdAndDelete("621703b4ec7a0a6d3c247d5d")
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ completed: false });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
// const DeleteUserAndCount = async (id) => {
//   const user = await User.findByIdAndDelete(id);
//   const count = await User.countDocuments({ completed: false });
//   return count;
// };
// DeleteUserAndCount("62170385fd7a1e2499b930f4")
//   .then((count) => {
//     console.log(count);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//update user email
const UpdateUserEmail = async (id, email) => {
  const user = await User.findByIdAndUpdate(id, { email });
  return user;
};
UpdateUserEmail("6220a7e3126dcb81779f32d8", "rafiamemoncs@gmail.com")
  .then((user) => {
    console.log(user);
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = { UpdateUserEmail };
