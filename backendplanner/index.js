const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",           // 👈 your PostgreSQL username
  password: "abcd2022",   // 👈 the password you set during installation
  host: "localhost",
  port: 5432,
  database: "daily-planner"   // 👈 create this DB next in pgAdmin
});

// GET tasks
app.get("/tasks", async (_, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
  res.json(result.rows);
});

// POST task
app.post("/tasks", async (req, res) => {
  const { title, description, category } = req.body;
  await pool.query(
    "INSERT INTO tasks (title, description, category) VALUES ($1, $2, $3)",
    [title, description, category]
  );
  res.sendStatus(201);
  console.log("Received task:", title, description, category);
});

// PATCH task
app.patch("/tasks/:id", async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  await pool.query("UPDATE tasks SET status = $1 WHERE id = $2", [status, id]);
  res.sendStatus(204);
});

// DELETE a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
  res.sendStatus(204);
});

app.listen(5000, () => console.log("✅ backendplanner is running on port 5000"));