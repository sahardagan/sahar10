import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import User from "./models/User"; // ודא שהנתיב נכון
import bcrypt from "bcryptjs";
import Transaction from "./models/Transaction"; // עדכן לשם הנכון של המודל

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/myfinanceapp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/users/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists.");
    }

    const user = new User({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    await user.save();
    res.status(201).send("User registered successfully.");
  } catch (error) {
    res.status(500).send("Server error.");
  }
});

app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password.");
    }

    res.status(200).send("Login successful.");
  } catch (error) {
    res.status(500).send("Server error.");
  }
});

app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find(); // ודא שיש לך את המודל של Transaction
    res.json(transactions);
  } catch (error) {
    res.status(500).send("Server error.");
  }
});

app.post("/api/transactions", async (req, res) => {
  const { type, amount, description } = req.body;

  try {
    const newTransaction = new Transaction({
      type,
      amount,
      description,
    });

    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).send("Server error.");
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
