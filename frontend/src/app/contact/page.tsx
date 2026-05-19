"use client";

import { Mail, MessageSquare, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24 font-['Manrope']">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#1A1C1C] tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Have a question about a deal or want to partner with us? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100"
          >
            <h2 className="text-2xl font-black text-[#1A1C1C] mb-6">Send a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF9800] focus:ring-1 focus:ring-[#FF9800] transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF9800] focus:ring-1 focus:ring-[#FF9800] transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF9800] focus:ring-1 focus:ring-[#FF9800] transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-[#1A1C1C] hover:bg-[#FF9800] text-white font-bold py-4 rounded-xl transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex items-start gap-6">
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center shrink-0 text-[#FF9800]">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-[#1A1C1C] mb-1">Email Us</h3>
                <p className="text-slate-500 mb-2">Our team typically responds within 24 hours.</p>
                <a href="mailto:support@mintelitestores.com" className="font-bold text-[#FF9800] hover:underline">
                  support@mintelitestores.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0 text-blue-600">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-lg text-[#1A1C1C] mb-1">Headquarters</h3>
                <p className="text-slate-500 leading-relaxed">
                  Coupons Mart Inc.<br />
                  123 Affiliate Avenue, Suite 400<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
            </div>
            
            <div className="bg-[#1A1C1C] rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
              <h3 className="font-black text-xl mb-2">Business Partnerships</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                Interested in listing your store on Coupons Mart? We work directly with brands and networks to provide the best value to our audience.
              </p>
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-6 rounded-lg transition-colors border border-white/10 text-sm">
                Apply for Partnership
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
