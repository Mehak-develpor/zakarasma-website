import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useLanguage, type Language } from '../i18n/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'services', href: '/services' },
    { key: 'fleet', href: '/fleet' },
    { key: 'about', href: '/about' },
    { key: 'contact', href: '/contact' },
  ];

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  ];

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse group">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#F4C430] to-[#0B5D3B] p-0.5">
              <div className="w-full h-full bg-black rounded-md flex items-center justify-center">
                <span className="text-[#F4C430] font-bold text-xl">Z</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white whitespace-nowrap">Zakarasma</h1>
              <p className="text-xs text-[#F4C430] -mt-0.5">Tour & Taxi</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                onClick={() => handleNavClick()}
                className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                  location.pathname === item.href
                    ? 'text-[#F4C430] bg-white/5'
                    : 'text-gray-300 hover:text-[#F4C430] hover:bg-white/5'
                }`}
              >
                {t[item.key as keyof typeof t]}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Globe className="w-4 h-4 text-[#F4C430]" />
                <span className="text-sm text-white hidden sm:inline">
                  {languages.find((l) => l.code === lang)?.nativeName}
                </span>
              </button>
              <div className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-1 py-1 bg-black/95 backdrop-blur-md rounded-lg shadow-xl border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => setLang(language.code)}
                    className={`w-full px-4 py-2 text-left rtl:text-right text-sm transition-colors ${
                      lang === language.code
                        ? 'text-[#F4C430] bg-white/5'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {language.nativeName}
                  </button>
                ))}
              </div>
            </div>

            {/* Book Now Button */}
            <Link
              to="/contact"
              className="hidden md:flex items-center px-4 py-2 bg-gradient-to-r from-[#F4C430] to-[#e6b52e] text-black font-semibold rounded-lg hover:shadow-lg hover:shadow-[#F4C430]/20 transition-all transform hover:-translate-y-0.5"
            >
              {t.book_now}
            </Link>

            {/* Phone */}
            <a
              href="tel:+966500000000"
              className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg bg-[#0B5D3B]/20 text-[#0B5D3B] hover:bg-[#0B5D3B]/30 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+966 50 000 0000</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-[500px] pb-4' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col space-y-1 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                onClick={() => handleNavClick()}
                className={`px-4 py-3 text-left rtl:text-right rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'text-[#F4C430] bg-white/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {t[item.key as keyof typeof t]}
              </Link>
            ))}
            <a
              href="tel:+966500000000"
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 text-[#F4C430] hover:bg-white/5 rounded-lg"
            >
              <Phone className="w-4 h-4" />
              <span>+966 50 000 0000</span>
            </a>
            <Link
              to="/contact"
              className="mx-4 mt-2 flex items-center justify-center px-4 py-3 bg-[#F4C430] text-black font-semibold rounded-lg"
            >
              {t.book_now}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
