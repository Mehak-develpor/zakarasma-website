import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Routes = () => {
  const { t, lang } = useLanguage();

  const routes = [
    { key: 'route1', distance: '100 km', duration: '1.5 hrs', price: 'SAR 250' },
    { key: 'route2', distance: '420 km', duration: '4 hrs', price: 'SAR 600' },
    { key: 'route3', distance: '420 km', duration: '4 hrs', price: 'SAR 600' },
    { key: 'route4', distance: '180 km', duration: '2.5 hrs', price: 'SAR 400' },
    { key: 'route5', distance: '30 km', duration: '3 hrs', price: 'SAR 200' },
    { key: 'route6', distance: '300 km', duration: '3 hrs', price: 'SAR 500' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="routes"
      className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Background Map Effect */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(244, 196, 48, 0.1)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Dot */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-[#F4C430]/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-[#0B5D3B]/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/2 w-4 h-4 rounded-full bg-[#F4C430]/30"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 2 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#F4C430]/10 text-[#F4C430] text-sm font-medium rounded-full mb-4">
            {t.routes}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.routes_title}
          </h2>
          <p className="text-xl text-gray-400">{t.routes_subtitle}</p>
        </motion.div>

        {/* Routes Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {routes.map((route, index) => (
            <motion.a
              key={index}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative overflow-hidden p-6 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-[#F4C430]/30 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {/* Route Line */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <MapPin className="w-8 h-8 text-[#0B5D3B]" />
                  <div className="relative">
                    <div className="w-20 h-0.5 bg-gradient-to-r from-[#0B5D3B] to-[#F4C430]" />
                    <ArrowRight
                      className={`absolute top-1/2 -translate-y-1/2 ${lang === 'ar' || lang === 'ur' ? 'right-0 rotate-180' : 'left-10'} w-4 h-4 text-[#F4C430]`}
                    />
                  </div>
                  <MapPin className="w-8 h-8 text-[#F4C430]" />
                </div>
              </div>

              {/* Route Name */}
              <h3 className="text-lg font-semibold text-white text-center mb-2 group-hover:text-[#F4C430] transition-colors">
                {t[`${route.key}_name` as keyof typeof t]}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 text-center mb-4">
                {t[`${route.key}_desc` as keyof typeof t]}
              </p>

              {/* Info */}
              <div className="flex items-center justify-between text-sm border-t border-white/10 pt-4">
                <div className="text-gray-400">
                  {route.distance}
                </div>
                <div className="flex items-center text-gray-400">
                  <Clock className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" />
                  {route.duration}
                </div>
                <div className="text-[#F4C430] font-semibold">
                  {route.price}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Note */}
        <motion.p
          className="text-center text-gray-500 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          * Prices are estimates. Contact us for exact quotes based on your requirements.
        </motion.p>
      </div>
    </section>
  );
};

export default Routes;
