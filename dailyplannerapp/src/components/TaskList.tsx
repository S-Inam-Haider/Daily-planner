import React, { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "Completed";
  category: string;
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => alert("Error fetching tasks"));
  }, []);

  const toggleStatus = async (id: number, currentStatus: "Pending" | "Completed") => {
    const newStatus: "Pending" | "Completed" = currentStatus === "Pending" ? "Completed" : "Pending";

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter(task => task.id !== id)); // removes it from frontend list
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map(task => (
        <div key={task.id} className="task-card">
          <h3>{task.title} {task.category}</h3>
          <p>{task.description}</p>
          <p className="status">Status: {task.status}</p>
          <div className="button-group">
            <button onClick={() => toggleStatus(task.id, task.status)}>
              Toggle Status
            </button>
            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;