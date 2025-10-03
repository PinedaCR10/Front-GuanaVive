import { useEffect, useState } from "react";

type ThemePref = "dark" | "light" | "system";
const STORAGE_KEY = "theme";

export function useTheme() {
  const [pref, setPref] = useState<ThemePref>(
    (localStorage.getItem(STORAGE_KEY) as ThemePref) || "system"
  );

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (p: ThemePref) => {
      // usamos dos mecanismos:
      // 1) clase .dark para forzar
      // 2) data-theme="system" para que las @media apliquen
      root.dataset.theme = p; // "dark" | "light" | "system"
      const isDark = p === "dark" || (p === "system" && mq.matches);
      root.classList.toggle("dark", isDark);
    };

    apply(pref);
    localStorage.setItem(STORAGE_KEY, pref);

    const onChange = () => pref === "system" && apply("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  return { pref, setPref };
}
