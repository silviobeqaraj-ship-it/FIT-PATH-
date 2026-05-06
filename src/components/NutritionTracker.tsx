import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { Plus, Utensils, Zap, Beef, Wheat, Droplets } from "lucide-react";
import { Meal, MacroData } from "../types";

export default function NutritionTracker() {
  const [meals, setMeals] = useState<Meal[]>([
    { id: '1', name: 'Oatmeal with Berries', calories: 350, protein: 12, carbs: 55, fats: 8, type: 'Breakfast' },
    { id: '2', name: 'Grilled Chicken Salad', calories: 450, protein: 45, carbs: 12, fats: 22, type: 'Lunch' },
  ]);

  const [showAddMeal, setShowAddMeal] = useState(false);

  const macros: MacroData = meals.reduce((acc, meal) => ({
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fats: acc.fats + meal.fats,
    current: acc.current + meal.calories,
    goal: 2500
  }), { protein: 0, carbs: 0, fats: 0, current: 0, goal: 2500 });

  const MacroCircle = ({ label, current, goal, color, icon: Icon }: { label: string, current: number, goal: number, color: string, icon: any }) => (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="40" cy="40" r="36" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
          <motion.circle 
            cx="40" cy="40" r="36" fill="transparent" stroke={color} strokeWidth="4" 
            strokeDasharray={226}
            initial={{ strokeDashoffset: 226 }}
            animate={{ strokeDashoffset: 226 - (226 * Math.min(current / goal, 1)) }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <div className="text-center">
        <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{label}</span>
        <div className="text-sm font-bold font-mono">{current}g</div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Overview */}
      <div className="lg:col-span-2 space-y-8">
        <section className="bg-card-bg border border-white/5 p-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex-1">
              <span className="text-[10px] text-accent font-bold uppercase tracking-[0.3em] mb-4 block">Daily Intake</span>
              <h2 className="text-6xl font-display font-black italic tracking-tighter">
                {macros.current} <span className="text-gray-600 text-3xl">/ {macros.goal}</span>
              </h2>
              <p className="text-gray-500 mt-4 text-xs font-mono uppercase tracking-widest leading-relaxed">
                You have {macros.goal - macros.current} calories remaining for today to hit your optimal maintenance state.
              </p>
            </div>
            
            <div className="flex gap-6">
              <MacroCircle label="Protein" current={macros.protein} goal={150} color="#BEF264" icon={Beef} />
              <MacroCircle label="Carbs" current={macros.carbs} goal={250} color="#60A5FA" icon={Wheat} />
              <MacroCircle label="Fats" current={macros.fats} goal={70} color="#F87171" icon={Droplets} />
            </div>
          </div>
        </section>

        {/* Meal List */}
        <section className="space-y-4">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-2xl font-display font-black italic uppercase tracking-tight">Today Logged</h3>
            <button 
              onClick={() => setShowAddMeal(true)} 
              className="bg-white text-dark-bg px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Add Entry
            </button>
          </div>
          
          <div className="space-y-3">
            {meals.map(meal => (
              <motion.div 
                layout
                key={meal.id}
                className="bg-card-bg border border-white/5 p-6 flex justify-between items-center group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-accent">
                    <Utensils size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1 block">{meal.type}</span>
                    <h4 className="text-lg font-bold uppercase tracking-tight">{meal.name}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Calories</div>
                    <div className="font-mono font-bold text-accent">{meal.calories}</div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">P / C / F</div>
                    <div className="text-xs font-mono text-gray-400">{meal.protein}g / {meal.carbs}g / {meal.fats}g</div>
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-white">
                    <Zap size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar Suggestions */}
      <aside className="space-y-8">
        <div className="bg-white text-dark-bg p-8 flex flex-col justify-between aspect-square">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Next Goal</span>
          <div>
            <h3 className="text-4xl font-display font-black italic tracking-tighter leading-none mb-4">OPTIMAL STATE REACHED</h3>
            <p className="text-xs font-bold uppercase leading-relaxed opacity-60">Your macronutrient profile is perfectly aligned for muscle recovery.</p>
          </div>
          <button className="w-full border-2 border-dark-bg py-3 text-[10px] font-black uppercase tracking-widest hover:bg-dark-bg hover:text-white transition-colors">Generate Report</button>
        </div>

        <div className="bg-card-bg border border-white/5 p-8">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-gray-500">Quick Meals</h4>
          <div className="space-y-6">
            {[
              { name: 'Avocado Toast', cal: 220, p: '6g' },
              { name: 'Greek Yogurt', cal: 150, p: '15g' },
              { name: 'Protein Shake', cal: 180, p: '24g' }
            ].map(m => (
              <div key={m.name} className="flex justify-between items-center group cursor-pointer">
                <div>
                  <div className="text-xs font-bold uppercase hover:text-accent transition-colors">{m.name}</div>
                  <div className="text-[10px] font-mono text-gray-600 mt-1">{m.cal} KCAL • {m.p} PROTEIN</div>
                </div>
                <div className="w-6 h-6 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
