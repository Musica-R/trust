import React, { createContext, useContext, useEffect, useMemo, useCallback, useState } from "react";
import { content } from "../data/content";

const LangContext = createContext(null);
const KEY = "bct-lang";

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY);
      return saved === "ml" || saved === "en" ? saved : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => setLang((l) => (l === "en" ? "ml" : "en")), []);

  const value = useMemo(
    () => ({ lang, setLang, toggle, t: content[lang] }),
    [lang, toggle]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);