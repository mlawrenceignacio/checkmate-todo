import React, { useEffect, useRef, useState } from "react";
import useTodoStore from "../store/useTodoStore.js";

import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

import Spinner from "./Spinner.jsx";
import EditButton from "./EditButton.jsx";
import DeleteButton from "./DeleteButton.jsx";
import Timestamps from "./Timestamps.jsx";
import ToggleStatus from "./ToggleStatus.jsx";

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const loading = useTodoStore((state) => state.loading);
  const sortOrder = useTodoStore((state) => state.sortOrder);

  const sortedTodos = [...todos].sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();

    if (sortOrder === "recent") {
      return bTime - aTime;
    } else if (sortOrder === "oldest") {
      return aTime - bTime;
    } else if (sortOrder === "completed") {
      return b.completed - a.completed;
    } else if (sortOrder === "unfinished") {
      return a.completed - b.completed;
    }
  });

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  const inputRef = useRef();

  const updateTodo = useTodoStore((state) => state.updateTodo);
  const fetchTodos = useTodoStore((state) => state.fetchTodos);

  function saveEditedTodo() {
    if (editedTodo.trim()) {
      updateTodo(editingTodoId, editedTodo);
      setEditingTodoId(null);
    }
  }

  function cancelEdit() {
    setEditedTodo("");
    setEditingTodoId(null);
  }

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  useEffect(() => {
    if (editingTodoId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodoId]);

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden items-center pb-10 flex flex-col gap-2 dark:bg-gray-800 w-[90%]">
      {loading ? (
        <Spinner />
      ) : todos.length > 0 ? (
        sortedTodos.map((todo) => (
          <div
            key={todo._id}
            className={`w-full sm-[] min-w-0 bg-blue-500 dark:bg-gray-900 flex flex-col rounded-xl p-5 border-black border-b-2 transition-all duration-300 opacity-0 animate-fade-in ${
              todo.completed ? "bg-green-500 dark:bg-gray-700" : ""
            }`}
          >
            {editingTodoId === todo._id ? (
              <div className="flex w-full gap-6">
                <div className="flex flex-1 items-center">
                  <input
                    type="text"
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveEditedTodo();
                      }
                    }}
                    className="rounded-lg border-b-2 border-black p-2  w-full outline-none focus:outline-none focus:ring-0 xl:p-3"
                    ref={inputRef}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveEditedTodo}
                    disabled={!editedTodo.trim()}
                    className={` text-white ${
                      !editedTodo.trim() ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FiCheck
                      size={22}
                      className="rounded-full p-1 bg-blue-800 hover:bg-blue-500"
                    />
                  </button>
                  <button onClick={cancelEdit}>
                    <RxCross2
                      size={22}
                      className="bg-red-800 text-white rounded-full p-1 hover:bg-red-500"
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex w-full min-w-0">
                <div className="flex w-full gap-3 flex-1 items-start min-w-0">
                  <ToggleStatus completed={todo.completed} todoId={todo._id} />

                  <div className="flex-1 min-w-0">
                    {todo.completed && (
                      <p className="text-sm text-gray-800 dark:text-green-200 xl:text-lg">
                        Completed!
                      </p>
                    )}
                    <p
                      className={`break-words  whitespace-pre-wrap text-left text-white text-md font-semibold border-blue-800 border-b rounded py-1 xl:text-xl ${
                        todo.completed
                          ? "line-through text-green-100 border-none"
                          : ""
                      }`}
                      style={{ wordBreak: "break-word", hyphens: "auto" }}
                    >
                      {todo.text}
                    </p>

                    {!todo.completed && (
                      <div className="mt-2 text-black text-[0.625rem] dark:text-white xl:text-xs">
                        <Timestamps
                          text={"Created: "}
                          stamp={new Date(todo.createdAt).toLocaleString()}
                        />
                        {todo.updatedAt !== todo.createdAt && (
                          <Timestamps
                            text={"Updated: "}
                            stamp={new Date(todo.updatedAt).toLocaleString()}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 shrink-0 min-w-0">
                    {!todo.completed && (
                      <EditButton
                        todo={todo}
                        setEditedTodo={setEditedTodo}
                        setEditingTodoId={setEditingTodoId}
                      />
                    )}
                    <DeleteButton todoId={todo._id} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="bg-blue-600 text-white w-[70%] text-center p-5 rounded-xl dark:bg-gray-900">
          Add new task to get started!
        </div>
      )}
    </div>
  );
};

export default TodoList;
