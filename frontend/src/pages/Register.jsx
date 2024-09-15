import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
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
        "http://localhost:8000/users/register",
        formData
      );
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message);
      }
      console.log("Form Data:", formData); // Log form data
      console.log(err);
    }
  };
  return (
    <div className="flex h-screen justify-center items-center bg-green-800">
      <form onSubmit={handleSubmit} className="w-[250px] bg-white p-2 ">
        <div className="mt-2">
          Username:
          <input
            onChange={handleChange}
            className=" focus:outline-none w-full block border-2"
            type="text"
            value={formData.username}
            name="username"
            required
          />
        </div>
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
          {error && <div className=" text-red-500 p-2">{error}</div>}
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
        <div className="flex justify-center p-2 mt-2">
          <button
            className="block text-center px-10 py-2 bg-green-800"
            type="submit"
          >
            Register
          </button>
        </div>
        <Link to={"/login"} className="underline">
          click here to login
        </Link>
      </form>
    </div>
  );
};

export default Register;
