import { CheckCircle2, Clock, MapPin, Send, X, ShoppingBag, PhoneCall } from 'lucide-react';
import { OrderConfirmation } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface OrderSuccessModalProps {
  order: OrderConfirmation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderSuccessModal({ order, isOpen, onClose }: OrderSuccessModalProps) {
  if (!isOpen || !order) return null;

  const handleOpenWhatsAppDirect = () => {
    let itemsText = order.items
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.menuItem.name} (${ci.menuItem.portion || 'Portion'}) - Rs. ${
            ci.menuItem.price * ci.quantity
          }`
      )
      .join('\n');

    let msg = `Hello ${RESTAURANT_INFO.name},\n\n*Order #${order.orderId} Confirmation*\nCustomer: ${order.customerName}\nAddress: ${order.address}\n\n*Items:*\n${itemsText}\n\n*Total Bill:* Rs. ${order.totalAmount}\n\nPlease update status on delivery. Thanks!`;

    window.open(
      `https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#121212] border border-[#D4AF37]/50 rounded-3xl shadow-2xl p-6 sm:p-8 text-white text-center overflow-hidden">
        {/* Background Decorative Gold Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon Ring */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 mb-4 animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>

        {/* Header Title */}
        <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Order Placed Successfully 🎉
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-1">
          Thank You, {order.customerName || 'Valued Customer'}!
        </h3>
        <p className="text-zinc-400 text-xs sm:text-sm mb-6">
          Your order <strong className="text-[#D4AF37]">#{order.orderId}</strong> has been received and dispatched to our kitchen staff.
        </p>

        {/* Order Info Card */}
        <div className="bg-zinc-900/90 rounded-2xl p-4 sm:p-5 border border-zinc-800 text-left space-y-4 mb-6">
          {/* Estimated Delivery Time */}
          <div className="flex items-center space-x-3 pb-3 border-b border-zinc-800">
            <div className="p-2.5 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37]">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">
                Estimated Delivery Time
              </span>
              <span className="text-sm font-bold text-white">
                {order.estimatedTime} (Buffer Zone & Nearby)
              </span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="flex items-start space-x-3 pb-3 border-b border-zinc-800">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 mt-0.5">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">
                Delivery Location
              </span>
              <span className="text-xs text-zinc-200">
                {order.address || 'Buffer Zone, Karachi'}
              </span>
            </div>
          </div>

          {/* Itemized Summary */}
          <div>
            <span className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-2">
              Items Summary ({order.items.length})
            </span>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {order.items.map((ci) => (
                <div key={ci.menuItem.id} className="flex justify-between text-xs py-1 border-b border-zinc-800/50">
                  <span className="text-zinc-300">
                    <strong className="text-[#D4AF37]">{ci.quantity}x</strong> {ci.menuItem.name}
                  </span>
                  <span className="font-semibold text-white">
                    Rs. {ci.menuItem.price * ci.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Bill Row */}
          <div className="pt-2 flex justify-between items-center text-sm font-bold">
            <span className="text-zinc-300">Total Payable Bill</span>
            <span className="font-serif text-xl font-extrabold text-gold-gradient">
              Rs. {order.totalAmount}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleOpenWhatsAppDirect}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-lg cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Open WhatsApp Chat (+92 307 2076634)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-2xl text-xs border border-zinc-800 transition cursor-pointer"
          >
            Back to Menu & Close
          </button>
        </div>
      </div>
    </div>
  );
}
