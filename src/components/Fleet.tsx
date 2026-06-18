import { motion } from 'framer-motion';
import { Users, Briefcase, Wind, Armchair } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Fleet: React.FC = () => {
  const { t } = useLanguage();

  const vehicles = [
    {
      key: 'vehicle1',
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '4',
      luggage: '2',
    },
    {
      key: 'vehicle2',
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '7',
      luggage: '4',
    },
    {
      key: 'vehicle3',
      image: 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '12',
      luggage: '8',
    },
    {
      key: 'vehicle4',
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '7',
      luggage: '5',
    },
    {
      key: 'vehicle5',
      image: 'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '8',
      luggage: '6',
    },
    {
      key: 'vehicle6',
      image: 'https://images.pexels.com/photos/2116995/pexels-photo-2116995.jpeg?auto=compress&cs=tinysrgb&w=600',
      capacity: '7',
      luggage: '6',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="fleet"
      className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGM5Ljk0MSAwIDE4LTguMDU5IDE4LTE4cy04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNHMxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
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
            {t.fleet}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.fleet_title}
          </h2>
          <p className="text-xl text-gray-400">{t.fleet_subtitle}</p>
        </motion.div>

        {/* Vehicles Grid */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.key}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#F4C430]/30 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={vehicle.image}
                  alt={t[`${vehicle.key}_name` as keyof typeof t]}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                  <span className="px-3 py-1 bg-[#F4C430] text-black text-xs font-semibold rounded-full">
                    Premium
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F4C430] transition-colors">
                  {t[`${vehicle.key}_name` as keyof typeof t]}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {t[`${vehicle.key}_desc` as keyof typeof t]}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3">
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

                {/* Book Button */}
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="mt-4 w-full inline-flex justify-center items-center px-4 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-[#F4C430] hover:text-black hover:border-[#F4C430] transition-all"
                  whileTap={{ scale: 0.98 }}
                >
                  {t.book_now}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Fleet;
