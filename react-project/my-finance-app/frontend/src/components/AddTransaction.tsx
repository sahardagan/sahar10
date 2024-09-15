import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTransaction: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [type, setType] = useState<"income" | "expense">("income");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // קבלת ה-Token
      const response = await axios.post(
        "http://localhost:5000/api/transactions",
        {
          amount,
          description,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // הוספת ה-Token לכותרת הבקשה
          },
        }
      );

      console.log("Transaction added successfully:", response.data);
      toast.success("Transaction added successfully!");
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Error adding transaction.");
    }
  };

  return (
    <div className="add-transaction">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button type="submit">Add Transaction</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTransaction;
