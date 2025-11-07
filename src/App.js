import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 w-full max-w-xl rounded-xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-4">My To-Do List ✅</h1>

        <div className="flex space-x-2 mb-6">
          <input
            className="flex-1 p-2 rounded-lg text-black"
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-blue-600 hover:bg-green-700 px-4 py-2 text-white rounded-lg"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((t, index) => (
            <li
              key={index}
              className="bg-gray-700 text-white p-3 rounded-lg"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
