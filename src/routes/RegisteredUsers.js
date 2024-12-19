import React, { useEffect, useState } from "react";
import axios from "axios";

// User Item
const UserItem = ({ index, name, setViewedUserIndex }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <li
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      className=" list-none px-10 py-5 m-2 bg-white flex justify-between"
    >
      <div>
        <h5>{name}</h5>
      </div>
      <div
        className={`${
          isHovering ? "opacity-100" : "opacity-0"
        } transition-opacity ease-out`}
      >
        <button
          onClick={() => isHovering & setViewedUserIndex(index)}
          className="bg-blue-500 text-white px-2 py-1"
        >
          View Details
        </button>

        <button className="bg-red-400 text-white px-2 py-1">Remove</button>
      </div>
    </li>
  );
};

// View User
const ViewUser = ({ viewedUserData, setViewedUserIndex }) => {
  const handleClickOutside = (e) => {
    if (e.target.id == "closer-bg") {
      setViewedUserIndex(null);
    }
  };

  return (
    <div
      id="closer-bg"
      onClick={handleClickOutside}
      className="bg-[rgba(0,0,0,.5)] backdrop-blur-sm w-full h-full fixed top-0 left-0 flex justify-center items-center"
    >
      <div className="bg-white min-w-fit h-fit pb-10 px-5 relative pt-5">
        <h1 className="sticky top-0 text-3xl">{viewedUserData.name}</h1>
        <div className="mt-10">
          {Object.keys(viewedUserData).map((dataKey) => {
            return (
              <div>
                <h1>
                  <span className="text-blue-900 font-bold mr-5">
                    {dataKey}:
                  </span>{" "}
                  <span>{viewedUserData[dataKey]}</span>
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RegisteredUsers = () => {
  const [data, setData] = useState([]);
  const [viewedUserIndex, setViewedUserIndex] = useState(null);

//   const callbackURL = "https://aaa-server.vercel.app";
  const callbackURL = "https://aaa-server.vercel.app";
  const localCallbackURL = "http://localhost:6700";

  useEffect(() => {
    try {
      axios
        .get(callbackURL + "/get_users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
          },
        })
        .then((res) => {
          setData(res.data);
        })
        // .then((data) => console.log(data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full bg-blue-50 h-full flex justify-center items-center">
      <div>
        <h1 className="text-red-500 font-bold text-3xl my-5">
          Registered Users
        </h1>
        <div className="bg-gray-400 w-[500px] h-[500px] flex-col items-center justify-center py-2">
          {data.length >= 1 ? (
            data.map((dat, index) => (
              <UserItem
                key={index}
                index={index}
                name={dat.name}
                setViewedUserIndex={setViewedUserIndex}
              />
            ))
          ) : (
            <h1 className="text-2xl">Loading...</h1>
          )}
        </div>
      </div>

      {viewedUserIndex !== null && (
        <ViewUser
          viewedUserData={data[viewedUserIndex]}
          setViewedUserIndex={setViewedUserIndex}
        />
      )}
    </div>
  );
};

export default RegisteredUsers;
