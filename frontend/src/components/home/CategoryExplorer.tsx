"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'fashion',
    title: 'Fashion',
    subtitle: 'AESTHETICS',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'tech',
    title: 'Tech',
    subtitle: 'INNOVATION',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'beauty',
    title: 'Beauty',
    subtitle: 'SELF-CARE',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'travel',
    title: 'Travel',
    subtitle: 'EXPERIENCES',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'food',
    title: 'Food & Dining',
    subtitle: 'CULINARY',
    image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'home',
    title: 'Home & Living',
    subtitle: 'SANCTUARY',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fitness',
    title: 'Health & Fitness',
    subtitle: 'VITALITY',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    subtitle: 'LEISURE',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
  }
];

export default function CategoryExplorer() {
  return (
    <section className="bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-[32px] md:text-[40px] font-['Manrope'] font-semibold text-[#1A1C1C] leading-[1.1] tracking-[-0.8px] mb-2 text-center sm:text-left">
              Curated Collections
            </h2>
            <p className="text-[16px] font-['Manrope'] text-[#554434] leading-[24px] text-center sm:text-left">
              Discover premium rewards across every lifestyle category.
            </p>
          </div>

          <div className="flex justify-center sm:justify-end">
            <Link
              href="/categories"
              className="group flex items-center justify-center sm:justify-start gap-2 font-['Manrope'] font-bold text-[#8B5000] text-[15px] hover:text-[#FF9800] transition-colors"
            >
              Explore Directory <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4x2 Elegant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link key={cat.id} href={`/category/${cat.id}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: (i % 4) * 0.1, duration: 0.4 }}
                className="relative w-full h-[240px] md:h-[280px] rounded-[24px] md:rounded-[32px] overflow-hidden group cursor-pointer"
              >
                {/* Background Image Setup */}
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />

                {/* Gradient Overlay for Text Legibility */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center transform group-hover:-translate-y-2 transition-transform duration-300">
                  <span className="font-['Manrope'] text-[10px] font-bold tracking-[1.5px] text-white/90 uppercase mb-2 px-3 py-1 rounded-full border border-white/30 backdrop-blur-md">
                    {cat.subtitle}
                  </span>
                  <h3 className="font-['Manrope'] font-semibold text-[24px] md:text-[28px] leading-tight tracking-[-0.32px] text-white">
                    {cat.title}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
