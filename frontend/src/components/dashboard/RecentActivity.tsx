"use client";

import { motion } from 'framer-motion';
import { Hourglass, Sparkles, TrendingUp, History } from 'lucide-react';
import { ActivityItemSkeleton } from '@/components/common/Skeletons';

export default function RecentActivity({ history, isLoading }: { history: any[], isLoading: boolean }) {
  const displayHistory = history || [];

  // Group history by date
  const groupedHistory = displayHistory.reduce((groups: any, item: any) => {
    const date = new Date(item.timestamp).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const hasHistory = Object.keys(groupedHistory).length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Using a font close to Serif for the heading to match the image */}
        <h2 className="text-[32px] font-medium tracking-tight text-[#111827] font-serif" style={{ fontFamily: 'Georgia, serif' }}>
          Activities
        </h2>
        {hasHistory && (
          <button className="bg-[#242b47] hover:bg-[#1a1f33] text-white px-8 py-2.5 rounded-[24px] text-[14px] font-bold transition-all shadow-sm self-start md:self-auto">
            Filter
          </button>
        )}
      </div>
      
      <div className="space-y-10">
        {isLoading ? (
          <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-4 space-y-1">
            <div className="h-5 w-28 bg-slate-200 animate-pulse rounded-lg mx-4 mb-4" />
            {[1,2,3,4].map(i => <ActivityItemSkeleton key={i} />)}
          </div>
        ) : hasHistory ? (
          Object.keys(groupedHistory).map((date) => (
            <div key={date} className="space-y-4">
              <h3 className="text-[18px] font-bold text-[#111827]">
                {date}
              </h3>
              
              <div className="bg-white rounded-[24px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 space-y-2">
                {groupedHistory[date].map((item: any, idx: number) => (
                  <div key={item._id} className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-5">
                      {item.isWelcome ? (
                        <div className="w-12 h-12 bg-[#f6ebfe] rounded-lg flex items-center justify-center shrink-0">
                          <Sparkles className="w-5 h-5 text-[#d9a8f4]" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center p-2 shrink-0 border border-slate-100">
                          {item.dealId?.store ? (
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs text-slate-800 font-bold shadow-sm">
                              {item.dealId.store.charAt(0)}
                            </div>
                          ) : (
                            <TrendingUp className="w-5 h-5 text-slate-400" />
                          )}
                        </div>
                      )}
                      
                      <h4 className="text-[15px] font-bold text-[#111827]">
                        {item.isWelcome ? 'Welcome bonus' : (item.dealId?.store || item.dealId?.title || 'Unknown Store')}
                      </h4>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-[15px] font-bold text-[#64748b]">
                        +${item.estimatedCashback?.toFixed(2) || '0.00'}
                      </div>
                      <div className="w-6 flex justify-center">
                        {item.status === 'pending' || item.isWelcome ? (
                          <Hourglass className="w-5 h-5 text-[#d4af37]" />
                        ) : (
                          <span className="text-emerald-500 font-bold text-sm">✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[24px] border border-dashed border-slate-200">
            <div className="w-16 h-16 bg-[#f4f5f7] rounded-full flex items-center justify-center mb-4">
              <History className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-[#111827] mb-1">No activities yet</h3>
            <p className="text-slate-500 text-sm">Your shopping and cashback history will appear here.</p>
          </div>
        )}

        {!isLoading && hasHistory && (
          <div className="flex justify-center pt-4">
            <button className="flex items-center gap-2 text-slate-300 font-bold text-[13px] hover:text-slate-400 transition-colors">
              Show more
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
