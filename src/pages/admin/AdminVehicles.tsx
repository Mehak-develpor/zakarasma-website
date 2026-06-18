import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Save, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Vehicle {
  id: string;
  name: string;
  name_ar: string | null;
  name_ur: string | null;
  description: string | null;
  description_ar: string | null;
  description_ur: string | null;
  capacity: number;
  luggage: number;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
}

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    name_ar: '',
    name_ur: '',
    description: '',
    description_ar: '',
    description_ur: '',
    capacity: 4,
    luggage: 2,
    image_url: '',
    is_available: true,
    sort_order: 0,
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('sort_order');

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingVehicle) {
        const { error } = await supabase
          .from('vehicles')
          .update(formData)
          .eq('id', editingVehicle.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('vehicles')
          .insert([formData]);
        if (error) throw error;
      }
      fetchVehicles();
      setShowForm(false);
      setEditingVehicle(null);
      setFormData({
        name: '',
        name_ar: '',
        name_ur: '',
        description: '',
        description_ar: '',
        description_ur: '',
        capacity: 4,
        luggage: 2,
        image_url: '',
        is_available: true,
        sort_order: 0,
      });
    } catch (error) {
      console.error('Error saving vehicle:', error);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setFormData({
      name: vehicle.name,
      name_ar: vehicle.name_ar || '',
      name_ur: vehicle.name_ur || '',
      description: vehicle.description || '',
      description_ar: vehicle.description_ar || '',
      description_ur: vehicle.description_ur || '',
      capacity: vehicle.capacity,
      luggage: vehicle.luggage,
      image_url: vehicle.image_url || '',
      is_available: vehicle.is_available,
      sort_order: vehicle.sort_order,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    try {
      const { error } = await supabase.from('vehicles').delete().eq('id', id);
      if (error) throw error;
      fetchVehicles();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
    }
  };

  const toggleAvailability = async (vehicle: Vehicle) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({ is_available: !vehicle.is_available })
        .eq('id', vehicle.id);
      if (error) throw error;
      fetchVehicles();
    } catch (error) {
      console.error('Error updating vehicle:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Vehicles Management</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingVehicle(null);
          }}
          className="flex items-center px-4 py-2 bg-[#F4C430] text-black rounded-lg hover:shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Vehicle
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setShowForm(false)}>
          <motion.div
            className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center sticky top-0 bg-gray-900">
              <h2 className="text-xl font-bold text-white">
                {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name (English)</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name (Arabic)</label>
                  <input
                    type="text"
                    value={formData.name_ar}
                    onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    dir="rtl"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name (Urdu)</label>
                  <input
                    type="text"
                    value={formData.name_ur}
                    onChange={(e) => setFormData({ ...formData, name_ur: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                    min="1"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Luggage Space</label>
                  <input
                    type="number"
                    value={formData.luggage}
                    onChange={(e) => setFormData({ ...formData, luggage: parseInt(e.target.value) })}
                    min="0"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Sort Order</label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_available"
                  checked={formData.is_available}
                  onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="is_available" className="text-gray-300">Available for booking</label>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-[#F4C430] text-black font-semibold rounded-lg"
              >
                <Save className="w-5 h-5 mr-2" />
                {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Vehicle List */}
      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-[#F4C430] border-t-transparent rounded-full mx-auto" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <motion.div
              key={vehicle.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative h-40">
                <img
                  src={vehicle.image_url || 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg'}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded text-xs ${vehicle.is_available ? 'bg-[#0B5D3B] text-white' : 'bg-red-500/50 text-white'}`}>
                    {vehicle.is_available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{vehicle.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{vehicle.capacity} seats • {vehicle.luggage} luggage</p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => toggleAvailability(vehicle)}
                    className={`flex-1 px-3 py-2 rounded-lg ${vehicle.is_available ? 'bg-red-500/20 text-red-400' : 'bg-[#0B5D3B]/20 text-[#0B5D3B]'}`}
                  >
                    {vehicle.is_available ? 'Disable' : 'Enable'}
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle.id)}
                    className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminVehicles;
