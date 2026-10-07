import { useState, FormEvent } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, Utensils } from 'lucide-react';
import { CartItem, OrderConfirmation } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface OrderCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderSubmitted?: (order: OrderConfirmation) => void;
}

export function OrderCartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSubmitted,
}: OrderCartDrawerProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  const handleCheckoutWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setValidationError('⚠️ Please fill in all required fields (Name, Phone Number, and Delivery Address) to place your order.');
      return;
    }

    setValidationError('');
    const orderId = `HF-${Math.floor(1000 + Math.random() * 9000)}`;

    let itemsText = cartItems
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.menuItem.name} (${ci.menuItem.portion || 'Portion'}) - Rs. ${
            ci.menuItem.price * ci.quantity
          }`
      )
      .join('\n');

    let message = `Hello ${RESTAURANT_INFO.name},\n\nI would like to place an order for delivery:\n\n*Order #${orderId}*\n• Name: ${customerName.trim()}\n• Phone: ${phone.trim()}\n• Address: ${address.trim()}\n${
      notes ? `• Instructions: ${notes}\n` : ''
    }\n*Items Ordered:*\n${itemsText}\n\n*Total Bill:* Rs. ${totalAmount}\n\nPlease confirm my order and estimated delivery time. Thank you!`;

    window.open(
      `https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${encodeURIComponent(message)}`,
      '_blank'
    );

    if (onOrderSubmitted) {
      onOrderSubmitted({
        orderId,
        customerName: customerName.trim(),
        address: address.trim(),
        notes: notes.trim(),
        items: [...cartItems],
        totalAmount,
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedTime: '25 – 40 Minutes',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121212] border-l border-zinc-800 text-white flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif text-lg font-bold text-white">Your Order Cart</h3>
              <span className="bg-[#D4AF37] text-black text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white p-1 rounded-lg bg-zinc-900 border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-zinc-400">
                <Utensils className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                <p className="text-sm font-medium mb-1 text-white">Your cart is currently empty</p>
                <p className="text-xs text-zinc-500 mb-6">Explore our menu and add your favorite dishes!</p>
                <button
                  onClick={onClose}
                  className="bg-zinc-800 hover:bg-zinc-700 text-[#D4AF37] px-4 py-2 rounded-xl text-xs font-semibold border border-zinc-700"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((ci) => (
                    <div
                      key={ci.menuItem.id}
                      className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 flex items-center justify-between"
                    >
                      <div className="flex-1 pr-3">
                        <h4 className="font-bold text-sm text-white">{ci.menuItem.name}</h4>
                        <span className="text-xs text-[#D4AF37] font-semibold">
                          Rs. {ci.menuItem.price} each
                        </span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2 bg-black px-2 py-1 rounded-lg border border-zinc-800">
                        <button
                          onClick={() => onUpdateQuantity(ci.menuItem.id, -1)}
                          className="text-zinc-400 hover:text-white p-1"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold w-5 text-center">{ci.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(ci.menuItem.id, 1)}
                          className="text-zinc-400 hover:text-white p-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(ci.menuItem.id)}
                        className="text-zinc-500 hover:text-red-400 p-1.5 ml-2"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-zinc-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Cart Items</span>
                    <button
                      onClick={onClearCart}
                      className="text-xs text-red-400 hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>

                  {/* Customer Info Form */}
                  <form id="cart-form" onSubmit={handleCheckoutWhatsApp} className="space-y-3 pt-2">
                    <div className="bg-[#18181b] p-3 rounded-xl border border-[#D4AF37]/30 mb-2">
                      <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                        📋 Step 1: Fill Customer & Delivery Info
                      </span>
                      <p className="text-[11px] text-zinc-400">
                        Please provide your contact details so our kitchen and rider team can process your order.
                      </p>
                    </div>

                    {validationError && (
                      <div className="p-3 bg-red-950/90 border border-red-500/80 text-red-200 text-xs rounded-xl animate-bounce">
                        {validationError}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Full Name <span className="text-red-400 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Shahzaib Ahmed"
                        value={customerName}
                        onChange={(e) => {
                          setCustomerName(e.target.value);
                          if (validationError) setValidationError('');
                        }}
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Phone / WhatsApp Number <span className="text-red-400 font-bold">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0300 1234567"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (validationError) setValidationError('');
                        }}
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        Delivery Address <span className="text-red-400 font-bold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="House #, Street #, Sector 15-A / Buffer Zone / Nazimabad..."
                        value={address}
                        onChange={(e) => {
                          setAddress(e.target.value);
                          if (validationError) setValidationError('');
                        }}
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">Special Order Notes (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Extra spicy, extra green chutney..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-zinc-400 uppercase tracking-wider">Total Bill</span>
                <span className="font-serif text-3xl font-extrabold text-gold-gradient">
                  Rs. {totalAmount}
                </span>
              </div>

              <button
                type="submit"
                form="cart-form"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center space-x-2 transition shadow-lg cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Order via WhatsApp (+92 307 2076634)</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
