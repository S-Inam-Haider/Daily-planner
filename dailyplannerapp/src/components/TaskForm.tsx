import React, { useState } from "react";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("👨‍👩‍👧 Family Time");

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, category })
    });
    alert("Task added!");
    setTitle("");
    setDescription("");
    setCategory("🏏 Cricket Practice");
    window.location.reload(); 
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={50} placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} maxLength={200} placeholder="Description" />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>👨‍👩‍👧Family Time</option>
        <option>📚Assignments</option>
        <option>🏏Cricket Practice</option>
        <option >🎮video Games</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;