import { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, RefreshCw } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AITips() {
  const [tip, setTip] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchTip = async () => {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Give me a single, short, inspiring fitness tip or motivational quote for today. Keep it under 20 words.",
      });
      setTip(response.text || "Push harder than yesterday if you want a different tomorrow.");
    } catch (error) {
      console.error("Failed to fetch tip:", error);
      setTip("Strive for progress, not perfection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <div className="bg-white/5 border border-white/10 p-10 rounded-none relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-accent">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] font-mono">Live Intelligence</span>
        </div>
        <button 
          onClick={fetchTip}
          disabled={loading}
          className="text-gray-600 hover:text-white transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.p
          key={tip}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-2xl font-display font-black italic tracking-tight text-gray-200 leading-tight uppercase"
        >
          {loading ? "Calculating..." : tip}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
