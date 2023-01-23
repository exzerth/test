import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1>Grow your Instagram with 100% Real Followers</h1>
      <button className="text-lg font-normal w-[300px] py-3 text-white bg-primaryblue mt-5 rounded-xl" onClick={() => navigate("/signUp") } >START FREE TRIAL</button>
    </div>
  );
}
