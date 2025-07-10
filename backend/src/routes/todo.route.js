import express from "express";
import Todo from "../models/todo.model.js";

const router = express.Router();

// Get all tasks.
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();

    if (!todos) return;

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new task.
router.post("/", async (req, res) => {
  try {
    const { text, completed } = req.body;

    if (!text) return res.status(400).json({ message: "Text field required" });

    const newTodo = new Todo({
      text,
      completed,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a task.
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) return res.status(404).json({ message: "Task not found." });

    res.json({ message: "Task successfully deleted!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete all tasks.
router.delete("/", async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.json({ message: "Tasks successfully deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit a task.
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) return res.status(404).json({ message: "Task not found." });

    if (req.body.text !== undefined) {
      todo.text = req.body.text;
    }

    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    const updatedTodo = await todo.save();

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
