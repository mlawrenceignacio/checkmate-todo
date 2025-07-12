import React, { useState } from "react";
import useTodoStore from "../store/useTodoStore.js";
import ConfirmationModal from "./ConfirmationModal.jsx";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";
import SortDropdown from "./SortDropdown.jsx";
import ProgressBar from "./ProgressBar.jsx";
import DailyQuotes from "./DailyQuotes.jsx";

const TodoDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const todos = useTodoStore((state) => state.todos);
  const sortOrder = useTodoStore((state) => state.sortOrder);
  const setSortOrder = useTodoStore((state) => state.setSortOrder);
  const toggleDarkMode = useTodoStore((state) => state.toggleDarkMode);
  const darkMode = useTodoStore((state) => state.darkMode);

  const tasksLength = todos.length;
  const finishedTasks = todos.filter((todo) => todo.completed).length;
  const unfinishedTasks = todos.filter((todo) => !todo.completed).length;

  function handleDeleteConfirmation() {
    setShowModal(true);
  }

  return (
    <div className="w-[98%] sm:p-3 sm:w-[85%] md:p-2 md:w-[80%] lg:w-[100%]  lg:mt-1 mt-2 mb-2 rounded-lg flex flex-col gap-2 min-w-0 text-center  lg:items-center ">
      <div className="flex justify-evenly border border-black py-2 sm:py-3 bg-blue-800 rounded-md text-white min-w-0 gap-3 dark:bg-gray-800 lg:dark:bg-gray-900 lg:py-10 lg:w-full">
        <div>
          <span className="text-md sm:text-lg xl:text-xl text-blue-300">
            {tasksLength}
          </span>
          <p className="text-xs sm:text-sm xl:text-lg">All Tasks</p>
        </div>

        <div>
          <span className="text-md sm:text-lg xl:text-xl text-green-300">
            {finishedTasks}
          </span>
          <p className="text-xs sm:text-sm xl:text-lg">Completed</p>
        </div>

        <div>
          <span className="text-md sm:text-lg xl:text-xl text-red-300">
            {unfinishedTasks}
          </span>
          <p className="text-xs sm:text-sm xl:text-lg">Unfinished</p>
        </div>
      </div>

      <div className="hidden lg:flex mb-2 w-full">
        <ProgressBar tasksLength={tasksLength} finishedTasks={finishedTasks} />
      </div>

      <div className="flex items-center lg:w-full gap-3 min-w-0">
        <div className="flex-1 flex gap-2 min-w-0">
          <button
            className="bg-yellow-600 hover:bg-yellow-500 dark:bg-gray-800 lg:dark:bg-gray-900 dark:hover:bg-gray-700 text-white
             px-2 sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-5 lg:py-3  xl:px-4  rounded-lg  border-b border-black"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <MdOutlineDarkMode size={20} />
            ) : (
              <MdLightMode size={20} />
            )}
          </button>
          <button
            className="bg-red-800 hover:bg-red-500 text-white text-sm py-1 px-2 sm:px-3 md:px-4 xl:text-lg rounded-lg border-b border-black"
            onClick={handleDeleteConfirmation}
          >
            Delete All
          </button>
        </div>

        <div className="relative flex items-center gap-3 shrink-0">
          <p className=" text-white lg:text-black xl:text-xl lg:dark:text-white">
            Sort by:{" "}
          </p>
          <SortDropdown value={sortOrder} onChange={setSortOrder} />
        </div>
      </div>

      <div className="hidden lg:flex flex-1 w-full border border-black lg:flex-col justify-center items-center rounded-lg mt-2">
        <DailyQuotes />
      </div>

      {showModal && <ConfirmationModal setShowModal={setShowModal} />}
    </div>
  );
};

export default TodoDashboard;
