import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  trend?: string;
  color: string;
}

export default function StatsCard({ label, value, unit, icon: Icon, trend, color }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-card-bg border border-white/10 p-8 rounded-none relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Icon size={120} strokeWidth={1} style={{ color }} />
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{label}</span>
        {trend && (
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{trend}</span>
        )}
      </div>
      
      <div className="flex items-baseline gap-2">
        <h2 className="text-5xl font-display font-black italic tracking-tighter">{value}</h2>
        <span className="text-gray-500 text-sm font-medium uppercase tracking-widest pb-1">{unit}</span>
      </div>
      
      <div className="w-full bg-white/5 h-[1px] mt-8">
        <div className="bg-accent h-full w-[65%]" style={{ backgroundColor: color }}></div>
      </div>
    </motion.div>
  );
}
