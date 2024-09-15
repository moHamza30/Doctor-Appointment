const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { array } = require("joi");
// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  unSeenNotifications: {
    type: [Object],
    default: [],
  },
  seenNotifications: {
    type: [Object],
    default: [],
  },
});

userSchema.pre("save", async function () {
  const user = this;
  if (user.isModified("password")) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  }
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the User model based on the schema
const User = mongoose.model("Users", userSchema);

module.exports = User;
