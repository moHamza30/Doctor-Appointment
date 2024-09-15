import React from "react";

const List = ({ renderList, roles, changeRole, searchInputValue, searchForValue }) => {
  return (
    <div>
      <div className="flex justify-center p-2 ">
        <input
          type="text"
          placeholder="Search for doctor"
          value={searchInputValue}
          onChange={searchForValue}
          className="p-2 mb-4  rounded focus:outline-none border-2 border-black "
        />
      </div>

      {renderList().map((user, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row  sm:items-center justify-between p-2 bg-gray-300 my-2"
        >
          <div>
            <p>
              <span className="font-semibold">Name:</span> {user.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">role:</span> {user.role}
            </p>
          </div>
          <div>
            {roles.map(
              (item, index) =>
                item !== user.role && (
                  <button
                    key={index}
                    onClick={() => changeRole(user._id, item)}
                    className=" m-2 bg-black text-white p-1 rounded-sm w-[120px]"
                  >
                    set as {item}
                  </button>
                )
            )}
            {/* <button className="underline mx-2">set as admin</button>
          <button className="underline">set as doctor</button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
