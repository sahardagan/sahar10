// src/pages/Logout.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface LogoutProps {
  onLogout: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    navigate("/login"); // Redirect to login page after logout
  }, [onLogout, navigate]);

  return null; // This component doesn't need to render anything
};

export default Logout; // Ensure default export is here
