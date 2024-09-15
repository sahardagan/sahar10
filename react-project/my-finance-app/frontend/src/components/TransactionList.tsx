import React, { useState, useEffect } from "react";
import axios from "axios";

interface Transaction {
  id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
}

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");

  const fetchTransactions = async () => {
    try {
      const response = await axios.get<Transaction[]>(
        "http://localhost:5000/api/transactions"
      );
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // טיפול בשגיאה
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []); // התעדכן רק פעם אחת עם רכיב טוען

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
      <label>
        סנן לפי סוג:
        <select
          onChange={(e) =>
            setFilter(e.target.value as "all" | "income" | "expense")
          }
        >
          <option value="all">הכל</option>
          <option value="income">הכנסות</option>
          <option value="expense">הוצאות</option>
        </select>
      </label>
      <h2>סיכום כספי</h2>
      <p>סך ההכנסות: {totalIncome}</p>
      <p>סך ההוצאות: {totalExpense}</p>
      <p>יתרה נוכחית: {balance}</p>
      <h2>רשימת תנועות</h2>
      <ul>
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.type} - {transaction.amount} -{" "}
            {transaction.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
