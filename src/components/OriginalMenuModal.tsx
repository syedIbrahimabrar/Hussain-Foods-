import { X, ExternalLink } from 'lucide-react';

interface OriginalMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OriginalMenuModal({ isOpen, onClose }: OriginalMenuModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-[#121212] rounded-2xl border border-zinc-800 p-6 flex flex-col overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-white">Official Restaurant Menu Card</h3>
            <p className="text-xs text-zinc-400">Official pricing card from Hussain Foods Buffer Zone</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-2 bg-zinc-900 border border-zinc-800 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 text-center">
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 inline-block w-full">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
              alt="Hussain Foods Official Menu Card"
              className="max-w-full mx-auto rounded-lg shadow-xl"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80';
              }}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-400">
          <span>Phone: +92 307 2076634 • Buffer Zone Karachi</span>
          <button
            onClick={onClose}
            className="bg-gold-gradient text-black font-bold px-4 py-2 rounded-lg cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
}
