import React, { useState } from "react";
import useTodoStore from "../store/useTodoStore.js";

const Input = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [task, setTask] = useState("");

  function handleAddTask() {
    if (task) {
      addTodo(task);
      setTask("");
    }
  }

  return (
    <div className="p-2 flex justify-center w-full bg-white dark:bg-gray-800">
      <form
        onSubmit={handleAddTask}
        className="flex gap-2 justify-center bg-blue-800 px-3 py-4 w-[100%] sm:w-[85%] md:w-[80%] lg:w-[70%] lg:py-6 sm:px-4 md:px-5 md:py-5 xl:w-[55%] xl:py-7 xl:px-7 rounded-xl border-b-2 border-black dark:bg-gray-900 min-w-0"
      >
        <input
          type="text"
          className="flex-1 outline-none rounded-lg bg-white dark:bg-gray-300 px-3 py-2 border-b-2 border-black dark:border-none placeholder-gray-600 sm:px-3 md:px-4 lg:px-5 lg:py-3 xl:py-4"
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
          placeholder="Enter new task"
        />
        <button
          className="bg-blue-500 px-3 rounded-lg text-white text-sm hover:bg-blue-400 hover:text-black border-b-2 border-black dark:bg-gray-800 dark:border-none dark:hover:text-white dark:hover:bg-gray-700 sm:px-4 md:px-5 lg:px-6 lg:text-lg xl:px-7"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Input;
