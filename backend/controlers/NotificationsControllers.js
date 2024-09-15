const User = require("../models/UserModel");
const AppError = require("../utils/AppError");


const markAllasSeen = async (req, res, next) => {
    const { userId } = req.body;
  
    const user = await User.findOne({ _id: userId });
    if (!user) return next(new AppError("user not found", 401));
  
    // Move unSeenNotifications to seenNotifications
    user.seenNotifications = [
      ...user.seenNotifications,
      ...user.unSeenNotifications,
    ];
    user.unSeenNotifications = [];
  
    // Save the updated user
    await user.save();
    res.status(200).send("all notifications marked as seen");
  };

  const setNotification = async (req, res, next) => {
    const { newNotification } = req.body;
    const { email } = req.params;
    const doctor = await User.findOne({ email });
    if (!doctor) return next(new AppError("doctor not found", 404));
    doctor.unSeenNotifications = [...doctor.unSeenNotifications, newNotification];
    await doctor.save();
    res.status(200).json({
      message: "Notification set successfully",
      unSeenNotifications: doctor.unSeenNotifications,
    });
  };

  const deleteNotification = async (req, res, next) => {
    const { userId, notificationId } = req.body;
    // Find the user by ID
    const user = await User.findById(userId);
  
    if (!user) {
      return next(new AppError("user not found", 404));
    }
  
    // Find the notification in unSeenNotifications
    const notificationIndex = user.seenNotifications.findIndex(
      (notification) => notification._id.toString() === notificationId
    );
  
    if (notificationIndex === -1) {
      return res.status(404).json({ message: "Notification not found" });
    }
  
    // Remove the notification from SeenNotifications
    user.seenNotifications.splice(notificationIndex, 1);
    await user.save();
    res.status(200).send("notification has deleted successfully");
  };

  const setSeenNotification = async (req, res, next) => {
    const { userId, notificationId } = req.body;
    // Find the user by ID
    const user = await User.findById(userId);
  
    if (!user) {
      return next(new AppError("user not found", 401));
    }
  
    // Find the notification in unSeenNotifications
    const notificationIndex = user.unSeenNotifications.findIndex(
      (notification) => notification._id.toString() === notificationId
    );
  
    if (notificationIndex === -1) {
      return res.status(404).json({ message: "Notification not found" });
    }
  
    // Remove the notification from unSeenNotifications
    const [notification] = user.unSeenNotifications.splice(notificationIndex, 1);
  
    // Add the notification to seenNotifications
    user.seenNotifications.push(notification);
  
    // Save the updated user document
    await user.save();
    res.status(200).send("setSeenNotification has updated");
  };
  

  module.exports = { markAllasSeen,setNotification,deleteNotification,setSeenNotification };
