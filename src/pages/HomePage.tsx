import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Fleet from '../components/Fleet';
import Fares from '../components/Fares';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Ziyarat from '../components/Ziyarat';
import FAQ from '../components/FAQ';
import PaymentMethods from '../components/PaymentMethods';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

const HomePage = () => {
  const { t, lang } = useLanguage();
  const phoneNumber = '966501416110';

  useEffect(() => {
    document.title = t.site_title;
  }, [t]);

  const loadingText = lang === 'ar' ? 'احجز الآن' : lang === 'ur' ? 'ابھی بک کریں' : lang === 'tr' ? 'Rezervasyon Yap' : 'Book Now';
  const whatsappText = lang === 'ar' ? 'واتساب' : lang === 'ur' ? 'واٹس اپ' : lang === 'tr' ? 'WhatsApp' : 'WhatsApp';

  return (
    <>
      <Hero />
      <About />
      <Services />
      <Fares />
      <Fleet />
      <WhyChooseUs />
      <Testimonials />
      <Ziyarat />
      <PaymentMethods />
      <FAQ />

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#0B5D3B]/20 via-black to-[#F4C430]/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t.booking_title}
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">{t.hero_subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#F4C430] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all"
              >
                {loadingText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#25D366]/20 transition-all"
              >
                <MessageCircle className="w-5 h-5 mr-2 fill-white" />
                {whatsappText}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
