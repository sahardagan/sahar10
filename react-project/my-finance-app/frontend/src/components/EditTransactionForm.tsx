import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Transaction {
  _id: string;
  type: "income" | "expense";
  amount: number;
  description: string;
}

interface EditTransactionFormProps {
  transaction: Transaction;
  onClose: () => void;
  onUpdate: (transaction: Transaction) => void;
}

const EditTransactionForm: React.FC<EditTransactionFormProps> = ({
  transaction,
  onClose,
  onUpdate,
}) => {
  const [amount, setAmount] = useState<number>(transaction.amount);
  const [description, setDescription] = useState<string>(
    transaction.description
  );
  const [type, setType] = useState<"income" | "expense">(transaction.type);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `http://localhost:5000/api/transactions/${transaction._id}`,
        {
          amount,
          description,
          type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onUpdate(response.data);
      toast.success("התנועה עודכנה בהצלחה!");
      onClose();
    } catch (error) {
      console.error("שגיאה בעדכון התנועה:", error);
      toast.error("שגיאה בעדכון התנועה.");
    }
  };

  return (
    <div className="edit-transaction-form">
      <h2>ערוך תנועה</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="amount">סכום:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">תיאור:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">סוג:</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
            required
          >
            <option value="income">הכנסה</option>
            <option value="expense">הוצאה</option>
          </select>
        </div>
        <button type="submit">עדכן</button>
        <button type="button" onClick={onClose}>
          ביטול
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditTransactionForm;
