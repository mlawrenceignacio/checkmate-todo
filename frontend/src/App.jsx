import Input from "./components/Input";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import useTodoStore from "./store/useTodoStore.js";

function App() {
  const darkMode = useTodoStore((state) => state.darkMode);

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } flex flex-col h-screen overflow-hidden`}
    >
      <Header />

      <Input />
      <TodoList />
    </div>
  );
}

export default App;
