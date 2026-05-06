/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from "motion/react";
import { 
  Activity, 
  Flame, 
  Footprints, 
  Heart, 
  Calendar, 
  TrendingUp, 
  Plus,
  Dumbbell
} from "lucide-react";
import StatsCard from "./components/StatsCard";
import AITips from "./components/AITips";
import WorkoutItem from "./components/WorkoutItem";

export default function App() {
  const [workouts, setWorkouts] = useState([
    { id: '1', title: 'Morning HIIT Session', duration: '45 mins', intensity: 'High' as const, completed: true },
    { id: '2', title: 'Power Yoga Flow', duration: '30 mins', intensity: 'Medium' as const, completed: false },
    { id: '3', title: 'Evening Recovery Walk', duration: '20 mins', intensity: 'Low' as const, completed: false },
  ]);

  const toggleWorkout = (id: string) => {
    setWorkouts(prev => prev.map(w => w.id === id ? { ...w, completed: !w.completed } : w));
  };

  const handleStartJourney = () => {
    alert('Welcome to FitPath! Your fitness journey starts now!');
  };

  return (
    <div className="min-h-screen bristol-grid pb-20">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-dark-bg/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center transform hover:rotate-0 transition-transform">
              <span className="text-dark-bg font-black text-lg italic">FP</span>
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase">FitPath</span>
          </div>
          
          <nav className="hidden md:flex gap-10 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
            <a href="#" className="text-accent border-b border-accent pb-1">Performance</a>
            <a href="#" className="hover:text-white transition-colors">Nutrition</a>
            <a href="#" className="hover:text-white transition-colors">Community</a>
            <a href="#" className="hover:text-white transition-colors">Profile</a>
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-card-bg">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-16">
        {/* Header */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-8">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Session</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-7xl md:text-9xl font-display font-black italic tracking-tighter leading-[0.85] uppercase"
            >
              Train With <br />
              <span className="text-accent underline decoration-white/10">Precision.</span>
            </motion.h1>
            <p className="text-xl text-gray-400 mt-8 max-w-lg leading-relaxed">
              Experience a data-driven approach to physical excellence. Tracking every heartbeat on your path to greatness.
            </p>
          </div>
          
          <div className="lg:col-span-4 flex items-end justify-start lg:justify-end">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#FFFFFF' }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartJourney}
              className="bg-accent text-dark-bg px-12 py-6 rounded-none font-black text-xl uppercase tracking-wider group transition-all"
            >
              Start Path
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          <StatsCard 
            label="Daily Steps" 
            value="12,842" 
            unit="steps" 
            icon={Footprints} 
            trend="+12% vs yesterday"
            color="#BEF264"
          />
          <StatsCard 
            label="Calories" 
            value="482" 
            unit="kcal" 
            icon={Flame} 
            color="#BEF264"
          />
          <StatsCard 
            label="Heart Rate" 
            value="115" 
            unit="bpm" 
            icon={Heart} 
            color="#BEF264"
          />
          <StatsCard 
            label="Active Time" 
            value="156" 
            unit="mins" 
            icon={Activity} 
            color="#BEF264"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Workouts */}
            <section>
              <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-accent"></div>
                  <h3 className="text-3xl font-display font-black italic uppercase tracking-tight">Planned Routine</h3>
                </div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-1">
                  Session 04.2
                </div>
              </div>
              
              <div className="space-y-4">
                {workouts.map(w => (
                  <WorkoutItem 
                    key={w.id} 
                    {...w} 
                    onToggle={toggleWorkout}
                  />
                ))}
              </div>
            </section>

            {/* Performance */}
            <section className="bg-card-bg border border-white/5 rounded-none p-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2 text-gray-100">
                  <TrendingUp size={20} className="text-accent" />
                  <h3 className="text-xl font-bold uppercase tracking-tight">Weekly Performance</h3>
                </div>
                <select className="bg-white/5 border border-white/10 rounded-none px-4 py-2 text-[10px] font-bold uppercase tracking-widest outline-none">
                  <option>7 Day View</option>
                  <option>30 Day View</option>
                </select>
              </div>
              
              <div className="h-56 flex items-end justify-between gap-3">
                {[45, 60, 35, 90, 120, 55, 80].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                    <div className="w-full relative bg-white/5 overflow-hidden flex items-end" style={{ height: '100%' }}>
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.1 }}
                        className={`w-full ${i === 4 ? 'bg-accent' : 'bg-gray-800'} group-hover:bg-white transition-colors`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <AITips />
            
            <div className="bg-card-bg border border-white/5 rounded-none p-10">
              <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-6 block">Hydration Status</span>
              <div className="flex flex-wrap gap-2 mb-8">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-10 h-10 rounded-none border border-white/10 flex items-center justify-center transition-all ${
                      i < 5 ? 'bg-accent text-dark-bg' : 'bg-white/5 text-gray-600'
                    }`}
                  >
                    <Activity size={18} strokeWidth={3} />
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-end border-t border-white/5 pt-6">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Target Met</span>
                <span className="text-2xl font-bold italic tracking-tight">1.2<span className="text-gray-600 text-sm italic"> / 2.5L</span></span>
              </div>
            </div>

            <div className="rounded-none overflow-hidden relative group border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop" 
                alt="Community"
                className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-700 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent flex flex-col justify-end p-8">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-3">Community Entry</span>
                <h4 className="text-2xl font-black text-white italic mb-6 leading-tight uppercase">Join The Summer <br />Sprint Program</h4>
                <button className="bg-white text-dark-bg py-4 rounded-none text-xs font-black uppercase tracking-widest hover:bg-accent transition-colors">Request Access</button>
              </div>
            </div>
          </aside>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-500 uppercase tracking-[0.3em]">
        <div className="flex gap-10">
          <span>v4.2.0</span>
          <span>Encrypted Data Sync</span>
        </div>
        <span>&copy; 2024 FitPath Int. Performance Group</span>
      </footer>
    </div>
  );
}

