import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Luggage, Wind, Armchair } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

interface Vehicle {
  id: string;
  name: string;
  name_ar?: string;
  name_ur?: string;
  name_tr?: string;
  description?: string;
  description_ar?: string;
  description_ur?: string;
  description_tr?: string;
  capacity: number;
  luggage: number;
  image_url?: string;
  price_per_km?: number;
  is_available: boolean;
}

const Fleet = () => {
  const { t, lang } = useLanguage();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_available', true)
        .order('sort_order');
      if (data && data.length > 0) setVehicles(data);
    };
    fetchVehicles();
  }, []);

  const getName = (vehicle: Vehicle) => {
    if (lang === 'ar' && vehicle.name_ar) return vehicle.name_ar;
    if (lang === 'ur' && vehicle.name_ur) return vehicle.name_ur;
    if (lang === 'tr' && vehicle.name_tr) return vehicle.name_tr;
    return vehicle.name;
  };

  const getDescription = (vehicle: Vehicle) => {
    if (lang === 'ar' && vehicle.description_ar) return vehicle.description_ar;
    if (lang === 'ur' && vehicle.description_ur) return vehicle.description_ur;
    if (lang === 'tr' && vehicle.description_tr) return vehicle.description_tr;
    return vehicle.description;
  };

  const defaultVehicles: Vehicle[] = [
    { id: '1', name: 'Hyundai H1', name_ar: 'هيونداي H1', name_ur: 'ہیونڈئے H1', name_tr: 'Hyundai H1', description: 'Comfortable van for families', description_ar: 'مركبة مريحة للعائلات', description_ur: 'فیملیز کے لیے آرام دہ وین', description_tr: 'Aileler için konforlu minibüs', capacity: 8, luggage: 4, is_available: true },
    { id: '2', name: 'Hyundai Staria', name_ar: 'هيونداي ستاريا', name_ur: 'ہیونڈئے ستاریا', name_tr: 'Hyundai Staria', description: 'Modern MPV with spacious interior', description_ar: 'MPV عصري بمساحة واسعة', description_ur: 'وسیع اندرونی حصے والا جدید MPV', description_tr: 'Geniş iç mekanlı modern MPV', capacity: 7, luggage: 4, is_available: true },
    { id: '3', name: 'Hyundai Starex', name_ar: 'هيونداي ستاركس', name_ur: 'ہیونڈئے ستارکس', name_tr: 'Hyundai Starex', description: 'Spacious van for groups', description_ar: 'مركبة واسعة للمجموعات', description_ur: 'گروپس کے لیے وسیع وین', description_tr: 'Gruplar için geniş minibüs', capacity: 9, luggage: 5, is_available: true },
    { id: '4', name: 'Toyota Hiace', name_ar: 'تويوتا هايس', name_ur: 'ٹویوٹا ہائیس', name_tr: 'Toyota Hiace', description: 'Popular van for group transportation', description_ar: 'حافلة شعبية للمجموعات', description_ur: 'گروپ ٹرانسپورٹ کے لیے مقبول وین', description_tr: 'Grup ulaşımı için popüler minibüs', capacity: 12, luggage: 8, is_available: true },
    { id: '5', name: 'Toyota High Roof', name_ar: 'تويوتا هاي روف', name_ur: 'ٹویوٹا ہائی روف', name_tr: 'Toyota High Roof', description: 'High roof van for comfort', description_ar: 'مركبة عالية السقف للراحة', description_ur: 'آرام کے لیے ہائی روف وین', description_tr: 'Konfor için yüksek tavanlı minibüs', capacity: 10, luggage: 6, is_available: true },
    { id: '6', name: 'Sedan', name_ar: 'سيدان', name_ur: 'سیدان', name_tr: 'Sedan', description: 'Premium sedan for executives', description_ar: 'سيدان فاخرة للمدراء', description_ur: 'ایگزیکٹوز کے لیے پریمیم سیدان', description_tr: 'Yöneticiler için premium sedan', capacity: 4, luggage: 2, is_available: true },
    { id: '7', name: 'SUV', name_ar: 'SUV', name_ur: 'SUV', name_tr: 'SUV', description: 'Luxury SUV for comfort', description_ar: 'SUV فاخرة للراحة', description_ur: 'آرام کے لیے لگژری SUV', description_tr: 'Konfor için lüks SUV', capacity: 6, luggage: 4, is_available: true },
    { id: '8', name: 'GMC', name_ar: 'GMC', name_ur: 'GMC', name_tr: 'GMC', description: 'Premium GMC vehicles', description_ar: 'مركبات GMC فاخرة', description_ur: 'پریمیم GMC گاڑیاں', description_tr: 'Premium GMC araçlar', capacity: 7, luggage: 5, is_available: true },
    { id: '9', name: 'Coaster', name_ar: 'كوستر', name_ur: 'کوستر', name_tr: 'Coaster', description: 'Large bus for group tours', description_ar: 'حافلة كبيرة للجولات الجماعية', description_ur: 'گروپ ٹورز کے لیے بڑی بس', description_tr: 'Grup turları için büyük otobüs', capacity: 25, luggage: 15, is_available: true },
  ];

  const displayVehicles = vehicles.length > 0 ? vehicles : defaultVehicles;

  const getTag = (capacity: number): { label: string; color: string } => {
    if (capacity <= 4) return { label: lang === 'ar' ? 'اقتصادية' : lang === 'ur' ? 'اکانومی' : lang === 'tr' ? 'Ekonomik' : 'Economy', color: 'bg-blue-500/20 text-blue-400' };
    if (capacity <= 8) return { label: lang === 'ar' ? 'عائلية' : lang === 'ur' ? 'فیملی' : lang === 'tr' ? 'Aile' : 'Family', color: 'bg-[#0B5D3B]/20 text-[#0B5D3B]' };
    if (capacity <= 15) return { label: lang === 'ar' ? 'مجموعة' : lang === 'ur' ? 'گروپ' : lang === 'tr' ? 'Grup' : 'Group', color: 'bg-orange-500/20 text-orange-400' };
    return { label: lang === 'ar' ? 'حافلة' : lang === 'ur' ? 'بس' : lang === 'tr' ? 'Otobüs' : 'Bus', color: 'bg-purple-500/20 text-purple-400' };
  };

  return (
    <section id="fleet" className="py-24 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#0B5D3B]/20 text-[#0B5D3B] text-sm font-medium rounded-full mb-4">
            {t.fleet_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.fleet_title}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayVehicles.map((vehicle, index) => {
            const tag = getTag(vehicle.capacity);
            return (
              <motion.div
                key={vehicle.id}
                className="group bg-white/3 rounded-xl border border-white/8 overflow-hidden hover:border-[#F4C430]/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="relative overflow-hidden h-40">
                  {vehicle.image_url ? (
                    <img
                      src={vehicle.image_url}
                      alt={getName(vehicle)}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <Users className="w-12 h-12 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full ${tag.color}`}>
                    {tag.label}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm mb-1">{getName(vehicle)}</h3>
                  <p className="text-gray-400 text-xs mb-3 line-clamp-2">{getDescription(vehicle)}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Users className="w-3.5 h-3.5 text-[#F4C430]" />
                      {vehicle.capacity} {t.passengers}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Luggage className="w-3.5 h-3.5 text-[#F4C430]" />
                      {vehicle.luggage} {t.vehicle_luggage}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Wind className="w-3.5 h-3.5 text-[#0B5D3B]" />
                      {t.vehicle_ac}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Armchair className="w-3.5 h-3.5 text-[#0B5D3B]" />
                      {t.vehicle_seats}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Fleet;
