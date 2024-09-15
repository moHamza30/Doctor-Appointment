const { default: mongoose } = require("mongoose");
const Doctor = require("../models/DoctorModel");
const User = require("../models/UserModel");
const AppError = require("../utils/AppError");

const setDoctor = async (req, res, next) => {
  try {
    const doctorDetails = { ...req.body };

    // Check if a doctor with the given email already exists
    const isExist = await User.findOne({ email: req.body.email });
    if (!isExist) {
      return next(new AppError("please apply with your Email", 400));
    }
    const isApplied = await Doctor.findOne({ email: req.body.email });
    if (isApplied) {
      return next(new AppError("Email is not available", 400));
    }

    // Create a new doctor
    const newDoctor = await Doctor.create(doctorDetails);

    // Find the admin user
    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      return next(new AppError("Admin not found", 500));
    }

    // Add a notification to the admin's unSeenNotifications array
    const notification = {
      _id: new mongoose.Types.ObjectId(),
      type: "new doctor applied",
      message: `${newDoctor.FirstName} ${newDoctor.LastName} has applied for a doctor account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.FirstName + " " + newDoctor.LastName,
      },
    };

    // Update admin's unSeenNotifications array using $push for atomicity
    await User.findByIdAndUpdate(admin._id, {
      $push: { unSeenNotifications: notification },
    });

    // Respond with the newly created doctor data
    res.status(201).send({ data: newDoctor });
  } catch (err) {
    next(err); // Pass any errors to the error-handling middleware
  }
};

const getDoctors = async (req, res, next) => {
  const doctors = await Doctor.find({}).select("-password");
  if (!doctors.length) return next(new AppError("no users found", 404));
  res.json({ data: doctors });
};

module.exports = {
  setDoctor,
  getDoctors,
};
