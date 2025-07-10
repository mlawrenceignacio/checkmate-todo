import React from "react";
import useTodoStore from "../store/useTodoStore.js";
import { MdDelete } from "react-icons/md";

const DeleteButton = ({ todoId }) => {
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  return (
    <button onClick={() => deleteTodo(todoId)}>
      <MdDelete size={22} className="text-red-900" />
    </button>
  );
};

export default DeleteButton;
