import React, { useContext, useState } from "react";
import { Doctor_Context } from "../Contexts/DoctorContext";
import axios from "axios";

const DoctorDetails = () => {
  const { Doctor } = useContext(Doctor_Context);
  const [booked, setBooked] = useState(false);
  console.log(Doctor);
  // convirt Time Format
  const convertTo12HourFormat = (time24h) => {
    let [hour, minute] = time24h.split(":");
    hour = parseInt(hour);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  };
  const [error, setEror] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBooking = (email) => {
    // Validate that the selected time is within the doctor's working hours
    const [selectedHour, selectedMinute] = selectedTime.split(":");
    let [startHour, startMinute] = Doctor.startTime.split(":");
    const [endHour, endMinute] = Doctor.endTime.split(":");

    const selectedTimeInMinutes =
      parseInt(selectedHour) * 60 + parseInt(selectedMinute);
    const startTimeInMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
    const endTimeInMinutes = parseInt(endHour) * 60 + parseInt(endMinute);

    if (
      selectedTimeInMinutes >= startTimeInMinutes &&
      selectedTimeInMinutes <= endTimeInMinutes
    ) {
      // Proceed with booking if the time is valid
      const newNotification = {
        _id: Date.now().toString(),
        type: "new booking",
        message: `you have Booking for ${selectedDate} at ${convertTo12HourFormat(selectedTime)}`,
      };
      axios
        .put(
          `http://localhost:8000/notifications/setNotification/${email}`,
          { newNotification },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setBooked(true);
        });
      //   setDoctorNotifications([...DoctorNotifications, newNotification]);
    } else {
      setEror("Please select a time within the doctor's working hours.");
    }
  };
  return (
    <div>
      {booked ? (
        <div>you have booked successfuly</div>
      ) : (
        <div className="p-4">
          <h1 className="font-semibold">
            Dr/ {Doctor.FirstName} {Doctor.LastName}{" "}
          </h1>
          <p className="py-2">phone: {Doctor.PhoneNumber}</p>

          <p>
            working from{" "}
            <span className="font-semibold">
              {convertTo12HourFormat(Doctor.startTime)}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {convertTo12HourFormat(Doctor.endTime)}
            </span>
          </p>

          <label className="block py-2" htmlFor="booking-date">
            Select Day:
            <input
              type="date"
              id="booking-date"
              className="block w-[250px] border-2 p-1 mt-1"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </label>

          <label className="block py-2" htmlFor="booking-time">
            Select Time:
            <input
              type="time"
              id="booking-time"
              className="block w-[250px] border-2 p-1 mt-1"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
              min={Doctor.startTime} // Set minimum and maximum based on doctor's working hours
              max={Doctor.endTime}
            />
            {error && <div className="text-red-500">{error}</div>}
          </label>
          <button
            className="p-2 bg-green-700 rounded-sm"
            onClick={() => handleBooking(Doctor.email)}
          >
            BOOK NOW
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorDetails;
