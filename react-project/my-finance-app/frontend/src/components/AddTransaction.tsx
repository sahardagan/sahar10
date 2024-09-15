import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { AttachMoney, Description, Category } from "@mui/icons-material";
import "../style/Global.css"; // ייבוא קובץ ה-CSS

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
      toast.success("התנועה נוספה בהצלחה!");
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("שגיאה בהוספת התנועה.");
    }
  };

  return (
    <div className="add-transaction">
      <h2>הוסף תנועה חדשה</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="amount">סכום</InputLabel>
          <TextField
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              ),
            }}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel htmlFor="description">תיאור</InputLabel>
          <TextField
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              ),
            }}
            required
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="type-label">סוג</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value as "income" | "expense")}
            startAdornment={
              <InputAdornment position="start">
                <Category />
              </InputAdornment>
            }
          >
            <MenuItem value="income">הכנסה</MenuItem>
            <MenuItem value="expense">הוצאה</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          הוסף תנועה
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddTransaction;
