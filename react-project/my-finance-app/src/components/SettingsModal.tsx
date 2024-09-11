// src/components/SettingsModal.tsx
"use client";

import React from "react";
import { useLanguage } from "../contexts/LanguageContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { language, setLanguage } = useLanguage(); // ייבוא של useLanguage

  if (!isOpen) return null;

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang); // שמירה בקוקי
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl mb-4">Settings</h2>
        <div className="mb-4">
          <h3 className="text-lg">Select Language:</h3>
          <button
            onClick={() => handleLanguageChange("en")}
            disabled={language === "en"}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange("he")}
            disabled={language === "he"}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            עברית
          </button>
        </div>
        <button
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
