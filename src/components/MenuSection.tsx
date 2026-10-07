import { useState, useMemo } from 'react';
import { Search, ShoppingBag, FileText, Check } from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_CATEGORIES, RESTAURANT_INFO } from '../data/menuData';

interface MenuSectionProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onOpenMenuModal: () => void;
}

export function MenuSection({ items, onAddToCart, onOpenMenuModal }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const handleOrderSingleWhatsApp = (item: MenuItem) => {
    const text = encodeURIComponent(
      `Hello ${RESTAURANT_INFO.name},\n\nI would like to order:\n• ${item.name} - Rs. ${item.price}\n\nPlease confirm the total bill and estimated delivery time.`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  const handleAddToCartWithFeedback = (item: MenuItem) => {
    onAddToCart(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1500);
  };

  return (
    <section id="menu" className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
              Official Restaurant Menu
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white">
              Delicious <span className="text-gold-gradient">Menu</span>
            </h2>
            <p className="text-zinc-400 text-sm mt-2">
              All prices strictly extracted from Hussain Foods official menu card.
            </p>
          </div>

          <button
            onClick={onOpenMenuModal}
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 bg-zinc-900 hover:bg-zinc-800 text-[#D4AF37] border border-[#D4AF37]/40 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Inspect Original Menu Card Image</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-10 space-y-6">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto md:mx-0">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search dishes (e.g., Zinger, Biryani, Tikka, Roll)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#121212] border border-zinc-800 focus:border-[#D4AF37] rounded-full py-3 pl-11 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs (Horizontal Scrollable) */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-3 scrollbar-none scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gold-gradient text-black font-bold shadow-lg shadow-amber-950/40'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dishes Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#121212] rounded-2xl border border-zinc-800 p-8">
            <p className="text-zinc-400 text-base mb-4">No menu items match your search "{searchQuery}".</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="text-[#D4AF37] hover:underline text-sm font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isAdded = !!addedItemIds[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-[#121212] rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
                >
                  {/* Food Image */}
                  <div className="relative h-44 overflow-hidden bg-zinc-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/20" />
                    <span className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-[#D4AF37] text-[10px] uppercase font-bold px-2.5 py-1 rounded-md border border-zinc-800">
                      {item.category}
                    </span>
                    {item.portion && (
                      <span className="absolute top-2.5 right-2.5 bg-zinc-900/90 text-zinc-300 text-[10px] px-2 py-0.5 rounded">
                        {item.portion}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white mb-1 group-hover:text-[#D4AF37] transition">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-zinc-400 text-xs line-clamp-2 mb-3 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4 pt-3 border-t border-zinc-800/80">
                        <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Price</span>
                        <span className="font-serif text-xl font-bold text-gold-gradient">
                          Rs. {item.price}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleOrderSingleWhatsApp(item)}
                          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-2.5 rounded-lg text-xs flex items-center justify-center space-x-1 transition shadow cursor-pointer"
                        >
                          <span>WhatsApp</span>
                        </button>

                        <button
                          onClick={() => handleAddToCartWithFeedback(item)}
                          className={`w-full py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1 transition cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                              : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 hover:border-[#D4AF37]/40'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Added!</span>
                            </>
                          ) : (
                            <>
                              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                              <span>+ Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
