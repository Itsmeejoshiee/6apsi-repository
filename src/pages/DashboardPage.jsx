import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/DashboardPage.css";

export default function DashboardPage() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="task-cards">
          <div className="task-card">
            <h3>Buy Groceries</h3>
            <p><strong>Priority:</strong> High</p>
            <p><strong>Due:</strong> 2025-07-28</p>
            <p><strong>Label:</strong> Personal</p>
            <div className="task-buttons">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
          <div className="task-card">
            <h3>School Project</h3>
            <p><strong>Priority:</strong> Low</p>
            <p><strong>Due:</strong> 2025-07-30</p>
            <p><strong>Label:</strong> School</p>
            <div className="task-buttons">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
