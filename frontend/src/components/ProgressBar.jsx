import React from "react";

const ProgressBar = ({ tasksLength, finishedTasks }) => {
  const progress = tasksLength > 0 ? (finishedTasks / tasksLength) * 100 : 0;
  const roundedProgress = Math.round(progress);

  function getProgressColor() {
    if (roundedProgress > 75) return "bg-green-500";
    if (roundedProgress > 40) return "bg-yellow-400";
    return "bg-red-500";
  }

  return (
    <div className="w-full bg-white dark:bg-gray-300 rounded-xl flex flex-row gap-1 justify-center relative mt-2 border border-black">
      <div
        className={`${getProgressColor()} rounded-xl h-full absolute left-0 transition-all duration-1000`}
        style={{ width: `${roundedProgress}%` }}
      ></div>
      <p className="z-10 font-semibold ">{roundedProgress}%</p>
    </div>
  );
};

export default ProgressBar;
