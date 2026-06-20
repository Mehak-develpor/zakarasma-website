import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe, Shield } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import type { Language } from '../i18n/translations';

const Header = () => {
  const { t, lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const navLinks = [
    { to: '/', label: t.home },
    { to: '/about', label: t.about },
    { to: '/services', label: t.services },
    { to: '/fleet', label: t.fleet },
    { to: '/contact', label: t.contact },
    { to: '/track', label: lang === 'ar' ? 'تتبع حجزي' : lang === 'ur' ? 'بکنگ ٹریک' : lang === 'tr' ? 'Rezervasyon Takibi' : 'Track Booking' },
  ];

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'ar', label: 'ع', flag: '🇸🇦' },
    { code: 'ur', label: 'اردو', flag: '🇵🇰' },
    { code: 'tr', label: 'TR', flag: '🇹🇷' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Premium Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Kaaba-inspired black cube */}
              <div className="absolute w-10 h-10 bg-gradient-to-br from-gray-900 to-black border-2 border-[#F4C430] rounded-sm transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-b from-[#F4C430]/20 to-transparent" />
              </div>
              {/* Dome inspired accent */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-t-full bg-gradient-to-b from-[#0B5D3B] to-[#0B5D3B]/50 opacity-80" />
              {/* Road element */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#F4C430] to-transparent opacity-60" />
              {/* Z letter */}
              <span className="relative text-[#F4C430] font-black text-lg mt-1">Z</span>
            </div>
            <div dir="ltr" className="hidden sm:block">
              <div className="text-white font-bold text-sm leading-tight tracking-wide">ZAKARASMA</div>
              <div className="text-[#F4C430] text-xs font-medium">UMRAH TAXI</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === link.to
                    ? 'text-[#F4C430] bg-[#F4C430]/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="hidden sm:flex items-center gap-1 px-3 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <Globe className="w-4 h-4 text-[#F4C430]" />
                <span className="text-sm text-white">{languages.find(l => l.code === lang)?.label}</span>
              </button>
              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-1 py-1 bg-gray-900 rounded-lg shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[140px]">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm transition-all ${
                      lang === l.code
                        ? 'bg-[#F4C430]/10 text-[#F4C430]'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <a
              href="tel:+966501416110"
              className="hidden md:flex items-center gap-1 text-[#F4C430] text-sm font-medium hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span dir="ltr">+966 50 141 6110</span>
            </a>

            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#F4C430] to-[#e6b52e] text-black text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all"
            >
              {t.book_now}
            </Link>

            <Link
              to="/admin/login"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-2 bg-white/5 text-gray-300 text-sm font-medium rounded-lg hover:bg-white/10 hover:text-white transition-all"
              title="Admin Panel"
            >
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-black/98 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === link.to
                    ? 'text-[#F4C430] bg-[#F4C430]/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-4 pt-3 flex-wrap">
              <Globe className="w-4 h-4 text-gray-400" />
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg transition-all ${
                    lang === l.code ? 'bg-[#F4C430] text-black font-semibold' : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
            <Link
              to="/admin/login"
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <Shield className="w-4 h-4" />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
