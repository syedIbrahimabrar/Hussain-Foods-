import { useState } from 'react';
import { Camera, X, Maximize2 } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/menuData';

export function GallerySection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-20 bg-[#0a0a0c] border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-3">
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-white mb-4">
            Our <span className="text-gold-gradient">Food Gallery</span>
          </h2>
          <p className="text-zinc-400 text-sm">
            Freshly prepared dishes from our kitchen in Buffer Zone, Karachi.
          </p>
        </div>

        {/* Masonry / Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(img.src)}
              className="relative h-64 rounded-2xl overflow-hidden border border-zinc-800 hover:border-[#D4AF37]/60 group cursor-pointer shadow-xl bg-zinc-900"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                <span className="text-xs uppercase text-[#D4AF37] font-semibold">{img.category}</span>
                <h4 className="text-white font-serif font-bold text-base flex items-center justify-between">
                  <span>{img.alt}</span>
                  <Maximize2 className="w-4 h-4 text-[#D4AF37]" />
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white bg-zinc-900 p-2.5 rounded-full border border-zinc-700"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImage}
            alt="Expanded food view"
            className="max-w-full max-h-[85vh] object-contain rounded-2xl border border-zinc-800 shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
