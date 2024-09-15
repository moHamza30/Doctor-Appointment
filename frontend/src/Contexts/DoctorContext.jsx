import React, { createContext, useEffect, useState } from "react";
export const Doctor_Context = createContext();
const DoctorContext = ({ children }) => {
  const [Doctors, setDoctors] = useState([]);
  const [Doctor, setDoctor] = useState({});
  const [DoctorNotifications, setDoctorNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("DoctorNotification");
    return savedNotifications ? JSON.parse(savedNotifications) : []; // If null, use an empty array
  });
  useEffect(() => {
    localStorage.setItem(
      "DoctorNotification",
      JSON.stringify(DoctorNotifications)
    );
  }, [DoctorNotifications]);
  return (
    <Doctor_Context.Provider
      value={{
        Doctors,
        setDoctors,
        Doctor,
        setDoctor,
        DoctorNotifications,
        setDoctorNotifications,
      }} >
      {children}
    </Doctor_Context.Provider>
  );
};

export default DoctorContext;
