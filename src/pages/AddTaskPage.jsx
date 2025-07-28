import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/AddTaskPage.css";
import { getFileContent, updateFile } from "../api/github";

const TASKS_PATH = "storage/AB0001/tasks.json"; // Update nalang in the future

export default function AddTaskPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low Priority");
  const [label, setLabel] = useState("Personal");
  const [subtasks, setSubtasks] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { content: tasks, sha } = await getFileContent(TASKS_PATH);

      const nextIdNumber = tasks.length + 1;
      const newTaskId = `T${nextIdNumber.toString().padStart(3, "0")}`;

      const newTask = {
        taskId: newTaskId,
        title,
        description,
        dueDate,
        priority,
        label,
        subtasks: subtasks
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line),
      };

      const updatedTasks = [...tasks, newTask];

      await updateFile(TASKS_PATH, updatedTasks, `Add task ${newTaskId}`, sha);

      // Just to see if na u update ba yung json file
      const verify = await getFileContent(TASKS_PATH);
      console.log(" Current tasks.json content:", verify.content);

    
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Low Priority");
      setLabel("Personal");
      setSubtasks("");
    } catch (err) {
      console.error(" Failed to add task:", err);
      alert("Failed to add task");
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <h2 className="add-task-title">Add New Task</h2>
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
          ></textarea>
          <input
            type="date"
            className="add-task-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <select
            className="add-task-input"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low Priority</option>
            <option>High Priority</option>
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
          <textarea
            placeholder="Checklist / Subtasks (one per line)"
            className="add-task-input"
            value={subtasks}
            onChange={(e) => setSubtasks(e.target.value)}
          ></textarea>
          <button type="submit" className="add-task-button">
            Submit Task
          </button>
        </form>
      </main>
    </div>
  );
}
