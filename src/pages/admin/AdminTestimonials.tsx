import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, X, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text_en: string;
  text_ar: string | null;
  text_ur: string | null;
  is_approved: boolean;
  created_at: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleApproval = async (testimonial: Testimonial) => {
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_approved: !testimonial.is_approved })
        .eq('id', testimonial.id);

      if (error) throw error;
      fetchTestimonials();
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
      fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === 'pending') return !t.is_approved;
    if (filter === 'approved') return t.is_approved;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Testimonials Management</h1>

        <div className="flex gap-2">
          {['all', 'pending', 'approved'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as 'all' | 'pending' | 'approved')}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === f ? 'bg-[#F4C430] text-black' : 'bg-white/5 text-gray-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin w-12 h-12 border-4 border-[#F4C430] border-t-transparent rounded-full mx-auto" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className={`p-6 rounded-xl border ${
                testimonial.is_approved
                  ? 'bg-white/5 border-white/10'
                  : 'bg-amber-500/5 border-amber-500/20'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-gray-400 text-sm">{testimonial.location}</p>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating ? 'fill-[#F4C430] text-[#F4C430]' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-gray-300 italic">"{testimonial.text_en}"</p>
                {testimonial.text_ar && (
                  <p className="text-gray-400 text-sm" dir="rtl">"{testimonial.text_ar}"</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className={`px-3 py-1 rounded-full text-xs ${
                  testimonial.is_approved
                    ? 'bg-[#0B5D3B]/20 text-[#0B5D3B]'
                    : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {testimonial.is_approved ? 'Approved' : 'Pending'}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleApproval(testimonial)}
                    className={`px-3 py-2 rounded-lg ${
                      testimonial.is_approved
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-[#0B5D3B]/20 text-[#0B5D3B]'
                    }`}
                  >
                    {testimonial.is_approved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
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

export default AdminTestimonials;
