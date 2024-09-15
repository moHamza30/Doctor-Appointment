const User = require("../models/UserModel");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
// const getUsers = async(req, res) =>{
// const users = await User.find({})

// res.json(users)
// }

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const isExist = await User.findOne({ email });
  if (isExist) return next(new AppError("email is not available", 400));
  const newUser = await User.create({ username, email, password });
  res.json(newUser);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("email or password are wrong", 404));
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new AppError("email or password are wrong", 404));
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).send({ token });
};

const getUser = async (req, res, next) => {
  res.json({ data: req.user });
};
const getUsers = async (req, res, next) => {
  const users = await User.find({ role: { $in: ["user", "admin"] } }).select(
    "-password"
  );
  if (!users.length) return next(new AppError("no users found", 404));
  res.json({ data: users });
};

const UpdateUser = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  if (req.user.role !== "admin")
    return next(
      new AppError("you can not make changes, you are not admin", 404)
    );
  const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true });
  if (!updatedUser) {
    return next(new AppError("User not found", 404));
  }
  res.status(200).json({ data: updatedUser });
};
const getDoctors = async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" }).select("-password");
  if (!doctors.length) return next(new AppError("no users found", 404));
  res.json({ data: doctors });
};

module.exports = { register, login, getUser, getUsers, UpdateUser, getDoctors };
