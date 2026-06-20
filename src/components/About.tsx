import { motion } from 'framer-motion';
import { Shield, Users, Heart, Clock, Star, Crown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, title: t.about_feature1_title, desc: t.about_feature1_desc, color: '#F4C430' },
    { icon: Users, title: t.about_feature2_title, desc: t.about_feature2_desc, color: '#0B5D3B' },
    { icon: Heart, title: t.about_feature3_title, desc: t.about_feature3_desc, color: '#F4C430' },
    { icon: Clock, title: t.about_feature4_title, desc: t.about_feature4_desc, color: '#0B5D3B' },
    { icon: Star, title: t.about_feature5_title, desc: t.about_feature5_desc, color: '#F4C430' },
    { icon: Crown, title: t.about_feature6_title, desc: t.about_feature6_desc, color: '#0B5D3B' },
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left: Image + Stats */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1624056/pexels-photo-1624056.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Kaaba Makkah"
                loading="lazy"
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-4 bg-gray-900 border border-[#F4C430]/20 rounded-xl p-4 shadow-2xl">
              <div className="text-3xl font-black text-[#F4C430]">15+</div>
              <div className="text-xs text-gray-400">Years Experience</div>
            </div>
            <div className="absolute top-4 -left-4 bg-gray-900 border border-[#0B5D3B]/30 rounded-xl p-4 shadow-2xl">
              <div className="text-3xl font-black text-[#0B5D3B]">50K+</div>
              <div className="text-xs text-gray-400">Happy Pilgrims</div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-[#F4C430]/10 text-[#F4C430] text-sm font-medium rounded-full mb-4">
              {t.about_subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">{t.about_title}</h2>
            <p className="text-gray-400 leading-relaxed mb-6">{t.about_desc}</p>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-[#F4C430]/50 to-transparent" />
              <span className="text-[#F4C430] text-2xl">﷽</span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#F4C430]/50 to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="p-6 bg-white/3 rounded-xl border border-white/8 hover:border-[#F4C430]/20 group transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
