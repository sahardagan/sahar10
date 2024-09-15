import React, { useState, useEffect } from "react";
import TransactionList from "../components/TransactionList";
import { useNavigate } from "react-router-dom";
import { AddCircle } from "@mui/icons-material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
import "../style/Global.css";

interface DataPoint {
  name: string;
  income: number;
  expense: number;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get<DataPoint[]>(
          "http://localhost:5000/api/progress-data",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Error fetching progress data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddTransaction = () => {
    navigate("/add-transaction");
  };

  return (
    <div className="home">
      <TransactionList />
      <button onClick={handleAddTransaction}>
        <AddCircle className="icon" /> הוסף תנועה
      </button>
      {loading ? (
        <p>טוען נתונים...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="chart-container">
          <h3>גרף התקדמות:</h3>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default Home;
