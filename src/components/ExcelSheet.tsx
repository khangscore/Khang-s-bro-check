import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Save, FileInput, FileOutput, Trash2, Plus, Minus, Bold, Italic, Type, AlignLeft, AlignCenter, AlignRight, Table } from 'lucide-react';
import { clsx } from 'clsx';

export default function ExcelSheet({ accentColor }: { accentColor: string }) {
  const [cols, setCols] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']);
  const [rows, setRows] = useState(Array.from({ length: 20 }, (_, i) => i + 1));
  const [data, setData] = useState<Record<string, string>>({});
  const [activeCell, setActiveCell] = useState<string | null>(null);

  const handleCellChange = (id: string, val: string) => {
    setData(prev => ({ ...prev, [id]: val }));
  };

  const addRow = () => setRows(prev => [...prev, prev.length + 1]);
  const addCol = () => {
    const nextChar = String.fromCharCode(65 + cols.length);
    setCols(prev => [...prev, nextChar]);
  };

  const clearData = () => {
    if(confirm('MÀY CHẮC CHƯAAA??? (Xoá hết bảng tính đó ní ơi)')) {
      setData({});
    }
  };

  return (
    <div className="flex flex-col h-full glass-card rounded-[32px] overflow-hidden">
      {/* Excel Ribbon */}
      <div className="p-4 bg-white/5 border-b border-white/10 space-y-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-500 rounded-lg text-white">
              <Table size={20} />
            </div>
            <span className="font-black text-white text-lg">Excel Trắng</span>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <nav className="flex gap-4">
            {['Home', 'Insert', 'Draw', 'Formulas', 'Data', 'Review', 'View'].map(tab => (
              <button key={tab} className="text-xs font-bold text-white/40 hover:text-white transition-colors">
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
            <button className="p-2 hover:bg-white/10 rounded-lg text-white/60"><Bold size={16} /></button>
            <button className="p-2 hover:bg-white/10 rounded-lg text-white/60"><Italic size={16} /></button>
            <button className="p-2 hover:bg-white/10 rounded-lg text-white/60"><Type size={16} /></button>
          </div>
          <div className="flex gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
            <button className="p-2 hover:bg-white/10 rounded-lg text-white/60"><AlignLeft size={16} /></button>
            <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/60"><AlignCenter size={16} /></button>
            <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/60"><AlignRight size={16} /></button>
          </div>
          <div className="h-8 w-px bg-white/10 mx-2" />
          <div className="flex gap-2">
            <button onClick={addCol} className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white border border-white/10 transition-all">
              <Plus size={14} /> Thêm Cột
            </button>
            <button onClick={addRow} className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-white border border-white/10 transition-all">
              <Plus size={14} /> Thêm Dòng
            </button>
            <button onClick={clearData} className="flex items-center gap-2 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-xs font-bold text-red-400 border border-red-500/20 transition-all">
              <Trash2 size={14} /> Xoá Hết
            </button>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-black/20">
        <table className="w-full border-collapse border-spacing-0 table-fixed">
          <thead className="sticky top-0 z-20">
            <tr>
              <th className="w-12 bg-[#1f232c] border border-white/5 p-2 text-[10px] text-white/30 font-bold sticky left-0 z-30">#</th>
              {cols.map(col => (
                <th key={col} className="w-32 bg-[#1f232c] border border-white/5 p-2 text-[10px] text-white/30 font-bold uppercase tracking-widest">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row}>
                <td className="bg-[#1f232c] border border-white/5 text-[10px] text-white/30 font-bold text-center sticky left-0 z-10">{row}</td>
                {cols.map(col => {
                  const id = `${col}${row}`;
                  const isActive = activeCell === id;
                  return (
                    <td 
                      key={id} 
                      className={clsx(
                        "border border-white/5 p-0 relative min-h-[40px] transition-all",
                        isActive ? "bg-white/5" : "hover:bg-white/5"
                      )}
                    >
                      <input
                        type="text"
                        value={data[id] || ''}
                        onChange={(e) => handleCellChange(id, e.target.value)}
                        onFocus={() => setActiveCell(id)}
                        className={clsx(
                          "w-full h-full bg-transparent p-2 text-sm text-white/80 focus:outline-none transition-all",
                          isActive && "ring-2 ring-inset"
                        )}
                        style={isActive ? { ringColor: accentColor } : {}}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-2 bg-white/5 border-t border-white/10 flex justify-between px-6">
        <span className="text-[10px] text-white/30 font-bold uppercase">Sheet 1</span>
        <span className="text-[10px] text-white/30 font-bold uppercase">{activeCell || 'Ready'}</span>
      </div>
    </div>
  );
}
