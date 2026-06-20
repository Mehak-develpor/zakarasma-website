import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';

const WhatsAppButton = () => {
  const { lang } = useLanguage();
  const phoneNumber = '966501416110';

  const messages: Record<string, string> = {
    ar: 'السلام عليكم، أريد حجز خدمة النقل',
    ur: 'السلام علیکم، میں ٹرانسپورٹ سروس بک کرنا چاہتا ہوں',
    tr: 'Selamünaleyküm, ulaşım hizmeti rezervasyonu yapmak istiyorum',
    en: 'Assalam Alaikum, I want to book a transportation service',
  };

  const tooltips: Record<string, string> = {
    ar: 'تواصل معنا',
    ur: 'ہم سے بات کریں',
    tr: 'Bize Ulaşın',
    en: 'Chat with us',
  };

  const message = messages[lang] || messages.en;
  const tooltip = tooltips[lang] || tooltips.en;

  return (
    <>
      {/* Floating WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center group"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
      >
        {/* Tooltip */}
        <span className="hidden group-hover:block absolute right-full mr-3 bg-black text-white text-xs px-4 py-2 rounded-lg shadow-lg whitespace-nowrap border border-white/10 animate-fade-in">
          {tooltip}
        </span>
        {/* Button */}
        <div className="relative w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-[#25D366]/40">
          <MessageCircle className="w-8 h-8 text-white fill-white" />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black flex items-center justify-center">
            <span className="text-[8px] text-white font-bold">1</span>
          </span>
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        </div>
      </motion.a>

      {/* Mobile Sticky Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#25D366] text-white py-3 px-4 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <a
          href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full"
        >
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="font-semibold">{lang === 'ar' ? 'تواصل عبر واتساب' : lang === 'ur' ? 'واٹس اپ سے رابطہ' : lang === 'tr' ? 'WhatsApp ile Ulaşın' : 'Chat on WhatsApp'}</span>
        </a>
      </div>
    </>
  );
};

export default WhatsAppButton;
