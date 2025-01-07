// controllers/taskController.js
const { tasks } = require("../models/taskModel");

// Get all tasks
const getAllTasks = (req, res) => {
  res.json(tasks);
};

// Create a new task
const createTask = (req, res) => {
  const { title, description, status, due_date } = req.body;
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    status,
    due_date,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// Update a task by ID
const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status, due_date } = req.body;

  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));
  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...(title && { title }),
    ...(description && { description }),
    ...(status && { status }),
    ...(due_date && { due_date }),
  };

  res.json({ message: "Task updated successfully", task: tasks[taskIndex] });
};

// Delete a task by ID
const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(taskIndex, 1);
  res.json({ message: "Task deleted successfully" });
};

// Get a single task by ID
const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json(task);
};

// Filter tasks by status
const filterTasksByStatus = (req, res) => {
  const { status } = req.params;
  const filteredTasks = tasks.filter((t) => t.status === status);
  res.json(filteredTasks);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  filterTasksByStatus,
};
