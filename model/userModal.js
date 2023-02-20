const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "add username..."],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "email address already taken..."],
    },
    password: {
      type: String,
      required: [true, "add password ..."],
    },
  },
  {
    timestapms: true,
  }
);

module.exports = mongoose.model("users", userSchema);
