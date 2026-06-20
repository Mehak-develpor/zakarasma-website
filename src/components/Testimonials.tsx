import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, BadgeCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../i18n/LanguageContext';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text_en: string;
  text_ar?: string;
  text_ur?: string;
  text_tr?: string;
}

const Testimonials = () => {
  const { t, lang } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(6);
      if (data && data.length > 0) setTestimonials(data);
    };
    fetch();
  }, []);

  const getText = (item: Testimonial) => {
    if (lang === 'ar' && item.text_ar) return item.text_ar;
    if (lang === 'ur' && item.text_ur) return item.text_ur;
    if (lang === 'tr' && item.text_tr) return item.text_tr;
    return item.text_en;
  };

  const displayList = testimonials.length > 0 ? testimonials : [
    { id: '1', name: t.testimonial1_name, location: t.testimonial1_location, rating: 5, text_en: t.testimonial1_text },
    { id: '2', name: t.testimonial2_name, location: t.testimonial2_location, rating: 5, text_en: t.testimonial2_text },
    { id: '3', name: t.testimonial3_name, location: t.testimonial3_location, rating: 5, text_en: t.testimonial3_text },
  ];

  return (
    <section id="testimonials" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#F4C430]/10 text-[#F4C430] text-sm font-medium rounded-full mb-4">
            {t.testimonials_subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.testimonials_title}</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayList.map((item, index) => (
            <motion.div
              key={item.id}
              className="p-6 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl border border-white/8 hover:border-[#F4C430]/20 transition-all relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index % 3) * 0.1 }}
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#F4C430]/20 mb-4" />

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-5">{getText(item)}</p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F4C430] to-[#e6b52e] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{item.name[0]}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white font-semibold text-sm">{item.name}</span>
                      <BadgeCheck className="w-3.5 h-3.5 text-[#F4C430]" />
                    </div>
                    <div className="text-gray-500 text-xs">{item.location}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#F4C430] fill-[#F4C430]" />
                    ))}
                  </div>
                  <span className="text-[#0B5D3B] text-[10px] font-medium">{t.verified_customer}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {[
            { value: '4.9', label: lang === 'ar' ? 'التقييم العام' : lang === 'ur' ? 'مجموعی ریٹنگ' : lang === 'tr' ? 'Genel Puan' : 'Overall Rating' },
            { value: '500+', label: lang === 'ar' ? 'تقييم إيجابي' : lang === 'ur' ? 'مثبتی تنقیدیں' : lang === 'tr' ? 'Olumlu Yorum' : 'Positive Reviews' },
            { value: '100%', label: lang === 'ar' ? 'رضا العملاء' : lang === 'ur' ? 'کسٹمر تسلی' : lang === 'tr' ? 'Müşteri Memnuniyeti' : 'Customer Satisfaction' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold text-[#F4C430]">{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
