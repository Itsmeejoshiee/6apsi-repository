import Subtask from "./Subtask";

export default class Task {
  constructor({
    taskId,
    title,
    description,
    dueDate,
    priority,
    label,
    status,
    subtasks,
    createdAt,
  }) {
    this.taskId = taskId;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.label = label;
    this.status = status;
    this.createdAt = createdAt;
    this.subtasks = subtasks.map((s) => new Subtask(s));
  }

  getLabelInitial() {
    const l = this.label.toLowerCase();
    if (l === "school") return "S";
    if (l === "personal") return "P";
    if (l === "work") return "W";
    return "O";
  }

  getPriorityColor() {
    if (this.priority === "High") return "#ef4444";
    if (this.priority === "Medium") return "#facc15";
    return "#22c55e";
  }
}
