import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/ReportPage.css";
import { getFileContent } from "../api/github";

export default function ReportPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const accountId = localStorage.getItem("accountId");
      if (!accountId) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      const TASKS_PATH = `storage/${accountId}/tasks.json`;

      try {
        setLoading(true);
        const { content } = await getFileContent(TASKS_PATH);

        if (!content || !Array.isArray(content.tasks)) {
          setError("Invalid tasks data.");
          setLoading(false);
          return;
        }

        setTasks(content.tasks);
      } catch (err) {
        setError("Failed to load tasks.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <h2 className="report-title">Task Report</h2>

        {loading && <p>Loading tasks...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && tasks.length === 0 && (
          <p>No tasks available to report.</p>
        )}

        {!loading && !error && tasks.length > 0 && (
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
              {tasks.map((task) => (
                <tr key={task.taskId}>
                  <td>{task.title}</td>
                  <td>{task.priority}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
