import { useState, useEffect } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, Phone, Clock, MapPin, Facebook, Instagram } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { HFLogo } from './HFLogo';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenMenuModal: () => void;
}

export function Navbar({ cartCount, cartTotal, onOpenCart, onOpenMenuModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Popular', href: '#popular' },
    { name: 'Menu', href: '#menu' },
    { name: 'Combos', href: '#combos' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello ${RESTAURANT_INFO.name},\n\nI would like to place an order / inquire about your menu.`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Top Bar for Location & Hours */}
      <div className="bg-[#09090b] border-b border-zinc-800 text-xs text-zinc-400 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Buffer Zone, North Nazimabad, Karachi</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{RESTAURANT_INFO.openingHours}</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenMenuModal}
              className="text-xs text-[#D4AF37] hover:underline font-medium cursor-pointer"
            >
              📄 View Official Menu Card
            </button>
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="flex items-center space-x-1 text-white hover:text-[#D4AF37] transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{RESTAURANT_INFO.phoneDisplay}</span>
            </a>
            <span className="text-zinc-700">|</span>
            <div className="flex items-center space-x-2">
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-blue-400 transition"
                title="Hussain Foods Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-pink-400 transition"
                title="Hussain Foods Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-md shadow-2xl py-3 border-b border-zinc-800/80 md:top-0'
            : 'bg-gradient-to-b from-black/80 to-transparent py-4 md:top-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-3 group">
            <HFLogo className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-105 transition duration-300" />
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-white block leading-none">
                HUSSAIN <span className="text-gold-gradient">FOODS</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-zinc-400 block mt-0.5">
                Karachi • Est. 4.8★
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-zinc-300 hover:text-[#D4AF37] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* WhatsApp Order Button */}
            <button
              onClick={handleWhatsAppDirect}
              className="hidden sm:flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all shadow-lg hover:shadow-emerald-900/30"
              title="Order directly on WhatsApp"
            >
              <span>WhatsApp</span>
            </button>

            {/* Cart Button with Count Badge */}
            <button
              onClick={onOpenCart}
              id="cart-drawer-toggle"
              aria-label="Open Order Cart"
              className="relative bg-zinc-900 hover:bg-zinc-800 text-white p-2.5 sm:px-4 sm:py-2 rounded-full border border-zinc-800 hover:border-[#D4AF37]/40 flex items-center space-x-2 transition cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <span className="hidden sm:inline text-xs font-medium">Cart</span>
              {cartCount > 0 ? (
                <span className="bg-[#D4AF37] text-black text-xs font-bold px-2 py-0.5 rounded-full animate-bounce">
                  {cartCount} (Rs. {cartTotal})
                </span>
              ) : (
                <span className="bg-zinc-800 text-zinc-400 text-xs px-1.5 py-0.5 rounded-full">
                  0
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-zinc-300 hover:text-white p-2 rounded-lg bg-zinc-900 border border-zinc-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-zinc-800">
              <span className="text-xs uppercase text-zinc-400 tracking-wider">Navigation Menu</span>
              <button
                onClick={onOpenMenuModal}
                className="text-xs text-[#D4AF37] font-medium"
              >
                📜 Official Menu Card
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-200 hover:text-[#D4AF37] text-base py-2 font-medium border-b border-zinc-900"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="pt-2 flex flex-col space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppDirect();
                }}
                className="w-full bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center space-x-2 shadow cursor-pointer"
              >
                <span>Order on WhatsApp (+92 307 2076634)</span>
              </button>

              <div className="flex items-center space-x-2 pt-1">
                <a
                  href={RESTAURANT_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-900/40 hover:bg-blue-600 text-blue-300 hover:text-white py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 border border-blue-700/40 transition"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
                <a
                  href={RESTAURANT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-pink-900/40 hover:bg-pink-600 text-pink-300 hover:text-white py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 border border-pink-700/40 transition"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
