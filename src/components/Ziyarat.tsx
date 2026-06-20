import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Mountain, Landmark } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

interface ZiyaratSite {
  id: string;
  name: string;
  name_ar?: string;
  name_ur?: string;
  name_tr?: string;
  description: string;
  description_ar?: string;
  description_ur?: string;
  description_tr?: string;
  city: string;
  category: string;
  image_url?: string;
}

const Ziyarat = () => {
  const { t, lang } = useLanguage();
  const [sites, setSites] = useState<ZiyaratSite[]>([]);

  useEffect(() => {
    const fetchSites = async () => {
      const { data } = await supabase
        .from('ziyarat_sites')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (data && data.length > 0) setSites(data);
    };
    fetchSites();
  }, []);

  const getName = (site: ZiyaratSite) => {
    if (lang === 'ar' && site.name_ar) return site.name_ar;
    if (lang === 'ur' && site.name_ur) return site.name_ur;
    if (lang === 'tr' && site.name_tr) return site.name_tr;
    return site.name;
  };

  const getDescription = (site: ZiyaratSite) => {
    if (lang === 'ar' && site.description_ar) return site.description_ar;
    if (lang === 'ur' && site.description_ur) return site.description_ur;
    if (lang === 'tr' && site.description_tr) return site.description_tr;
    return site.description;
  };

  const makkahSites = sites.filter(s => s.city === 'makkah');
  const madinahSites = sites.filter(s => s.city === 'madinah');
  const otherSites = sites.filter(s => s.city === 'other');

  const makkahDefault: ZiyaratSite[] = [
    { id: '1', name: 'Jabal Al Noor', name_ar: 'جبل النور', name_ur: 'جبل نور', name_tr: 'Nur Dağı', description: 'Mountain where the first revelation was received', city: 'makkah', category: 'mountain' },
    { id: '2', name: 'Cave Hira', name_ar: 'غار حراء', name_ur: 'غارحراء', name_tr: 'Hira Mağarası', description: 'Cave where Prophet Muhammad received the first revelation', city: 'makkah', category: 'cave' },
    { id: '3', name: 'Jabal Thawr', name_ar: 'جبل ثور', name_ur: 'جبل ثور', name_tr: 'Sevr Dağı', description: 'Mountain containing the cave where Prophet sheltered during Hijrah', city: 'makkah', category: 'mountain' },
    { id: '4', name: 'Mina', name_ar: 'منى', name_ur: 'منی', name_tr: 'Mina', description: 'Valley where pilgrims spend the night during Hajj', city: 'makkah', category: 'valley' },
    { id: '5', name: 'Muzdalifah', name_ar: 'مزدلفة', name_ur: 'مزدلفہ', name_tr: 'Müzdelife', description: 'Area where pilgrims collect pebbles for Rami', city: 'makkah', category: 'valley' },
    { id: '6', name: 'Arafat', name_ar: 'عرفات', name_ur: 'عرفات', name_tr: 'Arefe', description: 'Plain where the standing of Arafat takes place', city: 'makkah', category: 'plain' },
  ];

  const madinahDefault: ZiyaratSite[] = [
    { id: '7', name: 'Masjid Quba', name_ar: 'مسجد قباء', name_ur: 'مسجد قباء', name_tr: 'Kuba Mescidi', description: 'First mosque built in Islam', city: 'madinah', category: 'mosque' },
    { id: '8', name: 'Masjid Qiblatain', name_ar: 'مسجد القبلتين', name_ur: 'مسجد قبلتین', name_tr: 'Kıbleteyn Mescidi', description: 'Mosque where the Qibla was changed', city: 'madinah', category: 'mosque' },
    { id: '9', name: 'Jannat Al Baqi', name_ar: 'جنة البقيع', name_ur: 'جنت البقیع', name_tr: 'Cennetül Baki', description: 'Main cemetery of Madinah', city: 'madinah', category: 'cemetery' },
    { id: '10', name: 'Uhud Mountain', name_ar: 'جبل أحد', name_ur: 'جبل احد', name_tr: 'Uhud Dağı', description: 'Site of the Battle of Uhud', city: 'madinah', category: 'mountain' },
    { id: '11', name: 'Seven Mosques', name_ar: 'المساجد السبعة', name_ur: 'سات مساجد', name_tr: 'Yedi Mescit', description: 'Complex of seven small mosques', city: 'madinah', category: 'mosque' },
  ];

  const otherDefault: ZiyaratSite[] = [
    { id: '12', name: 'Taif', name_ar: 'الطائف', name_ur: 'طائف', name_tr: 'Taif', description: 'Beautiful city in the mountains', city: 'other', category: 'city' },
    { id: '13', name: 'Badr', name_ar: 'بدر', name_ur: 'بدر', name_tr: 'Bedir', description: 'Historic battle site', city: 'other', category: 'landmark' },
    { id: '14', name: 'AlUla', name_ar: 'العلا', name_ur: 'العلا', name_tr: 'ElUla', description: 'Ancient heritage site', city: 'other', category: 'landmark' },
  ];

  const displayMakkah = makkahSites.length > 0 ? makkahSites : makkahDefault;
  const displayMadinah = madinahSites.length > 0 ? madinahSites : madinahDefault;
  const displayOther = otherSites.length > 0 ? otherSites : otherDefault;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mosque': return Building;
      case 'mountain': return Mountain;
      case 'landmark':
      case 'cave':
      case 'valley':
      case 'plain':
      case 'cemetery':
        return Landmark;
      default: return MapPin;
    }
  };

  const renderSection = (title: string, sites: ZiyaratSite[], bgColor: string) => (
    <div className="mb-12">
      <h3 className={`text-xl font-bold ${bgColor} mb-5 pb-2 border-b border-white/10`}>{title}</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map((site, index) => {
          const Icon = getCategoryIcon(site.category);
          return (
            <motion.div
              key={site.id}
              className="group p-4 bg-white/3 rounded-lg border border-white/8 hover:border-[#F4C430]/20 transition-all"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#F4C430]/10 flex items-center justify-center shrink-0 group-hover:bg-[#F4C430]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#F4C430]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm mb-1">{getName(site)}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{getDescription(site)}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <section id="ziyarat" className="py-24 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#0B5D3B]/20 text-[#0B5D3B] font-medium rounded-full mb-4">
            {t.ziyarat_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.ziyarat_title}</h2>
        </motion.div>

        {renderSection(t.ziyarat_makkah, displayMakkah, 'text-[#F4C430]')}
        {renderSection(t.ziyarat_madinah, displayMadinah, 'text-[#0B5D3B]')}
        {renderSection(t.ziyarat_additional, displayOther, 'text-gray-400')}
      </div>
    </section>
  );
};

export default Ziyarat;
