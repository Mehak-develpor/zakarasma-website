import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

interface FAQItem {
  id: string;
  question: string;
  question_ar?: string;
  question_ur?: string;
  question_tr?: string;
  answer: string;
  answer_ar?: string;
  answer_ur?: string;
  answer_tr?: string;
}

const FAQ = () => {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (data && data.length > 0) setFaqs(data);
    };
    fetchFaqs();
  }, []);

  const getQuestion = (faq: FAQItem) => {
    if (lang === 'ar' && faq.question_ar) return faq.question_ar;
    if (lang === 'ur' && faq.question_ur) return faq.question_ur;
    if (lang === 'tr' && faq.question_tr) return faq.question_tr;
    return faq.question;
  };

  const getAnswer = (faq: FAQItem) => {
    if (lang === 'ar' && faq.answer_ar) return faq.answer_ar;
    if (lang === 'ur' && faq.answer_ur) return faq.answer_ur;
    if (lang === 'tr' && faq.answer_tr) return faq.answer_tr;
    return faq.answer;
  };

  const defaultFaqs: FAQItem[] = [
    { id: '1', question: 'How do I book a taxi?', question_ar: 'كيف أحجز سيارة أجرة؟', question_ur: 'میں ٹیکسی کیسے بک کروں؟', question_tr: 'Nasıl taksi kiralarım?', answer: 'You can book our taxi service through our website, WhatsApp, or by calling our 24/7 customer support.', answer_ar: 'يمكنك حجز خدمة التاكسي من خلال موقعنا أو الواتساب أو الاتصال بدعم العملاء.', answer_ur: 'آپ ہماری ویب سائٹ، واٹس اپ، یا کسٹمر سپورٹ پر کال کر کے بک کر سکتے ہیں۔', answer_tr: 'Web sitemiz, WhatsApp veya müşteri hizmetlerini arayarak rezerve edebilirsiniz.' },
    { id: '2', question: 'Can I pay online?', question_ar: 'هل يمكنني الدفع عبر الإنترنت؟', question_ur: 'کیا میں آن لائن ادائیگی کر سکتا ہوں؟', question_tr: 'Online ödeme yapabilir miyim?', answer: 'Yes, we accept online payments through credit cards, debit cards, and other digital payment methods.', answer_ar: 'نعم، نقبل الدفع عبر الإنترنت من خلال البطاقات الائتمانية وبطاقات الخصم.', answer_ur: 'جی ہاں، ہم کریڈٹ کارڈز، ڈیبٹ کارڈز سے آن لائن ادائیگی قبول کرتے ہیں۔', answer_tr: 'Evet, kredi kartları ve banka kartları ile online ödemeleri kabul ediyoruz.' },
    { id: '3', question: 'Do you provide airport transfers?', question_ar: 'هل توفرون خدمة نقل المطار؟', question_ur: 'کیا آپ ایئر پورٹ ٹرانسفر فراہم کرتے ہیں؟', question_tr: 'Havalimanı transferi sunuyor musunuz?', answer: 'Yes, we offer airport transfer services from Jeddah, Madinah, and Makkah airports.', answer_ar: 'نعم، نقدم خدمات نقل المطار من مطارات جدة والمدينة ومكة.', answer_ur: 'جی ہاں، ہم جددہ، مدینہ اور مکہ ایئر پورٹس سے ٹرانسفر سروسز پیش کرتے ہیں۔', answer_tr: 'Evet, Cidde, Medine ve Mekke havalimanlarından transfer hizmetleri sunuyoruz.' },
    { id: '4', question: 'Do you provide Ziyarat tours?', question_ar: 'هل توفرون جولات الزيارات؟', question_ur: 'کیا آپ زیارات ٹورز فراہم کرتے ہیں؟', question_tr: 'Ziyaret turları sunuyor musunuz?', answer: 'Yes, we offer guided Ziyarat tours to all significant Islamic sites in Makkah and Madinah.', answer_ar: 'نعم، نقدم جولات موجهة لجميع المواقع الإسلامية الهامة في مكة والمدينة.', answer_ur: 'جی ہاں، ہم مکہ اور مدینہ میں تمام اہم اسلامی مقامات پر گائیڈڈ ٹورز پیش کرتے ہیں۔', answer_tr: 'Evet, Mekke ve Medine\'deki tüm önemli İslami mekanlara rehberli turlar sunuyoruz.' },
    { id: '5', question: 'Do you operate 24/7?', question_ar: 'هل تعملون على مدار الساعة؟', question_ur: 'کیا آپ 24/7 کام کرتے ہیں؟', question_tr: '7/24 hizmet veriyor musunuz?', answer: 'Yes, our services are available 24 hours a day, 7 days a week.', answer_ar: 'نعم، خدماتنا متاحة على مدار الساعة وطوال أيام الأسبوع.', answer_ur: 'جی ہاں، ہماری خدمات 24 گھنٹے، ہفتے کے 7 دن دستیاب ہیں۔', answer_tr: 'Evet, hizmetlerimiz 7/24 mevcuttur.' },
    { id: '6', question: 'Can I book in advance?', question_ar: 'هل يمكنني الحجز مقدماً؟', question_ur: 'کیا میں پہلے سے بکنگ کر سکتا ہوں؟', question_tr: 'Önceden rezervasyon yapabilir miyim?', answer: 'Yes, we recommend booking in advance especially during peak seasons like Hajj and Ramadan.', answer_ar: 'نعم، ننصح بالحجز مقدماً خاصة خلال مواسم الذروة مثل الحج ورمضان.', answer_ur: 'جی ہاں، ہم حج اور رمضان جیسے مصروف مواسم میں پہلے سے بکنگ کرنے کی سفارش کرتے ہیں۔', answer_tr: 'Evet, özellikle Hac ve Ramazan gibi yoğun sezonlarda önceden rezervasyon yapmanızı öneririz.' },
  ];

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#0B5D3B]/20 text-[#0B5D3B] text-sm font-medium rounded-full mb-4">
            {t.faq_subtitle}
          </span>
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-6 h-6 text-[#F4C430]" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{t.faq_title}</h2>
          </div>
        </motion.div>

        <div className="space-y-3">
          {displayFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              className="bg-white/3 rounded-xl border border-white/8 overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setOpen(open === index ? null : index)}
              >
                <span className="text-white font-medium text-sm pr-4">{getQuestion(faq)}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#F4C430] shrink-0 transition-transform duration-200 ${
                    open === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                      {getAnswer(faq)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
