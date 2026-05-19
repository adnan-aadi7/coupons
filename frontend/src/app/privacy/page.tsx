"use client";

import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-32 pb-24 font-['Manrope']">
      <div className="max-w-[800px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1C1C] tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 font-medium">Last Updated: May 17, 2026</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 prose prose-slate max-w-none prose-headings:font-black prose-headings:text-[#1A1C1C]"
        >
          <h3>1. Introduction</h3>
          <p>
            Welcome to Coupons Mart. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
          </p>

          <h3>2. The Data We Collect About You</h3>
          <p>
            Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
          </p>
          <ul>
            <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
            <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
            <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
          </ul>

          <h3>3. How We Use Your Personal Data</h3>
          <p>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </p>
          <ul>
            <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
            <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
            <li>Where we need to comply with a legal or regulatory obligation.</li>
          </ul>

          <h3>4. Affiliate Tracking and Cookies</h3>
          <p>
            When you click on affiliate links on our site, a cookie may be placed on your browser to track any sales for commission purposes. These cookies do not store personally identifiable information and are used solely to attribute sales to our referrals.
          </p>

          <h3>5. Contact Us</h3>
          <p>
            If you have any questions about this privacy policy or our privacy practices, please contact us at privacy@mintelitestores.com.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
