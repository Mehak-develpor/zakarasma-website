import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
  LayoutDashboard, CalendarCheck, Car, Star, Settings, LogOut, Menu, X, ChevronRight, DollarSign
} from 'lucide-react';

import AdminDashboardHome from './AdminDashboardHome';
import AdminBookings from './AdminBookings';
import AdminVehicles from './AdminVehicles';
import AdminFares from './AdminFares';
import AdminTestimonials from './AdminTestimonials';
import AdminSettings from './AdminSettings';

const nav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { to: '/admin/fares', label: 'Fares & Routes', icon: DollarSign },
  { to: '/admin/vehicles', label: 'Vehicles', icon: Car },
  { to: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setSidebarOpen(false), [location]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const isActive = (item: { to: string; exact?: boolean }) =>
    item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-white/10 z-40 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute w-8 h-8 bg-gradient-to-br from-gray-900 to-black border-2 border-[#F4C430] rounded-sm transform rotate-12" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-t-full bg-gradient-to-b from-[#0B5D3B] to-[#0B5D3B]/50" />
            <span className="relative text-[#F4C430] font-black text-sm mt-1">Z</span>
          </div>
          <div>
            <div className="text-white text-sm font-bold">Admin Panel</div>
            <div className="text-gray-500 text-xs">Zakarasma UT</div>
          </div>
          <button
            className="ml-auto lg:hidden text-gray-400"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-[#F4C430]/10 text-[#F4C430]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
                {active && <ChevronRight className="w-3 h-3 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white text-sm mb-1">
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-gray-950/95 backdrop-blur border-b border-white/10 flex items-center px-4 h-14">
          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="text-white font-semibold text-sm ml-2 lg:ml-0">
            {nav.find(isActive)?.label || 'Admin'}
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6">
          <Routes>
            <Route index element={<AdminDashboardHome />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="fares" element={<AdminFares />} />
            <Route path="vehicles" element={<AdminVehicles />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
