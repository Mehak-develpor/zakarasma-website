import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

interface Fare {
  id: string;
  route_name: string;
  route_name_ar?: string;
  route_name_ur?: string;
  route_name_tr?: string;
  from_location: string;
  to_location: string;
  price_min: number;
  price_max: number;
  currency: string;
  vehicle_category: string;
  is_popular: boolean;
}

const Fares = () => {
  const { t, lang } = useLanguage();
  const [fares, setFares] = useState<Fare[]>([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data: faresData } = await supabase
        .from('fares')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (faresData) setFares(faresData);

      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', `fare_notice_${lang === 'en' ? 'en' : lang}`);
      if (settingsData && settingsData[0]) setNotice(settingsData[0].value);
    };
    fetchData();
  }, [lang]);

  const getRouteName = (fare: Fare) => {
    if (lang === 'ar' && fare.route_name_ar) return fare.route_name_ar;
    if (lang === 'ur' && fare.route_name_ur) return fare.route_name_ur;
    if (lang === 'tr' && fare.route_name_tr) return fare.route_name_tr;
    return fare.route_name;
  };

  const defaultFares: Fare[] = [
    { id: '1', route_name: 'Madinah Airport → Hotel', from_location: 'Madinah Airport', to_location: 'Hotel', price_min: 150, price_max: 200, currency: 'SAR', vehicle_category: 'sedan', is_popular: true },
    { id: '2', route_name: 'Makkah Airport → Hotel', from_location: 'Makkah Airport', to_location: 'Hotel', price_min: 250, price_max: 250, currency: 'SAR', vehicle_category: 'sedan', is_popular: true },
    { id: '3', route_name: 'Jeddah Airport → Hotel', from_location: 'Jeddah Airport', to_location: 'Hotel', price_min: 250, price_max: 250, currency: 'SAR', vehicle_category: 'sedan', is_popular: true },
    { id: '4', route_name: 'Riyadh → Makkah', from_location: 'Riyadh', to_location: 'Makkah', price_min: 1000, price_max: 1000, currency: 'SAR', vehicle_category: 'suv', is_popular: true },
    { id: '5', route_name: 'Riyadh → Madinah', from_location: 'Riyadh', to_location: 'Madinah', price_min: 1000, price_max: 1000, currency: 'SAR', vehicle_category: 'suv', is_popular: true },
    { id: '6', route_name: 'Madinah Ziyarat', from_location: 'Madinah', to_location: 'Ziyarat Sites', price_min: 250, price_max: 250, currency: 'SAR', vehicle_category: 'van', is_popular: true },
    { id: '7', route_name: 'Madinah → Jeddah', from_location: 'Madinah', to_location: 'Jeddah', price_min: 450, price_max: 450, currency: 'SAR', vehicle_category: 'sedan', is_popular: true },
    { id: '8', route_name: 'Madinah → Makkah', from_location: 'Madinah', to_location: 'Makkah', price_min: 500, price_max: 500, currency: 'SAR', vehicle_category: 'sedan', is_popular: true },
  ];

  const displayFares = fares.length > 0 ? fares : defaultFares;

  return (
    <section id="fares" className="py-24 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#0B5D3B]/20 text-[#0B5D3B] font-medium rounded-full mb-4">
            {t.routes_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.routes_title}</h2>
        </motion.div>

        {/* Fares Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayFares.map((fare, index) => (
            <motion.div
              key={fare.id}
              className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/10 overflow-hidden hover:border-[#F4C430]/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {fare.is_popular && (
                <div className="absolute top-0 right-0 bg-[#F4C430] text-black text-xs font-semibold px-2 py-0.5 rounded-bl">
                  Popular
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F4C430]/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-[#F4C430]" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{getRouteName(fare)}</h3>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#F4C430] text-2xl font-bold">
                      {fare.price_min === fare.price_max
                        ? fare.price_min
                        : `${fare.price_min}–${fare.price_max}`}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">{fare.currency}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5">
                  <span className="text-gray-500 text-xs">
                    {lang === 'ar' ? 'الفئة:' : lang === 'ur' ? 'زمرہ:' : lang === 'tr' ? 'Kategori:' : 'Category:'}
                    <span className="text-gray-400 ml-1">{fare.vehicle_category}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Notice */}
        <motion.div
          className="mt-10 p-4 bg-[#F4C430]/5 border border-[#F4C430]/20 rounded-xl flex items-start gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Info className="w-5 h-5 text-[#F4C430] shrink-0 mt-0.5" />
          <p className="text-gray-300 text-sm">
            {notice || t.fare_notice}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Fares;
