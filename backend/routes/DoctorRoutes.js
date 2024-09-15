const express = require("express");
const verifyToken = require("../utils/VerifyToken");
const {
  setDoctor,
  getDoctors,
} = require("../controlers/DoctorControllers");
const route = express.Router();

route.get("/", verifyToken, getDoctors);
route.post("/", verifyToken, setDoctor);

module.exports = route;
