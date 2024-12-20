import React, { useEffect, useState } from "react";
import axios from "axios";

const callbackURL = "http://localhost:6700";
// const callbackURL = "https://aaa-server.vercel.app";
const DonationPage = () => {
  const [amount, setAmount] = useState(100);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [paymentLink, setPaymentLink] = useState(null);

  const getPaymentLink = async () => {
    setIsSubmitEnabled(false);

    try {
      const paymentLink = await axios
        .post(
          callbackURL + "/get_payment_link",
          {
            amount: amount,
          },
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
          setIsSubmitEnabled(true);
          return res.data;
        })
        .catch((err) => console.error(err));
      return paymentLink;
    } catch (err) {
      setIsSubmitEnabled(false);
      console.error(err);
    }
  };

  // gets payment link when the amount state changes
  useEffect(() => {
    // Prevents requesting when value is below 100
    if (amount >= 100) {
      getPaymentLink();
    }
  }, [amount]);

  const handleChange = async (e) => {
    setIsSubmitEnabled(false);

    const inputValue = await e.target.value;
    setAmount(inputValue);
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
