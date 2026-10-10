import React, { createContext, useContext, useEffect, useState } from "react";
import { content } from "../data/content";

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("bct-lang") || "en");
  useEffect(() => {
    localStorage.setItem("bct-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <LangContext.Provider value={{ lang, setLang, t: content[lang] }}>
      {children}
    </LangContext.Provider>
  );
}
export const useLang = () => useContext(LangContext);
