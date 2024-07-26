import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LANGUAGES_URL } from "./constants";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en-US',
    debug: true,
    ns: ['HomeScreen', 'LeftHomeMenu', 'HeaderMenu', 'LoginContainer'],  // Specify namespaces, there will be one for each component used for translation of content
    defaultNS: 'HomeScreen',
    backend: {
      loadPath: LANGUAGES_URL + '{{lng}}/{{ns}}.json',  // This is the loadpath for the translation files
    },
    detection: {
      order: ['localStorage', 'navigator'],  // First, check local storage; if empty, use browser language
      caches: ['localStorage'],  // Save detected language in local storage
    },
    react: {
      useSuspense: false,
      wait: true  // Wait for translation files before rendering components
    },
  });

export default i18n;