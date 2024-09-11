// src/services/api.ts
import axios from "axios";

// הגדרת ה-baseURL שלך
const api = axios.create({
  baseURL: "https://www.topmarket.com/api", // הכתובת של השרת שלך
  headers: {
    "Content-Type": "application/json",
  },
});

// דוגמה לפונקציות בקשות
export const fetchTransactions = () => api.get("/transactions");
export const addTransaction = (transaction: {
  type: string;
  amount: number;
  description: string;
}) => api.post("/transactions", transaction);
export const deleteTransaction = (id: string) =>
  api.delete(`/transactions/${id}`);

// אפשר להוסיף פונקציות נוספות לפי הצורך

export default api;
