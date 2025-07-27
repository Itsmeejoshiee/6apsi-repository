import React from "react";
import "../styles/LandingPage.css";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="container">
      <header className="header">
        <div className="logo-wrap">
          <img src={logo} alt="Commit Logo" className="logo-img" />
          <h1 className="logo-text">Commit Task</h1>
        </div>
        <p className="tagline">Focus. Commit. Get Things Done.</p>
      </header>
      <div className="main-content">
        <div className="task-section">
          <div className="task-card">
            <h3>
              Study For Exam <span className="symbol">S</span>
            </h3>
            <p>Will study all modules for the exam...</p>
            <div className="badge date">July 21, 2026</div>
            <div className="badge low">Low</div>
            <div className="actions">
              <button className="edit">Edit</button>
              <button className="delete">Delete</button>
            </div>
          </div>

          <div className="task-card">
            <h3>
              Play a New Game <span className="symbol">O</span>
            </h3>
            <p>The game store will have a sale...</p>
            <div className="badge date">August 10, 2026</div>
            <div className="badge low">Low</div>
            <div className="actions">
              <button className="edit">Edit</button>
              <button className="delete">Delete</button>
            </div>
          </div>

          <div className="task-card">
            <h3>
              Make Template... <span className="symbol">W</span>
            </h3>
            <p>I will have to create mockups for...</p>
            <div className="badge date">July 05, 2026</div>
            <div className="badge high">High</div>
            <div className="actions">
              <button className="edit">Edit</button>
              <button className="delete">Delete</button>
            </div>
          </div>
        </div>
        <div className="side-panel">
          <div className="panel black">
            <p>
              Your tasks,
              <br />
              your focus.
            </p>
          </div>
          <div className="panel gray">
            <p>
              Get started
              <br />
              with Commit.
            </p>
          </div>
          <Link to="/login" className="landing-button">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
