import { motion } from "motion/react";
import { CheckCircle2, Circle } from "lucide-react";

interface WorkoutItemProps {
  id: string;
  title: string;
  duration: string;
  intensity: 'Low' | 'Medium' | 'High';
  completed: boolean;
  onToggle: (id: string) => void;
}

export default function WorkoutItem({ id, title, duration, intensity, completed, onToggle }: WorkoutItemProps) {
  const intensityColors = {
    'Low': 'text-gray-500 bg-white/5',
    'Medium': 'text-accent bg-accent/10',
    'High': 'text-white bg-accent font-black',
  };

  return (
    <motion.div
      layout
      className={`group flex items-center justify-between p-6 rounded-none border transition-all ${
        completed ? 'bg-white/5 border-transparent opacity-40 grayscale' : 'bg-card-bg border-white/5 hover:border-accent/40'
      }`}
    >
      <div className="flex items-center gap-6">
        <button onClick={() => onToggle(id)} className="text-gray-600 hover:text-accent transition-colors">
          {completed ? <CheckCircle2 className="text-accent" size={26} strokeWidth={2.5} /> : <Circle size={26} strokeWidth={1} />}
        </button>
        
        <div>
          <h4 className={`text-xl font-bold uppercase tracking-tight ${completed ? 'line-through text-gray-600' : 'text-gray-100'}`}>
            {title}
          </h4>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{duration}</span>
            <span className={`text-[9px] uppercase font-bold px-2 py-0.5 tracking-tighter ${intensityColors[intensity]}`}>
              {intensity}
            </span>
          </div>
        </div>
      </div>
      
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="text-[10px] font-bold text-accent uppercase tracking-widest border-b border-accent pb-0.5">
          Analytics
        </button>
      </div>
    </motion.div>
  );
}
