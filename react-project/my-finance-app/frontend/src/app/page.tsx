// src/pages/index.tsx
import React from "react";
import Navbar from "../components/Navbar";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* משאיר מקום למנוי ל-navbar */}
      <div className="flex-grow">{/* תוכן עמוד הבית יכול ללכת כאן */}</div>
      <Navbar />
    </div>
  );
};

export default Home;
