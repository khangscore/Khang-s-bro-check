import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';

interface Shortcut {
  id: string;
  name: string;
  url: string;
}

export default function DashboardGrid({ accentColor }: { accentColor: string }) {
  const [shortcuts, setShortcuts] = useState<Shortcut[]>([
    { id: '1', name: 'Course Key AE', url: 'https://learn.eltngl.com/' },
    { id: '2', name: 'Kho Sách', url: '#' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const removeShortcut = (id: string) => {
    setPendingDelete(id);
  };

  const confirmDelete = () => {
    if (pendingDelete) {
      setShortcuts(shortcuts.filter(s => s.id !== pendingDelete));
      setPendingDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="header-group text-center">
        <h1 className="text-6xl font-black text-white mb-2 leading-none tracking-tighter">AO Dashboard Q10</h1>
        <p className="text-white/40 font-bold uppercase tracking-widest text-sm">Haku_Na_Matata!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {shortcuts.map((s) => (
          <motion.div
            key={s.id}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card rounded-[32px] p-8 flex flex-col items-center group relative overflow-hidden"
          >
            <button 
              onClick={() => removeShortcut(s.id)}
              className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
            >
              <X size={18} />
            </button>
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all shadow-xl"
              style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
            >
              <ExternalLink size={32} />
            </div>
            <h3 className="text-xl font-black text-white mb-4">{s.name}</h3>
            <a 
              href={s.url} 
              target="_blank" 
              className="w-full py-3 px-6 rounded-2xl font-black text-center btn-depth transition-all"
              style={{ backgroundColor: accentColor, color: '#000' }}
            >
              MỞ
            </a>
          </motion.div>
        ))}

        <motion.button
          whileHover={{ y: -8, scale: 1.02 }}
          onClick={() => setIsModalOpen(true)}
          className="glass-card rounded-[32px] p-8 flex flex-col items-center justify-center border-dashed border-2 border-white/10 hover:border-white/30 transition-all min-h-[220px]"
        >
          <div className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center mb-4">
            <Plus className="text-white/20" size={32} />
          </div>
          <span className="text-white/30 font-black uppercase tracking-widest text-xs">Thêm Lối Tắt</span>
        </motion.button>
      </div>

      {/* Improved Confirm Delete Modal */}
      <AnimatePresence>
        {pendingDelete && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="glass-card rounded-[40px] p-10 max-w-sm w-full text-center border-2"
              style={{ borderColor: `${accentColor}20` }}
            >
              <div className="text-6xl mb-6">🙄</div>
              <h2 className="text-2xl font-black text-white mb-8 leading-tight">MÀY CHẮC CHƯAAA???</h2>
              
              <div className="flex flex-col gap-4">
                <button 
                  onClick={confirmDelete}
                  className="w-full py-4 rounded-2xl font-black text-white btn-depth bg-red-500 hover:bg-red-600 transition-all text-lg"
                >
                  CHẮC
                </button>
                <button 
                  onClick={() => setPendingDelete(null)}
                  className="w-full py-4 rounded-2xl font-black text-white/50 btn-depth bg-white/5 hover:bg-white/10 transition-all text-lg"
                >
                  CHẮC chớt liền
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
