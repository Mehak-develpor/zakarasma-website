import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Wind, Armchair, Phone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

interface Vehicle {
  id: string;
  name: string;
  name_ar: string | null;
  name_ur: string | null;
  description: string | null;
  description_ar: string | null;
  description_ur: string | null;
  capacity: number;
  luggage: number;
  image_url: string | null;
  price_per_km: number | null;
  is_available: boolean;
  sort_order: number;
}

const FleetPage = () => {
  const { t, lang } = useLanguage();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const getName = (vehicle: Vehicle) => {
    if (lang === 'ar') return vehicle.name_ar || vehicle.name;
    if (lang === 'ur') return vehicle.name_ur || vehicle.name;
    return vehicle.name;
  };

  const getDescription = (vehicle: Vehicle) => {
    if (lang === 'ar') return vehicle.description_ar || vehicle.description;
    if (lang === 'ur') return vehicle.description_ur || vehicle.description;
    return vehicle.description;
  };

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury Vehicles"
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
              {t.fleet}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {t.fleet_title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.fleet_subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-[#F4C430] border-t-transparent rounded-full mx-auto" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#F4C430]/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={vehicle.image_url || 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      alt={getName(vehicle)}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                      <span className="px-3 py-1 bg-[#F4C430] text-black text-xs font-semibold rounded-full">
                        Premium
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F4C430] transition-colors">
                      {getName(vehicle)}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {getDescription(vehicle)}
                    </p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-300">
                        <Users className="w-4 h-4 text-[#F4C430]" />
                        <span>{t.vehicle_capacity}: {vehicle.capacity}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-300">
                        <Briefcase className="w-4 h-4 text-[#F4C430]" />
                        <span>{t.vehicle_luggage}: {vehicle.luggage}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-300">
                        <Wind className="w-4 h-4 text-[#0B5D3B]" />
                        <span>{t.vehicle_ac}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-300">
                        <Armchair className="w-4 h-4 text-[#0B5D3B]" />
                        <span>{t.vehicle_seats}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a
                        href="/contact"
                        className="flex-1 inline-flex justify-center items-center px-4 py-3 bg-[#F4C430] text-black font-medium rounded-xl hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all"
                      >
                        {t.book_now}
                      </a>
                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedVehicle(null)}>
          <motion.div
            className="relative max-w-2xl w-full bg-gray-900 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64">
              <img
                src={selectedVehicle.image_url || 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg'}
                alt={getName(selectedVehicle)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">{getName(selectedVehicle)}</h3>
              <p className="text-gray-300 mb-6">{getDescription(selectedVehicle)}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-[#F4C430]">{selectedVehicle.capacity}</div>
                  <div className="text-sm text-gray-400">{t.vehicle_capacity}</div>
                </div>
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-[#F4C430]">{selectedVehicle.luggage}</div>
                  <div className="text-sm text-gray-400">{t.vehicle_luggage}</div>
                </div>
              </div>

              <a
                href="/contact"
                className="block w-full text-center px-6 py-4 bg-[#F4C430] text-black font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Book This Vehicle
              </a>
            </div>
            <button
              onClick={() => setSelectedVehicle(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0B5D3B]/20 to-[#F4C430]/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Need a Different Vehicle?</h2>
          <p className="text-gray-300 mb-8">Contact us for custom vehicle arrangements and special requests.</p>
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
      </section>
    </div>
  );
};

export default FleetPage;
