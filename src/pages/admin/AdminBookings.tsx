import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Eye, CheckCircle, XCircle, Phone, MapPin, Calendar, Users, Car } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Booking {
  id: string;
  name: string;
  country: string;
  phone: string | null;
  whatsapp: string;
  pickup_location: string;
  destination: string;
  booking_date: string;
  booking_time: string;
  passengers: number;
  vehicle_type: string;
  message: string | null;
  status: string;
  created_at: string;
}

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      fetchBookings();
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.pickup_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-amber-500/20 text-amber-400',
      confirmed: 'bg-blue-500/20 text-blue-400',
      completed: 'bg-[#0B5D3B]/20 text-[#0B5D3B]',
      cancelled: 'bg-red-500/20 text-red-400',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Bookings Management</h1>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#F4C430] focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#F4C430] focus:outline-none"
          >
            <option value="all" className="bg-gray-900">All Status</option>
            <option value="pending" className="bg-gray-900">Pending</option>
            <option value="confirmed" className="bg-gray-900">Confirmed</option>
            <option value="completed" className="bg-gray-900">Completed</option>
            <option value="cancelled" className="bg-gray-900">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-[#F4C430] border-t-transparent rounded-full mx-auto" />
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Route</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Vehicle</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredBookings.map((booking) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5"
                  >
                    <td className="px-6 py-4">
                      <div className="text-white font-medium">{booking.name}</div>
                      <div className="text-gray-400 text-sm">{booking.country}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm">{booking.pickup_location}</div>
                      <div className="text-gray-400 text-sm">→ {booking.destination}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm">{booking.booking_date}</div>
                      <div className="text-gray-400 text-sm">{booking.booking_time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white text-sm capitalize">{booking.vehicle_type}</div>
                      <div className="text-gray-400 text-sm">{booking.passengers} passengers</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedBooking(booking)}
                        className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelectedBooking(null)}>
          <motion.div
            className="relative max-w-lg w-full bg-gray-900 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Booking Details</h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#F4C430]" />
                <div>
                  <div className="text-white font-medium">{selectedBooking.name}</div>
                  <div className="text-gray-400 text-sm">{selectedBooking.country}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#F4C430]" />
                <div>
                  <div className="text-white">WhatsApp: {selectedBooking.whatsapp}</div>
                  {selectedBooking.phone && <div className="text-gray-400 text-sm">Phone: {selectedBooking.phone}</div>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#0B5D3B]" />
                <div>
                  <div className="text-white">{selectedBooking.pickup_location} → {selectedBooking.destination}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#F4C430]" />
                <div>
                  <div className="text-white">{selectedBooking.booking_date} at {selectedBooking.booking_time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-[#F4C430]" />
                <div>
                  <div className="text-white capitalize">{selectedBooking.vehicle_type}</div>
                  <div className="text-gray-400 text-sm">{selectedBooking.passengers} passengers</div>
                </div>
              </div>

              {selectedBooking.message && (
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-gray-400 text-sm mb-1">Message:</div>
                  <div className="text-white">{selectedBooking.message}</div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusBadge(selectedBooking.status)}`}>
                  {selectedBooking.status.toUpperCase()}
                </span>

                <div className="flex gap-2">
                  {selectedBooking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed')}
                        className="px-4 py-2 bg-[#0B5D3B] text-white rounded-lg hover:bg-[#0B5D3B]/80"
                      >
                        <CheckCircle className="w-4 h-4 inline mr-1" />
                        Confirm
                      </button>
                      <button
                        onClick={() => updateBookingStatus(selectedBooking.id, 'cancelled')}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500/80"
                      >
                        <XCircle className="w-4 h-4 inline mr-1" />
                        Cancel
                      </button>
                    </>
                  )}
                  {selectedBooking.status === 'confirmed' && (
                    <button
                      onClick={() => updateBookingStatus(selectedBooking.id, 'completed')}
                      className="px-4 py-2 bg-[#F4C430] text-black rounded-lg hover:bg-[#e6b52e]"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
