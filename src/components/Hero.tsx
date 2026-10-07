import { ArrowDown, Star, ShieldCheck, Truck, PhoneCall } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenMenuModal: () => void;
}

export function Hero({ onExploreMenu, onOpenMenuModal }: HeroProps) {
  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Hello ${RESTAURANT_INFO.name},\n\nI would like to place an order for home delivery. Please share your current available specials.`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black">
      {/* Background Image with Dark Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80"
          alt="Hussain Foods Premium Barbecue and Biryani Feast"
          className="w-full h-full object-cover object-center scale-105 opacity-40"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1920&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black" />
      </div>

      {/* Decorative Gold Accent Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Floating Badge */}
        <div className="inline-flex items-center space-x-2 bg-zinc-900/90 border border-[#D4AF37]/30 rounded-full px-4 py-1.5 mb-6 text-xs sm:text-sm text-zinc-300 backdrop-blur-md shadow-lg animate-float-slow">
          <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
          <span>Rated <strong className="text-white">4.8★</strong> by 450+ Food Enthusiasts in Karachi</span>
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          HUSSAIN <span className="text-gold-gradient">FOODS</span>
        </h1>

        <p className="font-serif italic text-lg sm:text-2xl text-[#D4AF37] mb-4">
          "A New Standard of Taste"
        </p>

        {/* Sub-tagline */}
        <p className="text-zinc-300 text-base sm:text-xl max-w-2xl mb-8 leading-relaxed">
          Authentic Pakistani BBQ, Dum Biryani, Crispy Broasts, Zinger Burgers & Paratha Rolls cooked fresh daily in Buffer Zone, Karachi.
        </p>

        {/* Key Feature Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 text-xs sm:text-sm text-zinc-300">
          <div className="flex items-center space-x-2 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Zabiha Halal</span>
          </div>
          <div className="flex items-center space-x-2 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800">
            <Truck className="w-4 h-4 text-[#D4AF37]" />
            <span>Free Home Delivery</span>
          </div>
          <div className="flex items-center space-x-2 bg-zinc-900/60 px-3 py-1.5 rounded-full border border-zinc-800">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>Direct WhatsApp Order</span>
          </div>
        </div>

        {/* CTA Buttons Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            onClick={handleWhatsAppOrder}
            id="hero-whatsapp-btn"
            className="w-full sm:w-auto bg-gold-gradient hover:bg-gold-gradient-hover text-black font-bold px-8 py-4 rounded-full text-base sm:text-lg tracking-wide transition-all duration-300 shadow-xl shadow-amber-900/30 flex items-center justify-center space-x-3 cursor-pointer group transform hover:-translate-y-0.5"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
            <span>Order on WhatsApp Now</span>
          </button>

          <button
            onClick={onExploreMenu}
            id="hero-menu-btn"
            className="w-full sm:w-auto bg-zinc-900/90 hover:bg-zinc-800 text-white font-semibold px-8 py-4 rounded-full text-base sm:text-lg border border-zinc-700 hover:border-[#D4AF37]/50 transition duration-300 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Explore Menu & Prices</span>
          </button>

          <button
            onClick={onOpenMenuModal}
            className="text-xs text-[#D4AF37] hover:underline underline-offset-4 py-2 text-center block sm:hidden"
          >
            📄 View Official Menu Card Image
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-zinc-500 hover:text-[#D4AF37] transition cursor-pointer">
        <a href="#popular" className="flex flex-col items-center space-y-1">
          <span className="text-[11px] uppercase tracking-widest text-zinc-400">Scroll to Explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
        </a>
      </div>
    </section>
  );
}
