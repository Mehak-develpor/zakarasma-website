import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Clock, XCircle, Truck, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useLanguage } from '../i18n/LanguageContext';

interface Booking {
  id: string;
  name: string;
  pickup_location: string;
  destination: string;
  booking_date: string;
  booking_time: string;
  vehicle_type: string;
  passengers: number;
  status: string;
  created_at: string;
}

type StatusLabels = { en: string; ar: string; ur: string; tr: string };

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string; label: StatusLabels }> = {
  pending: {
    icon: Clock,
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/20',
    label: { en: 'Pending', ar: 'في الانتظار', ur: 'زیر التواء', tr: 'Beklemede' },
  },
  confirmed: {
    icon: CheckCircle,
    color: 'text-[#0B5D3B]',
    bg: 'bg-[#0B5D3B]/10 border-[#0B5D3B]/20',
    label: { en: 'Confirmed', ar: 'مؤكد', ur: 'تصدیق شدہ', tr: 'Onaylandı' },
  },
  completed: {
    icon: Truck,
    color: 'text-[#F4C430]',
    bg: 'bg-[#F4C430]/10 border-[#F4C430]/20',
    label: { en: 'Completed', ar: 'مكتمل', ur: 'مکمل', tr: 'Tamamlandı' },
  },
  cancelled: {
    icon: XCircle,
    color: 'text-red-400',
    bg: 'bg-red-400/10 border-red-400/20',
    label: { en: 'Cancelled', ar: 'ملغي', ur: 'منسوخ', tr: 'İptal Edildi' },
  },
};

const TrackBookingPage = () => {
  const { lang } = useLanguage();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'id' | 'phone'>('id');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [searchStatus, setSearchStatus] = useState<'idle' | 'loading' | 'found' | 'notfound'>('idle');

  useEffect(() => {
    document.title = `Track Booking | Zakarasma Tour & Taxi`;
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchStatus('loading');
    setBooking(null);

    let q = supabase.from('bookings').select('*');
    if (searchType === 'id') {
      q = q.ilike('id', `${query.trim()}%`);
    } else {
      q = q.or(`phone.eq.${query.trim()},whatsapp.eq.${query.trim()}`);
    }

    const { data } = await q.order('created_at', { ascending: false }).limit(1).maybeSingle();
    if (data) {
      setBooking(data);
      setSearchStatus('found');
    } else {
      setSearchStatus('notfound');
    }
  };

  const labels: Record<string, StatusLabels> = {
    title: { en: 'Track Your Booking', ar: 'تتبع حجزك', ur: 'اپنی بکنگ ٹریک کریں', tr: 'Rezervasyonunuzu Takip Edin' },
    subtitle: { en: 'Enter your Booking ID or phone number to check status', ar: 'أدخل رقم الحجز أو رقم الهاتف للتحقق من الحالة', ur: 'اسٹیٹس چیک کرنے کے لیے بکنگ ID یا فون نمبر درج کریں', tr: 'Durumu kontrol etmek için rezervasyon ID veya telefon numarasını girin' },
    searchById: { en: 'By Booking ID', ar: 'برقم الحجز', ur: 'بکنگ ID سے', tr: 'Rezervasyon ID ile' },
    searchByPhone: { en: 'By Phone/WhatsApp', ar: 'برقم الهاتف', ur: 'فون/واٹس اپ سے', tr: 'Telefon/WhatsApp ile' },
    placeholder_id: { en: 'Enter Booking ID (e.g. AB12CD34)', ar: 'أدخل رقم الحجز', ur: 'بکنگ ID درج کریں', tr: 'Rezervasyon ID girin' },
    placeholder_phone: { en: 'Enter phone number', ar: 'أدخل رقم الهاتف', ur: 'فون نمبر درج کریں', tr: 'Telefon numarası girin' },
    search: { en: 'Search', ar: 'بحث', ur: 'تلاش', tr: 'Ara' },
    notfound: { en: 'No booking found. Please check your ID or phone number.', ar: 'لم يتم العثور على حجز. يرجى التحقق من رقم الحجز أو الهاتف.', ur: 'کوئی بکنگ نہیں ملی۔ براہ کرم ID یا فون نمبر چیک کریں۔', tr: 'Rezervasyon bulunamadı. Lütfen ID veya telefon numarasını kontrol edin.' },
    route: { en: 'Route', ar: 'المسار', ur: 'روٹ', tr: 'Güzergah' },
    date: { en: 'Date & Time', ar: 'التاريخ والوقت', ur: 'تاریخ اور وقت', tr: 'Tarih ve Saat' },
    vehicle: { en: 'Vehicle', ar: 'المركبة', ur: 'گاڑی', tr: 'Araç' },
    passengers: { en: 'Passengers', ar: 'الركاب', ur: 'مسافر', tr: 'Yolcu' },
    status: { en: 'Status', ar: 'الحالة', ur: 'اسٹیٹس', tr: 'Durum' },
  };

  const l = (key: string) => labels[key]?.[lang] || labels[key]?.en || key;
  const s = (status: string) => {
    const cfg = statusConfig[status];
    if (!cfg) return status;
    return cfg.label[lang] || cfg.label.en;
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 bg-[#F4C430]/10 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Search className="w-8 h-8 text-[#F4C430]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{l('title')}</h1>
          <p className="text-gray-400 text-sm">{l('subtitle')}</p>
        </motion.div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/3 rounded-2xl border border-white/8 p-6 mb-6"
        >
          {/* Search Type Toggle */}
          <div className="flex gap-2 mb-4">
            {(['id', 'phone'] as const).map((type) => (
              <button
                key={type}
                onClick={() => { setSearchType(type); setSearchStatus('idle'); setBooking(null); }}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  searchType === type
                    ? 'bg-[#F4C430] text-black'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {type === 'id' ? l('searchById') : l('searchByPhone')}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="flex gap-3">
            <input
              type={searchType === 'phone' ? 'tel' : 'text'}
              value={query}
              onChange={e => { setQuery(e.target.value); setSearchStatus('idle'); }}
              placeholder={searchType === 'id' ? l('placeholder_id') : l('placeholder_phone')}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#F4C430] transition-colors"
              dir={searchType === 'phone' ? 'ltr' : undefined}
            />
            <button
              type="submit"
              disabled={searchStatus === 'loading'}
              className="px-6 py-3 bg-[#F4C430] text-black font-semibold rounded-xl hover:bg-[#e6b52e] transition-colors disabled:opacity-60 text-sm"
            >
              {searchStatus === 'loading' ? '...' : l('search')}
            </button>
          </form>
        </motion.div>

        {/* Not Found */}
        {searchStatus === 'notfound' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{l('notfound')}</p>
          </motion.div>
        )}

        {/* Booking Result */}
        {booking && searchStatus === 'found' && (() => {
          const cfg = statusConfig[booking.status as keyof typeof statusConfig] || statusConfig.pending;
          const StatusIcon = cfg.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/3 rounded-2xl border border-white/8 overflow-hidden"
            >
              {/* Status Banner */}
              <div className={`flex items-center gap-3 p-4 border-b ${cfg.bg}`}>
                <StatusIcon className={`w-5 h-5 ${cfg.color} shrink-0`} />
                <div>
                  <span className={`text-sm font-bold ${cfg.color}`}>{s(booking.status)}</span>
                  <p className="text-gray-400 text-xs mt-0.5" dir="ltr">ID: {booking.id.slice(0, 8).toUpperCase()}</p>
                </div>
              </div>

              {/* Details */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{l('route')}</p>
                    <p className="text-white text-sm font-medium">{booking.pickup_location}</p>
                    <p className="text-gray-400 text-xs">→ {booking.destination}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{l('date')}</p>
                    <p className="text-white text-sm font-medium" dir="ltr">{booking.booking_date}</p>
                    <p className="text-gray-400 text-xs" dir="ltr">{booking.booking_time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{l('vehicle')}</p>
                    <p className="text-white text-sm font-medium capitalize">{booking.vehicle_type}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs mb-1">{l('passengers')}</p>
                    <p className="text-white text-sm font-medium">{booking.passengers}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </div>
    </div>
  );
};

export default TrackBookingPage;
