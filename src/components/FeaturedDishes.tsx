import { Star, ShoppingBag, Flame } from 'lucide-react';
import { MenuItem } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface FeaturedDishesProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
}

export function FeaturedDishes({ items, onAddToCart }: FeaturedDishesProps) {
  const popularDishes = items.filter((item) => item.popular).slice(0, 6);

  const handleOrderSingleWhatsApp = (item: MenuItem) => {
    const text = encodeURIComponent(
      `Hello ${RESTAURANT_INFO.name},\n\nI would like to order:\n• ${item.name} - Rs. ${item.price}\n\nPlease confirm the total bill and estimated delivery time.`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <section id="popular" className="py-20 bg-[#09090b] border-t border-b border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-3">
            <Flame className="w-4 h-4 text-[#D4AF37]" />
            <span>Today's Customer Favorites</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Today's <span className="text-gold-gradient">Popular Items</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Hand-crafted authentic BBQ, Biryani, and Broasts that our customers order again and again.
          </p>
        </div>

        {/* Featured Dish Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDishes.map((dish) => (
            <div
              key={dish.id}
              className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-800/90 hover:border-[#D4AF37]/50 transition-all duration-300 hover:-translate-y-1 shadow-2xl group flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-zinc-900">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/30" />

                {/* Popular Tag */}
                <span className="absolute top-3 left-3 bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">
                  ★ Popular
                </span>

                {dish.portion && (
                  <span className="absolute top-3 right-3 bg-zinc-900/90 text-zinc-300 text-xs font-medium px-2.5 py-1 rounded-full border border-zinc-700">
                    {dish.portion}
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                      {dish.category}
                    </span>
                    <div className="flex items-center text-amber-400 text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      <span>4.9</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition">
                    {dish.name}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div>
                  {/* Price Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/80 mb-4">
                    <span className="text-xs text-zinc-400 uppercase tracking-wider">Price</span>
                    <span className="font-serif text-2xl font-extrabold text-gold-gradient">
                      Rs. {dish.price}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleOrderSingleWhatsApp(dish)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 transition shadow cursor-pointer"
                    >
                      <span>Order on WhatsApp</span>
                    </button>
                    <button
                      onClick={() => onAddToCart(dish)}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center space-x-1 border border-zinc-700 hover:border-[#D4AF37]/50 transition cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
