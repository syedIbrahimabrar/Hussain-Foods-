import { useState, useEffect } from 'react';
import { MenuItem, CartItem, OrderConfirmation } from './types';
import { MENU_ITEMS } from './data/menuData';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedDishes } from './components/FeaturedDishes';
import { MenuSection } from './components/MenuSection';
import { DealsSection } from './components/DealsSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { GallerySection } from './components/GallerySection';
import { ContactMapSection } from './components/ContactMapSection';
import { Footer } from './components/Footer';
import { OrderCartDrawer } from './components/OrderCartDrawer';
import { OriginalMenuModal } from './components/OriginalMenuModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { StickyBottomCartBar } from './components/StickyBottomCartBar';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('hf_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmation | null>(null);
  const [addedItemToast, setAddedItemToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('hf_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  const handleAddToCart = (menuItem: MenuItem) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItem.id === menuItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { menuItem, quantity: 1 }];
    });

    setAddedItemToast(menuItem.name);
    setTimeout(() => {
      setAddedItemToast(null);
    }, 3000);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((ci) => {
          if (ci.menuItem.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.menuItem.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSubmitted = (orderData: OrderConfirmation) => {
    setConfirmedOrder(orderData);
    setCartItems([]);
    setIsCartOpen(false);
  };

  const cartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);
  const cartTotal = cartItems.reduce((acc, ci) => acc + ci.menuItem.price * ci.quantity, 0);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#040406] text-white selection:bg-[#D4AF37] selection:text-black">
      {/* Navbar */}
      <Navbar
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenuModal={() => setIsMenuModalOpen(true)}
      />

      {/* Main Content */}
      <main>
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onOpenMenuModal={() => setIsMenuModalOpen(true)}
        />
        <FeaturedDishes
          items={MENU_ITEMS}
          onAddToCart={handleAddToCart}
        />
        <MenuSection
          items={MENU_ITEMS}
          onAddToCart={handleAddToCart}
          onOpenMenuModal={() => setIsMenuModalOpen(true)}
        />
        <DealsSection />
        <AboutSection />
        <WhyChooseUs />
        <ReviewsSection />
        <GallerySection />
        <ContactMapSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Item Added Visual Notification Toast */}
      {addedItemToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#121212] border-2 border-[#D4AF37] text-white px-5 py-3 rounded-full shadow-[0_10px_30px_rgba(212,175,55,0.3)] flex items-center space-x-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-xs sm:text-sm font-bold">
            Added <span className="text-[#D4AF37] font-extrabold">{addedItemToast}</span> to cart!
          </span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full transition flex items-center space-x-1 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Cart</span>
          </button>
        </div>
      )}

      {/* Sticky Bottom Order & Checkout Bar when cart is not empty */}
      <StickyBottomCartBar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onClearCart={handleClearCart}
      />

      {/* Live WhatsApp Order Cart Drawer */}
      <OrderCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSubmitted={handleOrderSubmitted}
      />

      {/* Order Placed Success Confirmation Pop-up */}
      <OrderSuccessModal
        isOpen={!!confirmedOrder}
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Official Menu Card Modal */}
      <OriginalMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </div>
  );
}
