import React from "react";
import useTodoStore from "../store/useTodoStore";

const ConfirmationModal = ({ setShowModal }) => {
  const deleteAllTodos = useTodoStore((state) => state.deleteAllTodos);

  async function handleConfirm() {
    await deleteAllTodos();
    setShowModal(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-5 text-center p-5 bg-blue-900 dark:bg-gray-800 rounded-lg w-[70%] sm:w-[45%] md:w-[35%] lg:w-[25%]  lg:p-7 border border-black bg-opacity-90 shadow-md shadow-black">
        <p className="text-white lg:text-lg xl:text-xl">
          Are you sure you want to delete all tasks? This action cannot be
          undone.
        </p>
        <div className="flex flex-row w-[100%] justify-evenly p-1">
          <button
            onClick={handleConfirm}
            className="px-3 py-1 rounded-lg bg-blue-600 text-white border-b border-black hover:bg-blue-400 hover:text-black lg:text-lg xl:text-xl dark:bg-gray-900 dark:hover:bg-gray-400"
          >
            Delete
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="px-3 py-1 rounded-lg bg-red-600 text-white border-b border-black hover:bg-red-400 hover:text-black lg:text-lg xl:text-xl"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
