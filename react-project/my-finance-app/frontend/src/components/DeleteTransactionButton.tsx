// src/components/DeleteTransactionButton.tsx
import React from "react";
import axios from "axios";

interface DeleteTransactionButtonProps {
  transactionId: string;
  onDelete: () => void;
}

const DeleteTransactionButton: React.FC<DeleteTransactionButtonProps> = ({
  transactionId,
  onDelete,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/transactions/${transactionId}`);
      onDelete(); // Update UI after successful delete
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleDelete}>Delete Transaction</button>;
};

export default DeleteTransactionButton;
