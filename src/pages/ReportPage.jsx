import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/ReportPage.css";

export default function ReportPage() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <h2 className="report-title">Task Report</h2>
        <table className="report-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Label</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Buy Groceries</td>
              <td>High</td>
              <td>2025-07-28</td>
              <td>Personal</td>
            </tr>
            <tr>
              <td>School Project</td>
              <td>Low</td>
              <td>2025-07-30</td>
              <td>School</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}
