import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTransaction: React.FC = () => {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/transactions", {
        type,
        amount: parseFloat(amount),
        description,
      });
      // הפניה לרשימת התנועות
      navigate("/transactions");
    } catch (error) {
      console.error("Error adding transaction:", error);
      // טיפול בשגיאה
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        סוג:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">הוצאה</option>
          <option value="income">הכנסה</option>
        </select>
      </label>
      <label>
        סכום:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </label>
      <label>
        תיאור:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">הוסף תנועה</button>
    </form>
  );
};

export default AddTransaction;
