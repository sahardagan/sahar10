// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// טיפוס המידע של המשתמש
interface UserContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// יצירת הקשר עם ערכים ברירת מחדל
const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <UserContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
