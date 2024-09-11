// src/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import SettingsModal from "./SettingsModal";

const Navbar: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  return (
    <>
      <div className="flex-grow" /> {/* This creates space above the navbar */}
      <nav className="fixed bottom-0 left-0 w-full bg-gray-800 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <span>My Finance App</span>
          <button
            onClick={openSettings}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Settings
          </button>
        </div>
        <SettingsModal isOpen={isSettingsOpen} onClose={closeSettings} />
      </nav>
    </>
  );
};

export default Navbar;
