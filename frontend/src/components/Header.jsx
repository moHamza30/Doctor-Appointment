import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CiViewTimeline } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";
import { User_Context } from "../Contexts/UserContext";

const Header = () => {
  const { user } = useContext(User_Context);
  const [spread, setSpread] = useState(false);
  const userMinu = [
    {
      section: "home",
      icon: <FaHome />,
    },
    {
      section: "appointments",
      icon: <CiViewTimeline />,
    },
    {
      section: "apply doctor",
      icon: <MdCreateNewFolder />,
    },
  ];
  const adminMinu = [
    {
      section: "Home",
      icon: <FaHome />,
    },
    {
      section: "users",
      icon: <FaRegUser />,
    },
    {
      section: "Doctors",
      icon: <FaUserDoctor />,
    },
  ];
  const renderedSection = user?.role === "admin" ? adminMinu : userMinu;
  return (
    <div className="relative">
      <div className="flex justify-between items-center p-2 bg-green-800 text-white">
        <h2 className="text-3xl font-bold ">Logo</h2>
        <ul className="hidden md:flex gap-2 items-center  ">
          {renderedSection.map((item, index) => (
            <Link
              to={`/${item.section}`}
              className="p-2 rounded-sm hover:bg-green-600"
              key={index}
            >
              <li className="flex items-center gap-4">
                {item.icon}
                {item.section}
              </li>
            </Link>
          ))}
          <Link
            to={"/notifications"}
            className=" hover:bg-green-600 p-2 flex items-center gap-3"
          >
            <div className="relative">
              <IoMdNotifications className="text-2xl" />
              {user?.unSeenNotifications?.length > 0 && (
                <div className="w-5 h-5 bg-red-500 absolute -top-2 -right-2 rounded-full flex justify-center items-center">
                  {user?.unSeenNotifications?.length}
                </div>
              )}
            </div>
            Notifications
          </Link>
          <li className="p-2 rounded-sm hover:bg-green-600">
            <Link to={"/login"} className="flex items-center gap-4">
              <RiLogoutCircleLine />
              Log out
            </Link>
          </li>
        </ul>
        <div
          onClick={() => setSpread((prev) => !prev)}
          className="block md:hidden"
        >
          <FaListUl />
        </div>
      </div>
      {/* spread ul */}
      <ul
        className={`${spread ? "block" : "hidden"} p-2 absolute top-full left-0 bg-white w-full`}
      >
        {renderedSection.map((item, index) => (
          <li
            onClick={() => setSpread((prev) => !prev)}
            className="p-2 rounded-sm hover:bg-green-600"
          >
            <Link to={`/${item.section}`} key={index}>
              <div className="flex items-center gap-4">
                {item.icon}
                {item.section}
              </div>
            </Link>
          </li>
        ))}
        <li
          onClick={() => setSpread((prev) => !prev)}
          className="relative p-2 hover:bg-green-600 "
        >
          <Link className="flex items-center gap-2" to={"/notifications"}>
            <IoMdNotifications className="text-xl  " />
            Notifications
            {user?.unSeenNotifications?.length > 0 && (
              <div className="w-5 h-5 bg-red-500 absolute -top-2 -right-2 rounded-full ">
                {user?.unSeenNotifications?.length}
              </div>
            )}
          </Link>
        </li>
        <li
          onClick={() => setSpread((prev) => !prev)}
          className=" rounded-sm hover:bg-green-600 p-2"
        >
          <Link to={"/login"} className="flex items-center gap-2">
            <RiLogoutCircleLine />
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
