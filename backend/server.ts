import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Root route (Render checks this)
app.get("/", (req, res) => {
  res.send("API is live!");
});

// 🔥 Health check route (optional but recommended)
app.get("/health", (req, res) => {
  res.send("OK");
});

// 🔥 Render requires PORT from env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
