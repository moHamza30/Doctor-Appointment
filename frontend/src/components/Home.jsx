import React from "react";
const Home = () => {
  return (
    <div className=" relative h-[calc(100vh-52px)]  bg-gray-50">
      <img
        className="h-full"
        src="/doctorBackground.jpg"
        alt="Doctor Background"
      />
      <div className="absolute p-4 top-[40%] ">
        <h1 className="text-2xlg sm:text-6xl font-bold text-green-700">
          WELCOME
        </h1>
        <p className="text-lg uppercase font-semibold">to our appointments</p>
      </div>
    </div>
  );
};

export default Home;
