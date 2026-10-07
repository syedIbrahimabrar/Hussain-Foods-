import { ReactNode } from 'react';
import {
  Sparkles,
  Bike,
  ShieldCheck,
  UtensilsCrossed,
  Tag,
  HeartHandshake,
  ChefHat,
  Award,
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/menuData';

const iconMap: Record<string, ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
  Bike: <Bike className="w-6 h-6 text-[#D4AF37]" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6 text-[#D4AF37]" />,
  Tag: <Tag className="w-6 h-6 text-[#D4AF37]" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-[#D4AF37]" />,
  ChefHat: <ChefHat className="w-6 h-6 text-[#D4AF37]" />,
  Award: <Award className="w-6 h-6 text-[#D4AF37]" />,
};

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-[#08080a] border-t border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
            The Hussain Foods Standard
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Why Food Lovers <span className="text-gold-gradient">Choose Us</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            We hold ourselves to the highest standards of culinary quality, hygiene, and authentic taste.
          </p>
        </div>

        {/* 8 Pillar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#121212] rounded-2xl p-6 border border-zinc-800/80 hover:border-[#D4AF37]/40 transition duration-300 hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-[#D4AF37]/50 transition">
                {iconMap[item.icon]}
              </div>
              <h3 className="font-serif text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition">
                {item.title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
