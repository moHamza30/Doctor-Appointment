import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User_Context } from "../Contexts/UserContext";
const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { fetchUserData, refreshApp, setRefreshApp } = useContext(User_Context);
  // useEffect(() => {
  // }, [user]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      setError("");
      const response = await axios.post(
        "http://localhost:8000/users/login",
        formData
      );
      if (response.status === 200) {
        localStorage.setItem("token", response?.data?.token);
        fetchUserData();
        navigate("/home");
      }
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center bg-green-800">
      <form onSubmit={handleSubmit} className="w-[250px] bg-white p-2 ">
        <div className="mt-2">
          E-mail:
          <input
            onChange={handleChange}
            className=" focus:outline-none w-full block border-2"
            type="email"
            value={formData.email}
            name="email"
            required
          />
        </div>
        <div className="mt-2">
          Password:
          <input
            onChange={handleChange}
            className=" focus:outline-none w-full block border-2"
            type="password"
            value={formData.password}
            name="password"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center my-2">
          <button
            className="block text-center px-10 py-2 bg-green-800"
            type="submit"
          >
            Login
          </button>
        </div>
        <Link to={"/Register"} className="underline">
          click here to Register
        </Link>
      </form>
    </div>
  );
};

export default Login;
