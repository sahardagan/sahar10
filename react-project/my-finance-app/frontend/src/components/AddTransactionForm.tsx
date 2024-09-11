// src/components/AddTransactionForm.tsx
import React, { useState } from "react";
import axios from "axios";

const AddTransactionForm: React.FC = () => {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/transactions", { type, amount, description });
      // Reset form or show success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 bg-gray-800 text-white rounded rtl"
    >
      <label className="mb-2">
        סוג:
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="block mb-2 p-2 border border-gray-600 rounded bg-gray-700 text-white"
        >
          <option value="income">הכנסה</option>
          <option value="expense">הוצאה</option>
        </select>
      </label>
      <label className="mb-2">
        סכום:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="block mb-2 p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </label>
      <label className="mb-2">
        תאור:
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block mb-2 p-2 border border-gray-600 rounded bg-gray-700 text-white"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        הוסף עסקה
      </button>
    </form>
  );
};

export default AddTransactionForm;
