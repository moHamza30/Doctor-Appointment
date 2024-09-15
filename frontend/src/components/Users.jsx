import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [SearchInputValue, setsetSearchInputValue] = useState("");
  const roles = ["admin", "user", "Doctor"];
  useEffect(() => {
    getUsers();
  }, []);
  // get users api
  const getUsers = () => {
    axios
      .get("http://localhost:8000/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUsers(res?.data?.data))
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
      .then((res) => getUsers()) // get new values
      .catch((err) => console.log(err));
  };
  // handle search click for user
  const searchForUser = (e) => {
    setsetSearchInputValue(e.target.value);
  };
  // filter users based on search
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(SearchInputValue.toLowerCase())
  );
  // witch list will be rendered
  const renderList = () => {
    return SearchInputValue ? filteredUsers : users;
  };
  console.log(users);
  return (
    <div>
         <List
      SearchInputValue={SearchInputValue}
       searchForUser={searchForUser}
       roles={roles}
       changeRole={changeRole}
       renderList={renderList}
        />
    </div>
    // <div>
    //   <div className="flex justify-center p-2 ">
    //     <input
    //       type="text"
    //       placeholder="Search for user"
    //       value={searchUser}
    //       onChange={searchForUser}
    //       className="p-2 mb-4  rounded focus:outline-none border-2 border-black "
    //     />
    //   </div>

    //   {renderList().map((user, index) => (
    //     <div
    //       key={index}
    //       className="flex flex-col sm:flex-row  sm:items-center justify-between p-2 bg-gray-300 my-2"
    //     >
    //       <div>
    //         <p>
    //           <span className="font-semibold">Name:</span> {user.username}
    //         </p>
    //         <p>
    //           <span className="font-semibold">Email:</span> {user.email}
    //         </p>
    //         <p>
    //           <span className="font-semibold">role:</span> {user.role}
    //         </p>
    //       </div>
    //       <div>
    //         {roles.map(
    //           (item, index) =>
    //             item !== user.role && (
    //               <button
    //                 key={index}
    //                 onClick={() => changeRole(user._id, item)}
    //                 className=" m-2 bg-black text-white p-1 rounded-sm w-[120px]"
    //               >
    //                 set as {item}
    //               </button>
    //             )
    //         )}
    //         {/* <button className="underline mx-2">set as admin</button>
    //         <button className="underline">set as doctor</button> */}
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
};

export default Users;
