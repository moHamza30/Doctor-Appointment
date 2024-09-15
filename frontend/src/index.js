import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContext from "./Contexts/UserContext";
import DoctorContext from "./Contexts/DoctorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContext>
    <DoctorContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </DoctorContext>
  </UserContext>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
