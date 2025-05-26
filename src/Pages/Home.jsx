import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page home-page">
      <h1 className="animated-heading">Welcome to Event Calendar</h1>
      <img
  src="Calendar.png"
  alt="Calendar with notes and pen"
  style={{
    width: "250px",    // Set a fixed width, or use "50%" for responsive
    height: "auto",
    borderRadius: "8px",
    margin: "1rem 0"
  }}
/>


      <p className="intro-text">
        <strong>Event Calendar</strong> helps you organize your life and work with ease.
        Quickly add, view, and manage events never miss an important date again!
      </p>

      

      <button
        className="go-calendar-btn"
        onClick={() => navigate("/calendar")}
      >
        Go to My Calendar
      </button>
    </div>
  );
}

export default Home;
