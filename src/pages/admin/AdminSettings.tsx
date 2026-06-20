import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Check, Plus, Trash2 } from 'lucide-react';

interface Setting {
  id: string;
  key: string;
  value: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_active: boolean;
  sort_order: number;
}

const settingLabels: Record<string, string> = {
  phone: 'Phone Number',
  whatsapp: 'WhatsApp Number',
  email: 'Primary Email',
  email_secondary: 'Secondary Email',
  google_maps_url: 'Google Maps URL',
  address: 'Business Address',
  facebook_url: 'Facebook URL',
  instagram_url: 'Instagram URL',
  fare_notice: 'Fare Notice (English)',
  fare_notice_ar: 'Fare Notice (Arabic)',
  fare_notice_ur: 'Fare Notice (Urdu)',
  fare_notice_tr: 'Fare Notice (Turkish)',
};

const platformIcons = [
  'Facebook', 'Instagram', 'MessageCircle', 'Mail', 'Twitter', 'Youtube'
];

const AdminSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [pwMsg, setPwMsg] = useState('');
  const [newSocial, setNewSocial] = useState({ platform: '', url: '', icon: 'MessageCircle', sort_order: 0 });

  useEffect(() => {
    const fetch = async () => {
      const { data: settingsData } = await supabase.from('site_settings').select('*');
      if (settingsData) {
        setSettings(settingsData);
        const vals: Record<string, string> = {};
        settingsData.forEach((s: Setting) => { vals[s.key] = s.value || ''; });
        setValues(vals);
      }

      const { data: socialData } = await supabase.from('social_links').select('*').order('sort_order');
      if (socialData) setSocialLinks(socialData);

      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    const updates = settings.map(s => ({
      id: s.id,
      key: s.key,
      value: values[s.key] || '',
      updated_at: new Date().toISOString(),
    }));
    await supabase.from('site_settings').upsert(updates);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePasswordChange = async () => {
    if (!adminPassword || adminPassword.length < 6) {
      setPwMsg('Password must be at least 6 characters.');
      return;
    }
    const { error } = await supabase.auth.updateUser({ email: adminEmail || undefined, password: adminPassword });
    setPwMsg(error ? error.message : 'Credentials updated successfully!');
    setAdminPassword('');
    setTimeout(() => setPwMsg(''), 3000);
  };

  const handleSaveSocial = async () => {
    if (!newSocial.platform || !newSocial.url) return;
    await supabase.from('social_links').upsert([{
      platform: newSocial.platform,
      url: newSocial.url,
      icon: newSocial.icon,
      is_active: true,
      sort_order: newSocial.sort_order,
    }]);
    setNewSocial({ platform: '', url: '', icon: 'MessageCircle', sort_order: 0 });
    const { data } = await supabase.from('social_links').select('*').order('sort_order');
    if (data) setSocialLinks(data);
  };

  const handleDeleteSocial = async (id: string) => {
    if (!confirm('Delete this social link?')) return;
    await supabase.from('social_links').delete().eq('id', id);
    const { data } = await supabase.from('social_links').select('*').order('sort_order');
    if (data) setSocialLinks(data);
  };

  const handleToggleSocial = async (id: string, is_active: boolean) => {
    await supabase.from('social_links').update({ is_active }).eq('id', id);
    const { data } = await supabase.from('social_links').select('*').order('sort_order');
    if (data) setSocialLinks(data);
  };

  const inputCls = 'w-full px-3 py-2.5 bg-gray-950 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#F4C430] transition-colors';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin w-8 h-8 border-2 border-[#F4C430] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl grid gap-6">
      <h2 className="text-white font-bold text-xl">Settings</h2>

      {/* Site Settings */}
      <div className="bg-black rounded-xl border border-white/10 p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Contact Information</h3>
        <div className="space-y-3">
          {Object.keys(settingLabels).map(key => (
            <div key={key}>
              <label className="block text-gray-400 text-xs mb-1.5">{settingLabels[key]}</label>
              <input
                value={values[key] || ''}
                onChange={e => setValues(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={settingLabels[key]}
                className={inputCls}
                dir={key.includes('url') || key.includes('phone') || key.includes('whatsapp') || key.includes('email') ? 'ltr' : undefined}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-[#F4C430] text-black font-semibold rounded-lg text-sm hover:bg-[#e6b52e] transition-colors"
        >
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Settings</>}
        </button>
      </div>

      {/* Social Media Links */}
      <div className="bg-black rounded-xl border border-white/10 p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Social Media Links</h3>
        <div className="space-y-2 mb-4">
          {socialLinks.map(link => (
            <div key={link.id} className="flex items-center gap-3 p-3 bg-white/3 rounded-lg">
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{link.platform}</div>
                <div className="text-gray-500 text-xs truncate">{link.url}</div>
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={link.is_active}
                  onChange={e => handleToggleSocial(link.id, e.target.checked)}
                  className="accent-[#F4C430]"
                />
              </label>
              <button onClick={() => handleDeleteSocial(link.id)} className="text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-4">
          <h4 className="text-gray-400 text-xs mb-3">Add New Social Link</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              value={newSocial.platform}
              onChange={e => setNewSocial(p => ({ ...p, platform: e.target.value }))}
              placeholder="Platform (e.g., Facebook)"
              className={inputCls}
            />
            <input
              value={newSocial.url}
              onChange={e => setNewSocial(p => ({ ...p, url: e.target.value }))}
              placeholder="URL"
              className={inputCls}
            />
            <select
              value={newSocial.icon}
              onChange={e => setNewSocial(p => ({ ...p, icon: e.target.value }))}
              className={inputCls}
            >
              {platformIcons.map(icon => <option key={icon} value={icon}>{icon}</option>)}
            </select>
            <input
              type="number"
              value={newSocial.sort_order}
              onChange={e => setNewSocial(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))}
              placeholder="Sort Order"
              className={inputCls}
            />
          </div>
          <button
            onClick={handleSaveSocial}
            className="mt-3 flex items-center gap-2 px-4 py-2 bg-white/5 text-white font-semibold rounded-lg text-sm hover:bg-white/10 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Social Link
          </button>
        </div>
      </div>

      {/* Admin Credentials */}
      <div className="bg-black rounded-xl border border-white/10 p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Admin Credentials</h3>
        <p className="text-gray-500 text-xs mb-4">Update your admin email or password. Leave a field blank to keep current value.</p>
        <div className="space-y-3">
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">New Email (optional)</label>
            <input
              type="email"
              value={adminEmail}
              onChange={e => setAdminEmail(e.target.value)}
              placeholder="new-admin@example.com"
              className={inputCls}
              dir="ltr"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-xs mb-1.5">New Password</label>
            <input
              type="password"
              value={adminPassword}
              onChange={e => setAdminPassword(e.target.value)}
              placeholder="Min 6 characters"
              className={inputCls}
            />
          </div>
        </div>
        {pwMsg && (
          <p className={`text-xs mt-2 ${pwMsg.includes('success') ? 'text-[#0B5D3B]' : 'text-red-400'}`}>{pwMsg}</p>
        )}
        <button
          onClick={handlePasswordChange}
          className="mt-4 flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white font-semibold rounded-lg text-sm hover:bg-white/10 transition-colors border border-white/10"
        >
          <Save className="w-4 h-4" />
          Update Credentials
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
