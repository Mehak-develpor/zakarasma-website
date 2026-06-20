import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, Plane, MapPin, Users, Building, Star, Heart, Crown, Mountain } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const iconMap: Record<string, React.ElementType> = {
  Users, Car, Plane, MapPin, Building, Star, Heart, Crown, Mountain,
  Landmark: MapPin,
};

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { icon: 'Users', title: t.service1_title, desc: t.service1_desc },
    { icon: 'Car', title: t.service2_title, desc: t.service2_desc },
    { icon: 'Plane', title: t.service3_title, desc: t.service3_desc },
    { icon: 'Plane', title: t.service4_title, desc: t.service4_desc },
    { icon: 'MapPin', title: t.service5_title, desc: t.service5_desc },
    { icon: 'MapPin', title: t.service6_title, desc: t.service6_desc },
    { icon: 'Building', title: t.service7_title, desc: t.service7_desc },
    { icon: 'Landmark', title: t.service8_title, desc: t.service8_desc },
    { icon: 'Mountain', title: t.service9_title, desc: t.service9_desc },
    { icon: 'Star', title: t.service10_title, desc: t.service10_desc },
    { icon: 'Heart', title: t.service11_title, desc: t.service11_desc },
    { icon: 'Crown', title: t.service12_title, desc: t.service12_desc },
  ];

  return (
    <section id="services" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#F4C430]/10 text-[#F4C430] text-sm font-medium rounded-full mb-4">
            {t.services_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.services_title}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Car;
            return (
              <motion.div
                key={index}
                className="group p-5 bg-white/3 rounded-xl border border-white/8 hover:border-[#F4C430]/30 hover:bg-white/5 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 bg-[#F4C430]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#F4C430]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#F4C430]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1.5">{service.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{service.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-[#F4C430] to-[#e6b52e] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all"
          >
            {t.book_now}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
