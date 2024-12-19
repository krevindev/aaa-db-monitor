import axios from "axios";
import React, { useEffect, useState } from "react";

const LoadingPopup = () => {
  return (
    <div className="absolute bg-[rgba(0,0,0,.5)] w-full h-full top-0 left-0 flex justify-center items-center">
      <div className="bg-white w-[300px] h-[300px] flex justify-center items-center">
        <h1 className="text-3xl">Adding User, Please Wait...</h1>
      </div>
    </div>
  );
};

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle the Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      axios
        .post("http://localhost:6700/register_user", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          return response.data;
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.error("Error:", err);
        })
        .finally(() => setIsLoading(false));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="h-full flex justify-center items-center flex-col">
      <h1 className="text-red-500 font-bold text-3xl my-5">Add User</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-500 flex flex-col rounded-xl px-5 py-10"
      >
        <input
          name="name"
          className="py-1 px-3 my-2 mx-1"
          type="text"
          placeholder="Name"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          className="py-1 px-3 my-2 mx-1"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          className="py-1 px-3 my-2 mx-1"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className={`bg-green-400 py-3`} type="submit">
          Add
        </button>
      </form>

      {isLoading && <LoadingPopup />}
    </div>
  );
};

export default AddUser;
