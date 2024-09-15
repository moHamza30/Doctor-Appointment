const express = require("express");
const verifyToken = require("../utils/VerifyToken");
const route = express.Router();
const {
  register,
  login,
  getUser,
  getUsers,
  UpdateUser,
  getDoctors,
} = require("../controlers/UserControlers");
const {
  registerValidation,
  loginValidation,
} = require("../utils/authenticationValidation");

// route.get("/:id", setUser);
route.get("/", verifyToken, getUsers);
route.get("/getuser", verifyToken, getUser);
route.get("/doctors", verifyToken, getDoctors);
route.put("/:id", verifyToken, UpdateUser);
route.post("/register", registerValidation, register);
route.post("/login", loginValidation, login);

module.exports = route;
