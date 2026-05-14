import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, LayoutGrid, FileSpreadsheet, Settings, LogOut, User } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  accentColor: string;
  user: { name: string; avatar: string };
  onLogout: () => void;
}

export default function Sidebar({ activePage, setActivePage, accentColor, user, onLogout }: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: 'home', icon: Home, label: 'Trang chủ' },
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'excel', icon: FileSpreadsheet, label: 'Excel Trắng' },
    { id: 'settings', icon: Settings, label: 'Cài đặt' },
  ];

  return (
    <div 
      className="fixed left-0 top-0 h-full z-50 p-3 transition-all duration-300"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      style={{ width: isExpanded ? '280px' : '100px' }}
    >
      {/* Dynamic Border Frame */}
      <div 
        className="h-full rounded-[32px] p-2 flex flex-col transition-all duration-300 shadow-2xl"
        style={{ backgroundColor: accentColor }}
      >
        <div className="h-full w-full bg-[#160a2c] dark:bg-[#160a2c] light-mode:bg-slate-50 rounded-[24px] flex flex-col overflow-hidden relative">
          
          {/* Avatar Section */}
          <div className={cn(
            "p-6 flex items-center gap-4 transition-all duration-300",
            isExpanded ? "flex-row" : "flex-col"
          )}>
            <div className="relative group">
              <div 
                className="w-12 h-12 rounded-full border-2 p-0.5 transition-all duration-300"
                style={{ borderColor: accentColor }}
              >
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/miniavs/svg?seed=${user.name}`} 
                  alt="Avatar" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            {isExpanded && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex-1 overflow-hidden"
              >
                <p className="text-white font-bold truncate text-lg">{user.name}</p>
                <p className="text-xs text-white/50 truncate">Phiên bản Q10</p>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-2 mt-4">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "w-full flex items-center p-4 rounded-2xl transition-all duration-200 group relative",
                  activePage === item.id 
                    ? "bg-white/10 text-white shadow-lg" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                {activePage === item.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-6 rounded-r-full"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
                <item.icon className={cn(
                  "w-6 h-6 shrink-0 transition-colors",
                  activePage === item.id && "text-accent"
                )} 
                style={activePage === item.id ? { color: accentColor } : {}}
                />
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-4 font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </nav>

          {/* Logout Section */}
          <div className="p-3 mt-auto">
            <motion.button
              whileHover={{ y: -5 }}
              onClick={onLogout}
              className="w-full flex items-center p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all group"
            >
              <LogOut className="w-6 h-6 shrink-0" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-4 font-medium"
                  >
                    Đăng xuất
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
