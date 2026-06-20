import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Pencil, Trash2, Plus, X, Check } from 'lucide-react';

interface Vehicle {
  id: string;
  name: string;
  name_ar?: string;
  name_ur?: string;
  name_tr?: string;
  description?: string;
  description_ar?: string;
  description_ur?: string;
  description_tr?: string;
  capacity: number;
  luggage: number;
  image_url?: string;
  is_available: boolean;
  sort_order: number;
}

const EMPTY: Omit<Vehicle, 'id'> = {
  name: '', name_ar: '', name_ur: '', name_tr: '', description: '', description_ar: '', description_ur: '', description_tr: '',
  capacity: 4, luggage: 2, image_url: '', is_available: true, sort_order: 0,
};

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [form, setForm] = useState<Omit<Vehicle, 'id'>>(EMPTY);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('vehicles').select('*').order('sort_order');
    if (data) setVehicles(data);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const startEdit = (v: Vehicle) => {
    setEditingId(v.id);
    setForm({
      name: v.name, name_ar: v.name_ar || '', name_ur: v.name_ur || '', name_tr: v.name_tr || '',
      description: v.description || '', description_ar: v.description_ar || '', description_ur: v.description_ur || '', description_tr: v.description_tr || '',
      capacity: v.capacity, luggage: v.luggage, image_url: v.image_url || '', is_available: v.is_available, sort_order: v.sort_order
    });
  };

  const save = async () => {
    if (!form.name.trim()) return;
    if (editingId === 'new') {
      await supabase.from('vehicles').insert([form]);
    } else {
      await supabase.from('vehicles').update(form).eq('id', editingId);
    }
    setEditingId(null);
    fetch();
  };

  const del = async (id: string) => {
    if (!confirm('Delete this vehicle?')) return;
    await supabase.from('vehicles').delete().eq('id', id);
    fetch();
  };

  const inputCls = 'w-full px-3 py-2 bg-gray-950 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F4C430] transition-colors';

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-bold text-xl">Vehicles</h2>
        <button
          onClick={() => { setEditingId('new'); setForm(EMPTY); }}
          className="flex items-center gap-2 px-4 py-2 bg-[#F4C430] text-black font-semibold rounded-lg text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>

      {/* Add/Edit Form */}
      {editingId !== null && (
        <div className="bg-black border border-[#F4C430]/20 rounded-xl p-5 mb-5">
          <h3 className="text-white font-semibold text-sm mb-4">{editingId === 'new' ? 'Add New Vehicle' : 'Edit Vehicle'}</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Name (English) *" className={inputCls} />
            <input value={form.name_ar} onChange={e => setForm(p => ({ ...p, name_ar: e.target.value }))} placeholder="Name (Arabic)" className={inputCls} dir="rtl" />
            <input value={form.name_ur} onChange={e => setForm(p => ({ ...p, name_ur: e.target.value }))} placeholder="Name (Urdu)" className={inputCls} dir="rtl" />
            <input value={form.name_tr} onChange={e => setForm(p => ({ ...p, name_tr: e.target.value }))} placeholder="Name (Turkish)" className={inputCls} />
            <input value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Description (English)" className={`${inputCls} sm:col-span-2`} />
            <input value={form.description_ar} onChange={e => setForm(p => ({ ...p, description_ar: e.target.value }))} placeholder="Description (Arabic)" className={inputCls} dir="rtl" />
            <input value={form.description_ur} onChange={e => setForm(p => ({ ...p, description_ur: e.target.value }))} placeholder="Description (Urdu)" className={inputCls} dir="rtl" />
            <input value={form.description_tr} onChange={e => setForm(p => ({ ...p, description_tr: e.target.value }))} placeholder="Description (Turkish)" className={inputCls} />
            <input type="number" value={form.capacity} onChange={e => setForm(p => ({ ...p, capacity: parseInt(e.target.value) || 4 }))} placeholder="Capacity" className={inputCls} />
            <input type="number" value={form.luggage} onChange={e => setForm(p => ({ ...p, luggage: parseInt(e.target.value) || 2 }))} placeholder="Luggage" className={inputCls} />
            <input value={form.image_url} onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))} placeholder="Image URL" className={`${inputCls} sm:col-span-2`} />
            <input type="number" value={form.sort_order} onChange={e => setForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} placeholder="Sort Order" className={inputCls} />
            <label className="flex items-center gap-2 text-gray-400 text-sm">
              <input type="checkbox" checked={form.is_available} onChange={e => setForm(p => ({ ...p, is_available: e.target.checked }))} className="accent-[#F4C430]" />
              Available
            </label>
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map(v => (
            <div key={v.id} className="bg-black rounded-xl border border-white/10 overflow-hidden">
              {v.image_url && (
                <img src={v.image_url} alt={v.name} className="w-full h-40 object-cover" />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-white font-semibold text-sm">{v.name}</h3>
                    {v.name_ar && <p className="text-gray-500 text-xs" dir="rtl">{v.name_ar}</p>}
                  </div>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${v.is_available ? 'bg-[#0B5D3B]/10 text-[#0B5D3B]' : 'bg-red-400/10 text-red-400'}`}>
                    {v.is_available ? 'Active' : 'Hidden'}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mb-3">{v.description}</p>
                <div className="flex gap-3 text-gray-500 text-xs mb-3">
                  <span>{v.capacity} pax</span>
                  <span>{v.luggage} bags</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(v)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-gray-400 rounded-lg text-xs hover:text-white transition-colors">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => del(v.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVehicles;
