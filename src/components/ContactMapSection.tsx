import { useState, FormEvent } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Send,
  Wifi,
  Car,
  Utensils,
  ShieldCheck,
  CheckCircle,
  X,
  Sparkles,
  Calendar,
  Users,
  CheckCircle2,
  Facebook,
  Instagram,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface RequestSummary {
  name: string;
  phone: string;
  guests: string;
  eventDate: string;
  message: string;
  submittedAt: string;
}

export function ContactMapSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '10-20',
    eventDate: '',
    message: '',
  });

  const [activeRequestModal, setActiveRequestModal] = useState<RequestSummary | null>(null);

  const handleSubmitInquiry = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    const summary: RequestSummary = {
      ...formData,
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const text = encodeURIComponent(
      `Hello ${RESTAURANT_INFO.name},\n\n*Catering / Reservation Inquiry*\n• Name: ${formData.name}\n• Phone: ${formData.phone}\n• Guests: ${formData.guests}\n• Date: ${formData.eventDate || 'As soon as possible'}\n• Details: ${formData.message || 'Standard Catering Menu'}`
    );

    window.open(`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${text}`, '_blank');
    setActiveRequestModal(summary);
  };

  const amenities = [
    { icon: <Wifi className="w-4 h-4 text-[#D4AF37]" />, label: 'Free High-Speed WiFi' },
    { icon: <Car className="w-4 h-4 text-[#D4AF37]" />, label: 'Free Parking Space' },
    { icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />, label: '100% Zabiha Halal' },
    { icon: <Utensils className="w-4 h-4 text-[#D4AF37]" />, label: 'Dine-In & Family Seating' },
  ];

  return (
    <section id="contact" className="py-20 bg-black border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest block mb-2">
            Location & Contact
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Visit Us or <span className="text-gold-gradient">Order Now</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Located in the heart of Buffer Zone, North Nazimabad, Karachi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Column: Address Details & Hours (5 cols) */}
          <div className="lg:col-span-5 bg-[#121212] p-6 sm:p-8 rounded-2xl border border-zinc-800 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold text-white mb-6 border-b border-zinc-800 pb-4">
                Restaurant Details
              </h3>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[#D4AF37]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Address</h4>
                  <p className="text-white text-sm sm:text-base font-medium mt-1">
                    {RESTAURANT_INFO.address}
                  </p>
                  <a
                    href={RESTAURANT_INFO.googleMapsShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs text-[#D4AF37] font-semibold mt-2 hover:underline"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[#D4AF37]">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Phone / WhatsApp</h4>
                  <a
                    href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                    className="text-white text-lg font-bold hover:text-[#D4AF37] transition mt-1 block"
                  >
                    {RESTAURANT_INFO.phoneDisplay}
                  </a>
                  <p className="text-xs text-emerald-400 font-medium mt-0.5">
                    ✓ Available for WhatsApp Delivery & Queries
                  </p>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[#D4AF37]">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Opening Hours</h4>
                  <p className="text-white text-sm font-semibold mt-1">
                    {RESTAURANT_INFO.openingHours}
                  </p>
                  <span className="text-xs text-zinc-400">Open 7 days a week including holidays</span>
                </div>
              </div>

              {/* Official Social Media Channels */}
              <div className="pt-4 border-t border-zinc-800">
                <h4 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-3">
                  Official Social Media
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={RESTAURANT_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2.5 bg-blue-950/40 hover:bg-blue-600 text-blue-400 hover:text-white p-3 rounded-xl border border-blue-800/50 transition duration-300 group"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-600/20 group-hover:bg-white/20">
                      <Facebook className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block leading-none">Facebook</span>
                      <span className="text-[10px] text-zinc-400 group-hover:text-blue-100">@hussainfoods</span>
                    </div>
                  </a>

                  <a
                    href={RESTAURANT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2.5 bg-pink-950/40 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-pink-400 hover:text-white p-3 rounded-xl border border-pink-800/50 transition duration-300 group"
                  >
                    <div className="p-1.5 rounded-lg bg-pink-600/20 group-hover:bg-white/20">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold block leading-none">Instagram</span>
                      <span className="text-[10px] text-zinc-400 group-hover:text-pink-100">@hussainfoods</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Amenities Grid */}
              <div className="pt-4 border-t border-zinc-800">
                <h4 className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-3">
                  Services & Amenities
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
                  {amenities.map((a, i) => (
                    <div key={i} className="flex items-center space-x-2 bg-zinc-900/80 p-2 rounded-lg border border-zinc-800/80">
                      {a.icon}
                      <span>{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Catering & Event Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#121212] p-6 sm:p-8 rounded-2xl border border-zinc-800 flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Catering & Large Order <span className="text-gold-gradient">Inquiry</span>
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mb-6">
                Planning a wedding, family dawat, or corporate gathering? Send your requirement directly to our chef team.
              </p>

              {activeRequestModal && (
                <div className="mb-6 p-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 rounded-xl text-xs flex items-center space-x-2 animate-in fade-in">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <span>Request Submitted! Check the pop-up confirmation on your screen.</span>
                </div>
              )}

              <form onSubmit={handleSubmitInquiry} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mansoor"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Estimated Guests</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    >
                      <option value="10-20">10 - 20 Guests</option>
                      <option value="20-50">20 - 50 Guests</option>
                      <option value="50-100">50 - 100 Guests</option>
                      <option value="100+">100+ Large Event</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1">Event Date</label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">Special Requirements (Dishes, Delivery Time)</label>
                  <textarea
                    rows={3}
                    placeholder="e.g., Mutton roast, 2 Deg Biryani, Tikka Platter..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-gradient hover:bg-gold-gradient-hover text-black font-bold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-lg cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Catering Request via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Embedded Google Map Section */}
        <div className="rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative bg-[#121212]">
          <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center">
            <span className="text-xs font-semibold text-white flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Live Google Map Location — Hussain Foods Buffer Zone</span>
            </span>
            <a
              href={RESTAURANT_INFO.googleMapsShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#D4AF37] hover:underline font-semibold"
            >
              Open in Google Maps App ↗
            </a>
          </div>
          <div className="w-full h-[380px] sm:h-[450px]">
            <iframe
              src={RESTAURANT_INFO.googleMapsEmbedIframeSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hussain Foods Google Map Location"
            />
          </div>
        </div>

        {/* Request Confirmation Pop-up Modal */}
        {activeRequestModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-[#121212] border border-[#D4AF37]/50 rounded-3xl shadow-2xl p-6 sm:p-8 text-white text-center overflow-hidden">
              <button
                onClick={() => setActiveRequestModal(null)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-zinc-800 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 mb-4 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                Request Sent Successfully 🎉
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-2">
                Inquiry Received!
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm mb-6">
                Thank you <strong className="text-white">{activeRequestModal.name}</strong>. Your catering & reservation request has been submitted to our manager.
              </p>

              <div className="bg-zinc-900/90 rounded-2xl p-5 border border-zinc-800 text-left space-y-3 mb-6 text-xs sm:text-sm">
                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400 flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-[#D4AF37]" />
                    <span>Estimated Guests:</span>
                  </span>
                  <span className="font-bold text-white">{activeRequestModal.guests}</span>
                </div>

                <div className="flex justify-between pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400 flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-[#D4AF37]" />
                    <span>Event Date:</span>
                  </span>
                  <span className="font-bold text-white">{activeRequestModal.eventDate || 'Flexible Date'}</span>
                </div>

                <div className="pb-2 border-b border-zinc-800">
                  <span className="text-zinc-400 block mb-1">Contact Phone:</span>
                  <span className="font-bold text-white">{activeRequestModal.phone}</span>
                </div>

                {activeRequestModal.message && (
                  <div>
                    <span className="text-zinc-400 block mb-1">Details / Requirements:</span>
                    <p className="text-zinc-300 italic bg-black/60 p-2.5 rounded-xl border border-zinc-800">
                      "{activeRequestModal.message}"
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => setActiveRequestModal(null)}
                className="w-full bg-gold-gradient hover:bg-gold-gradient-hover text-black font-bold py-3.5 rounded-2xl text-xs sm:text-sm transition shadow-lg cursor-pointer"
              >
                Done & Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
