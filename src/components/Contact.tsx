import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, AlertCircle, Copy, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../i18n/LanguageContext';

interface BookingForm {
  name: string;
  country: string;
  email: string;
  phone: string;
  whatsapp: string;
  pickup_location: string;
  destination: string;
  booking_date: string;
  booking_time: string;
  passengers: number;
  vehicle_type: string;
  requirements: string;
  message: string;
}

const INITIAL: BookingForm = {
  name: '', country: '', email: '', phone: '', whatsapp: '', pickup_location: '',
  destination: '', booking_date: '', booking_time: '', passengers: 1,
  vehicle_type: 'sedan', requirements: '', message: '',
};

const Contact = () => {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState<BookingForm>(INITIAL);
  const [errors, setErrors] = useState<Partial<BookingForm>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookingId, setBookingId] = useState('');
  const [copied, setCopied] = useState(false);

  const phoneNumber = '+966 50 141 6110';
  const whatsappNumber = '966501416110';
  const emailPrimary = 'Zakarasma@harmain.com';
  const emailSecondary = 'Zakarasma@umrahtaxi.com';
  const mapUrl = 'https://maps.app.goo.gl/w47SGshx3WfPcx46A';

  const validate = () => {
    const errs: Partial<BookingForm> = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.country.trim()) errs.country = 'Required';
    if (!form.whatsapp.trim()) errs.whatsapp = 'Required';
    if (!form.pickup_location.trim()) errs.pickup_location = 'Required';
    if (!form.destination.trim()) errs.destination = 'Required';
    if (!form.booking_date) errs.booking_date = 'Required';
    if (!form.booking_time) errs.booking_time = 'Required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const set = (field: keyof BookingForm, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const { data, error } = await supabase.from('bookings').insert([form]).select('id').single();
      if (error) throw error;
      setBookingId(data.id.slice(0, 8).toUpperCase());
      setStatus('success');
      setForm(INITIAL);
    } catch {
      setStatus('error');
    }
  };

  const copyId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const vehicles = [
    { value: 'hyundai-h1', label: 'Hyundai H1 (8 pax)' },
    { value: 'hyundai-staria', label: 'Hyundai Staria (7 pax)' },
    { value: 'hyundai-starex', label: 'Hyundai Starex (9 pax)' },
    { value: 'toyota-hiace', label: 'Toyota Hiace (12 pax)' },
    { value: 'toyota-highroof', label: 'Toyota High Roof (10 pax)' },
    { value: 'sedan', label: 'Sedan (4 pax)' },
    { value: 'suv', label: 'SUV (6 pax)' },
    { value: 'gmc', label: 'GMC (7 pax)' },
    { value: 'coaster', label: 'Coaster (25 pax)' },
  ];

  const successText = {
    title: lang === 'ar' ? 'تم تأكيد الحجز!' : lang === 'ur' ? 'بکنگ تصدیق ہو گئی!' : lang === 'tr' ? 'Rezervasyon Gönderildi!' : 'Booking Submitted!',
    subtitle: lang === 'ar' ? 'سنتواصل معك قريباً عبر الواتساب.' : lang === 'ur' ? 'ہم جلد واٹس اپ پر رابطہ کریں گے۔' : lang === 'tr' ? 'Size kısa süre içinde WhatsApp üzerinden ulaşacağız.' : "We'll contact you shortly via WhatsApp.",
    saveText: lang === 'ar' ? 'احفظ هذا الرقم لتتبع حجزك' : lang === 'ur' ? 'اپنی بکنگ ٹریک کرنے کے لیے محفوظ کریں' : lang === 'tr' ? 'Rezervasyonunuzu takip etmek için kaydedin' : 'Save this to track your booking status',
    newBooking: lang === 'ar' ? 'حجز آخر' : lang === 'ur' ? 'نئی بکنگ' : lang === 'tr' ? 'Yeni Rezervasyon' : 'New Booking',
    bookingId: lang === 'ar' ? 'رقم الحجز' : lang === 'ur' ? 'بکنگ ID' : lang === 'tr' ? 'Rezervasyon ID' : 'Booking ID',
  };

  const fieldClass = (field: keyof BookingForm) =>
    `w-full px-4 py-3 bg-white/5 border rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#F4C430] transition-colors ${
      errors[field] ? 'border-red-500' : 'border-white/10'
    }`;

  if (status === 'success') {
    return (
      <div className="py-24 bg-black min-h-screen flex items-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-[#0B5D3B]/20 rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-[#0B5D3B]" />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-2">{successText.title}</h2>
          <p className="text-gray-400 mb-6">{successText.subtitle}</p>
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-gray-400 text-sm mb-2">{successText.bookingId}</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#F4C430] text-2xl font-black tracking-widest" dir="ltr">{bookingId}</span>
              <button onClick={copyId} className="text-gray-400 hover:text-white transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && <p className="text-[#0B5D3B] text-xs mt-1">{lang === 'ar' ? 'تم النسخ!' : lang === 'ur' ? 'کاپی کیا!' : lang === 'tr' ? 'Kopyalandı!' : 'Copied!'}</p>}
            <p className="text-gray-500 text-xs mt-2">{successText.saveText}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-3 bg-[#F4C430] text-black font-semibold rounded-xl"
            >
              {successText.newBooking}
            </button>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] text-white font-semibold rounded-xl"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  const errorText = lang === 'ar' ? 'حدث خطأ. حاول مرة أخرى.' : lang === 'ur' ? 'خطا ہوا۔ دوبارہ کوشش کریں۔' : lang === 'tr' ? 'Bir hata oluştu. Tekrar deneyin.' : 'Something went wrong. Please try again.';
  const loadingText = lang === 'ar' ? 'جاري الإرسال...' : lang === 'ur' ? 'بھیج رہے ہیں...' : lang === 'tr' ? 'Gönderiliyor...' : 'Submitting...';

  return (
    <section id="contact" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#F4C430]/10 text-[#F4C430] text-sm font-medium rounded-full mb-4">
            {t.contact_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.contact_title}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: Phone, label: t.contact_call, value: phoneNumber, href: `tel:${whatsappNumber}`, color: '#F4C430' },
              { icon: MessageCircle, label: t.contact_whatsapp, value: phoneNumber, href: `https://wa.me/${whatsappNumber}`, color: '#25D366' },
              { icon: Mail, label: t.contact_email, value: emailPrimary, href: `mailto:${emailPrimary}`, color: '#F4C430' },
              { icon: Mail, label: t.contact_email, value: emailSecondary, href: `mailto:${emailSecondary}`, color: '#0B5D3B' },
              { icon: MapPin, label: t.contact_location, value: lang === 'ar' ? 'مكة المكرمة، السعودية' : lang === 'ur' ? 'مکہ مکرمہ، سعودی عرب' : lang === 'tr' ? 'Mekke, Suudi Arabistan' : 'Makkah, Saudi Arabia', href: mapUrl, color: '#F4C430', external: true },
            ].map(({ icon: Icon, label, value, href, color, external }, i) => (
              <motion.a
                key={i}
                href={href}
                target={external ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/3 rounded-xl border border-white/8 hover:border-[#F4C430]/20 transition-all group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}15` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-gray-400 text-xs mb-0.5">{label}</div>
                  <div className="text-white font-medium text-sm truncate" dir="ltr">{value}</div>
                </div>
                {external && <ExternalLink className="w-4 h-4 text-gray-500" />}
              </motion.a>
            ))}

            {/* Quick WhatsApp Button */}
            <motion.a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 bg-[#25D366] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#25D366]/20 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              {t.cta_whatsapp}
            </motion.a>
          </div>

          {/* Booking Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/3 rounded-2xl border border-white/8 p-6 sm:p-8">
              <h3 className="text-white font-bold text-lg mb-6">{t.booking_title}</h3>

              {status === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl mb-4">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <p className="text-red-400 text-sm">{errorText}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input placeholder={`${t.form_name} *`} value={form.name} onChange={e => set('name', e.target.value)} className={fieldClass('name')} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input placeholder={`${t.form_country} *`} value={form.country} onChange={e => set('country', e.target.value)} className={fieldClass('country')} />
                    {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input placeholder={t.form_email} type="email" value={form.email} onChange={e => set('email', e.target.value)} className={fieldClass('email')} />
                  </div>
                  <div>
                    <input placeholder={`${t.form_whatsapp} *`} value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} className={fieldClass('whatsapp')} dir="ltr" />
                    {errors.whatsapp && <p className="text-red-400 text-xs mt-1">{errors.whatsapp}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder={t.form_phone} value={form.phone} onChange={e => set('phone', e.target.value)} className={fieldClass('phone')} dir="ltr" />
                  <input type="number" min={1} max={50} placeholder={`${t.form_passengers} *`} value={form.passengers} onChange={e => set('passengers', parseInt(e.target.value) || 1)} className={fieldClass('passengers')} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input placeholder={`${t.form_pickup} *`} value={form.pickup_location} onChange={e => set('pickup_location', e.target.value)} className={fieldClass('pickup_location')} />
                    {errors.pickup_location && <p className="text-red-400 text-xs mt-1">{errors.pickup_location}</p>}
                  </div>
                  <div>
                    <input placeholder={`${t.form_destination} *`} value={form.destination} onChange={e => set('destination', e.target.value)} className={fieldClass('destination')} />
                    {errors.destination && <p className="text-red-400 text-xs mt-1">{errors.destination}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input type="date" value={form.booking_date} onChange={e => set('booking_date', e.target.value)} min={new Date().toISOString().split('T')[0]} className={fieldClass('booking_date')} />
                    {errors.booking_date && <p className="text-red-400 text-xs mt-1">{errors.booking_date}</p>}
                  </div>
                  <div>
                    <input type="time" value={form.booking_time} onChange={e => set('booking_time', e.target.value)} className={fieldClass('booking_time')} />
                    {errors.booking_time && <p className="text-red-400 text-xs mt-1">{errors.booking_time}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <select value={form.vehicle_type} onChange={e => set('vehicle_type', e.target.value)} className={fieldClass('vehicle_type')}>
                    {vehicles.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
                  </select>
                  <input placeholder={t.form_requirements} value={form.requirements} onChange={e => set('requirements', e.target.value)} className={fieldClass('requirements')} />
                </div>

                <textarea rows={3} placeholder={t.form_message} value={form.message} onChange={e => set('message', e.target.value)} className={`${fieldClass('message')} resize-none`} />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-gradient-to-r from-[#F4C430] to-[#e6b52e] text-black font-bold rounded-xl hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all disabled:opacity-60"
                >
                  {status === 'loading' ? loadingText : t.form_booking}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
