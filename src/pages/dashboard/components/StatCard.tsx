import { Card } from 'antd';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  icon: React.ReactElement<{ size?: number }>;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, color }) => {
  const colorName = color.split('-')[1];

  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-linear-to-r from-${colorName}-400/20 to-${colorName}-300/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500`} />
      <Card className="relative border-none transition-all duration-300 rounded-2xl! overflow-hidden bg-white/80 backdrop-blur-sm h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={`
            p-4 rounded-xl
            bg-${colorName}-50 text-${colorName}-600
            transition-all duration-300 shadow-sm
          `}>
            {React.cloneElement(icon, { size: 28 })}
          </div>
          {trend && (
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-wider">
              <ArrowUpRight size={14} />
              {trend}
            </div>
          )}
        </div>

        <div className="space-y-2 relative z-10">
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest pl-1">{title}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-['Outfit'] text-slate-800 tracking-tight">
              {value}
            </span>
          </div>
        </div>

        <div className={`
          absolute -bottom-6 -right-6 w-24 h-24 rounded-full
          bg-${colorName}-400/10
          blur-2xl transition-all duration-500
        `} />
      </Card>
    </div>
  );
};
