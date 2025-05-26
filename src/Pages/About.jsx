import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="page about-page">
      <h1>
        <span role="img" aria-label="calendar" style={{ fontSize: "2rem" }}></span> About Event Calendar
      </h1>
      <p className="about-intro">
        <strong>Event Calendar</strong> is a modern, friendly tool designed to help you organize life’s important moments with ease. Whether you need to keep track of work meetings, personal appointments, or recurring reminders, this application makes it simple and enjoyable. You can click on any day in the calendar to quickly add or view events, personalize each event with colors, and even set up flexible recurring schedules whether daily, weekly, monthly, or something uniquely your own. The app automatically detects scheduling conflicts, so you’ll never accidentally double-book yourself, and all your events are saved securely in your browser, so your schedule is always there when you need it.
      </p>
      <p>
        We built Event Calendar to be intuitive and visually pleasing, making planning your days a delight. The interface is responsive and works beautifully on both desktop and mobile devices. Our goal is to help you stay organized and stress-free, no matter how busy life gets.
      </p>
      <div className="about-cta">
        <button
          className="try-calendar-btn"
          onClick={() => navigate("/calendar")}
        >
          Try the Calendar Now
        </button>
      </div>
      <footer className="about-footer">
        <p>
          Made By <span role="img" aria-label="love"></span> by <b>Gowthami Machiraju</b>
        </p>
      </footer>
    </div>
  );
}

export default About;
