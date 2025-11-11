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

  // LOAD tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // SAVE tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { task, category, priority, due }]);
    setTask("");
    setCategory("Work");
    setPriority("Low");
    setDue("");
  };

  return (
    <div className={`${dark ? "bg-gray-900" : "bg-gray-200"} min-h-screen flex items-center justify-center p-6 relative`}>

      {/* Theme Button */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-5 right-5 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

      <div className="bg-gray-800 w-full max-w-xl rounded-xl p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-2">Advanced To-Do App ✅</h1>
        <p className="text-gray-300 text-sm mb-5">with Category | Priority | Due Date | Edit | Search | Theme | LocalStorage</p>

        {/* Inputs */}
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

        <button onClick={addTask} className="bg-blue-600 hover:bg-green-700 px-4 py-2 text-white rounded-lg w-full mb-5">
          Add Task
        </button>

        {/* Search */}
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

        {/* List */}
        <ul className="space-y-2">
          {tasks.map((t, index) => (
            <li key={index} className="bg-gray-700 text-white p-3 rounded-lg flex justify-between items-center">
              <div>
                {editIndex === index ? (
                  <input
                    className="p-2 rounded-lg text-black"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <p className="font-semibold text-lg">{t.task}</p>
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
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setEditText(t.task);
                  }}
                  className="bg-blue-500 px-3 py-1 rounded-lg"
                >
                  Edit
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
