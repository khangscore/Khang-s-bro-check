import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pencil, Sun, Moon, LogIn } from 'lucide-react';
import Sidebar from './components/Sidebar';
import HomeCalendar from './components/HomeCalendar';
import DashboardGrid from './components/DashboardGrid';
import ExcelSheet from './components/ExcelSheet';
import SettingsPanel from './components/SettingsPanel';
import { clsx } from 'clsx';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [accentColor, setAccentColor] = useState('#22c55e');
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  const [user, setUser] = useState({ name: 'Haku Na Matata', avatar: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.classList.toggle('light-mode', !isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
  };

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setBgImage(result);
        extractDominantColor(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const extractDominantColor = (imageSrc: string) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 1;
        canvas.height = 1;
        ctx.drawImage(img, 0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        setDominantColor(`rgb(${r}, ${g}, ${b})`);
      }
    };
  };

  const renderContent = () => {
    switch (activePage) {
      case 'home': return <HomeCalendar accentColor={accentColor} />;
      case 'dashboard': return <DashboardGrid accentColor={accentColor} />;
      case 'excel': return <ExcelSheet accentColor={accentColor} />;
      case 'settings': return <SettingsPanel accentColor={accentColor} setAccentColor={setAccentColor} user={user} setUser={setUser} onSave={() => alert('Cài đặt đã lưu! ✨')} />;
      default: return <HomeCalendar accentColor={accentColor} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 flex items-center justify-center p-6 font-sans">
        <div className="moving-bg" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-[48px] p-12 max-w-lg w-full text-center space-y-8 shadow-2xl border-2 border-white/10"
        >
          <div className="text-8xl animate-bounce">🤪</div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-white leading-none tracking-tighter">Chào mừng zô đây!</h1>
            <p className="text-white/40 italic">— nơi ai vào cũng được, nhưng phải có danh tính —</p>
          </div>
          
          <div className="space-y-4">
            <div className="text-left space-y-2">
              <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-4">Tên của mày</label>
              <input 
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 text-white font-bold text-xl focus:outline-none focus:ring-1 ring-blue-500/50"
                placeholder="SPIT THE NAME PLS"
              />
            </div>
            <button 
              onClick={() => setIsLoggedIn(true)}
              className="w-full py-6 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-2xl shadow-xl hover:scale-[1.02] transition-all btn-depth flex items-center justify-center gap-3"
            >
              🚀 VÀO THÔI
            </button>
          </div>
          
          <p className="text-[10px] text-white/20 uppercase font-medium">Chỉ cần điền tên là vào được • mật khẩu tùy bạn nhập gì cũng được</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      {/* Background Layer */}
      <div 
        className="moving-bg" 
        style={dominantColor ? { backgroundColor: dominantColor, backgroundImage: 'none' } : {}}
      />
      {bgImage && (
        <div 
          className="fixed inset-0 z-[-1] bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
           {!dominantColor && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />}
        </div>
      )}

      {/* Main Layout */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        accentColor={accentColor} 
        user={user}
        onLogout={handleLogout}
      />

      <main className="pl-[120px] transition-all duration-300">
        <div className="container mx-auto py-16 px-8 max-w-7xl relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>

          {/* Floating Controls */}
          <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-40">
            {/* Background Changer Button */}
            <div className="relative group">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleBgUpload}
              />
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fileInputRef.current?.click()}
                className="w-14 h-14 rounded-full bg-white text-black shadow-2xl flex items-center justify-center btn-depth"
                style={{ backgroundColor: accentColor }}
              >
                <Pencil size={24} />
              </motion.button>
            </div>

            {/* Theme Toggle Button */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-14 h-14 rounded-full bg-[#160a2c] text-white shadow-2xl flex items-center justify-center btn-depth text-2xl"
            >
              {isDarkMode ? '🤪' : '😎'}
            </motion.button>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-card rounded-[40px] p-10 max-w-sm w-full text-center border-2 border-red-500/20"
            >
              <div className="text-6xl mb-6">🙄</div>
              <h2 className="text-2xl font-black text-white mb-8 leading-tight">Mày chắc chưa 🙄 ??</h2>
              
              <div className="flex flex-col gap-4">
                 <button 
                  onClick={() => setShowLogoutConfirm(false)}
                  className="w-full py-4 rounded-2xl font-black text-white/50 btn-depth bg-white/5 hover:bg-white/10 transition-all text-lg"
                >
                  Chắc
                </button>
                <button 
                  onClick={confirmLogout}
                  className="w-full py-4 rounded-2xl font-black text-white btn-depth bg-red-500 hover:bg-red-600 transition-all text-lg"
                >
                  Chắc chết liền
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
