import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Heart, Shield } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const navItems = [
    { key: 'home', href: '/' },
    { key: 'about', href: '/about' },
    { key: 'services', href: '/services' },
    { key: 'fleet', href: '/fleet' },
    { key: 'contact', href: '/contact' },
  ];

  const serviceItems = [
    { key: 'service1' },
    { key: 'service2' },
    { key: 'service3' },
    { key: 'service4' },
    { key: 'service5' },
    { key: 'service6' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
              <div className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#F4C430] to-[#0B5D3B] p-0.5">
                <div className="w-full h-full bg-black rounded-md flex items-center justify-center">
                  <span className="text-[#F4C430] font-bold text-xl">Z</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Zakarasma</h3>
                <p className="text-xs text-[#F4C430]">Tour & Taxi</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t.footer_desc}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">
                Licensed
              </div>
              <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">
                Insured
              </div>
              <div className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10">
                24/7 Support
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{t.footer_quick_links}</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-[#F4C430] transition-colors text-sm"
                  >
                    {t[item.key as keyof typeof t]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{t.footer_services}</h4>
            <ul className="space-y-3">
              {serviceItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-[#F4C430] transition-colors text-sm"
                  >
                    {t[`${item.key}_title` as keyof typeof t]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{t.footer_contact_info}</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-[#F4C430] mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Makkah, Al Madinah Region<br />Saudi Arabia
                </span>
              </li>
              <li>
                <a href="tel:+966500000000" className="flex items-center space-x-3 rtl:space-x-reverse text-gray-400 hover:text-[#F4C430] transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">+966 50 000 0000</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@zakarasma.com" className="flex items-center space-x-3 rtl:space-x-reverse text-gray-400 hover:text-[#F4C430] transition-colors">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">info@zakarasma.com</span>
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-white mb-3">{t.footer_follow}</h4>
              <div className="flex space-x-3 rtl:space-x-reverse">
                <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:bg-black hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="#" className="p-2 bg-white/5 rounded-lg text-gray-400 hover:bg-[#FF0000] hover:text-white transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} Zakarasma Tour & Taxi. {t.footer_rights}
            </p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500">
              <span className="flex items-center">
                Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-red-500" /> for Pilgrims
              </span>
              <a href="#" className="hover:text-[#F4C430] transition-colors">{t.footer_privacy}</a>
              <a href="#" className="hover:text-[#F4C430] transition-colors">{t.footer_terms}</a>
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-500 hover:text-[#F4C430] hover:border-[#F4C430]/30 hover:bg-[#F4C430]/5 transition-all text-xs"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Panel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
