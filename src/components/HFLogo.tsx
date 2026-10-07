interface HFLogoProps {
  className?: string;
  imgClassName?: string;
}

export function HFLogo({ className = "w-10 h-10 sm:w-12 sm:h-12", imgClassName = "w-full h-full object-cover rounded-full" }: HFLogoProps) {
  return (
    <div className={`relative rounded-full border border-[#D4AF37]/80 overflow-hidden bg-black flex items-center justify-center shrink-0 shadow-lg ${className}`}>
      <img
        src="/images/hf_logo.jpg"
        alt="Hussain Foods Official HF Logo"
        className={imgClassName}
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback to high-resolution Unsplash gold food emblem if static file fails
          e.currentTarget.onerror = null;
          e.currentTarget.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80";
        }}
      />
    </div>
  );
}
