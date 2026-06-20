import { Link } from 'react-router-dom';
import { MessageCircle, FileText, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { motion } from 'framer-motion';

const Hero = () => {
  const { t, lang } = useLanguage();
  const phoneNumber = '966501416110';
  const message = lang === 'ar'
    ? 'السلام عليكم، أريد حجز خدمة النقل'
    : lang === 'ur'
    ? 'السلام علیکم، میں ٹرانسپورٹ سروس بک کرنا چاہتا ہوں'
    : lang === 'tr'
    ? 'Selamünaleyküm, ulaşım hizmeti rezervasyonu yapmak istiyorum'
    : 'Assalam Alaikum, I want to book a transportation service';

  const citiesText = lang === 'ar'
    ? 'نخدم: مكة، المدينة، جدة، الرياض، الطائف، بدر، العلا، وجميع السعودية'
    : lang === 'ur'
    ? 'خدمات: مکہ، مدینہ، جددہ، ریاض، طائف، بدر، العلا اور پوری سعودی عرب میں'
    : lang === 'tr'
    ? 'Hizmet: Mekke, Medine, Cidde, Riyad, Taif, Bedir, ElUla ve tüm Suudi Arabistan'
    : 'Serving: Makkah, Madinah, Jeddah, Riyadh, Taif, Badr, AlUla & All Saudi Arabia';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/1624056/pexels-photo-1624056.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black/90" />
        {/* Islamic Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <pattern id="islamic-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M50 0 L60 35 L100 35 L68 57 L78 91 L50 70 L22 91 L32 57 L0 35 L40 35 Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#islamic-pattern)" />
          </svg>
        </div>
      </div>

      {/* Kaaba-inspired decorative elements */}
      <div className="absolute top-0 left-0 w-1/3 h-32 bg-gradient-to-r from-[#F4C430]/10 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-32 bg-gradient-to-l from-[#0B5D3B]/10 to-transparent" />

      {/* Floating Gold Elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-[#F4C430]/5 blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/3 right-10 w-40 h-40 rounded-full bg-[#0B5D3B]/5 blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#F4C430]/10 border border-[#F4C430]/30 mb-6">
            <span className="text-[#F4C430] text-sm font-medium">
              {lang === 'ar' ? 'خدمات نقل متميزة للحجاج والزوار' : lang === 'ur' ? 'حجاج اور زائرین کے لیے پریمیم ٹرانسپورٹ' : lang === 'tr' ? 'Hacılar için Premium Ulaşım Hizmetleri' : 'Premium Pilgrim Transportation Services'}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            <span className="block">{t.hero_title.split(' ').slice(0, 3).join(' ')}</span>
            <span className="block bg-gradient-to-r from-[#F4C430] via-[#e6b52e] to-[#F4C430] bg-clip-text text-transparent">
              {t.hero_title.split(' ').slice(3).join(' ')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            {t.hero_subtitle}
          </p>

          {/* Service Cities */}
          <p className="text-[#F4C430] text-sm sm:text-base mb-10 font-medium">
            {citiesText}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#F4C430] to-[#e6b52e] text-black font-semibold rounded-xl overflow-hidden shadow-lg shadow-[#F4C430]/20 hover:shadow-[#F4C430]/30 transition-all"
            >
              <span className="relative z-10">{t.cta_book}</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            </Link>

            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#25D366]/20 transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0 fill-white" />
              {t.cta_whatsapp}
            </a>

            <Link
              to="/contact"
              className="group inline-flex items-center px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-xl hover:border-[#0B5D3B] hover:bg-[#0B5D3B] transition-all"
            >
              <FileText className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
              {t.cta_quote}
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: '15+', label: lang === 'ar' ? 'سنة خبرة' : lang === 'ur' ? 'سال کا تجربہ' : lang === 'tr' ? 'Yıl Deneyim' : 'Years Experience' },
              { value: '50K+', label: lang === 'ar' ? 'حاج سعيد' : lang === 'ur' ? 'خوش حجاج' : lang === 'tr' ? 'Mutlu Hacı' : 'Happy Pilgrims' },
              { value: '100+', label: lang === 'ar' ? 'مركبة فاخرة' : lang === 'ur' ? 'لگژری گاڑیاں' : lang === 'tr' ? 'Lüks Araç' : 'Luxury Vehicles' },
              { value: '24/7', label: lang === 'ar' ? 'دعم مستمر' : lang === 'ur' ? 'مسلسل سپورٹ' : lang === 'tr' ? 'Sürekli Destek' : 'Support Available' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#F4C430]">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-8 h-8 text-[#F4C430]/50" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
