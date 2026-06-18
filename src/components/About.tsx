import { motion } from 'framer-motion';
import { Shield, Users, Headphones as HeadphonesIcon, DollarSign, Crown, Heart } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const About = () => {
  const { t, lang } = useLanguage();

  const features = [
    { icon: Shield, key: 'about_feature1' },
    { icon: Users, key: 'about_feature2' },
    { icon: Heart, key: 'about_feature3' },
    { icon: HeadphonesIcon, key: 'about_feature4' },
    { icon: DollarSign, key: 'about_feature5' },
    { icon: Crown, key: 'about_feature6' },
  ];

  return (
    <section id="about" className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#F4C430]/10 text-[#F4C430] text-sm font-medium rounded-full mb-4">
            About Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.about_title}
          </h2>
          <p className="text-xl text-[#F4C430]">{t.about_subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: lang === 'ar' || lang === 'ur' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Makkah skyline"
                className="w-full h-[400px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6">
                <div className="px-6 py-4 bg-[#0B5D3B] rounded-xl">
                  <div className="text-3xl font-bold text-white">15+</div>
                  <div className="text-sm text-white/80">Years of Excellence</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 rtl:-right-auto rtl:-left-4 w-24 h-24 border-2 border-[#F4C430] rounded-2xl" />
            <div className="absolute -bottom-4 -left-4 rtl:-left-auto rtl:-right-4 w-32 h-32 bg-[#F4C430]/10 rounded-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'ar' || lang === 'ur' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {t.about_desc}
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#F4C430]/30 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="p-2 bg-[#F4C430]/10 rounded-lg group-hover:bg-[#F4C430]/20 transition-colors">
                      <feature.icon className="w-5 h-5 text-[#F4C430]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        {t[`${feature.key}_title` as keyof typeof t]}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {t[`${feature.key}_desc` as keyof typeof t]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
