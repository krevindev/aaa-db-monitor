import React, { useEffect, useState } from "react";
import axios from "axios";

// User Item
const UserItem = ({ index, id, name, setViewedUserIndex, deleteUser }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isDeleteConfirmation, setisDeleteConfirmation] = useState(false);
  const [isDeleting, setisDeleting] = useState(false);

  const handleDelete = () => {
    setisDeleting(true);
    console.log("Deleting ", id);
    deleteUser(id);
  };

  return (
    <li
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      className=" list-none px-10 py-5 m-2 bg-white flex justify-between relative rounded-md"
    >
      <div>
        <h5>{name}</h5>
      </div>
      <div
        className={`${
          isHovering && !isDeleteConfirmation ? "opacity-100" : "opacity-0"
        } transition-opacity ease-out`}
      >
        <button
          onClick={() => isHovering & setViewedUserIndex(index)}
          className="bg-blue-500 text-white px-2 py-1"
        >
          View Details
        </button>

        <button
          onClick={() => setisDeleteConfirmation(true)}
          className="bg-red-400 text-white px-2 py-1 ml-2"
        >
          Delete
        </button>
      </div>

      {isDeleteConfirmation && (
        <div className="bg-white border-l border-gray-600 absolute top-0 right-0 px-3 h-full flex flex-col items-center justify-center">
          <h3>Are you sure you want to delete?</h3>
          <div className="w-full flex justify-evenly items-center">
            {!isDeleting ? (
              <>
                <button
                  className="bg-red-400 hover:bg-red-300 px-5 py-1 text-white rounded-md"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="px-5 py-1 text-gray-600 hover:bg-gray-200 rounded-md"
                  onClick={() => setisDeleteConfirmation(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <h1 className="animate-pulse text-red-600">Deleting...</h1>
            )}
          </div>
        </div>
      )}
    </li>
  );
};

// View User
const ViewUser = ({ viewedUserData, setViewedUserIndex }) => {
  const handleClickOutside = (e) => {
    if (e.target.id === "closer-bg") {
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
          {Object.keys(viewedUserData).map((dataKey, index) => {
            return (
              <div key={index}>
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
  const [deleteUserIndex, setDeleteUserIndex] = useState(null);
  const [isDeleteConfirmation, setisDeleteConfirmation] = useState(true);

  const callbackURL = "https://aaa-server.vercel.app";
  // const callbackURL = "http://localhost:6700";

  // Function for Fetching users data
  const fetchUsers = () => {
    setData([]);
    try {
      axios
        .get(callbackURL + "/get_users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer tokentoken`,
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
  };

  // Function for deleting a user
  const deleteUser = (id) => {
    fetch(`${callbackURL}/delete_user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error("Failed to delete user");
        return res.json();
      })
      .then((data) => {
        console.log("User deleted successfully");
        fetchUsers();
      })
      .catch((err) => console.error("Error: ", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="w-full bg-gray-100 h-full flex justify-center items-center">
      <div>
        <div className="flex items-center justify-between">
          {" "}
          <h1 className="text-red-500 font-bold text-3xl my-5">
            Registered Users
          </h1>
          <button onClick={fetchUsers} className="flex items-center active:translate-y-1 transition-transform ease-out hover:bg-gray-200 px-5 py-2 rounded-md">
            <img className="size-5 mr-2" src="/res/icons/refresh-icon.svg"/>
            Refresh
          </button>
        </div>
        <div className="bg-gray-400 w-[500px] min-h-[300px] h-[600px] max-h-fit overflow-y-auto scroll-smooth flex-col items-center justify-center py-2 relative">
          {data.length >= 1 ? (
            data.map((dat, index) => (
              <UserItem
                key={index}
                id={dat._id}
                index={index}
                name={dat.name}
                setViewedUserIndex={setViewedUserIndex}
                deleteUser={deleteUser}
              />
            ))
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <h1 className="text-2xl text-white">Loading Data...</h1>
            </div>
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
