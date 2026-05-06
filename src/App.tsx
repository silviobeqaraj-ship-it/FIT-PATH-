import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import { 
  Activity, 
  Flame, 
  Footprints, 
  Heart, 
  Calendar, 
  TrendingUp, 
  Plus,
  Dumbbell,
  LayoutDashboard,
  Utensils,
  Info
} from "lucide-react";
import StatsCard from "./components/StatsCard";
import AITips from "./components/AITips";
import WorkoutItem from "./components/WorkoutItem";
import NutritionTracker from "./components/NutritionTracker";
import WorkoutPlanner from "./components/WorkoutPlanner";

type Tab = 'dashboard' | 'nutrition' | 'workouts' | 'about';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
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

  const DashboardContent = () => (
    <div className="space-y-20">
      {/* Header */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <div className="lg:col-span-2 space-y-16">
          <section>
            <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-accent"></div>
                <h3 className="text-3xl font-display font-black italic uppercase tracking-tight">Today Log</h3>
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

          <section className="bg-card-bg border border-white/5 rounded-none p-10">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2 text-gray-100">
                <TrendingUp size={20} className="text-accent" />
                <h3 className="text-xl font-bold uppercase tracking-tight">Weekly Peak</h3>
              </div>
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

        <aside className="space-y-10">
          <AITips />
          
          <div className="bg-card-bg border border-white/5 rounded-none p-10">
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-6 block">Hydration Goal</span>
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
              <span className="text-[10px] text-gray-500 uppercase tracking-widest">Status</span>
              <span className="text-2xl font-bold italic tracking-tight">1.2<span className="text-gray-600 text-sm italic"> / 2.5L</span></span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );

  const AboutContent = () => (
    <div className="max-w-4xl mx-auto space-y-16 py-10">
      <div className="flex items-center gap-4 border-b border-white/5 pb-10">
        <div className="w-4 h-16 bg-accent"></div>
        <div>
          <h2 className="text-6xl font-display font-black italic uppercase tracking-tighter">About FitPath</h2>
          <p className="text-accent text-xs font-bold uppercase tracking-[0.4em] mt-2">Mission Intelligence</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-gray-400 leading-relaxed font-mono text-sm">
        <div className="space-y-6">
          <p>
            FitPath was engineered for the uncompromising. We believe that true physical excellence is a product of data, discipline, and direction.
          </p>
          <p>
            By unifying biometric tracking with nutritional intelligence and advanced workout architecture, we provide the ultimate ecosystem for self-optimization.
          </p>
        </div>
        <div className="space-y-8">
          <div className="bg-card-bg p-8 border-l-4 border-accent">
            <h4 className="text-white text-lg font-bold mb-2 italic">THE ALL-IN-ONE SOLUTION</h4>
            <p className="text-xs">Eliminate app sprawl. Track macros, sets, and vitals in a single, encrypted performance console.</p>
          </div>
          <div className="flex gap-4">
            <span className="text-accent font-black">4.2.0</span>
            <span className="border border-white/10 px-3 py-1 text-[10px] rounded-full">PRODUCTION STABLE</span>
          </div>
        </div>
      </div>

      <div className="bg-white/5 p-12 border border-white/10">
        <h3 className="text-white text-2xl font-black italic uppercase tracking-tight mb-8">Contact Our Team</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <span className="text-[10px] text-gray-600 uppercase font-bold block mb-2">Systems Support</span>
            <span className="text-sm font-mono text-accent">systems@fitpath.intl</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-600 uppercase font-bold block mb-2">Media Relations</span>
            <span className="text-sm font-mono text-accent">press@fitpath.intl</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-600 uppercase font-bold block mb-2">Location</span>
            <span className="text-sm font-mono text-accent">Berlin / Tokyo / SF</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bristol-grid pb-20">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-dark-bg/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <button onClick={() => setActiveTab('dashboard')} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-accent rounded-sm flex items-center justify-center transform group-hover:rotate-6 transition-transform">
              <span className="text-dark-bg font-black text-lg italic">FP</span>
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase transition-colors group-hover:text-accent">FitPath</span>
          </button>
          
          <nav className="hidden md:flex gap-10 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'nutrition', label: 'Nutrition', icon: Utensils },
              { id: 'workouts', label: 'Workouts', icon: Dumbbell },
              { id: 'about', label: 'Mission', icon: Info },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 transition-all pb-1 border-b-2 hover:text-white ${
                  activeTab === tab.id ? 'text-accent border-accent' : 'border-transparent'
                }`}
              >
                <tab.icon size={12} />
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden bg-card-bg">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && <DashboardContent />}
            {activeTab === 'nutrition' && <NutritionTracker />}
            {activeTab === 'workouts' && <WorkoutPlanner />}
            {activeTab === 'about' && <AboutContent />}
          </motion.div>
        </AnimatePresence>
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
