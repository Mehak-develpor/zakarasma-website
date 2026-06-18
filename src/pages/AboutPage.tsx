import { motion } from 'framer-motion';
import { Shield, Users, HeadphonesIcon, DollarSign, Crown, Heart, Award, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const AboutPage = () => {
  const { t } = useLanguage();

  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '50K+', label: 'Happy Pilgrims' },
    { value: '100+', label: 'Luxury Vehicles' },
    { value: '24/7', label: 'Support Available' },
  ];

  const features = [
    { icon: Shield, title: 'Trusted Partner', desc: 'Licensed and insured transportation provider with years of reliable service' },
    { icon: Users, title: 'Professional Drivers', desc: 'Experienced drivers knowledgeable about all holy sites and routes' },
    { icon: Heart, title: 'Family Friendly', desc: 'Safe and comfortable travel for your entire family' },
    { icon: HeadphonesIcon, title: '24/7 Support', desc: 'Round-the-clock customer assistance in multiple languages' },
    { icon: DollarSign, title: 'Transparent Pricing', desc: 'Competitive fixed prices with no hidden charges' },
    { icon: Crown, title: 'VIP Services', desc: 'Premium luxury transportation for distinguished guests' },
  ];

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Makkah skyline"
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
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {t.about_title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your trusted partner for Hajj, Umrah, and Ziyarat transportation services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#0B5D3B]/20 to-[#F4C430]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-[#F4C430] mb-2">{stat.value}</div>
                <div className="text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Zakarasma Tour & Taxi was founded with a simple mission: to provide the most reliable, comfortable, and spiritually respectful transportation services for pilgrims visiting the holy cities of Makkah and Madinah.
                </p>
                <p>
                  With over 15 years of experience serving pilgrims from around the world, we understand the unique needs and expectations of our guests. Whether you're performing Hajj, Umrah, or visiting the sacred Islamic sites, we ensure your journey is seamless and stress-free.
                </p>
                <p>
                  Our fleet of luxury vehicles and team of professional drivers are dedicated to making your pilgrimage experience memorable for all the right reasons. We take pride in our punctuality, safety standards, and the personalized care we provide to every pilgrim.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.pexels.com/photos/1125136/pexels-photo-1125136.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Makkah at sunset"
                className="rounded-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 rtl:-right-auto rtl:-left-6 w-48 h-48 bg-[#0B5D3B]/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 rtl:-left-auto rtl:-right-6 w-32 h-32 border-2 border-[#F4C430] rounded-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.why_title}</h2>
            <p className="text-gray-300">{t.why_subtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-[#F4C430]/30 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex p-3 bg-[#F4C430]/10 rounded-lg mb-4">
                  <feature.icon className="w-6 h-6 text-[#F4C430]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-300">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-8 bg-gradient-to-br from-[#F4C430]/10 to-transparent rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Award className="w-12 h-12 text-[#F4C430] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Excellence</h3>
              <p className="text-gray-400">We strive for excellence in every aspect of our service, from vehicle maintenance to customer care.</p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-gradient-to-br from-[#0B5D3B]/10 to-transparent rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="w-12 h-12 text-[#0B5D3B] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Safety</h3>
              <p className="text-gray-400">Your safety is our top priority. All our vehicles are regularly inspected and our drivers are thoroughly vetted.</p>
            </motion.div>

            <motion.div
              className="text-center p-8 bg-gradient-to-br from-[#F4C430]/10 to-transparent rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Globe className="w-12 h-12 text-[#F4C430] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Respect</h3>
              <p className="text-gray-400">We respect all pilgrims regardless of their background, providing services that honor the sanctity of your journey.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0B5D3B]/20 to-[#F4C430]/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Our Service?</h2>
          <p className="text-gray-300 mb-8">Book your transportation with us and let us take care of the rest.</p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#F4C430] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
