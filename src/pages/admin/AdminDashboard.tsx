import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Routes, Route } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Car,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Menu,
  X,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import AdminBookings from './AdminBookings';
import AdminVehicles from './AdminVehicles';
import AdminTestimonials from './AdminTestimonials';
import AdminSettings from './AdminSettings';

interface Stats {
  pendingBookings: number;
  totalBookings: number;
  unreadInquiries: number;
  approvedTestimonials: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState<Stats>({
    pendingBookings: 0,
    totalBookings: 0,
    unreadInquiries: 0,
    approvedTestimonials: 0,
  });
  const [currentPath, setCurrentPath] = useState('/admin');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [bookingsResult, inquiriesResult, testimonialsResult] = await Promise.all([
        supabase.from('bookings').select('id, status', { count: 'exact' }),
        supabase.from('inquiries').select('id', { count: 'exact' }).eq('status', 'unread'),
        supabase.from('testimonials').select('id', { count: 'exact' }).eq('is_approved', true),
      ]);

      setStats({
        pendingBookings: bookingsResult.data?.filter((b: any) => b.status === 'pending').length || 0,
        totalBookings: bookingsResult.count || 0,
        unreadInquiries: inquiriesResult.count || 0,
        approvedTestimonials: testimonialsResult.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Bookings', path: '/admin/bookings', badge: stats.pendingBookings },
    { icon: Car, label: 'Vehicles', path: '/admin/vehicles' },
    { icon: MessageSquare, label: 'Inquiries', path: '/admin/inquiries', badge: stats.unreadInquiries },
    { icon: Star, label: 'Testimonials', path: '/admin/testimonials' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: number; icon: any; color: string }) => (
    <motion.div
      className="p-6 bg-white/5 border border-white/10 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:relative z-50 h-screen bg-gray-900 border-r border-white/10 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-20'
        }`}
      >
        <div className="h-full overflow-hidden">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F4C430] to-[#0B5D3B] flex items-center justify-center">
                <span className="text-black font-bold text-lg">Z</span>
              </div>
              {sidebarOpen && <span className="text-white font-bold">Admin Panel</span>}
            </div>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  setCurrentPath(item.path);
                  navigate(item.path);
                }}
                className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl transition-all ${
                  currentPath === item.path
                    ? 'bg-[#F4C430] text-black'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left rtl:text-right">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className={`px-2 py-0.5 rounded-full text-xs ${currentPath === item.path ? 'bg-black/20' : 'bg-[#F4C430] text-black'}`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
            >
              <LogOut className="w-5 h-5" />
              {sidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-gray-900/50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-[#F4C430] flex items-center justify-center text-black font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route path="/" element={
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard
                    title="Pending Bookings"
                    value={stats.pendingBookings}
                    icon={Clock}
                    color="bg-amber-500/20 text-amber-400"
                  />
                  <StatCard
                    title="Total Bookings"
                    value={stats.totalBookings}
                    icon={CheckCircle}
                    color="bg-[#0B5D3B]/20 text-[#0B5D3B]"
                  />
                  <StatCard
                    title="Unread Inquiries"
                    value={stats.unreadInquiries}
                    icon={AlertCircle}
                    color="bg-red-500/20 text-red-400"
                  />
                  <StatCard
                    title="Testimonials"
                    value={stats.approvedTestimonials}
                    icon={Star}
                    color="bg-[#F4C430]/20 text-[#F4C430]"
                  />
                </div>

                {/* Quick Actions */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => navigate('/admin/bookings')}
                    className="p-6 bg-white/5 border border-white/10 rounded-xl text-left hover:border-[#F4C430]/30 transition-all group"
                  >
                    <Users className="w-8 h-8 text-[#F4C430] mb-4" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#F4C430]">Manage Bookings</h3>
                    <p className="text-gray-400 text-sm mt-1">View and manage all customer bookings</p>
                  </button>

                  <button
                    onClick={() => navigate('/admin/vehicles')}
                    className="p-6 bg-white/5 border border-white/10 rounded-xl text-left hover:border-[#F4C430]/30 transition-all group"
                  >
                    <Car className="w-8 h-8 text-[#0B5D3B] mb-4" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#F4C430]">Manage Vehicles</h3>
                    <p className="text-gray-400 text-sm mt-1">Add, edit, or remove vehicles</p>
                  </button>

                  <button
                    onClick={() => navigate('/admin/testimonials')}
                    className="p-6 bg-white/5 border border-white/10 rounded-xl text-left hover:border-[#F4C430]/30 transition-all group"
                  >
                    <Star className="w-8 h-8 text-[#F4C430] mb-4" />
                    <h3 className="text-lg font-semibold text-white group-hover:text-[#F4C430]">Testimonials</h3>
                    <p className="text-gray-400 text-sm mt-1">Approve and manage reviews</p>
                  </button>
                </div>
              </div>
            } />
            <Route path="/bookings" element={<AdminBookings />} />
            <Route path="/vehicles" element={<AdminVehicles />} />
            <Route path="/testimonials" element={<AdminTestimonials />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="/inquiries" element={<AdminBookings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
