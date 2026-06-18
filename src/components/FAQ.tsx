import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { key: 'faq1' },
    { key: 'faq2' },
    { key: 'faq3' },
    { key: 'faq4' },
    { key: 'faq5' },
  ];

  // Generate FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": t[`${faq.key}_q` as keyof typeof t],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": t[`${faq.key}_a` as keyof typeof t]
      }
    }))
  };

  return (
    <section
      id="faq"
      className="relative py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-[#0B5D3B]/20 text-[#0B5D3B] text-sm font-medium rounded-full mb-4">
            {t.faq}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.faq_title}
          </h2>
          <p className="text-xl text-gray-400">{t.faq_subtitle}</p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left rtl:text-right"
              >
                <span className="text-lg font-medium text-white pr-4 rtl:pr-0 rtl:pl-4">
                  {t[`${faq.key}_q` as keyof typeof t]}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className={`w-5 h-5 ${openIndex === index ? 'text-[#F4C430]' : 'text-gray-400'}`} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="h-px bg-white/10 mb-4" />
                      <p className="text-gray-300 leading-relaxed">
                        {t[`${faq.key}_a` as keyof typeof t]}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center px-6 py-3 bg-[#F4C430] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
