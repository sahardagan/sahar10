// src/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import SettingsModal from "./SettingsModal";
import AddTransactionForm from "./AddTransactionForm";

const Navbar: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const openAddTransaction = () => setIsAddTransactionOpen(true);
  const closeAddTransaction = () => setIsAddTransactionOpen(false);

  return (
    <>
      <div className="flex-grow" /> {/* Creates space above the navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 text-white rtl:text-right">
        <div className="container mx-auto flex items-center justify-between">
          <span className="text-xl font-bold rtl:text-left">
            My Finance App
          </span>
          <div className="flex rtl:flex-row-reverse space-x-2 rtl:space-x-reverse">
            <button
              onClick={openAddTransaction}
              className="bg-green-500 px-4 py-2 rounded"
            >
              הוסף עסקה
            </button>
            <button
              onClick={openSettings}
              className="bg-blue-500 px-4 py-2 rounded"
            >
              הגדרות
            </button>
          </div>
        </div>
        <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
        {isAddTransactionOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center rtl:justify-center">
            <div className="bg-white p-6 rounded shadow-lg rtl:text-right">
              <AddTransactionForm />
              <button
                onClick={closeAddTransaction}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                לסגור
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
