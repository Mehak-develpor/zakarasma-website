import { motion } from 'framer-motion';
import {
  Plane,
  Building,
  Users,
  MapPin,
  Car,
  Star,
  Mountain,
  Landmark,
  Heart,
  Crown,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Services = () => {
  const { t, lang } = useLanguage();

  const servicesData = [
    { icon: Users, key: 'service1', color: 'from-amber-500 to-amber-600' },
    { icon: Car, key: 'service2', color: 'from-emerald-500 to-emerald-600' },
    { icon: Plane, key: 'service3', color: 'from-blue-500 to-blue-600' },
    { icon: Plane, key: 'service4', color: 'from-indigo-500 to-indigo-600' },
    { icon: MapPin, key: 'service5', color: 'from-teal-500 to-teal-600' },
    { icon: MapPin, key: 'service6', color: 'from-cyan-500 to-cyan-600' },
    { icon: Building, key: 'service7', color: 'from-sky-500 to-sky-600' },
    { icon: Landmark, key: 'service8', color: 'from-rose-500 to-rose-600' },
    { icon: Mountain, key: 'service9', color: 'from-lime-500 to-lime-600' },
    { icon: Star, key: 'service10', color: 'from-orange-500 to-orange-600' },
    { icon: Heart, key: 'service11', color: 'from-pink-500 to-pink-600' },
    { icon: Crown, key: 'service12', color: 'from-yellow-500 to-yellow-600' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="services"
      className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#F4C430]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0B5D3B]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#F4C430]/10 text-[#F4C430] text-sm font-medium rounded-full mb-4">
            {t.services}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.services_title}
          </h2>
          <p className="text-xl text-gray-400">{t.services_subtitle}</p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {servicesData.map((service, index) => (
            <motion.a
              key={index}
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative overflow-hidden p-6 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-[#F4C430]/30 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            >
              {/* Gradient Overlay on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity`}
              />

              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} mb-4`}
              >
                <service.icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F4C430] transition-colors">
                {t[`${service.key}_title` as keyof typeof t]}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {t[`${service.key}_desc` as keyof typeof t]}
              </p>

              {/* Arrow Indicator */}
              <div className="mt-4 flex items-center text-sm text-[#F4C430] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="rtl:ml-2 ltr:mr-2">{t.learn_more}</span>
                <svg
                  className={`w-4 h-4 transform group-hover:${lang === 'ar' || lang === 'ur' ? '-translate-x-1' : 'translate-x-1'} transition-transform`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={lang === 'ar' || lang === 'ur' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
                  />
                </svg>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
