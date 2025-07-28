import Task from "../models/Task";
import { getFileContent } from "../api/github";

export async function loadTasks(accountId) {
  const TASKS_PATH = `storage/${accountId}/tasks.json`;
  try {
    const { content } = await getFileContent(TASKS_PATH);
    if (!content || !Array.isArray(content.tasks)) {
      console.warn("No tasks found or invalid format in tasks.json");
      return [];
    }
    return content.tasks.map((t) => new Task(t));
  } catch (error) {
    console.error("Failed to load tasks:", error);
    return [];
  }
}
