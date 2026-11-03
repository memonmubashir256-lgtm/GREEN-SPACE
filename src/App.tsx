import React, { useState, useEffect } from 'react';
import { Product, PlantCare, CartItem } from './utils/ecommerce';
import { INITIAL_PRODUCTS, INITIAL_PLANTS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { GardeningCategories } from './components/GardeningCategories';
import { FeaturedProducts } from './components/FeaturedProducts';
import { PromoBanner } from './components/PromoBanner';
import { ProductsPage } from './components/ProductsPage';
import { PlantCarePage } from './components/PlantCarePage';
import { AIAssistantPage } from './components/AIAssistantPage';
import { DIYIdeasPage } from './components/DIYIdeasPage';
import { AboutPage } from './components/AboutPage';
import { AuthPage, UserProfile } from './components/AuthPage';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { AdminDashboard } from './components/AdminDashboard';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CheckCircle2, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('greenspace_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('greenspace_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [plants] = useState<PlantCare[]>(INITIAL_PLANTS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('greenspace_cart');
      return saved ? JSON.parse(saved) : [
        { product: INITIAL_PRODUCTS[0], quantity: 1 },
      ];
    } catch {
      return [{ product: INITIAL_PRODUCTS[0], quantity: 1 }];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('greenspace_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-2'];
    } catch {
      return ['prod-1', 'prod-2'];
    }
  });

  const [orders, setOrders] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('greenspace_orders');
      return saved ? JSON.parse(saved) : [
        {
          orderId: 'GS-892104',
          date: 'Nov 2, 2026',
          customer: { fullName: 'Zainab Fatima', phone: '0321 8876543', city: 'Lahore', address: 'DHA Phase 5', paymentMethod: 'cod' },
          items: [{ product: INITIAL_PRODUCTS[0], quantity: 1 }],
          totals: { total: 4099 },
          status: 'Shipped',
        },
      ];
    } catch {
      return [];
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [checkoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [aiPlantHint, setAiPlantHint] = useState<string>('');

  // Persist currentUser to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('greenspace_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('greenspace_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('greenspace_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Persist wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('greenspace_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Persist products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('greenspace_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Persist orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('greenspace_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  const handleCategorySelect = (categoryTitle: string) => {
    setSelectedCategoryFilter(categoryTitle);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAIAssistantWithHint = (hint?: string) => {
    if (hint) setAiPlantHint(hint);
    setActiveTab('ai-assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: any) => {
    setOrders((prev) => [order, ...prev]);
    setCart([]);
  };

  // Admin handlers
  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Added new product: ${newProd.name}`);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    showToast(`Updated product: ${updated.name}`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product removed from catalog');
  };

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
    );
    showToast(`Order ${orderId} marked as ${status}`);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9EF] text-[#17251B] selection:bg-[#E8F2DD] selection:text-[#123D25]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-5 z-50 bg-[#123D25] text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold border border-[#267A3E] animate-in slide-in-from-top-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#4CAF50]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Dashboard view if toggled */}
      {isAdmin ? (
        <AdminDashboard
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          plants={plants}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onCloseAdmin={() => setIsAdmin(false)}
        />
      ) : (
        <>
          {/* Main Top Navigation matching Reference */}
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            cartCount={totalCartCount}
            wishlistCount={wishlist.length}
            onOpenCart={() => setCartOpen(true)}
            onOpenSearch={() => setSearchOpen(true)}
            currentUser={currentUser}
            onOpenAuth={() => {
              setActiveTab('auth');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Active Page View */}
          <main className="flex-1">
            {activeTab === 'home' && (
              <>
                <HeroSection
                  onExploreProducts={() => {
                    setActiveTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onIdentifyPlant={() => {
                    setActiveTab('ai-assistant');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <GardeningCategories onSelectCategory={handleCategorySelect} />
                <FeaturedProducts
                  products={products}
                  wishlist={wishlist}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={handleAddToCart}
                  onViewAll={() => {
                    setActiveTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onSelectProduct={() => {
                    setActiveTab('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
                <PromoBanner
                  onAnalyzePlant={() => {
                    setActiveTab('ai-assistant');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              </>
            )}

            {activeTab === 'products' && (
              <ProductsPage
                products={products}
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                initialCategory={selectedCategoryFilter}
              />
            )}

            {activeTab === 'plant-care' && (
              <PlantCarePage
                plants={plants}
                onOpenAIAssistant={handleOpenAIAssistantWithHint}
              />
            )}

            {activeTab === 'ai-assistant' && (
              <AIAssistantPage initialPlantHint={aiPlantHint} />
            )}

            {activeTab === 'diy' && (
              <DIYIdeasPage
                onExploreProducts={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'about' && (
              <AboutPage
                onExploreProducts={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'auth' && (
              <AuthPage
                currentUser={currentUser}
                onLogin={(user) => {
                  setCurrentUser(user);
                  showToast(`Welcome back, ${user.name}!`);
                }}
                onLogout={() => {
                  setCurrentUser(null);
                  showToast('Signed out of account');
                }}
                savedPlantsCount={plants.length}
                ordersCount={orders.length}
                onNavigateHome={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreProducts={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </main>

          {/* Footer matching brand */}
          <Footer onNavigate={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />

          {/* Mobile Bottom Navigation Bar (matching the 4 mobile screen mockups in reference) */}
          <MobileBottomNav
            activeTab={activeTab}
            setActiveTab={(tab) => {
              if (tab === 'cart') {
                setCartOpen(true);
              } else {
                setActiveTab(tab);
              }
            }}
            cartCount={totalCartCount}
          />
        </>
      )}

      {/* Cart Drawer Overlay */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setCheckoutOpen(true)}
      />

      {/* Checkout Modal Overlay */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Global Instant Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={products}
        plants={plants}
        onSelectProduct={() => {
          setActiveTab('products');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectPlant={() => {
          setActiveTab('plant-care');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
