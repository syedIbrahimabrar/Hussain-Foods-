import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { COMBOS_DATA, RESTAURANT_INFO } from '../data/menuData';

export function DealsSection() {
  const handleComboWhatsApp = (comboName: string, comboPrice: number) => {
    const text = encodeURIComponent(
      `Hello ${RESTAURANT_INFO.name},\n\nI would like to order the special deal:\n• ${comboName} - Rs. ${comboPrice}\n\nPlease confirm delivery address and estimated delivery time.`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <section id="combos" className="py-20 bg-[#0c0c0e] border-t border-zinc-800/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Limited Time Family Deals</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Special <span className="text-gold-gradient">Combo Packages</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Save big with our pre-set combo bundles featuring our iconic Tikka, Kabab Rolls, Parathas, and Drinks.
          </p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {COMBOS_DATA.map((combo) => (
            <div
              key={combo.id}
              className="bg-[#121212] rounded-2xl p-6 border border-zinc-800 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {combo.popularTag && (
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {combo.popularTag}
                </div>
              )}

              <div>
                <span className="text-xs uppercase text-[#D4AF37] font-semibold tracking-wider block mb-2">
                  Bundle Deal
                </span>

                <h3 className="font-serif text-xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition">
                  {combo.name}
                </h3>

                {/* Items included list */}
                <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-zinc-300">
                  {combo.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-800/80">
                <div className="flex items-baseline space-x-2 mb-4">
                  <span className="font-serif text-2xl font-extrabold text-gold-gradient">
                    Rs. {combo.price}
                  </span>
                  {combo.originalPrice && (
                    <span className="text-xs text-zinc-500 line-through">
                      Rs. {combo.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleComboWhatsApp(combo.name, combo.price)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-lg cursor-pointer"
                >
                  <span>Order Combo on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
