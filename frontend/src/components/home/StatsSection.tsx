"use client";

import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Activity, TrendingUp, Users, DollarSign } from 'lucide-react';

const data = [
  { month: 'Jan', savings: 1.2 },
  { month: 'Feb', savings: 1.8 },
  { month: 'Mar', savings: 2.4 },
  { month: 'Apr', savings: 3.1 },
  { month: 'May', savings: 4.5 },
  { month: 'Jun', savings: 6.2 },
  { month: 'Jul', savings: 8.4 },
];

export default function StatsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[12px] font-black uppercase tracking-[0.3em] text-primary mb-4">Platform Insights</h2>
            <h3 className="text-4xl md:text-6xl font-[900] text-white tracking-tighter">
              A Growing Economy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Savings</span>
            </h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Chart Area */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] shadow-2xl relative group"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-2xl font-black text-white">Total Cash Back Rewarded</h4>
                <p className="text-slate-400 text-sm font-bold mt-1">Cumulative growth over the last 7 months</p>
              </div>
              <div className="p-3 bg-emerald-500/20 rounded-2xl border border-emerald-500/30">
                <Activity className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            {/* Recharts Wrapper */}
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val}M`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '16px', color: '#fff', fontWeight: 900 }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={4} fill="url(#colorSavings)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* KPI Cards */}
          <div className="space-y-8 flex flex-col justify-between">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-2xl border border-white/10 p-8 rounded-[40px] flex-1 flex flex-col justify-center"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Active Community</div>
              </div>
              <div className="text-5xl font-[900] text-white">42.5K<span className="text-blue-400 text-3xl">+</span></div>
              <p className="text-slate-400 text-sm mt-2 font-bold">Shoppers joined this month</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-[40px] flex-1 flex flex-col justify-center shadow-[0_20px_50px_rgba(16,185,129,0.3)] relative overflow-hidden group"
            >
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute bottom-0 right-0 p-4 opacity-20"><TrendingUp className="w-24 h-24" /></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4 text-white/80">
                  <DollarSign className="w-6 h-6" />
                  <div className="text-[10px] font-black uppercase tracking-widest">Average User Savings</div>
                </div>
                <div className="text-5xl font-[900] text-white">$145</div>
                <p className="text-emerald-100 text-sm mt-2 font-bold">Per month per active user</p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
