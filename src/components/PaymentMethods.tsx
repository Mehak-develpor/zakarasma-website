import { motion } from 'framer-motion';
import { Banknote, CreditCard, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const PaymentMethods = () => {
  const { t, lang } = useLanguage();

  const methods = [
    { icon: Banknote, name: t.payment_cash, color: '#22c55e' },
    { icon: CreditCard, name: t.payment_credit, color: '#3b82f6' },
    { icon: CreditCard, name: t.payment_debit, color: '#8b5cf6' },
    { icon: Globe, name: t.payment_online, color: '#F4C430' },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-950 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white mb-2">{t.payment_methods}</h3>
          <p className="text-gray-500 text-sm">
            {lang === 'ar' ? 'نقبل طرق دفع متعددة' : lang === 'ur' ? 'ہم متعدد ادائیگی کے طریقے قبول کرتے ہیں' : lang === 'tr' ? 'Birden fazla ödeme yöntemi kabul ediyoruz' : 'We accept multiple payment methods'}
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {methods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={index}
                className="flex items-center gap-3 px-5 py-3 bg-white/5 rounded-lg border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${method.color}20` }}
                >
                  <Icon className="w-4 h-4" style={{ color: method.color }} />
                </div>
                <span className="text-gray-300 text-sm font-medium">{method.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
