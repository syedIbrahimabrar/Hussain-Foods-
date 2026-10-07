import { MapPin, Phone, Clock, ArrowUp, Heart, Facebook, Instagram } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { HFLogo } from './HFLogo';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] text-zinc-400 border-t border-zinc-800/80 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <HFLogo className="w-10 h-10" />
              <span className="font-serif text-xl font-bold text-white tracking-wider">
                HUSSAIN <span className="text-gold-gradient">FOODS</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              "A New Standard of Taste" — Serving Karachi authentic BBQ, dum biryani, crispy broasts, zinger burgers, and paratha rolls.
            </p>

            <div className="text-xs text-[#D4AF37] font-semibold">
              ⭐ 4.8 Rating • 100% Zabiha Halal Certified
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block mb-2">
                Follow Us On Social Media
              </span>
              <div className="flex items-center space-x-3">
                <a
                  href={RESTAURANT_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-3 py-2 rounded-xl text-xs font-bold border border-blue-500/30 transition duration-300"
                  title="Follow Hussain Foods on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
                <a
                  href={RESTAURANT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-pink-600/20 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-pink-400 hover:text-white px-3 py-2 rounded-xl text-xs font-bold border border-pink-500/30 transition duration-300"
                  title="Follow Hussain Foods on Instagram"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-white font-bold mb-4 border-b border-zinc-800 pb-2">
              Navigation Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><a href="#home" className="hover:text-[#D4AF37] transition">Home Page</a></li>
              <li><a href="#popular" className="hover:text-[#D4AF37] transition">Popular Dishes</a></li>
              <li><a href="#menu" className="hover:text-[#D4AF37] transition">Full Food Menu</a></li>
              <li><a href="#combos" className="hover:text-[#D4AF37] transition">Special Combos</a></li>
              <li><a href="#about" className="hover:text-[#D4AF37] transition">About Our Kitchen</a></li>
              <li><a href="#reviews" className="hover:text-[#D4AF37] transition">Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-[#D4AF37] transition">Contact & Location</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-white font-bold mb-4 border-b border-zinc-800 pb-2">
              Contact & Address
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>R-904 Sector 15-A/2, Buffer Zone, North Nazimabad Town, Karachi</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="hover:text-white font-bold text-zinc-200">
                  +92 307 2076634
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <span>Daily 11:00 AM – 2:00 AM</span>
              </li>
            </ul>
          </div>

          {/* Delivery Note & Google Maps */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-wider text-white font-bold mb-4 border-b border-zinc-800 pb-2">
              Free Home Delivery
            </h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Fast home delivery in Buffer Zone, North Nazimabad, and nearby sectors in Karachi via WhatsApp order.
            </p>
            <a
              href={RESTAURANT_INFO.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-zinc-900 hover:bg-zinc-800 text-[#D4AF37] border border-zinc-800 hover:border-[#D4AF37]/50 px-4 py-2.5 rounded-xl text-xs font-semibold transition"
            >
              Google Maps Share Link ↗
            </a>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 space-y-4 sm:space-y-0">
          <p>© 2026 Hussain Foods Karachi. All Rights Reserved.</p>
          <div className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Karachi Food Lovers</span>
          </div>
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-zinc-900 hover:bg-zinc-800 text-[#D4AF37] border border-zinc-800 rounded-full transition"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
