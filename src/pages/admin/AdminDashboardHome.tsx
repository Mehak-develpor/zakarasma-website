import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { CalendarCheck, Clock, CheckCircle, Truck, XCircle, TrendingUp } from 'lucide-react';

interface Stats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  today: number;
}

const AdminDashboardHome = () => {
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0, today: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const today = new Date().toISOString().split('T')[0];
    const [all, recent] = await Promise.all([
      supabase.from('bookings').select('status, booking_date'),
      supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(5),
    ]);

    if (all.data) {
      const rows = all.data;
      setStats({
        total: rows.length,
        pending: rows.filter(r => r.status === 'pending').length,
        confirmed: rows.filter(r => r.status === 'confirmed').length,
        completed: rows.filter(r => r.status === 'completed').length,
        cancelled: rows.filter(r => r.status === 'cancelled').length,
        today: rows.filter(r => r.booking_date === today).length,
      });
    }
    if (recent.data) setRecentBookings(recent.data);
    setLoading(false);
  };

  const cards = [
    { label: 'Total Bookings', value: stats.total, icon: CalendarCheck, color: '#F4C430', bg: 'bg-[#F4C430]/10' },
    { label: "Today's Bookings", value: stats.today, icon: TrendingUp, color: '#0B5D3B', bg: 'bg-[#0B5D3B]/10' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b', bg: 'bg-yellow-400/10' },
    { label: 'Confirmed', value: stats.confirmed, icon: CheckCircle, color: '#0B5D3B', bg: 'bg-[#0B5D3B]/10' },
    { label: 'Completed', value: stats.completed, icon: Truck, color: '#F4C430', bg: 'bg-[#F4C430]/10' },
    { label: 'Cancelled', value: stats.cancelled, icon: XCircle, color: '#ef4444', bg: 'bg-red-400/10' },
  ];

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-400/10 text-yellow-400',
      confirmed: 'bg-[#0B5D3B]/10 text-[#0B5D3B]',
      completed: 'bg-[#F4C430]/10 text-[#F4C430]',
      cancelled: 'bg-red-400/10 text-red-400',
    };
    return map[status] || 'bg-gray-500/10 text-gray-400';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin w-8 h-8 border-2 border-[#F4C430] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-white font-bold text-xl mb-6">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-black rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400 text-xs">{card.label}</span>
                <div className={`w-8 h-8 ${card.bg} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-4 h-4" style={{ color: card.color }} />
                </div>
              </div>
              <div className="text-2xl font-black text-white">{card.value}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-black rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <h3 className="text-white font-semibold text-sm">Recent Bookings</h3>
          <a href="/admin/bookings" className="text-[#F4C430] text-xs hover:underline">View all</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">Name</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3 hidden sm:table-cell">Route</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3 hidden md:table-cell">Date</th>
                <th className="text-left text-gray-500 text-xs font-medium px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 text-white text-xs font-medium">{b.name}</td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden sm:table-cell">
                    {b.pickup_location} → {b.destination}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs hidden md:table-cell" dir="ltr">{b.booking_date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${statusBadge(b.status)}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentBookings.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-gray-500 text-sm">No bookings yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
