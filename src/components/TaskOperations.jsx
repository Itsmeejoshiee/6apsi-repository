import { getFileContent, updateFile } from '../api/github';

const getTasksPath = (accountId) => `storage/${accountId}/tasks.json`;

export async function fetchTasks(accountId) {
  try {
    const { content } = await getFileContent(getTasksPath(accountId));
    return content ? JSON.parse(atob(content)) : [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function deleteTask(accountId, taskId) {
  try {
    const { content, sha } = await getFileContent(getTasksPath(accountId));
    const tasks = content ? JSON.parse(atob(content)) : [];

    const updatedTasks = tasks.filter(task => task.taskId !== taskId);

    await updateFile(getTasksPath(accountId), updatedTasks, `Deleted task ${taskId}`, sha);
    console.log(`✅ Deleted task ${taskId}`);
    console.log("Updated tasks JSON:", updatedTasks); // ✅ DEBUG

  } catch (error) {
    console.error('Error deleting task:', error);
  }
}

export async function editTask(accountId, updatedTask) {
  try {
    const { content, sha } = await getFileContent(getTasksPath(accountId));
    const tasks = content ? JSON.parse(atob(content)) : [];

    const updatedTasks = tasks.map(task =>
      task.taskId === updatedTask.taskId ? { ...task, ...updatedTask } : task
    );

    await updateFile(getTasksPath(accountId), updatedTasks, `Edited task ${updatedTask.taskId}`, sha);
    console.log(`✅ Edited task ${updatedTask.taskId}`);
    console.log("Updated tasks JSON after delete:", updatedTasks); // ✅ DEBUG

  } catch (error) {
    console.error('Error editing task:', error);
  }
}
