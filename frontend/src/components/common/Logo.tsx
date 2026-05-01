"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightText?: boolean;
}

export default function Logo({ className = "", iconOnly = false, lightText = false }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      {/* 3D-style Shopping Bag Icon */}
      <motion.div 
        whileHover={{ scale: 1.05, rotate: -5 }}
        className="relative w-10 h-10 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          <defs>
            <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9800" />
              <stop offset="100%" stopColor="#F65300" />
            </linearGradient>
            <filter id="innerShadow">
              <feOffset dx="0" dy="2" />
              <feGaussianBlur stdDeviation="2" result="offset-blur" />
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
              <feFlood floodColor="black" floodOpacity="0.2" result="color" />
              <feComposite operator="in" in="color" in2="inverse" result="shadow" />
              <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
          </defs>
          
          {/* Bag Handles */}
          <path 
            d="M35 35 C 35 15, 65 15, 65 35" 
            fill="none" 
            stroke="#E65100" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          <path 
            d="M35 35 C 35 15, 65 15, 65 35" 
            fill="none" 
            stroke="#FFB74D" 
            strokeWidth="4" 
            strokeLinecap="round"
          />

          {/* Bag Body */}
          <path 
            d="M20 35 L80 35 L85 85 C 85 92, 15 92, 15 85 Z" 
            fill="url(#bagGradient)"
            filter="url(#innerShadow)"
          />
          
          {/* Highlight for 3D effect */}
          <path 
            d="M25 40 L75 40" 
            stroke="white" 
            strokeWidth="1" 
            strokeOpacity="0.3" 
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {!iconOnly && (
        <span className={`font-bold text-[28px] tracking-tight leading-none transition-colors ${lightText ? 'text-white' : 'text-black'} group-hover:text-[#FF6A13]`}>
          Coupons Mart
        </span>
      )}
    </Link>
  );
}
