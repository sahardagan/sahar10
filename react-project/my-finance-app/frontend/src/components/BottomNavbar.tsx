import React from "react";
import { Link, useNavigate } from "react-router-dom";

interface BottomNavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({
  isAuthenticated,
  onLogout,
}) => {
  const navigate = useNavigate();

  const styles: React.CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-around",
    padding: "10px",
    backgroundColor: "#ffffff", // Background color for navbar
    boxShadow: "0 -1px 5px rgba(0,0,0,0.1)",
    borderTop: "1px solid #ddd", // Add a border to define the navbar better
  };

  return (
    <nav style={styles}>
      <button onClick={() => navigate("/")} style={buttonStyles}>
        Home
      </button>
      {!isAuthenticated ? (
        <>
          <Link to="/signin" style={linkStyles}>
            התחבר
          </Link>
          <Link to="/signup" style={linkStyles}>
            הירשם
          </Link>
        </>
      ) : (
        <>
          <button onClick={onLogout} style={buttonStyles}>
            התנתק
          </button>
          <button onClick={() => navigate("/profile")} style={buttonStyles}>
            פרופיל
          </button>
        </>
      )}
    </nav>
  );
};

const linkStyles: React.CSSProperties = {
  textDecoration: "none",
  color: "#2C3E50",
  fontSize: "16px",
};

const buttonStyles: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#2C3E50",
  cursor: "pointer",
  fontSize: "16px",
};

export default BottomNavbar;
