import { ShoppingBag, ArrowRight, Trash2, Utensils } from 'lucide-react';
import { CartItem } from '../types';

interface StickyBottomCartBarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onClearCart: () => void;
}

export function StickyBottomCartBar({ cartItems, onOpenCart, onClearCart }: StickyBottomCartBarProps) {
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.menuItem.price * item.quantity,
    0
  );

  if (totalCount === 0) return null;

  // Short preview of item names
  const itemNamesPreview = cartItems
    .map((ci) => `${ci.quantity}x ${ci.menuItem.name}`)
    .join(', ');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-gradient-to-t from-black via-[#0c0c0e] to-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="bg-[#121215]/95 backdrop-blur-md border border-[#D4AF37]/50 rounded-2xl p-3.5 sm:px-6 sm:py-4 shadow-2xl flex items-center justify-between gap-3 text-white animate-in slide-in-from-bottom duration-300">
          
          {/* Left: Cart Counter & Item Preview */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="relative p-2.5 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] flex-shrink-0">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-black font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-black shadow">
                {totalCount}
              </span>
            </div>

            <div className="min-w-0 hidden xs:block">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Order Summary
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Ready to Checkout
                </span>
              </div>
              <p className="text-xs text-zinc-400 truncate max-w-[180px] sm:max-w-sm font-medium mt-0.5">
                {itemNamesPreview}
              </p>
            </div>
          </div>

          {/* Right: Total Price & Checkout Action */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">Total Bill</span>
              <span className="font-serif text-lg sm:text-2xl font-extrabold text-gold-gradient">
                Rs. {totalAmount}
              </span>
            </div>

            <button
              onClick={onOpenCart}
              id="sticky-checkout-btn"
              className="bg-gold-gradient hover:bg-gold-gradient-hover text-black font-extrabold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm flex items-center space-x-2 shadow-lg transition transform hover:scale-105 cursor-pointer"
            >
              <span>Fill Info & Order</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClearCart}
              className="text-zinc-500 hover:text-red-400 p-2 rounded-lg hover:bg-zinc-900 transition text-xs hidden sm:block"
              title="Clear Cart"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
