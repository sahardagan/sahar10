import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC<{ setIsAuthenticated: (auth: boolean) => void }> = ({
  setIsAuthenticated,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // ניסיון להתחבר עם נתוני המשתמש
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      // הנחה שהטוקן מגיע בתשובה מהשרת
      const token: string = response.data.token; // שנה את זה בהתאם למבנה התשובה שלך
      localStorage.setItem("authToken", token);

      // עדכון ה-state עם הצלחה והפניית המשתמש
      setIsAuthenticated(true);
      navigate("/"); // הפנייה לדף הבית
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // טיפול בשגיאות והצגת הודעת שגיאה למשתמש
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
