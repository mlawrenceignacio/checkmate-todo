import React from "react";
import { CiEdit } from "react-icons/ci";

const EditButton = ({ todo, setEditedTodo, setEditingTodoId }) => {
  function handleEditTodo(todo) {
    setEditingTodoId(todo._id);
    setEditedTodo(todo.text);
  }

  return (
    <button onClick={() => handleEditTodo(todo)}>
      <CiEdit size={22} className="text-green-300" />
    </button>
  );
};

export default EditButton;
