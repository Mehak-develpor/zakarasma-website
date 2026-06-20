import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import Contact from '../components/Contact';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const { t } = useLanguage();

  useEffect(() => {
    document.title = `${t.contact_title} | Zakarasma Tour & Taxi`;
  }, [t]);

  return (
    <>
      <div className="pt-24 pb-6 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t.contact_title}</h1>
            <p className="text-gray-400 max-w-xl mx-auto">{t.contact_subtitle}</p>
          </motion.div>
        </div>
      </div>
      <Contact />
    </>
  );
};

export default ContactPage;
