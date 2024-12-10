import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector/cjs";
import { initReactI18next } from "./node_modules/react-i18next";

const apiKey = "bEQnf1CiuuEZY2Z0NJf4VA";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    ns: ["default"],
    defaultNS: "default",

    supportedLngs: ["en", "mr", "hi"],

    backend: {
      loadPath: loadPath,
    },
  });
