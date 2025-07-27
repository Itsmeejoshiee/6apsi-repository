import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">≡</h2>
      <ul className="sidebar-list">
        <li>
          <Link to="/dashboard" className="sidebar-link">
            <span className="icon">🏠</span>
            <span className="link-text">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/add" className="sidebar-link">
            <span className="icon">➕</span>
            <span className="link-text">Add Task</span>
          </Link>
        </li>
        <li>
          <Link to="/report" className="sidebar-link">
            <span className="icon">📊</span>
            <span className="link-text">Report</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="sidebar-link">
            <span className="icon">🔓</span>
            <span className="link-text">Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
