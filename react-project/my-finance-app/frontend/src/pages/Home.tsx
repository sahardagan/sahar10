import React from "react";
import TransactionList from "../components/TransactionList";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleAddTransaction = () => {
    navigate("/add-transaction"); // יכוון אותך לדף ההוספה
  };

  return (
    <div>
      <button onClick={handleAddTransaction}>הוסף תנועה</button>
      <TransactionList />
    </div>
  );
};

export default Home;
