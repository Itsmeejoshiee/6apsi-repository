import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";
import home from "../assets/home.png";
import add from "../assets/add.png";
import report from "../assets/report.png";
import logout from "../assets/logout.png";
import menu from "../assets/menu.png";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <img src={menu} alt="home logo" className="sb-logo" />
        <ul className="sidebar-list">
          <li>
            <Link to="/dashboard" className="sidebar-link">
              <span className="icon"><img src={home} alt="home logo" className="sb-logo" /></span>
              <span className="link-text">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/add" className="sidebar-link">
              <span className="icon"><img src={add} alt="add logo" className="sb-logo" /></span>
              <span className="link-text">Add Task</span>
            </Link>
          </li>
          <li>
            <Link to="/report" className="sidebar-link">
              <span className="icon"><img src={report} alt="report logo" className="sb-logo" /></span>
              <span className="link-text">Report</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="sidebar-link">
              <span className="icon"><img src={logout} alt="logout logo" className="sb-logo" /></span>
              <span className="link-text">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
