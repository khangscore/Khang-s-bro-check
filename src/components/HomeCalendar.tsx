import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, getMonth, getYear } from 'date-fns';
import { vi } from 'date-fns/locale';
import { getLunarDate } from '../utils/lunar';

export default function HomeCalendar({ accentColor }: { accentColor: string }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState<Record<string, string>>({});

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-3xl font-black text-white/90">
        Tháng {format(currentMonth, 'MM, yyyy', { locale: vi })}
      </h2>
      <div className="flex gap-2">
        <button onClick={prevMonth} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextMonth} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
    return (
      <div className="grid grid-cols-7 mb-4">
        {days.map((day, i) => (
          <div key={i} className="text-center font-bold text-white/30 text-xs uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const formattedDate = format(day, 'd');
        const lunarDate = getLunarDate(day);
        
        days.push(
          <motion.div
            key={day.toString()}
            whileHover={{ y: -3 }}
            className={`relative min-h-[120px] p-2 border border-white/5 rounded-2xl transition-all cursor-pointer group
              ${!isSameMonth(day, monthStart) ? 'opacity-20 pointer-events-none' : ''}
              ${isSameDay(day, selectedDate) ? 'bg-white/10 ring-2' : 'hover:bg-white/5'}
            `}
            style={isSameDay(day, selectedDate) ? { ringColor: accentColor } : {}}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className="flex justify-between items-start">
              <span className={`text-xl font-bold ${isSameDay(day, new Date()) ? 'text-accent' : 'text-white'}`} style={isSameDay(day, new Date()) ? { color: accentColor } : {}}>
                {formattedDate}
              </span>
              <div className="flex flex-col items-end gap-1">
                 <span className="text-[10px] font-bold text-white/40">
                  {lunarDate.day}/{lunarDate.month} âm
                </span>
                {lunarDate.isHoliday && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold max-w-[60px] truncate">
                    {lunarDate.holidayName}
                  </span>
                )}
              </div>
            </div>

            {/* Note slot */}
            <div className="mt-2 h-12 overflow-hidden">
               {notes[format(day, 'yyyy-MM-dd')] ? (
                 <div className="text-[10px] text-white/60 line-clamp-2 italic">
                   {notes[format(day, 'yyyy-MM-dd')]}
                 </div>
               ) : (
                 <div className="text-[10px] text-white/10 group-hover:text-white/30 transition-colors flex items-center gap-1">
                    <MessageSquare size={10} /> + ghi chú
                 </div>
               )}
            </div>
          </motion.div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-2" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-2">{rows}</div>;
  };

  return (
    <div className="glass-card rounded-[32px] p-8 w-full">
      {renderHeader()}
      {renderDays()}
      {renderCells()}

      {/* Quick Note Editor for selected date */}
      <AnimatePresence>
        {selectedDate && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: accentColor }} />
              <h3 className="text-white font-bold">Ghi chú cho ngày {format(selectedDate, 'dd/MM')}:</h3>
            </div>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-1 min-h-[100px]"
              style={{ ringColor: accentColor }}
              placeholder="Nhập ghi chú tại đây..."
              value={notes[format(selectedDate, 'yyyy-MM-dd')] || ''}
              onChange={(e) => setNotes({ ...notes, [format(selectedDate, 'yyyy-MM-dd')]: e.target.value })}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
