import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Home from "./components/Home";
import Appointment from "./components/Appointment";
import ApplyDoctor from "./components/ApplyDoctor";
import Users from "./components/Users";
import Doctors from "./components/Doctors";
import DoctorDetails from "./components/DoctorDetails";
import Notifications from "./components/Notifications";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Register />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/notifications"
          element={
            <>
              <Header />
              <Notifications />
            </>
          }
        />
        <Route
          path="/appointments"
          element={
            <>
              <Header />
              <Appointment />
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <Header />
              <Users />
            </>
          }
        />
        <Route
          path="/Doctors"
          element={
            <>
              <Header />
              <Doctors />
            </>
          }
        />
        <Route
          path="/apply doctor"
          element={
            <>
              <Header />
              <ApplyDoctor />
            </>
          }
        />
        <Route
          path="/doctorDetails"
          element={
            <>
              <Header />
              <DoctorDetails />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
