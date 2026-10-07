import { ShieldCheck, Heart, Award, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { HFLogo } from './HFLogo';

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-black border-t border-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Showcase Box */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-zinc-800 p-2 bg-[#121212] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                alt="Hussain Foods Karachi Culinary Excellence"
                className="w-full h-[400px] sm:h-[480px] object-cover rounded-2xl"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80';
                }}
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Overlay Stat Box */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <span className="text-gold-gradient font-serif text-2xl font-bold block">
                    ⭐ {RESTAURANT_INFO.rating} Rating
                  </span>
                  <span className="text-zinc-400 text-xs">Based on 450+ Customer Reviews</span>
                </div>
                <div className="text-right">
                  <span className="text-white font-bold text-sm block">Buffer Zone</span>
                  <span className="text-zinc-400 text-xs">North Nazimabad, Karachi</span>
                </div>
              </div>
            </div>

            {/* Floating Gold Emblem */}
            <div className="absolute -top-6 -right-6 hidden sm:flex items-center justify-center">
              <HFLogo className="w-24 h-24 shadow-2xl" />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-[#D4AF37] text-xs uppercase tracking-widest font-semibold">
              <Utensils className="w-4 h-4 text-[#D4AF37]" />
              <span>About Hussain Foods</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Crafting <span className="text-gold-gradient">Authentic Karachi Flavors</span> With Passion
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              At <strong>Hussain Foods</strong>, located in Buffer Zone, North Nazimabad, Karachi, we take pride in serving traditional Pakistani barbecue, aromatic dum biryani, crispy fried broasts, and succulent rolls.
            </p>

            <p className="text-zinc-400 text-sm leading-relaxed">
              Built on <strong>years of trust</strong>, every dish is prepared daily using 100% Zabiha Halal fresh meats, signature home-ground spice masalas, and charcoal smoke technique. Whether you dine in with family or order home delivery on WhatsApp, we guarantee rich taste in every bite.
            </p>

            {/* Core Values Bullet Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-zinc-900 rounded-lg text-[#D4AF37] border border-zinc-800">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">100% Halal Food</h4>
                  <p className="text-xs text-zinc-400">Strictly Zabiha certified meats</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-zinc-900 rounded-lg text-[#D4AF37] border border-zinc-800">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Fresh Ingredients</h4>
                  <p className="text-xs text-zinc-400">Marinated fresh every morning</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-zinc-900 rounded-lg text-[#D4AF37] border border-zinc-800">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Family Environment</h4>
                  <p className="text-xs text-zinc-400">Clean & comfortable dining</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-zinc-900 rounded-lg text-emerald-400 border border-zinc-800">
                  <Utensils className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Best Taste Guarantee</h4>
                  <p className="text-xs text-zinc-400">Master recipe tradition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
