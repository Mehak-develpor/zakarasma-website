import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import About from '../components/About';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import { useLanguage } from '../i18n/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <>
      <Hero />
      <About />

      {/* Services Preview Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 bg-[#F4C430]/10 text-[#F4C430] text-sm font-medium rounded-full mb-4">
              {t.services}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t.services_title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.services_subtitle}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Hajj Transport', desc: 'Reliable Hajj transportation', icon: '🕋' },
              { title: 'Umrah Taxi', desc: 'Comfortable Umrah rides', icon: '🕌' },
              { title: 'Airport Transfer', desc: 'Jeddah & Madinah airports', icon: '✈️' },
              { title: 'Ziyarat Tours', desc: 'Islamic historical sites', icon: '🕌' },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#F4C430]/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center text-[#F4C430] hover:underline"
            >
              View All Services
              <ArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Fleet Preview Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 bg-[#0B5D3B]/20 text-[#0B5D3B] text-sm font-medium rounded-full mb-4">
              {t.fleet}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t.fleet_title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{t.fleet_subtitle}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Toyota Camry', capacity: '4 passengers', image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'Toyota Hiace', capacity: '12 passengers', image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { name: 'GMC Yukon', capacity: '7 passengers', image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400' },
            ].map((vehicle, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden rounded-xl group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-bold text-white">{vehicle.name}</h3>
                  <p className="text-sm text-gray-300">{vehicle.capacity}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/fleet"
              className="inline-flex items-center px-6 py-3 bg-[#F4C430] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all"
            >
              View Our Fleet
              <ArrowRight className="w-4 h-4 ml-2 rtl:ml-0 rtl:mr-2" />
            </Link>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0B5D3B]/30 to-[#F4C430]/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Book Your Journey?</h2>
            <p className="text-gray-300 mb-8">Experience premium transportation with Zakarasma Tour & Taxi.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#F4C430] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all"
              >
                Book Now
              </Link>
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#25D366]/20 transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
