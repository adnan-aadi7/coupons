"use client";

import { FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24 font-['Manrope']">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-emerald-600">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1C1C] tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-slate-500 font-medium">Last Updated: May 17, 2026</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#1A1C1C]"
        >
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing and using Coupons Mart, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>

          <h3>2. Description of Service</h3>
          <p>
            Coupons Mart provides users with access to a rich collection of resources, including various coupons, promo codes, deals, and affiliate links to third-party merchants. You understand and agree that the service is provided "AS-IS" and that Coupons Mart assumes no responsibility for the timeliness, deletion, mis-delivery or failure to store any user communications or personalization settings.
          </p>

          <h3>3. Affiliate Disclaimer</h3>
          <p>
            Some of the links on this website are "affiliate links." This means if you click on the link and purchase the item, Coupons Mart will receive an affiliate commission. Regardless, we only recommend products or services we believe will add value to our readers.
          </p>

          <h3>4. External Links</h3>
          <p>
            Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites.
          </p>

          <h3>5. Changes to Terms</h3>
          <p>
            Coupons Mart reserves the right to modify these terms at any time. We do so by posting and drawing attention to the updated terms on the Site. Your decision to continue to visit and make use of the Site after such changes have been made constitutes your formal acceptance of the new Terms & Conditions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
