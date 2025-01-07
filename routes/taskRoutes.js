// routes/taskRoutes.js
const express = require("express");
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  filterTasksByStatus,
  getTaskById,
} = require("../controllers/taskController");

const router = express.Router();

// Define routes
router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/:id", getTaskById);
router.get("/status/:status", filterTasksByStatus);

module.exports = router;