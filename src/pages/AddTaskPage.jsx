import React from "react";
import Sidebar from "../components/Sidebar";
import "../styles/AddTaskPage.css";

export default function AddTaskPage() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <h2 className="add-task-title">Add New Task</h2>
        <form className="add-task-form">
          <input type="text" placeholder="Task Title" className="add-task-input" />
          <textarea placeholder="Task Description" className="add-task-input"></textarea>
          <input type="date" className="add-task-input" />
          <select className="add-task-input">
            <option>Low Priority</option>
            <option>High Priority</option>
          </select>
          <select className="add-task-input">
            <option>Personal</option>
            <option>School</option>
            <option>Work</option>
            <option>Others</option>
          </select>
          <textarea
            placeholder="Checklist / Subtasks (one per line)"
            className="add-task-input"
          ></textarea>
          <button className="add-task-button">Submit Task</button>
        </form>
      </main>
    </div>
  );
}
