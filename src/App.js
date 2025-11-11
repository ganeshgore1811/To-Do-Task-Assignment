import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const clearAll = () => setTasks([]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 w-full max-w-xl rounded-xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-2">My To-Do List ✅</h1>
        <p className="text-gray-300 text-sm mb-5">Your personal daily task manager</p>

        {/* Input */}
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

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-400 mb-3">
          <span>Total: {tasks.length}</span>
          <span>Completed: {tasks.filter(t => t.done).length}</span>
        </div>

        {/* List */}
        <ul className="space-y-2">
          {tasks.map((t, index) => (
            <li
              key={index}
              className="bg-gray-700 text-white flex justify-between items-center p-3 rounded-lg"
            >
              <span
                onClick={() => toggleTask(index)}
                className={`cursor-pointer ${t.done ? "line-through text-gray-400" : ""}`}
              >
                {t.text}
              </span>

              <button
                onClick={() => deleteTask(index)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Clear button */}
        {tasks.length > 0 && (
          <button
            onClick={clearAll}
            className="bg-yellow-600 mt-5 hover:bg-yellow-700 text-white w-full py-2 rounded-lg"
          >
            Clear All
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
