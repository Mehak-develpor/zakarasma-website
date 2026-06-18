import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Testimonials = () => {
  const { t, lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    { key: 'testimonial1', rating: 5, image: 'https://images.pexels.com/photo-220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { key: 'testimonial2', rating: 5, image: 'https://images.pexels.com/photo-774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { key: 'testimonial3', rating: 5, image: 'https://images.pexels.com/photo-2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDgwIDgwIiBmaWxsPSJub25lIj48Y2lyY2xlIGN4PSI0MCIgY3k9IjQwIiByPSIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9zdmc+')] opacity-50" />
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
            {t.testimonials}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.testimonials_title}
          </h2>
          <p className="text-xl text-gray-400">{t.testimonials_subtitle}</p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[#F4C430]/20">
            <Quote className="w-16 h-16" />
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 p-8 sm:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: lang === 'ar' || lang === 'ur' ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: lang === 'ar' || lang === 'ur' ? -50 : 50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center space-x-1 rtl:space-x-reverse mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < testimonials[currentIndex].rating ? 'fill-[#F4C430] text-[#F4C430]' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-xl sm:text-2xl text-gray-200 italic mb-8 leading-relaxed">
                  "{t[`${testimonials[currentIndex].key}_text` as keyof typeof t]}"
                </p>

                {/* Profile */}
                <div className="flex flex-col items-center">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={t[`${testimonials[currentIndex].key}_name` as keyof typeof t]}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#F4C430] mb-3"
                  />
                  <h4 className="text-lg font-semibold text-white">
                    {t[`${testimonials[currentIndex].key}_name` as keyof typeof t]}
                  </h4>
                  <p className="text-[#F4C430] text-sm">
                    {t[`${testimonials[currentIndex].key}_location` as keyof typeof t]}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-[#F4C430] hover:text-black transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-[#F4C430] hover:text-black transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 rtl:space-x-reverse mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? 'bg-[#F4C430] w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
