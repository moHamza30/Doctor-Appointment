import React, { useContext, useState } from "react";
import { User_Context } from "../Contexts/UserContext";
import axios from "axios";
const Notifications = () => {
  const { user } = useContext(User_Context);
  const { fetchUserData } = useContext(User_Context);
  const [Seen, setSeen] = useState(false);

  const setAsSeen = (userId, notificationId) => {
    axios
      .post(
        "http://localhost:8000/notifications/setSeenNotification",
        {
          userId,
          notificationId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        fetchUserData();
      })
      .catch((err) => console.log(err));
  };
  const markAllAsSeen = (userId) => {
    axios
      .post(
        "http://localhost:8000/notifications/markAllasSeen",
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        fetchUserData();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const deleteNotification = (userId, notificationId) => {
    axios
      .delete("http://localhost:8000/notifications/deleteNotification", {
        // Config object
        data: {
          userId,
          notificationId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        fetchUserData();
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const renderNotifications = () => {
    return Seen ? user.seenNotifications : user.unSeenNotifications;
  };
  return (
    <div className="p-4">
      {(user.role === "admin" || user.role === "Doctor") && (
        <div>
          <h1 className="text-xl font-semibold shadow-sm mb-2">
            Notifications
          </h1>
          <div className="flex gap-4 shadow-md p-2">
            <h2 onClick={() => setSeen(false)} className="cursor-pointer">
              Unseen
            </h2>
            <h2 onClick={() => setSeen(true)} className="cursor-pointer">
              seen
            </h2>
          </div>
          <div className="flex justify-end">
            <div
              onClick={() => markAllAsSeen(user._id)}
              className="underline p-2 cursor-pointer"
            >
              Mark all as seen
            </div>
          </div>

          {/* notifications */}

          {renderNotifications().map((item, index) => (
            <div key={index} className="border-b-2 p-2 flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">{item.type}</h2>
                <p>{item.message}</p>
              </div>
              <div>
                {Seen ? (
                  <div
                    className="underline cursor-pointer"
                    onClick={() => deleteNotification(user._id, item._id)}
                  >
                    delete
                  </div>
                ) : (
                  <div
                    className="underline cursor-pointer"
                    onClick={() => setAsSeen(user._id, item._id)}
                  >
                    set as seen
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
