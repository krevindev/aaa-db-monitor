import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const callbackURL = "http://localhost:6700";
const callbackURL = "https://aaa-server.vercel.app";


const DonationPage = () => {
  const [amount, setAmount] = useState(100);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (amount < 100) {
      setAmount(100);
    }
  }, [amount]);

  const getPaymentLink = async () => {
    try {
      const paymentLink = await axios
        .post(
          callbackURL + "/get_payment_link",
          { amount: amount },
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          setPaymentLink(res.data);
          return res.data;
        })
        .catch((err) => console.error(err));
      return paymentLink;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPaymentLink();
  }, []);

  useEffect(() => {
    if (paymentLink !== null) setIsSubmitEnabled(true);
  }, [paymentLink]);

  const handleChange = (e) => {
    e.preventDefault();

    setIsSubmitEnabled(false);

    const inputValue = e.target.value;

    if (inputValue >= 100) setAmount(inputValue);

    getPaymentLink()
      .then((res) => {
        console.log(res);
        setIsSubmitEnabled(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitEnabled(false);
      });
  };

  const handleSubmit = (e) => {
    // if (isSubmitEnabled) navigate(paymentLink);
    e.preventDefault();
    window.location = paymentLink;
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className="bg-gray-500 py-10 px-5 flex flex-col justify-center items-center rounded-lg"
      >
        <h1 className="text-white text-3xl mb-5">Donate:</h1>
        <label htmlFor="amount" />
        <div className="flex items-center">
          <h4 className="text-3xl mr-3 text-white">P</h4>
          <input
            className="bg-white px-2 py-1"
            type="number"
            placeholder="Amount"
            value={amount}
          />
        </div>
        <button
          className="bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-5 py-3 rounded-md mt-5"
          disabled={!isSubmitEnabled}
        >
          {isSubmitEnabled ? "Donate" : "Loading..."}
        </button>
      </form>
    </div>
  );
};

export default DonationPage;
