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
    <div className="pb-2 lg:mt-3 flex justify-center w-full bg-white dark:bg-gray-800">
      <form
        onSubmit={handleAddTask}
        className="flex gap-2 justify-center bg-blue-800 px-3 py-4 w-[90%] sm:w-[90%] lg:py-4 sm:px-5 sm:py-5  lg:w-full lg:px-4 rounded-xl border-b-2 border-black dark:bg-gray-900 min-w-0  dark:border-none"
      >
        <input
          type="text"
          className="flex-1 outline-none rounded-lg bg-white dark:bg-gray-300 px-3 py-2 border-b-2 border-black dark:border-none placeholder-gray-600 sm:px-3 md:px-4 lg:px-4 lg:py-2 lg:text-lg"
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
