import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getFileContent, updateFile } from "../api/github";
import "../styles/DashboardPage.css";

const TASKS_PATH = "storage/AB0001/tasks.json"; // Update nalang in the future

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [sha, setSha] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { content, sha } = await getFileContent(TASKS_PATH);
      console.log("Fetched tasks:", content); // Just to see if na u update ba yung json file same with other console.log 
      setTasks(content);
      setSha(sha);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const handleDelete = async (taskIdToDelete) => {
    console.log("Deleting task:", taskIdToDelete); 

    try {
      const updatedTasks = tasks.filter(task => task.taskId !== taskIdToDelete);
      console.log("Updated task list after delete:", updatedTasks); 

      await updateFile(TASKS_PATH, updatedTasks, `Delete task ${taskIdToDelete}`, sha);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to delete task:", error);
      alert("Error deleting task");
    }
  };

  const handleEdit = async (taskId) => {
    console.log("Editing task:", taskId); 

    const taskToEdit = tasks.find(task => task.taskId === taskId);
    const newTitle = prompt("Edit Title", taskToEdit.title);
    const newDescription = prompt("Edit Description", taskToEdit.description);
    const newDueDate = prompt("Edit Due Date (YYYY-MM-DD)", taskToEdit.dueDate);
    const newPriority = prompt("Edit Priority (Low Priority or High Priority)", taskToEdit.priority);
    const newLabel = prompt("Edit Label (Personal, School, Work, Others)", taskToEdit.label);

    const updatedTask = {
      ...taskToEdit,
      title: newTitle || taskToEdit.title,
      description: newDescription || taskToEdit.description,
      dueDate: newDueDate || taskToEdit.dueDate,
      priority: newPriority || taskToEdit.priority,
      label: newLabel || taskToEdit.label,
    };

    const updatedTasks = tasks.map(task => task.taskId === taskId ? updatedTask : task);

    console.log("Updated task list after edit:", updatedTasks); 

    try {
      await updateFile(TASKS_PATH, updatedTasks, `Edit task ${taskId}`, sha);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to edit task:", error);
      alert("Error editing task");
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <main className="dashboard-content">
        <h2 className="dashboard-title">Dashboard</h2>
        <div className="task-cards">
          {tasks.map((task) => (
            <div key={task.taskId} className="task-card">
              <h3>{task.title}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Due:</strong> {task.dueDate}</p>
              <p><strong>Label:</strong> {task.label}</p>
              <div className="task-buttons">
                <button onClick={() => handleEdit(task.taskId)}>Edit</button>
                <button onClick={() => handleDelete(task.taskId)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
