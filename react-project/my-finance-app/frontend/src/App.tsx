// src/App.tsx

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BottomNavbar from "./components/BottomNavbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // בדוק אם יש טוקן ב-Local Storage
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // נקה את הטוקן ונתק את המשתמש
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <SignIn setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
      </Routes>
      <BottomNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
    </Router>
  );
};

export default App;
