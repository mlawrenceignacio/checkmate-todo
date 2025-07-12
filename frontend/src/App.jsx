import Input from "./components/Input";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import TodoDashboard from "./components/TodoDashboard.jsx";
import useTodoStore from "./store/useTodoStore.js";

function App() {
  const darkMode = useTodoStore((state) => state.darkMode);

  return (
    <div className={`${darkMode ? "dark" : ""} `}>
      <div className="flex flex-col h-screen overflow-hidden items-center lg:justify-center dark:bg-gray-800">
        <Header />

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden w-full lg:max-w-[90%] lg:justify-center mt-2 gap-5 ">
          <div className="w-full lg:w-[40%] hidden lg:flex lg:justify-center">
            <TodoDashboard />
          </div>

          <div className="flex flex-col flex-1 items-center overflow-hidden bg-white dark:bg-gray-800 w-full ">
            <Input />
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
