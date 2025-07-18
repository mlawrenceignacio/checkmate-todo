import React, { useEffect, useState } from "react";
import TodoDashboard from "../components/TodoDashboard";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-blue-900 p-4 flex flex-col items-center text-center border-black border-t-2 dark:bg-gray-900 dark:border-b-white lg:border-b-black lg:border-b-2 dark:lg:border-b ">
      <h2 className="text-3xl text-white font-semibold overflow-hidden mt-1">
        &lt;Check<span className="text-blue-300">Mate</span> /&gt;
      </h2>
      <span className="text-blue-200 text-sm mt-1">
        ( {currentTime.toLocaleString()} )
      </span>

      <div className="lg:hidden mt-2 w-full flex justify-center">
        <TodoDashboard />
      </div>
    </div>
  );
};

export default Header;
