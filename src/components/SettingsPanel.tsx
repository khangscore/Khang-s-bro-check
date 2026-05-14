import React from 'react';
import { motion } from 'motion/react';
import { User, Palette, Database, Save, Sparkles } from 'lucide-react';

interface SettingsPanelProps {
  accentColor: string;
  setAccentColor: (color: string) => void;
  user: { name: string; avatar: string };
  setUser: (user: any) => void;
  onSave: () => void;
}

export default function SettingsPanel({ accentColor, setAccentColor, user, setUser, onSave }: SettingsPanelProps) {
  const colors = [
    '#22c55e', '#ef4444', '#a855f7', '#f59e0b', '#06b6d4', '#eab308',
    '#ec4899', '#3b82f6', '#14b8a6', '#f43f5e', '#8b5cf6', '#10b981'
  ];

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="header-group text-center">
        <h1 className="text-5xl font-black text-white mb-2 leading-none tracking-tighter">Cài Đặt</h1>
        <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Cá nhân hóa trải nghiệm của bạn</p>
      </div>

      <div className="glass-card rounded-[40px] p-10 space-y-10 border-2" style={{ borderColor: `${accentColor}20` }}>
        
        {/* NÍ NÈ NÍ - User Info */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400"><User size={20} /></div>
            <h3 className="text-white font-black uppercase tracking-wider text-sm">Ní nè Ní</h3>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="relative group">
              <div 
                className="w-32 h-32 rounded-full border-4 p-1 transition-all"
                style={{ borderColor: accentColor }}
              >
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/miniavs/svg?seed=${user.name}`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <button 
                className="absolute bottom-0 right-0 p-2 rounded-full bg-white text-black shadow-lg hover:scale-110 transition-all"
                style={{ backgroundColor: accentColor }}
              >
                <Sparkles size={16} />
              </button>
            </div>
            
            <input 
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-center font-bold focus:outline-none focus:ring-1"
              style={{ ringColor: accentColor }}
              placeholder="Tên của bạn..."
            />
          </div>
        </section>

        <div className="h-px bg-white/5" />

        {/* MÀU CHỦ ĐẠO - Accent Color */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400"><Palette size={20} /></div>
            <h3 className="text-white font-black uppercase tracking-wider text-sm">MÀU CHỦ ĐẠO</h3>
          </div>
          
          <div className="grid grid-cols-6 gap-3">
            {colors.map(color => (
              <button
                key={color}
                onClick={() => setAccentColor(color)}
                className={`w-full aspect-square rounded-2xl transition-all ${accentColor === color ? 'ring-4 ring-white' : 'hover:scale-110'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </section>

        <div className="h-px bg-white/5" />

        {/* DỮ LIỆU - Data */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-green-500/20 text-green-400"><Database size={20} /></div>
            <h3 className="text-white font-black uppercase tracking-wider text-sm">DỮ LIỆU</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="py-4 rounded-2xl bg-white/5 text-white/60 font-bold text-sm hover:bg-white/10 transition-all">Xuất dữ liệu (.json)</button>
            <button className="py-4 rounded-2xl bg-white/5 text-white/60 font-bold text-sm hover:bg-white/10 transition-all">Nhập dữ liệu (.json)</button>
          </div>
        </section>

        {/* EXTRA: Vibe Setting */}
        <div className="h-px bg-white/5" />
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400"><Sparkles size={20} /></div>
            <h3 className="text-white font-black uppercase tracking-wider text-sm">ĐỘ "CHẤY" CỦA DASHBOARD</h3>
          </div>
          <div className="flex gap-4">
             {['Bình thường', 'Hơi chấy', 'Chấy vcl'].map((vibe, i) => (
                <button 
                  key={vibe}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all border ${i === 2 ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'bg-white/5 border-white/10 text-white/40'}`}
                >
                  {vibe}
                </button>
             ))}
          </div>
        </section>

        {/* SAVE BUTTON */}
        <button 
          onClick={onSave}
          className="w-full py-5 rounded-[24px] font-black text-white text-lg btn-depth"
          style={{ backgroundColor: accentColor, color: '#000' }}
        >
          LƯU THAY ĐỔI
        </button>
      </div>
    </div>
  );
}
