import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import x from "../assets/x.png";
import "../styles/AddTaskPage.css";
import { getFileContent, updateFile } from "../api/github";

export default function AddTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [label, setLabel] = useState("Personal");
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accountId = localStorage.getItem("accountId");
    if (!accountId) {
      alert("User not logged in.");
      return;
    }

    const TASKS_PATH = `storage/${accountId}/tasks.json`;

    try {
      const { content, sha } = await getFileContent(TASKS_PATH);
      const existingTasks = content?.tasks || [];

      const nextIdNumber = existingTasks.length + 1;
      const newTaskId = `T${nextIdNumber.toString().padStart(3, "0")}`;

      const subtaskObjects = subtasks.map((sub) => ({
        subtaskId: sub.subtaskId,
        text: sub.text,
        done: sub.done,
      }));

      const newTask = {
        taskId: newTaskId,
        title,
        description,
        dueDate,
        priority,
        label,
        status: "Todo",
        createdAt: new Date().toISOString(),
        subtasks: subtaskObjects,
      };

      const updatedTasks = [...existingTasks, newTask];

      await updateFile(TASKS_PATH, { tasks: updatedTasks }, `Add task ${newTaskId}`, sha);

      alert("Task added successfully!");

      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Low");
      setLabel("Personal");
      setSubtasks([]);
      setNewSubtask("");
    } catch (err) {
      console.error("Failed to add task:", err);
      alert(`Failed to add task: ${err.message || err}`);
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <h2 className="add-task-title">Add New Task</h2>
      <main className="dashboard-content">
        <form className="add-task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            className="add-task-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task Description"
            className="add-task-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            className="add-task-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <select
            className="add-task-input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select
            className="add-task-input"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          >
            <option>Personal</option>
            <option>School</option>
            <option>Work</option>
            <option>Others</option>
          </select>
          <div className="subtask-input-section">
            <h4>Subtasks</h4>
            <div className="add-subtask-form">
              <input
                type="text"
                placeholder="Enter subtask description"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                className="subtask-textbox"
              />
              <button
                type="button"
                onClick={() => {
                  if (newSubtask.trim()) {
                    const nextId = `S${String(subtasks.length + 1).padStart(3, '0')}`;
                    const newEntry = {
                      subtaskId: nextId,
                      text: newSubtask.trim(),
                      done: false,
                    };
                    setSubtasks([...subtasks, newEntry]);
                    setNewSubtask("");
                  }
                }}
                className="add-subtask-btn"
              >
                Add Subtask
              </button>
            </div>

            {subtasks.length > 0 && (
              <ul className="subtask-preview-list">
                {subtasks.map((sub) => (
                  <li key={sub.subtaskId} className="subtask-preview-item">
                    <input type="checkbox" checked={sub.done} disabled />
                    <span>{sub.text}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setSubtasks(subtasks.filter((s) => s.subtaskId !== sub.subtaskId))
                      }
                      className="delete-subtask-btn"
                    >
                      <img src={x} alt="x logo" className="delete-subtask-icon" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" className="add-task-button">
            Submit Task
          </button>
        </form>
      </main>
    </div>
  );
}
