import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    phone: '',
    whatsapp: '',
    pickup: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    vehicle: 'camry',
    message: '',
  });

  const vehicleOptions = [
    { value: 'camry', label: t.vehicle1_name },
    { value: 'staria', label: t.vehicle2_name },
    { value: 'hiace', label: t.vehicle3_name },
    { value: 'yukon', label: t.vehicle4_name },
    { value: 'tahoe', label: t.vehicle5_name },
    { value: 'vclass', label: t.vehicle6_name },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Assalam Alaikum!

New Booking Request:
-----------------
Name: ${formData.name}
Country: ${formData.country}
Phone: ${formData.phone}
WhatsApp: ${formData.whatsapp}
Pickup: ${formData.pickup}
Destination: ${formData.destination}
Date: ${formData.date}
Time: ${formData.time}
Passengers: ${formData.passengers}
Vehicle: ${vehicleOptions.find((v) => v.value === formData.vehicle)?.label}

Message: ${formData.message}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/966500000000?text=${encodedMessage}`, '_blank');
  };

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0B5D3B]/10 to-transparent" />
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
            {t.contact}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact_title}
          </h2>
          <p className="text-xl text-gray-400">{t.contact_subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/966500000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center p-6 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl hover:bg-[#25D366] transition-all"
              >
                <div className="p-4 bg-[#25D366] rounded-xl group-hover:bg-white transition-colors">
                  <MessageCircle className="w-6 h-6 text-white group-hover:text-[#25D366]" />
                </div>
                <div className="ml-4 rtl:ml-0 rtl:mr-4 rtl:text-right">
                  <h3 className="text-lg font-semibold text-white group-hover:text-white">
                    {t.contact_whatsapp}
                  </h3>
                  <p className="text-[#25D366] group-hover:text-white/80">+966 50 000 0000</p>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href="tel:+966500000000"
                className="group flex items-center p-6 bg-white/5 border border-white/10 rounded-xl hover:border-[#F4C430]/30 transition-all"
              >
                <div className="p-4 bg-[#F4C430] rounded-xl">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div className="ml-4 rtl:ml-0 rtl:mr-4 rtl:text-right">
                  <h3 className="text-lg font-semibold text-white">{t.contact_call}</h3>
                  <p className="text-gray-400 group-hover:text-[#F4C430]">+966 50 000 0000</p>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:info@zakarasma.com"
                className="group flex items-center p-6 bg-white/5 border border-white/10 rounded-xl hover:border-[#0B5D3B]/30 transition-all"
              >
                <div className="p-4 bg-[#0B5D3B] rounded-xl">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4 rtl:ml-0 rtl:mr-4 rtl:text-right">
                  <h3 className="text-lg font-semibold text-white">{t.contact_email}</h3>
                  <p className="text-gray-400 group-hover:text-[#0B5D3B]">info@zakarasma.com</p>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-start p-6 bg-white/5 border border-white/10 rounded-xl">
                <div className="p-4 bg-white/10 rounded-xl">
                  <MapPin className="w-6 h-6 text-[#F4C430]" />
                </div>
                <div className="ml-4 rtl:ml-0 rtl:mr-4 rtl:text-right">
                  <h3 className="text-lg font-semibold text-white">{t.contact_location}</h3>
                  <p className="text-gray-400">Makkah, Al Madinah Region</p>
                  <p className="text-gray-400">Saudi Arabia</p>
                </div>
              </div>

              {/* Google Map */}
              <div className="overflow-hidden rounded-xl border border-white/10">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d928800!2d39.8!3d21.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3c7f2d3d3d3d3%3A0x3d3d3d3d3d3d3d3d!2sMakkah%2C%20Saudi%20Arabia!5e0!3m2!1sen!2s!4v1234567890123"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">{t.booking_title}</h3>

              <form onSubmit={handleSubmitWhatsApp} className="space-y-4">
                {/* Name & Country */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.form_name} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#F4C430] focus:outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.form_country} *</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#F4C430] focus:outline-none transition-colors"
                      placeholder="Your country"
                    />
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.form_phone}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#F4C430] focus:outline-none transition-colors"
                      placeholder="+1 234 567 890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.form_whatsapp} *</label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#F4C430] focus:outline-none transition-colors"
                      placeholder="+966 50 000 0000"
                    />
                  </div>
                </div>

                {/* Pickup & Destination */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.form_pickup} *</label>
                    <input
                      type="text"
                      name="pickup"
                      value={formData.pickup}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#F4C430] focus:outline-none transition-colors"
                      placeholder="Pickup location"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.form_destination} *</label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#F4C430] focus:outline-none transition-colors"
                      placeholder="Drop-off location"
                    />
                  </div>
                </div>

                {/* Date, Time, Passengers */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.form_date} *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#F4C430] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.booking_time} *</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#F4C430] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">{t.booking_passengers}</label>
                    <select
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#F4C430] focus:outline-none transition-colors"
                    >
                      {[...Array(12)].map((_, i) => (
                        <option key={i} value={i + 1} className="bg-gray-900">
                          {i + 1} {t.passengers}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t.booking_vehicle}</label>
                  <select
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#F4C430] focus:outline-none transition-colors"
                  >
                    {vehicleOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-gray-900">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">{t.form_message}</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#F4C430] focus:outline-none transition-colors resize-none"
                    placeholder="Any special requests or notes..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center px-8 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1DA851] transition-all shadow-lg shadow-[#25D366]/20"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <MessageCircle className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                  {t.booking_send}
                </motion.button>

                <p className="text-center text-sm text-gray-500">
                  * {t.cta_whatsapp} - {t.contact_whatsapp}
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
