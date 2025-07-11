import React, { useEffect, useRef, useState } from "react";

const SortDropdown = ({ value, onChange }) => {
  const sortOptions = [
    { value: "recent", label: "Most Recent" },
    {
      value: "oldest",
      label: "Oldest",
    },
    {
      value: "completed",
      label: "Completed",
    },
    {
      value: "unfinished",
      label: "Unfinished",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLabel = sortOptions.find((opt) => opt.value === value)?.label;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="text-sm xl:text-lg">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-200 dark:bg-gray-400 lg:dark:bg-gray-700 lg:dark:text-white px-3 py-2 rounded-lg border-b border-black cursor-pointer focus:outline-none w-full text-left lg:dark:border hover:bg-blue-500 hover:text-white
        lg:dark:hover:bg-gray-900 dark:hover:bg-gray-800"
      >
        {selectedLabel}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 left-0 w-full bg-blue-500 bg-opacity-95 text-white dark:bg-gray-700 dark:bg-opacity-85 border border-black dark:border-gray-300 rounded-lg shadow-lg ">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className={`px-3 py-2 hover:bg-blue-300 dark:hover:bg-gray-600 cursor-pointer ${
                value === option.value ? "font-semibold text-green-300" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
