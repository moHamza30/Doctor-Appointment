import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Doctor_Context } from "../Contexts/DoctorContext";
import { useNavigate } from "react-router-dom";

const Appointment = () => {

  const {setDoctor} = useContext(Doctor_Context)
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    getDoctors();
  }, []);
  // get users api
  const getDoctors = () => {
    axios
      .get("http://localhost:8000/doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setDoctors(res?.data?.data))
      .catch((err) => console.log(err));
  };
  const showDoctorDetails = (doctor)=>{
    setDoctor(doctor)
    navigate("/DoctorDetails")
  }
    return (
    <div>
      <h1 className="text-xl font-bold">Appointments</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor, index) => (
          <div key={index} className="p-2 m-2 border-2 border-black">
            <h1 className="text-xl font-semibold">
              Dr/ {doctor.FirstName} {doctor.LastName}
            </h1>
            <p>feild: {doctor.Feild}</p>
            <button
            onClick={()=>showDoctorDetails(doctor)}
             className="px-4 py-2 m-2 bg-green-700 rounded-sm text-white">Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;
