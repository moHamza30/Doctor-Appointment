import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import { Doctor_Context } from "../Contexts/DoctorContext";
const Doctors = () => {
  const { Doctors, setDoctors } = useContext(Doctor_Context);
  const [searchInputValue, setsearchInputValue] = useState("");
  const roles = ["admin", "user", "Doctor"];
  useEffect(() => {
    getDoctors();
  }, []);
  // get Doctors api
  const getDoctors = () => {
    axios
      .get("http://localhost:8000/users/doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setDoctors(res?.data?.data))
      .catch((err) => console.log(err));
  };
  // change user role api
  const changeRole = (id, role) => {
    axios
      .put(
        `http://localhost:8000/users/${id}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => getDoctors()) // get new values
      .catch((err) => console.log(err));
  };
  // handle search click for user
  const searchForValue = (e) => {
    setsearchInputValue(e.target.value);
  };
  // filter Doctors based on search
  const filteredDoctors = Doctors.filter((user) =>
    user.username.toLowerCase().includes(searchInputValue.toLowerCase())
  );
  // witch list will be rendered
  const renderList = () => {
    return searchInputValue ? filteredDoctors : Doctors;
  };
  return (
    <div>
      <List
        searchInputValue={searchInputValue}
        searchForValue={searchForValue}
        roles={roles}
        changeRole={changeRole}
        renderList={renderList}
      />
    </div>
  );
};

export default Doctors;
