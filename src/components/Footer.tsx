import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Share2, ExternalLink, Lock } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { supabase } from '../lib/supabase';

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  is_active: boolean;
}

const Footer = () => {
  const { t, lang } = useLanguage();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    const fetchSocial = async () => {
      const { data } = await supabase
        .from('social_links')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (data && data.length > 0) setSocialLinks(data);
    };
    fetchSocial();
  }, []);

  const quickLinks = [
    { to: '/', label: t.home },
    { to: '/about', label: t.about },
    { to: '/services', label: t.services },
    { to: '/fleet', label: t.fleet },
    { to: '/contact', label: t.contact },
    { to: '/track', label: lang === 'ar' ? 'تتبع الحجز' : lang === 'ur' ? 'بکنگ ٹریک' : lang === 'tr' ? 'Rezervasyon Takibi' : 'Track Booking' },
  ];

  const services = [
    lang === 'ar' ? 'نقل الحجاج' : lang === 'ur' ? 'حج ٹرانسپورٹ' : lang === 'tr' ? 'Hac Ulaştırma' : 'Hajj Transport',
    lang === 'ar' ? 'تاكسي العمرة' : lang === 'ur' ? 'عمرہ ٹیکسی' : lang === 'tr' ? 'Umre Taksi' : 'Umrah Taxi',
    lang === 'ar' ? 'استقبال المطار' : lang === 'ur' ? 'ایئر پورٹ پک اپ' : lang === 'tr' ? 'Havalimanı Karşılama' : 'Airport Pickup',
    lang === 'ar' ? 'مكة إلى المدينة' : lang === 'ur' ? 'مکہ سے مدینہ' : lang === 'tr' ? 'Mekke\'den Medine\'ye' : 'Makkah to Madinah',
    lang === 'ar' ? 'جولات الزيارات' : lang === 'ur' ? 'زیارات ٹورز' : lang === 'tr' ? 'Ziyaret Turları' : 'Ziyarat Tours',
    lang === 'ar' ? 'نقل VIP' : lang === 'ur' ? 'VIP ٹرانسپورٹ' : lang === 'tr' ? 'VIP Ulaşım' : 'VIP Transport',
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'MessageCircle': return MessageCircle;
      case 'Mail': return Mail;
      default: return Share2;
    }
  };

  const defaultSocialLinks = [
    { platform: 'facebook', url: 'https://facebook.com/zakarasma', icon: 'Facebook' },
    { platform: 'instagram', url: 'https://instagram.com/zakarasma', icon: 'Instagram' },
    { platform: 'whatsapp', url: 'https://wa.me/966501416110', icon: 'MessageCircle' },
    { platform: 'email', url: 'mailto:Zakarasma@harmain.com', icon: 'Mail' },
  ];

  const displayLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks;

  return (
    <footer className="bg-black border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <div className="absolute w-9 h-9 bg-gradient-to-br from-gray-900 to-black border-2 border-[#F4C430] rounded-sm transform rotate-12" />
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-t-full bg-gradient-to-b from-[#0B5D3B] to-[#0B5D3B]/50" />
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#F4C430] to-transparent opacity-60" />
                <span className="relative text-[#F4C430] font-black text-base">Z</span>
              </div>
              <div dir="ltr">
                <div className="text-white font-bold text-sm leading-tight">ZAKARASMA</div>
                <div className="text-[#F4C430] text-xs font-medium">UMRAH TAXI</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">{t.footer_desc}</p>
            {/* Social */}
            <div className="flex gap-3">
              {displayLinks.map(({ platform, url, icon }) => {
                const Icon = getIconComponent(icon);
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform}
                    className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 hover:text-[#F4C430] hover:bg-[#F4C430]/10 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer_quick_links}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 text-sm hover:text-[#F4C430] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer_services}</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <Link to="/services" className="text-gray-400 text-sm hover:text-[#F4C430] transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{t.footer_contact_info}</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+966501416110" className="flex items-start gap-3 text-gray-400 hover:text-[#F4C430] transition-colors group">
                  <Phone className="w-4 h-4 mt-0.5 text-[#F4C430] shrink-0" />
                  <span className="text-sm" dir="ltr">+966 50 141 6110</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/966501416110" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-gray-400 hover:text-[#25D366] transition-colors">
                  <MessageCircle className="w-4 h-4 mt-0.5 text-[#25D366] shrink-0" />
                  <span className="text-sm" dir="ltr">+966 50 141 6110</span>
                </a>
              </li>
              <li>
                <a href="mailto:Zakarasma@harmain.com" className="flex items-start gap-3 text-gray-400 hover:text-[#F4C430] transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 text-[#F4C430] shrink-0" />
                  <span className="text-sm">Zakarasma@harmain.com</span>
                </a>
              </li>
              <li>
                <a href="mailto:Zakarasma@umrahtaxi.com" className="flex items-start gap-3 text-gray-400 hover:text-[#F4C430] transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 text-[#0B5D3B] shrink-0" />
                  <span className="text-sm">Zakarasma@umrahtaxi.com</span>
                </a>
              </li>
              <li>
                <a href="https://maps.app.goo.gl/w47SGshx3WfPcx46A" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-gray-400 hover:text-[#F4C430] transition-colors">
                  <MapPin className="w-4 h-4 mt-0.5 text-[#F4C430] shrink-0" />
                  <span className="text-sm flex items-center gap-1">
                    {lang === 'ar' ? 'مكة المكرمة، السعودية' : lang === 'ur' ? 'مکہ مکرمہ، سعودی عرب' : lang === 'tr' ? 'Mekke, Suudi Arabistan' : 'Makkah, Saudi Arabia'}
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Zakarasma Umrah Taxi. {t.footer_rights}
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">{t.footer_privacy}</a>
            <a href="#" className="text-gray-500 text-xs hover:text-gray-300 transition-colors">{t.footer_terms}</a>
            <Link to="/admin" className="flex items-center gap-1 text-gray-700 text-xs hover:text-gray-500 transition-colors">
              <Lock className="w-3 h-3" />
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
