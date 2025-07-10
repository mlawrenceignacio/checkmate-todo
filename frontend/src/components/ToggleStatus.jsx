import React from "react";
import useTodoStore from "../store/useTodoStore.js";
import { BsFillCheckCircleFill } from "react-icons/bs";

const ToggleStatus = ({ completed, todoId }) => {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);

  return (
    <button
      className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center  bg-white dark:bg-gray-500 shadow-sm shadow-black mt-2 mr-1 ${
        completed && "mt-0"
      }`}
      onClick={() => {
        toggleTodo(todoId, completed);
      }}
    >
      {completed && (
        <BsFillCheckCircleFill size={20} style={{ color: "darkgreen" }} />
      )}
    </button>
  );
};

export default ToggleStatus;
