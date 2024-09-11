// src/components/LanguageSwitcher.tsx
"use client";

import { useLanguage } from "../contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div>
      <button
        onClick={() => handleLanguageChange("en")}
        disabled={language === "en"}
      >
        English
      </button>
      <button
        onClick={() => handleLanguageChange("he")}
        disabled={language === "he"}
      >
        עברית
      </button>
    </div>
  );
}
