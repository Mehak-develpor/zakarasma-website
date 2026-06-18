import { useState, useEffect } from 'react';
import { Save, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

      if (error) throw error;
      const settingsMap: Record<string, string> = {};
      data?.forEach((item: any) => {
        settingsMap[item.key] = item.value;
      });
      setSettings(settingsMap);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updates = Object.entries(settings).map(([key, value]) => ({
        key,
        value,
        updated_at: new Date().toISOString(),
      }));

      for (const update of updates) {
        await supabase
          .from('site_settings')
          .upsert(update, { onConflict: 'key' });
      }

      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-12 h-12 border-4 border-[#F4C430] border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Site Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Contact Information</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                placeholder="+966 50 000 0000"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Phone className="w-4 h-4" />
                WhatsApp Number
              </label>
              <input
                type="text"
                value={settings.whatsapp || ''}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                placeholder="+966500000000"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
                placeholder="info@zakarasma.com"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <MapPin className="w-4 h-4" />
                Address
              </label>
              <input
                type="text"
                value={settings.address || ''}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Social Media Links</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Globe className="w-4 h-4" />
                Facebook URL
              </label>
              <input
                type="url"
                value={settings.facebook_url || ''}
                onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Globe className="w-4 h-4" />
                Twitter/X URL
              </label>
              <input
                type="url"
                value={settings.twitter_url || ''}
                onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Globe className="w-4 h-4" />
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram_url || ''}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Globe className="w-4 h-4" />
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.youtube_url || ''}
                onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center px-6 py-3 bg-[#F4C430] text-black font-semibold rounded-lg hover:shadow-lg disabled:opacity-50"
        >
          {saving ? (
            <div className="animate-spin w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
