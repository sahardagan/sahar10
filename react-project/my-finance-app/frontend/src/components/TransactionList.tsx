import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Global.css"; // ייבוא קובץ ה-CSS

interface Transaction {
  _id: string;
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
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(response.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("שגיאה בעת שליפת העסקאות.");
      toast.error("שגיאה בעת שליפת העסקאות.");
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

  const handleEdit = async (transactionId: string) => {
    const newAmount = prompt("הכנס סכום חדש:");
    const newDescription = prompt("הכנס תיאור חדש (השאר ריק אם אין שינוי):");

    if (newAmount) {
      try {
        await axios.put(
          `http://localhost:5000/api/transactions/${transactionId}`,
          {
            amount: parseFloat(newAmount),
            ...(newDescription ? { description: newDescription } : {}),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction._id === transactionId
              ? {
                  ...transaction,
                  amount: parseFloat(newAmount),
                  description: newDescription || transaction.description,
                }
              : transaction
          )
        );
        toast.success("העסקה עודכנה בהצלחה!");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("שגיאה בעת עדכון העסקה.");
      }
    } else {
      toast.error("אנא ספק סכום תקף.");
    }
  };

  const handleDelete = async (transactionId: string) => {
    if (window.confirm("האם אתה בטוח שברצונך למחוק את העסקה הזו?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/transactions/${transactionId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        setTransactions((prevTransactions) =>
          prevTransactions.filter(
            (transaction) => transaction._id !== transactionId
          )
        );
        toast.success("העסקה נמחקה בהצלחה!");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("שגיאה בעת מחיקת העסקה.");
      }
    }
  };

  return (
    <div className="transaction-list">
      {error && <div>{error}</div>}
      <label>
        סנן לפי סוג:
        <select
          onChange={(e) =>
            setFilter(e.target.value as "all" | "income" | "expense")
          }
          value={filter}
        >
          <option value="all">הכול</option>
          <option value="income">הכנסות</option>
          <option value="expense">הוצאות</option>
        </select>
      </label>
      <h2>סיכום פיננסי</h2>
      <p>סה"כ הכנסות: {totalIncome.toFixed(2)}</p>
      <p>סה"כ הוצאות: {totalExpense.toFixed(2)}</p>
      <p>מאזן נוכחי: {balance.toFixed(2)}</p>
      <h2>רשימת עסקאות</h2>
      <ul>
        {filteredTransactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.type} - {transaction.amount} -{" "}
            {transaction.description}
            <button onClick={() => handleEdit(transaction._id)}>ערוך</button>
            <button onClick={() => handleDelete(transaction._id)}>מחק</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default TransactionList;
