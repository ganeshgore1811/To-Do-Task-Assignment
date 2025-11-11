import { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Low");
  const [due, setDue] = useState("");
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { task, category, priority, due, done: false }]);
    setTask("");
    setCategory("Work");
    setPriority("Low");
    setDue("");
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
    <div className={`${dark ? "bg-gray-900" : "bg-gray-200"} min-h-screen flex items-center justify-center p-6 relative`}>

      <button
        onClick={() => setDark(!dark)}
        className="absolute top-5 right-5 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      <div className={`${dark ? "bg-gray-800" : "bg-white"} w-full max-w-xl rounded-xl p-6 shadow-xl`}>
        <h1 className={`${dark ? "text-white" : "text-gray-900"} text-3xl font-bold mb-2`}>
          SmartToDo Planner ✅
        </h1>
        <p className={`${dark ? "text-gray-300" : "text-gray-700"} mb-5 text-sm`}>
          Manage your tasks with Category, Priority, Due Date, Edit & Search
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <input
            className="col-span-3 p-2 rounded-lg text-black"
            type="text"
            placeholder="Enter task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <select className="p-2 rounded-lg text-black" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Work</option><option>Personal</option><option>Shopping</option><option>Study</option>
          </select>
          <select className="p-2 rounded-lg text-black" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <input type="date" className="p-2 rounded-lg text-black" value={due} onChange={(e) => setDue(e.target.value)} />
        </div>

        <button
          onClick={addTask}
          className="bg-blue-600 hover:bg-green-700 px-4 py-2 text-white rounded-lg w-full mb-5"
        >
          Add Task
        </button>

        <div className="flex space-x-2 mb-6">
          <input
            className="flex-1 p-2 rounded-lg text-black"
            type="text"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setTasks(tasks.filter(t => t.task.toLowerCase().includes(search.toLowerCase())))}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 text-black rounded-lg font-semibold"
          >
            Search
          </button>
        </div>

        <div className="flex justify-between text-sm mb-3 text-gray-400">
          <span>Total: {tasks.length}</span>
          <span>Completed: {tasks.filter(t => t.done).length}</span>
        </div>

        <ul className="space-y-2">
          {tasks.map((t, index) => (
            <li key={index} className={`${dark ? "bg-gray-700" : "bg-gray-100"} p-3 rounded-lg flex justify-between items-center`}>
              <div>
                {editIndex === index ? (
                  <input
                    className="p-2 rounded-lg text-black"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <p
                    onClick={() => toggleTask(index)}
                    className={`font-semibold text-lg cursor-pointer ${t.done ? "line-through text-gray-400" : dark ? "text-white" : "text-gray-900"}`}
                  >
                    {t.task}
                  </p>
                )}
                <p className="text-sm">Category: {t.category}</p>
                <p className="text-sm">Priority: {t.priority}</p>
                <p className="text-sm">Due: {t.due}</p>
              </div>

              {editIndex === index ? (
                <button
                  onClick={() => {
                    const newTasks = [...tasks];
                    newTasks[index].task = editText;
                    setTasks(newTasks);
                    setEditIndex(null);
                  }}
                  className="bg-green-500 px-3 py-1 rounded-lg text-black"
                >
                  Save
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setEditText(t.task);
                    }}
                    className="bg-blue-500 px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        {tasks.length > 0 && (
          <button
            onClick={clearAll}
            className="bg-yellow-600 mt-5 hover:bg-yellow-700 text-white w-full py-2 rounded-lg"
          >
            Clear All Tasks
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
