import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const User_Context = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState({});
  const [refreshApp, setRefreshApp] = useState(false)
  console.log(user);
  const fetchUserData = () => {
    axios
      .get("http://localhost:8000/users/getuser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUser(res?.data?.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <User_Context.Provider value={{ user, fetchUserData,refreshApp,setRefreshApp }}>{children}</User_Context.Provider>
  );
};

export default UserContext;
