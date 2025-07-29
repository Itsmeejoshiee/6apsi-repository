import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import x from "../assets/x.png";
import "../styles/AddTaskPage.css";
import { getFileContent, updateFile } from "../api/github";
import { useParams, useNavigate } from "react-router-dom";

export default function EditTaskPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [label, setLabel] = useState("Personal");
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtask, setNewSubtask] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTaskData = async () => {
      const accountId = localStorage.getItem("accountId");
      if (!accountId) {
        alert("User not logged in.");
        navigate("/login");
        return;
      }

      const TASKS_PATH = `storage/${accountId}/tasks.json`;

      try {
        const { content } = await getFileContent(TASKS_PATH);
        const taskToEdit = content.tasks.find(task => task.taskId === taskId);

        if (taskToEdit) {
          setTitle(taskToEdit.title);
          setDescription(taskToEdit.description);
          setDueDate(taskToEdit.dueDate);
          setPriority(taskToEdit.priority);
          setLabel(taskToEdit.label);
          setSubtasks(taskToEdit.subtasks || []);
        } else {
          alert("Task not found");
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Failed to load task:", err);
        alert(`Failed to load task: ${err.message || err}`);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadTaskData();
  }, [taskId, navigate]);

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
      const existingTasks = content.tasks || [];

      const updatedTasks = existingTasks.map(task => {
        if (task.taskId === taskId) {
          return {
            ...task,
            title,
            description,
            dueDate,
            priority,
            label,
            subtasks: subtasks.map(sub => ({
              subtaskId: sub.subtaskId,
              text: sub.text,
              done: sub.done,
            })),
          };
        }
        return task;
      });

      await updateFile(
        TASKS_PATH,
        { tasks: updatedTasks },
        `Update task ${taskId}`,
        sha
      );

      alert("Task updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to update task:", err);
      alert(`Failed to update task: ${err.message || err}`);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <Sidebar />
        <h2 className="add-task-title">Edit Task</h2>
        <main className="dashboard-content">
          <p>Loading task data...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <h2 className="add-task-title">Edit Task</h2>
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
            Update Task
          </button>
        </form>
      </main>
    </div>
  );
}