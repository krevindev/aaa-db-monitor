import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompletePayment = () => {
  const navigate = useNavigate();

  const [timer, setTimer] = useState(5);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevState) => {
        if (prevState <= 1) {
          clearInterval(timerInterval);
          return 0;
        }

        return prevState - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      navigate("/");
    }
  }, [timer, navigate]);

  return (
    <div className="flex justify-center items-center flex-col h-full">
      <h1 className="text-3xl font-bold my-10">Payment Complete!</h1>
      <div className="flex flex-col items-center justify-center">
        <h5>Returning to Home in</h5>
        <h5>{timer}s</h5>
      </div>
    </div>
  );
};

export default CompletePayment;
