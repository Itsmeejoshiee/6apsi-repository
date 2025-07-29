import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ConfirmDialog from "../components/ConfirmDialog";
import "../styles/DashboardPage.css";
import { loadTasks } from "../components/loadTasks";
import { getFileContent, updateFile } from "../api/github";
import { useNavigate } from "react-router-dom";
import Task from "../models/Task";

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const navigate = useNavigate();

  const accountId = localStorage.getItem("accountId");
  const TASKS_PATH = `storage/${accountId}/tasks.json`;

  useEffect(() => {
    if (!accountId) {
      navigate("/login");
      return;
    }

    async function fetchTasks() {
      setLoading(true);
      try {
        const loadedTasks = await loadTasks(accountId);
        setTasks(loadedTasks);
      } catch (err) {
        console.error("Failed to load tasks:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, [accountId, navigate]);

  const confirmDelete = (taskId) => {
    setTaskToDelete(taskId);
    setConfirmOpen(true);
  };

  const handleConfirmYes = async () => {
    setConfirmOpen(false);
    if (!taskToDelete) return;

    try {
      const { content: currentContent, sha } = await getFileContent(TASKS_PATH);
      const updatedTasksArray = currentContent.tasks.filter(
        (task) => task.taskId !== taskToDelete
      );

      const updatedContent = {
        ...currentContent,
        tasks: updatedTasksArray,
      };

      await updateFile(TASKS_PATH, updatedContent, `Delete task ${taskToDelete}`, sha);

      setTasks(updatedTasksArray.map((t) => new Task(t)));

      if (expandedTaskId === taskToDelete) {
        setExpandedTaskId(null);
      }
      setTaskToDelete(null);
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Failed to delete task. Please try again.");
    }
  };

  const handleConfirmNo = () => {
    setConfirmOpen(false);
    setTaskToDelete(null);
  };

  const toggleSubtaskDone = (taskId, subtaskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.taskId !== taskId) return task;

        const updatedSubtasks = task.subtasks.map((sub) =>
          sub.subtaskId === subtaskId ? { ...sub, done: !sub.done } : sub
        );

        return new Task({ ...task, subtasks: updatedSubtasks });
      })
    );
  };

  const handleEditTask = (taskId) => {
    navigate(`/edit/${taskId}`);
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <h2 className="dashboard-title">Dashboard</h2>
      <main className="dashboard-content">
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="no-tasks">No task yet</p>
        ) : (
          <div className="task-cards">
            {tasks.map((task) => (
              <div className="task-card" key={task.taskId}>
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <span className="label-initial">{task.getLabelInitial()}</span>
                </div>

                <p className="description">{task.description.slice(0, 30)}...</p>

                <div className="due-date">{task.dueDate}</div>

                <div
                  className="priority-pill"
                  style={{ backgroundColor: task.getPriorityColor() }}
                  title={`Priority: ${task.priority}`}
                >
                  {task.priority}
                </div>

                <div className="task-buttons">
                  <button
                      onClick={(e) => {
                      e.stopPropagation();
                      handleEditTask(task.taskId);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      confirmDelete(task.taskId);
                    }}
                  >
                    Delete
                  </button>
                </div>

                <button
                  className="toggle-expand-button"
                  onClick={() =>
                    setExpandedTaskId(
                      expandedTaskId === task.taskId ? null : task.taskId
                    )
                  }
                >
                  {expandedTaskId === task.taskId
                    ? "Collapse Details"
                    : "Show Details"}
                </button>

                {expandedTaskId === task.taskId && (
                  <div className="task-details">
                    <p>
                      <strong>Status:</strong> {task.status}
                    </p>
                    <p>
                      <strong>Label:</strong> {task.label}
                    </p>
                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(task.createdAt).toLocaleString()}
                    </p>
                    <p>
                      <strong>Subtasks:</strong>
                    </p>
                    <ul>
                      {task.subtasks.map((sub) => (
                        <li key={sub.subtaskId}>
                          <input
                            type="checkbox"
                            checked={sub.done}
                            onChange={() =>
                              toggleSubtaskDone(task.taskId, sub.subtaskId)
                            }
                          />{" "}
                          {sub.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <ConfirmDialog
          isOpen={confirmOpen}
          message="Are you sure you want to delete this task?"
          onConfirm={handleConfirmYes}
          onCancel={handleConfirmNo}
        />
      </main>
    </div>
  );
}
