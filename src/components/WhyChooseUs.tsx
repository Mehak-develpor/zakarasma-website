import { motion } from 'framer-motion';
import { Shield, Car, Clock, DollarSign, Globe, Heart, CircleCheck as CheckCircle, CreditCard } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const WhyChooseUs = () => {
  const { t } = useLanguage();

  const reasons = [
    { icon: Shield, key: 'reason1', color: 'text-blue-400' },
    { icon: Car, key: 'reason2', color: 'text-emerald-400' },
    { icon: Clock, key: 'reason3', color: 'text-amber-400' },
    { icon: DollarSign, key: 'reason4', color: 'text-green-400' },
    { icon: Globe, key: 'reason5', color: 'text-purple-400' },
    { icon: Heart, key: 'reason6', color: 'text-rose-400' },
    { icon: CheckCircle, key: 'reason7', color: 'text-teal-400' },
    { icon: CreditCard, key: 'reason8', color: 'text-indigo-400' },
  ];

  return (
    <section
      id="why-us"
      className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#F4C430]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#0B5D3B]/20 text-[#0B5D3B] text-sm font-medium rounded-full mb-4">
            Why Us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.why_title}
          </h2>
          <p className="text-xl text-gray-400">{t.why_subtitle}</p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative inline-flex p-4 mb-4">
                {/* Background Circle */}
                <div className="absolute inset-0 bg-white/5 rounded-full transform rotate-45" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#F4C430]/20 to-transparent rounded-full opacity-50" />

                {/* Icon */}
                <div className="relative p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg">
                  <reason.icon className={`w-8 h-8 ${reason.color}`} />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {t[`${reason.key}_title` as keyof typeof t]}
              </h3>
              <p className="text-sm text-gray-400">
                {t[`${reason.key}_desc` as keyof typeof t]}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-300 mb-6">
            Join thousands of satisfied pilgrims who trust us for their transportation needs.
          </p>
          <a
            href="https://wa.me/966500000000?text=Assalam%20Alaikum%2C%20I%20want%20to%20book%20transportation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1DA851] transition-all shadow-lg shadow-[#25D366]/20"
          >
            <svg className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contact on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
