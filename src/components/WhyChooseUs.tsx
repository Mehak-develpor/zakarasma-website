import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, Clock, Tag, Languages, Heart, Timer, Lock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const reasons = [
    { icon: ShieldCheck, title: t.reason1_title, desc: t.reason1_desc, color: '#F4C430' },
    { icon: Sparkles, title: t.reason2_title, desc: t.reason2_desc, color: '#0B5D3B' },
    { icon: Clock, title: t.reason3_title, desc: t.reason3_desc, color: '#F4C430' },
    { icon: Tag, title: t.reason4_title, desc: t.reason4_desc, color: '#0B5D3B' },
    { icon: Languages, title: t.reason5_title, desc: t.reason5_desc, color: '#F4C430' },
    { icon: Heart, title: t.reason6_title, desc: t.reason6_desc, color: '#0B5D3B' },
    { icon: Timer, title: t.reason7_title, desc: t.reason7_desc, color: '#F4C430' },
    { icon: Lock, title: t.reason8_title, desc: t.reason8_desc, color: '#0B5D3B' },
  ];

  return (
    <section id="why" className="py-24 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#0B5D3B]/20 text-[#0B5D3B] text-sm font-medium rounded-full mb-4">
            {t.why_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.why_title}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                className="group text-center p-6 bg-white/3 rounded-xl border border-white/8 hover:border-[#F4C430]/20 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 4) * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${reason.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: reason.color }} />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{reason.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{reason.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
