import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

const ContactPage = () => {
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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'booking' | 'inquiry'>('booking');

  const vehicleOptions = [
    { value: 'camry', label: 'Toyota Camry' },
    { value: 'staria', label: 'Hyundai Staria' },
    { value: 'hiace', label: 'Toyota Hiace' },
    { value: 'yukon', label: 'GMC Yukon' },
    { value: 'tahoe', label: 'Chevrolet Tahoe' },
    { value: 'vclass', label: 'Mercedes V-Class' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('bookings').insert({
        name: formData.name,
        country: formData.country,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        pickup_location: formData.pickup,
        destination: formData.destination,
        booking_date: formData.date,
        booking_time: formData.time,
        passengers: parseInt(formData.passengers),
        vehicle_type: formData.vehicle,
        message: formData.message,
      });

      if (error) throw error;
      setSuccess(true);

      // Also send to WhatsApp
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

      window.open(`https://wa.me/966500000000?text=${encodeURIComponent(message)}`, '_blank');
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('inquiries').insert({
        name: formData.name,
        email: formData.whatsapp,
        phone: formData.phone,
        message: formData.message,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1624056/pexels-photo-1624056.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Contact"
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
              {t.contact}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              {t.contact_title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.contact_subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
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

            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/10 backdrop-blur-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-white/10">
                  <button
                    onClick={() => setActiveTab('booking')}
                    className={`flex-1 px-6 py-4 font-medium transition-all ${
                      activeTab === 'booking'
                        ? 'text-[#F4C430] border-b-2 border-[#F4C430] bg-white/5'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {t.booking_title}
                  </button>
                  <button
                    onClick={() => setActiveTab('inquiry')}
                    className={`flex-1 px-6 py-4 font-medium transition-all ${
                      activeTab === 'inquiry'
                        ? 'text-[#F4C430] border-b-2 border-[#F4C430] bg-white/5'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    General Inquiry
                  </button>
                </div>

                <div className="p-8">
                  {success ? (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <CheckCircle className="w-16 h-16 text-[#0B5D3B] mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                      <p className="text-gray-400 mb-6">Your submission has been received. We'll get back to you shortly.</p>
                      <button
                        onClick={() => {
                          setSuccess(false);
                          setFormData({
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
                        }}
                        className="text-[#F4C430] hover:underline"
                      >
                        Submit another request
                      </button>
                    </motion.div>
                  ) : activeTab === 'booking' ? (
                    <form onSubmit={handleSubmitBooking} className="space-y-4">
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

                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center px-8 py-4 bg-[#F4C430] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all disabled:opacity-50"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {loading ? (
                          <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                            {t.form_submit}
                          </>
                        )}
                      </motion.button>
                    </form>
                  ) : (
                    <form onSubmit={handleSubmitInquiry} className="space-y-4">
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
                          <label className="block text-sm text-gray-400 mb-2">Email *</label>
                          <input
                            type="email"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#F4C430] focus:outline-none transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#F4C430] focus:outline-none transition-colors"
                          placeholder="+966 50 000 0000"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">{t.form_message} *</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={5}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#F4C430] focus:outline-none transition-colors resize-none"
                          placeholder="How can we help you?"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center px-8 py-4 bg-[#0B5D3B] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#0B5D3B]/20 transition-all disabled:opacity-50"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {loading ? (
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                            Send Inquiry
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
