import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingPopup = () => {
  return (
    <div className="absolute bg-[rgba(0,0,0,.5)] w-full h-full top-0 left-0 flex justify-center items-center">
      <div className="bg-white w-[300px] h-fit px-10 py-5 flex justify-center items-center">
        <h1 className="text-2xl text-center">Adding User, Please Wait...</h1>
      </div>
    </div>
  );
};

const emptyUserData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  amountTotal: "",
};
const dummyAmountsData = [
  { text: "P 1000.00", value: 1000.0 },
  { text: "P 3500.00", value: 3500.0 },
  { text: "P 5000.00", value: 5000.0 },
];

// MAIN COMPONENT
const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amountTotal, setAmountTotal] = useState(100.0);
  const [formData, setFormData] = useState(emptyUserData);

  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ ...formData, amountTotal: amountTotal });
  }, [amountTotal]);

  // Handle the Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    const clearInputs = () => {
      e.target.querySelectorAll("input").forEach((inp) => (inp.value = ""));
    };
    const callbackURL = "https://aaa-server.vercel.app";

    try {
      axios
        .post(callbackURL + "/register_user", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response:", response.data);
          clearInputs();
          return response.data;
        })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
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
  }, [formData, amountTotal]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="h-full flex justify-center items-center flex-col">
      <h1 className="text-red-500 font-bold text-3xl my-5">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-500 w-1/4 flex flex-col rounded-xl px-5 py-10"
      >
        <input
          name="firstName"
          className="py-1 px-3 my-2 mx-1"
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          className="py-1 px-3 my-2 mx-1"
          type="text"
          placeholder="Last Name"
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
        <input
          name="phoneNumber"
          className="py-1 px-3 my-2 mx-1"
          type="text"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
        <input
          name="address"
          className="py-1 px-3 my-2 mx-1"
          type="text"
          placeholder="Address"
          onChange={handleChange}
          required
        />
        <div className="py-5 text-white">
          <h1>Select Amount:</h1>
          <div className="flex flex-col justify-center">
            {dummyAmountsData.map((dummyDat, index) => {
              return (
                <div key={index}>
                  <input
                    onClick={() => setAmountTotal(dummyDat.value)}
                    className="mr-3"
                    name="amount-checkbox"
                    type="radio"
                    value={dummyDat.value}
                    required
                  />
                  <label htmlFor="amount-checkbox">{dummyDat.text}</label>
                </div>
              );
            })}
          </div>
          <div className="mt-10">
            <h3>Total: P {parseFloat(amountTotal).toLocaleString()}</h3>
          </div>
        </div>
        <button className={`bg-green-400 py-3`} type="submit">
          Register
        </button>
      </form>

      {isLoading && <LoadingPopup />}
    </div>
  );
};

export default AddUser;
