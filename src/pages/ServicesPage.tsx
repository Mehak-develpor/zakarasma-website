import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Building, Users, MapPin, Car, Star, Mountain, Landmark, Heart, Crown, Phone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Car,
  Plane,
  MapPin,
  Building,
  Landmark,
  Mountain,
  Star,
  Heart,
  Crown,
};

interface Service {
  id: string;
  title: string;
  title_ar: string | null;
  title_ur: string | null;
  description: string | null;
  description_ar: string | null;
  description_ur: string | null;
  icon: string | null;
  is_active: boolean;
  sort_order: number;
}

const ServicesPage = () => {
  const { t, lang } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = (service: Service) => {
    if (lang === 'ar') return service.title_ar || service.title;
    if (lang === 'ur') return service.title_ur || service.title;
    return service.title;
  };

  const getDescription = (service: Service) => {
    if (lang === 'ar') return service.description_ar || service.description;
    if (lang === 'ur') return service.description_ur || service.description;
    return service.description;
  };

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1624056/pexels-photo-1624056.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Masjid al-Haram"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-[#F4C430]/10 text-[#F4C430] text-sm font-medium rounded-full mb-4">
              {t.services}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {t.services_title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.services_subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-[#F4C430] border-t-transparent rounded-full mx-auto" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const Icon = iconMap[service.icon || 'Users'] || Users;
                return (
                  <motion.a
                    key={service.id}
                    href="/contact"
                    className="group relative overflow-hidden p-6 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 hover:border-[#F4C430]/30 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[#F4C430] to-[#e6b52e] mb-4">
                      <Icon className="w-6 h-6 text-black" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#F4C430] transition-colors">
                      {getTitle(service)}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {getDescription(service)}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-[#F4C430] opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="rtl:ml-2 ltr:mr-2">{t.learn_more}</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={lang === 'ar' || lang === 'ur' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                      </svg>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0B5D3B]/20 to-[#F4C430]/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book Your Ride?</h2>
          <p className="text-gray-300 mb-8">Contact us now for a personalized quote and experience premium transportation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#F4C430] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all"
            >
              {t.cta_quote}
            </a>
            <a
              href="https://wa.me/966500000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#25D366]/20 transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              {t.cta_whatsapp}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
