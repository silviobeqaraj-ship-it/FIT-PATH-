import { useState } from 'react';
import { motion } from "motion/react";
import { Plus, Dumbbell, Clock, Zap, CheckCircle2, ChevronRight, Search } from "lucide-react";
import { WorkoutRoutine, Exercise } from "../types";

export default function WorkoutPlanner() {
  const [routines, setRoutines] = useState<WorkoutRoutine[]>([
    {
      id: '1',
      title: 'Hypertrophy: Push Day',
      exercises: [
        { id: 'e1', name: 'Bench Press', sets: 4, reps: '8-10', weight: '85kg', completed: true },
        { id: 'e2', name: 'Incline DB Flyes', sets: 3, reps: '12', weight: '22kg', completed: false },
        { id: 'e3', name: 'Lateral Raises', sets: 4, reps: '15', weight: '12kg', completed: false },
      ]
    },
    {
      id: '2',
      title: 'Endurance: Leg Session',
      exercises: [
        { id: 'e4', name: 'Back Squat', sets: 5, reps: '5', weight: '100kg', completed: false },
        { id: 'e5', name: 'Leg Press', sets: 3, reps: '12', weight: '150kg', completed: false },
      ]
    }
  ]);

  const [activeRoutine, setActiveRoutine] = useState<string | null>(routines[0].id);

  const toggleExercise = (routineId: string, exerciseId: string) => {
    setRoutines(prev => prev.map(r => {
      if (r.id !== routineId) return r;
      return {
        ...r,
        exercises: r.exercises.map(e => 
          e.id === exerciseId ? { ...e, completed: !e.completed } : e
        )
      };
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Sidebar - Routines List */}
      <div className="lg:col-span-4 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-display font-black italic tracking-tighter uppercase">My Routines</h3>
          <button className="p-2 border border-white/10 text-accent hover:bg-accent hover:text-dark-bg transition-all">
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-3">
          {routines.map(routine => (
            <button
              key={routine.id}
              onClick={() => setActiveRoutine(routine.id)}
              className={`w-full text-left p-6 border transition-all relative overflow-hidden group ${
                activeRoutine === routine.id 
                ? 'bg-accent text-dark-bg border-accent' 
                : 'bg-card-bg border-white/5 text-white hover:border-white/20'
              }`}
            >
              <div className="relative z-10">
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] mb-2 block ${
                  activeRoutine === routine.id ? 'opacity-60' : 'text-gray-500'
                }`}>
                  Volume: {routine.exercises.length} Exercises
                </span>
                <h4 className="text-xl font-bold uppercase tracking-tight italic">{routine.title}</h4>
              </div>
              {activeRoutine === routine.id && (
                <div className="absolute right-0 bottom-0 opacity-10">
                  <Dumbbell size={100} strokeWidth={1} />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="bg-card-bg border border-white/5 p-8 mt-12">
          <div className="flex items-center gap-3 mb-6">
            <Search size={16} className="text-gray-500" />
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Exercise Library</h4>
          </div>
          <div className="space-y-4">
            {['Deadlift', 'Pull Ups', 'Bicep Curls', 'Lunges'].map(ex => (
              <div key={ex} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-3">
                <span className="text-xs font-bold uppercase hover:text-accent transition-colors">{ex}</span>
                <ChevronRight size={14} className="text-gray-700 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Panel - Active Routine Detail */}
      <div className="lg:col-span-8">
        {activeRoutine ? (
          <div className="space-y-10">
            <section className="bg-white/5 border border-white/10 p-10 relative overflow-hidden">
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h2 className="text-4xl font-display font-black italic tracking-tighter uppercase mb-4">
                    {routines.find(r => r.id === activeRoutine)?.title}
                  </h2>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-accent">
                      <Clock size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">65 Mins Duration</span>
                    </div>
                    <div className="flex items-center gap-2 text-accent">
                      <Zap size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">480 KCAL Expected</span>
                    </div>
                  </div>
                </div>
                <button className="bg-accent text-dark-bg px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white transition-colors">
                  Start Session
                </button>
              </div>
            </section>

            <section className="space-y-4">
              {routines.find(r => r.id === activeRoutine)?.exercises.map(exercise => (
                <div 
                  key={exercise.id}
                  className={`flex items-center justify-between p-8 border transition-all ${
                    exercise.completed ? 'bg-white/5 border-transparent opacity-40' : 'bg-card-bg border-white/5 hover:border-accent/40'
                  }`}
                >
                  <div className="flex items-center gap-8">
                    <button 
                      onClick={() => toggleExercise(activeRoutine, exercise.id)}
                      className={`w-10 h-10 border flex items-center justify-center transition-colors ${
                        exercise.completed ? 'bg-accent border-accent text-dark-bg' : 'border-white/10 text-gray-600 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 size={24} strokeWidth={exercise.completed ? 3 : 1} />
                    </button>
                    <div>
                      <h4 className={`text-2xl font-bold uppercase tracking-tight italic ${exercise.completed ? 'line-through' : ''}`}>
                        {exercise.name}
                      </h4>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-widest">
                          {exercise.sets} Sets × {exercise.reps} Reps
                        </span>
                        {exercise.weight && (
                          <span className="text-[10px] font-mono text-gray-500 uppercase">
                            Load: {exercise.weight}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white pb-1 border-b border-transparent hover:border-white transition-all">Video</button>
                    <button className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white pb-1 border-b border-transparent hover:border-white transition-all">History</button>
                  </div>
                </div>
              ))}
            </section>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-20 border border-white/5 bg-card-bg">
            <Dumbbell className="text-gray-800 mb-6" size={80} />
            <h3 className="text-2xl font-bold uppercase tracking-tight italic mb-4">Select a Routine</h3>
            <p className="text-gray-500 text-sm max-w-xs uppercase tracking-widest leading-relaxed">
              Choose a training program from the sidebar to begin your performance session.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
