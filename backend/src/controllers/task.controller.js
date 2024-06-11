const Task = require("../models/Task");

const insertTask = async (req, res) => {
  try {
    const { title, description, completed, dueDate } = req.body;
    const newTask = new Task({
      title,
      description,
      completed,
      userId: req.user._id,
      dueDate,
    });
    const savedTask = await newTask.save();
    res.json({
      message: "Task added successfully!",
      statusCode: 201,
      task: savedTask,
    });
  } catch (error) {
    console.error("Insert Task: ", error);
    res.json({ message: "Failed to add new task!", statusCode: 400 });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.json({ tasks, statusCode: 200 });
  } catch (error) {
    console.error("Get Tasks: ", error);
    res.json({ message: "Failed to retrieve tasks!", statusCode: 400 });
  }
};

const updateTask = async (req, res) => {
  try {
    const { _id, title, completed, description, dueDate } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(_id, {
      title,
      completed,
      description,
      dueDate,
    });
    res.json({
      message: "Task updated successfully!",
      statusCode: 200,
      task: { _id, title, completed, description, dueDate },
    });
  } catch (error) {
    console.error("Update Task: ", error);
    res.json({ message: "Failed to update task!", statusCode: 400 });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is provided
    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully!", statusCode: 200 });
  } catch (error) {
    console.error("Delete Task: ", error);
    res.json({ message: "Failed to delete task!", statusCode: 400 });
  }
};

module.exports = {
  insertTask,
  getTasks,
  updateTask,
  deleteTask,
};
