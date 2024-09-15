import React, { useState, useEffect } from "react";
import axios from "axios";

interface Transaction {
  _id: string; // שדה מזהה התנועה
  type: "income" | "expense";
  amount: number;
  description: string;
}

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    try {
      // Get the token from localStorage or other storage
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authorization token is missing");
        return;
      }

      // Add the token to the request headers
      const response = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the Authorization header
          },
        }
      );

      setTransactions(response.data); // Update state with the fetched transactions
      console.log("Transactions fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to fetch transactions. Please try again.");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(
    (transaction) => filter === "all" || transaction.type === filter
  );

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <label>
        Filter by type:
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | "income" | "expense")
          }
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <h2>Financial Summary</h2>
      <p>Total Income: {totalIncome.toFixed(2)}</p>
      <p>Total Expenses: {totalExpense.toFixed(2)}</p>
      <p>Current Balance: {balance.toFixed(2)}</p>
      <h2>Transaction List</h2>
      <ul>
        {filteredTransactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.type} - {transaction.amount} -{" "}
            {transaction.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
