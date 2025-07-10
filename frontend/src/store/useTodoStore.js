import { create } from "zustand";
import axios from "axios";

const useTodoStore = create((set) => ({
  todos: [],
  loading: false,
  sortOrder: "recent",
  darkMode: JSON.parse(localStorage.getItem("darkMode")),

  toggleDarkMode: () => {
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(newMode));

      return { darkMode: newMode };
    });
  },

  // Set tasks' display order.
  setSortOrder: (order) => {
    set({ sortOrder: order });
  },

  // Fetch all tasks.
  fetchTodos: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/api/todos");
      set({ todos: res.data });
    } catch (error) {
      console.error("Error fetching tasks ", error);
    } finally {
      set({ loading: false });
    }
  },

  // Add task.
  addTodo: async (text) => {
    try {
      const res = await axios.post("/api/todos", { text });
      set((state) => ({
        todos: [...state.todos, res.data],
      }));
    } catch (error) {
      console.error("Error adding task ", error);
    }
  },

  // Delete a task.
  deleteTodo: async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      set((state) => ({
        todos: state.todos.filter((todo) => todo._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting task ", error);
    }
  },

  deleteAllTodos: async () => {
    try {
      await axios.delete("/api/todos");
      set({ todos: [] });
    } catch (error) {
      console.error("Error deleting all tasks: ", error);
    }
  },

  // Update completed status.
  toggleTodo: async (id, currentStatus) => {
    try {
      const res = await axios.patch(`/api/todos/${id}`, {
        completed: !currentStatus,
      });
      set((state) => ({
        todos: state.todos.map((todo) => (todo._id === id ? res.data : todo)),
      }));
    } catch (error) {
      console.error("Error updating task ", error);
    }
  },

  // Edit task.
  updateTodo: async (id, updatedTask) => {
    try {
      const res = await axios.patch(`/api/todos/${id}`, {
        text: updatedTask,
      });

      set((state) => ({
        todos: state.todos.map((todo) => (todo._id === id ? res.data : todo)),
      }));
    } catch (error) {
      console.error("Error updating task ", error);
    }
  },
}));

export default useTodoStore;
