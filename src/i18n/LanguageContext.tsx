import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Language } from './translations';
import { translations } from './translations';

export type { Language };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations.en;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('zakarasma-lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('zakarasma-lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr';
  }, [lang]);

  const t = translations[lang];
  const dir = lang === 'ar' || lang === 'ur' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
