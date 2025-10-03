// src/i18n/config.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

// Códigos de idioma estándar que expondrás en la app
const SUPPORTED = ["es", "en"] as const;

// Map a tus carpetas reales
const FOLDER_BY_LNG: Record<string, string> = {
  es: "spanish",
  en: "english",
};

i18n
  .use(LanguageDetector)
  .use(
    resourcesToBackend((lng: string, ns: string) => {
      const folder = FOLDER_BY_LNG[lng] ?? "spanish";
      // locales están en: src/i18n/locales/{english|spanish}/{ns}.json
      return import(`./locales/${folder}/${ns}.json`).then((m: any) => m.default ?? m);
    })
  )
  .use(initReactI18next)
  .init({
    fallbackLng: "es",
    supportedLngs: SUPPORTED as unknown as string[],
    defaultNS: "common", // si tienes common.json, si no, no pasa nada
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "htmlTag", "navigator"],
      caches: ["localStorage"],
    },
    react: { useSuspense: false },
  });

document.documentElement.setAttribute("lang", i18n.language || "es");
i18n.on("languageChanged", (lng) => {
  document.documentElement.setAttribute("lang", lng);
});

export default i18n;
