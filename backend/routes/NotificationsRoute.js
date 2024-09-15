const express = require("express");
const verifyToken = require("../utils/VerifyToken");
const route = express.Router();
const {
  markAllasSeen,
  setNotification,
  deleteNotification,
  setSeenNotification,
} = require("../controlers/NotificationsControllers");

route.post("/setSeenNotification", verifyToken, setSeenNotification);
route.post("/markAllasSeen", verifyToken, markAllasSeen);
route.put("/setNotification/:email", verifyToken, setNotification);
route.delete("/deleteNotification", verifyToken, deleteNotification);

module.exports = route;

