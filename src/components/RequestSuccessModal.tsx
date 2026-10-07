import { CheckCircle2, Clock, Calendar, Users, Send, X, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export interface CateringRequestInfo {
  requestId: string;
  name: string;
  phone: string;
  guests: string;
  eventDate?: string;
  message?: string;
}

interface RequestSuccessModalProps {
  request: CateringRequestInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RequestSuccessModal({ request, isOpen, onClose }: RequestSuccessModalProps) {
  if (!isOpen || !request) return null;

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${RESTAURANT_INFO.name},\n\n*Catering Request #${request.requestId}*\n• Name: ${request.name}\n• Phone: ${request.phone}\n• Guests: ${request.guests}\n${
        request.eventDate ? `• Date: ${request.eventDate}\n` : ''
      }${request.message ? `• Requirements: ${request.message}\n` : ''}\nPlease confirm menu options and quotation.`
    );
    window.open(`https://wa.me/${RESTAURANT_INFO.phoneRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#121212] border border-[#D4AF37]/50 rounded-3xl shadow-2xl p-6 sm:p-8 text-white text-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500 mb-4 animate-bounce">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>

        <div className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Request Submitted 🎉
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white mb-2">
          Catering Request Received!
        </h3>

        <p className="text-zinc-400 text-xs sm:text-sm mb-6">
          Thank you <strong className="text-white">{request.name}</strong>. Your request reference ID is{' '}
          <strong className="text-[#D4AF37]">#{request.requestId}</strong>.
        </p>

        {/* Details Card */}
        <div className="bg-zinc-900/90 rounded-2xl p-5 border border-zinc-800 text-left space-y-3.5 mb-6 text-xs sm:text-sm">
          <div className="flex justify-between pb-2 border-b border-zinc-800">
            <span className="text-zinc-400 flex items-center space-x-1.5">
              <Users className="w-4 h-4 text-[#D4AF37]" />
              <span>Estimated Guests</span>
            </span>
            <span className="font-bold text-white">{request.guests}</span>
          </div>

          <div className="flex justify-between pb-2 border-b border-zinc-800">
            <span className="text-zinc-400 flex items-center space-x-1.5">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Event Date</span>
            </span>
            <span className="font-bold text-white">{request.eventDate || 'Flexible'}</span>
          </div>

          <div className="pb-2 border-b border-zinc-800">
            <span className="text-zinc-400 block mb-1">Contact Phone:</span>
            <span className="font-bold text-white">{request.phone}</span>
          </div>

          {request.message && (
            <div>
              <span className="text-zinc-400 block mb-1">Special Requirements:</span>
              <p className="text-zinc-300 italic bg-black/60 p-2.5 rounded-xl border border-zinc-800/80">
                "{request.message}"
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition shadow-lg cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Open Inquiry in WhatsApp Chat</span>
          </button>

          <button
            onClick={onClose}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-semibold py-3 rounded-2xl text-xs border border-zinc-800 transition cursor-pointer"
          >
            Done & Close
          </button>
        </div>
      </div>
    </div>
  );
}
