const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { array } = require("joi");
// Define the User schema
const DoctorSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Feild: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// DoctorSchema.pre("save", async function () {
//   const doctor = this;
//   if (doctor.isModified("password")) {
//     const hashedPassword = await bcrypt.hash(doctor.password, 10);
//     doctor.password = hashedPassword;
//   }
// });

// DoctorSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// Create the User model based on the schema
const Doctor = mongoose.model("Doctors", DoctorSchema);

module.exports = Doctor;
