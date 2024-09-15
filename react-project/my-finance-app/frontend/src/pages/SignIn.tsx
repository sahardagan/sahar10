// src/pages/SignIn.tsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the props type
interface SignInProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<SignInProps> = ({ setIsAuthenticated }) => {
  // Initialize form state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Initialize navigate for redirection
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send sign-in request to the server
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      // Store token and update authentication state
      localStorage.setItem("authToken", response.data.token);
      setIsAuthenticated(true);
      toast.success("Sign-in successful!");

      // Redirect to profile page
      navigate("/profile");
    } catch (error) {
      // Handle errors (e.g., invalid credentials)
      toast.error("Sign-in failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
