import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/myfinanceapp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.post("/api/users/register", async (req, res) => {
  // Registration logic
});

app.post("/api/users/login", async (req, res) => {
  // Login logic
});

app.get("/api/transactions", async (req, res) => {
  // Get transactions logic
});

app.post("/api/transactions", async (req, res) => {
  // Create transaction logic
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
