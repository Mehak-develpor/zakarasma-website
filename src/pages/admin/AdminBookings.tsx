import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, RefreshCw, Search, ChevronDown } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  country: string;
  phone?: string;
  whatsapp: string;
  pickup_location: string;
  destination: string;
  booking_date: string;
  booking_time: string;
  passengers: number;
  vehicle_type: string;
  message?: string;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'];

const statusColor: Record<string, string> = {
  pending: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  confirmed: 'bg-[#0B5D3B]/10 text-[#0B5D3B] border-[#0B5D3B]/20',
  completed: 'bg-[#F4C430]/10 text-[#F4C430] border-[#F4C430]/20',
  cancelled: 'bg-red-400/10 text-red-400 border-red-400/20',
};

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filtered, setFiltered] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (data) {
      setBookings(data);
      setFiltered(data);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  useEffect(() => {
    let rows = bookings;
    if (filter !== 'all') rows = rows.filter(b => b.status === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(b =>
        b.name.toLowerCase().includes(q) ||
        b.phone?.toLowerCase().includes(q) ||
        b.whatsapp.toLowerCase().includes(q) ||
        b.pickup_location.toLowerCase().includes(q) ||
        b.destination.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    }
    setFiltered(rows);
  }, [bookings, search, filter]);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return;
    await supabase.from('bookings').delete().eq('id', id);
    setBookings(prev => prev.filter(b => b.id !== id));
    setExpanded(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-bold text-xl">Bookings</h2>
        <button
          onClick={fetchBookings}
          className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-gray-400 hover:text-white text-sm transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name, phone, route..."
            className="w-full pl-9 pr-4 py-2.5 bg-black border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F4C430] transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2.5 bg-black border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#F4C430]"
        >
          <option value="all">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin w-8 h-8 border-2 border-[#F4C430] border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">No bookings found</div>
          )}
          {filtered.map((b) => (
            <div key={b.id} className="bg-black rounded-xl border border-white/10 overflow-hidden">
              {/* Row */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/2"
                onClick={() => setExpanded(expanded === b.id ? null : b.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold text-sm">{b.name}</span>
                    <span className="text-gray-500 text-xs" dir="ltr">{b.country}</span>
                  </div>
                  <div className="text-gray-400 text-xs truncate">{b.pickup_location} → {b.destination}</div>
                </div>
                <div className="hidden sm:block text-gray-400 text-xs text-right shrink-0" dir="ltr">
                  <div>{b.booking_date}</div>
                  <div>{b.booking_time}</div>
                </div>
                <span className={`hidden sm:inline px-2 py-0.5 rounded border text-xs font-medium capitalize shrink-0 ${statusColor[b.status]}`}>
                  {b.status}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${expanded === b.id ? 'rotate-180' : ''}`} />
              </div>

              {/* Expanded */}
              {expanded === b.id && (
                <div className="border-t border-white/10 px-4 py-4">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 text-xs">
                    {[
                      ['Booking ID', b.id.slice(0, 8).toUpperCase()],
                      ['WhatsApp', b.whatsapp],
                      ['Phone', b.phone || '-'],
                      ['Vehicle', b.vehicle_type],
                      ['Passengers', b.passengers.toString()],
                      ['Date', `${b.booking_date} ${b.booking_time}`],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <span className="text-gray-500">{label}: </span>
                        <span className="text-white" dir="ltr">{value}</span>
                      </div>
                    ))}
                    {b.message && (
                      <div className="sm:col-span-2 lg:col-span-3">
                        <span className="text-gray-500">Message: </span>
                        <span className="text-white">{b.message}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(b.id, s)}
                        disabled={b.status === s}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
                          b.status === s
                            ? `${statusColor[s]} cursor-default`
                            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {s === b.status ? `✓ ${s}` : `Mark ${s}`}
                      </button>
                    ))}
                    <button
                      onClick={() => deleteBooking(b.id)}
                      className="ml-auto px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs hover:bg-red-500/20 transition-all flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
