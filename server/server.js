import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Database
const db = new pg.Pool({
  connectionString: process.env.DB_CONN,
});

// Test connection
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to database successfully");
  }
});

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// GET route
app.get("/messages", async (req, res) => {
  try {
    const data = await db.query(`SELECT * FROM messages ORDER BY id DESC`);
    const messages = data.rows;
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// POST route
app.post("/messages", async (req, res) => {
  try {
    const { msg_name, content } = req.body;

    // Validation
    if (!msg_name || !content) {
      return res
        .status(400)
        .json({ error: "msg_name and content are required" });
    }

    const result = await db.query(
      `INSERT INTO messages (msg_name, content) VALUES ($1, $2) RETURNING *`,
      [msg_name, content],
    );

    res.status(201).json({
      message: "Message added successfully",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Failed to add message" });
  }
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
});
