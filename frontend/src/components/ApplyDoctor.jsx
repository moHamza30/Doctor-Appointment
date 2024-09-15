import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyDoctor = () => {
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    email: "",
    Address: "",
    Feild: "",
    startTime: "",
    endTime: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    axios
      .post("http://localhost:8000/doctors", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setApplied(true);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <div className="p-2">
      <h1 className="shadow-sm mb-2 p-2">Apply Doctor</h1>
      {applied ? (
        <div>You have applied successfully</div>
      ) : (
        <form onSubmit={handleSubmit} action="" className="p-2 shadow-sm">
          <h1 className="text-xl font-semi-bold py-2">Personal information</h1>
          <div className="grid gap-4 sm:grid-cols-2 ">
            <label htmlFor="firstName">
              First Name
              <input
                onChange={handleChange}
                value={formData.FirstName}
                className="block w-[250px]  focus:outline-none border-2"
                type="text"
                name="FirstName"
                id="firstName"
                required
              />
            </label>
            <label htmlFor="LastName">
              Last Name
              <input
                onChange={handleChange}
                value={formData.LastName}
                className="block w-[250px] focus:outline-none border-2 "
                type="text"
                name="LastName"
                id="LastName"
                required
              />
            </label>
            <label htmlFor="phone">
              Phone number
              <input
                onChange={handleChange}
                value={formData.PhoneNumber}
                className="block w-[250px]  focus:outline-none border-2"
                type="text"
                name="PhoneNumber"
                id="phone"
                required
              />
            </label>
            <label htmlFor="Email">
              Email
              <input
                onChange={handleChange}
                value={formData.email}
                className="block w-[250px]  focus:outline-none border-2"
                type="email"
                name="email"
                id="website"
                required
              />
              {error === "please apply with your Email" && (
                <div className="text-rose-500">
                  please apply with your Email
                </div>
              )}
            </label>
            <label htmlFor="Address">
              Address
              <input
                onChange={handleChange}
                value={formData.Address}
                className="block w-[250px]  focus:outline-none border-2"
                type="text"
                name="Address"
                id="Address"
                required
              />
            </label>
            <label htmlFor="Feild">
              Feild
              <input
                onChange={handleChange}
                value={formData.Feild}
                className="block w-[250px]  focus:outline-none border-2"
                type="text"
                name="Feild"
                id="Feild"
                required
              />
            </label>
            <label htmlFor="start time">
              start time
              <input
                onChange={handleChange}
                value={formData.startTime}
                className="block w-[250px]  focus:outline-none border-2"
                type="time"
                name="startTime"
                id="start time"
                required
              />
            </label>
            <label htmlFor="end time">
              end time
              <input
                onChange={handleChange}
                value={formData.endTime}
                className="block w-[250px]  focus:outline-none border-2"
                type="time"
                name="endTime"
                id="end time"
                required
              />
            </label>
            <div className="flex justify-start">
              <button
                className="  text-white text-center px-10 py-2 bg-green-800"
                type="submit"
              >
                submit
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ApplyDoctor;
