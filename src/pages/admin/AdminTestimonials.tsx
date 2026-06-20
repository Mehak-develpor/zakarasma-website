import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Check, Trash2, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text_en: string;
  text_ar?: string;
  text_ur?: string;
  is_approved: boolean;
  created_at: string;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('all');

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (data) setTestimonials(data);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const toggleApprove = async (id: string, current: boolean) => {
    await supabase.from('testimonials').update({ is_approved: !current }).eq('id', id);
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, is_approved: !current } : t));
  };

  const del = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const displayed = testimonials.filter(t =>
    filter === 'all' ? true : filter === 'approved' ? t.is_approved : !t.is_approved
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-white font-bold text-xl">Testimonials</h2>
        <div className="flex gap-1 bg-black border border-white/10 rounded-lg p-1">
          {(['all', 'approved', 'pending'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded capitalize transition-all ${filter === f ? 'bg-[#F4C430] text-black font-semibold' : 'text-gray-400 hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin w-8 h-8 border-2 border-[#F4C430] border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="space-y-4">
          {displayed.length === 0 && (
            <div className="text-center py-12 text-gray-500">No testimonials found</div>
          )}
          {displayed.map(t => (
            <div key={t.id} className={`bg-black rounded-xl border p-4 ${t.is_approved ? 'border-[#0B5D3B]/20' : 'border-white/10'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{t.name}</span>
                    <span className="text-gray-500 text-xs">{t.location}</span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-[#F4C430] fill-[#F4C430]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{t.text_en}</p>
                  {t.text_ar && <p className="text-gray-500 text-xs mt-1" dir="rtl">{t.text_ar}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => toggleApprove(t.id, t.is_approved)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      t.is_approved
                        ? 'bg-[#0B5D3B]/10 text-[#0B5D3B] hover:bg-red-500/10 hover:text-red-400'
                        : 'bg-[#0B5D3B]/10 text-[#0B5D3B] hover:bg-[#0B5D3B]/20'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    {t.is_approved ? 'Approved' : 'Approve'}
                  </button>
                  <button
                    onClick={() => del(t.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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

export default AdminTestimonials;
