import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react';

interface Fare {
  id: string;
  route_name: string;
  route_name_ar?: string;
  route_name_ur?: string;
  route_name_tr?: string;
  from_location: string;
  to_location: string;
  price_min: number;
  price_max: number;
  currency: string;
  vehicle_category: string;
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
}

const EMPTY: Omit<Fare, 'id'> = {
  route_name: '', route_name_ar: '', route_name_ur: '', route_name_tr: '',
  from_location: '', to_location: '', price_min: 0, price_max: 0,
  currency: 'SAR', vehicle_category: 'sedan', is_popular: false, is_active: true, sort_order: 0,
};

const vehicleCategories = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'van', label: 'Van/Minibus' },
  { value: 'bus', label: 'Bus' },
];

const AdminFares = () => {
  const [fares, setFares] = useState<Fare[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<Omit<Fare, 'id'>>(EMPTY);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('fares').select('*').order('sort_order');
    if (data) setFares(data);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const startEdit = (f: Fare) => {
    setEditingId(f.id);
    setForm({
      route_name: f.route_name,
      route_name_ar: f.route_name_ar || '',
      route_name_ur: f.route_name_ur || '',
      route_name_tr: f.route_name_tr || '',
      from_location: f.from_location,
      to_location: f.to_location,
      price_min: f.price_min,
      price_max: f.price_max,
      currency: f.currency,
      vehicle_category: f.vehicle_category,
      is_popular: f.is_popular,
      is_active: f.is_active,
      sort_order: f.sort_order,
    });
  };

  const save = async () => {
    if (!form.route_name.trim() || !form.from_location.trim() || !form.to_location.trim()) return;
    if (editingId === 'new') {
      await supabase.from('fares').insert([form]);
    } else {
      await supabase.from('fares').update(form).eq('id', editingId);
    }
    setEditingId(null);
    fetch();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this fare/route?')) return;
    await supabase.from('fares').delete().eq('id', id);
    fetch();
  };

  const inputCls = 'w-full px-3 py-2 bg-gray-950 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F4C430] transition-colors';

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-bold text-xl">Fares & Routes</h2>
        <button
          onClick={() => { setEditingId('new'); setForm(EMPTY); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#F4C430] text-black font-semibold rounded-lg text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Route
        </button>
      </div>

      {/* Add/Edit Form */}
      {editingId !== null && (
        <div className="bg-black border border-[#F4C430]/20 rounded-xl p-5 mb-5">
          <h3 className="text-white font-semibold text-sm mb-4">{editingId === 'new' ? 'Add New Route/Fare' : 'Edit Route/Fare'}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <input value={form.route_name} onChange={e => setForm(p => ({ ...p, route_name: e.target.value }))} placeholder="Route Name (English) *" className={inputCls} />
            <input value={form.route_name_ar} onChange={e => setForm(p => ({ ...p, route_name_ar: e.target.value }))} placeholder="Route Name (Arabic)" className={inputCls} dir="rtl" />
            <input value={form.route_name_ur} onChange={e => setForm(p => ({ ...p, route_name_ur: e.target.value }))} placeholder="Route Name (Urdu)" className={inputCls} dir="rtl" />
            <input value={form.route_name_tr} onChange={e => setForm(p => ({ ...p, route_name_tr: e.target.value }))} placeholder="Route Name (Turkish)" className={inputCls} />
            <input value={form.from_location} onChange={e => setForm(p => ({ ...p, from_location: e.target.value }))} placeholder="From Location *" className={inputCls} />
            <input value={form.to_location} onChange={e => setForm(p => ({ ...p, to_location: e.target.value }))} placeholder="To Location *" className={inputCls} />
            <input type="number" value={form.price_min} onChange={e => setForm(p => ({ ...p, price_min: parseInt(e.target.value) || 0 }))} placeholder="Min Price *" className={inputCls} />
            <input type="number" value={form.price_max} onChange={e => setForm(p => ({ ...p, price_max: parseInt(e.target.value) || 0 }))} placeholder="Max Price *" className={inputCls} />
            <select value={form.currency} onChange={e => setForm(p => ({ ...p, currency: e.target.value }))} className={inputCls}>
              <option value="SAR">SAR</option>
              <option value="USD">USD</option>
            </select>
            <select value={form.vehicle_category} onChange={e => setForm(p => ({ ...p, vehicle_category: e.target.value }))} className={inputCls}>
              {vehicleCategories.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
            <input type="number" value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} placeholder="Sort Order" className={inputCls} />
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-gray-400 text-sm">
                <input type="checkbox" checked={form.is_popular} onChange={e => setForm(p => ({ ...p, is_popular: e.target.checked }))} className="accent-[#F4C430]" />
                Popular
              </label>
              <label className="flex items-center gap-2 text-gray-400 text-sm">
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} className="accent-[#F4C430]" />
                Active
              </label>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={save} className="flex items-center gap-2 px-4 py-2 bg-[#F4C430] text-black font-semibold rounded-lg text-sm">
              <Check className="w-4 h-4" /> Save
            </button>
            <button onClick={() => setEditingId(null)} className="flex items-center gap-2 px-4 py-2 bg-white/5 text-gray-400 rounded-lg text-sm hover:text-white">
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin w-8 h-8 border-2 border-[#F4C430] border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="bg-black rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Route</th>
                <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">From → To</th>
                <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Price</th>
                <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Category</th>
                <th className="text-left text-gray-400 text-xs font-medium px-4 py-3">Status</th>
                <th className="text-right text-gray-400 text-xs font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fares.map(f => (
                <tr key={f.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="text-white text-sm font-medium">{f.route_name}</div>
                    {f.route_name_ar && <div className="text-gray-500 text-xs" dir="rtl">{f.route_name_ar}</div>}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{f.from_location} → {f.to_location}</td>
                  <td className="px-4 py-3 text-[#F4C430] font-semibold text-sm">
                    {f.price_min === f.price_max ? f.price_min : `${f.price_min}–${f.price_max}`} {f.currency}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{f.vehicle_category}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {f.is_popular && <span className="px-2 py-0.5 rounded text-xs font-medium bg-[#F4C430]/10 text-[#F4C430]">Popular</span>}
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${f.is_active ? 'bg-[#0B5D3B]/10 text-[#0B5D3B]' : 'bg-red-400/10 text-red-400'}`}>
                        {f.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => startEdit(f)} className="p-1.5 text-gray-400 hover:text-[#F4C430] transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => del(f.id)} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminFares;
