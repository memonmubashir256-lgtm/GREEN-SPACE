import React, { useState } from 'react';
import {
  Sprout,
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  currentUser?: { name: string; email: string } | null;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  currentUser,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'diy', label: 'DIY Ideas' },
    { id: 'plant-care', label: 'Plant Care' },
    { id: 'ai-assistant', label: 'AI Assistant', isPill: true },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9EF]/95 backdrop-blur-md border-b border-[#E8F2DD] transition-all">
      {/* Top green micro banner without Admin button */}
      <div className="bg-[#123D25] text-[#E8F2DD] text-xs py-1.5 px-4 text-center font-medium flex justify-between items-center max-w-7xl mx-auto">
        <div className="hidden sm:block">🌿 Pakistan’s First AI-Powered Vertical Gardening Platform</div>
        <div className="mx-auto sm:mx-0">
          Free Shipping on orders above PKR 5,000 | Use code <span className="font-bold text-[#4CAF50]">GREEN10</span> for 10% off
        </div>
        <div className="hidden md:flex items-center gap-3 text-xs text-[#E8F2DD]/90">
          <button
            onClick={onOpenAuth}
            className="hover:text-white transition cursor-pointer flex items-center gap-1"
          >
            <User className="w-3.5 h-3.5 text-[#4CAF50]" />
            <span>{currentUser ? currentUser.name : 'Sign In'}</span>
          </button>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching reference */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-[#123D25] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6 text-[#4CAF50]" />
          </div>
          <div>
            <span className="font-serif-heading text-2xl font-bold tracking-tight text-[#123D25] block leading-none">
              GreenSpace
            </span>
            <span className="text-[11px] font-medium text-[#267A3E] tracking-wider uppercase block mt-1">
              Grow Green. Live Clean.
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            if (link.isPill) {
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                    isActive
                      ? 'bg-[#267A3E] text-white ring-2 ring-[#4CAF50]/30 shadow-md scale-105'
                      : 'bg-[#267A3E] text-white hover:bg-[#123D25]'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-[#E8F2DD]" />
                  <span>{link.label}</span>
                </button>
              );
            }
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#123D25] font-semibold'
                    : 'text-[#17251B]/80 hover:text-[#267A3E]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#267A3E] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Search button */}
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-full hover:bg-[#E8F2DD] text-[#17251B] transition-colors cursor-pointer"
            aria-label="Search products and plants"
          >
            <Search className="w-5 h-5 text-[#123D25]" />
          </button>

          {/* Wishlist button */}
          <button
            onClick={() => handleNavClick('products')}
            className="p-2.5 rounded-full hover:bg-[#E8F2DD] text-[#17251B] transition-colors relative hidden sm:block cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 text-[#123D25]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#267A3E] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon with badge */}
          <button
            onClick={onOpenCart}
            className="p-2.5 rounded-full bg-[#E8F2DD] hover:bg-[#d8e8ca] text-[#123D25] transition-all relative cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#123D25] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / Sign In button */}
          <button
            onClick={onOpenAuth}
            className={`p-2.5 rounded-full transition-colors hidden sm:flex items-center gap-1.5 cursor-pointer ${
              currentUser
                ? 'bg-[#E8F2DD] text-[#123D25] font-semibold'
                : 'hover:bg-[#E8F2DD] text-[#123D25]'
            }`}
            aria-label="User Account"
            title={currentUser ? `Signed in as ${currentUser.name}` : 'Sign In'}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-semibold pr-1">
              {currentUser ? currentUser.name.split(' ')[0] : 'Sign In'}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full hover:bg-[#E8F2DD] text-[#123D25] lg:hidden transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9EF] border-b border-[#E8F2DD] px-4 pt-2 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition cursor-pointer ${
                    isActive
                      ? 'bg-[#123D25] text-white font-semibold'
                      : 'text-[#17251B] hover:bg-[#E8F2DD]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {link.isPill && <Sparkles className="w-4 h-4 text-[#4CAF50]" />}
                    {link.label}
                  </span>
                  {isActive && <span className="text-xs text-[#E8F2DD]">Active</span>}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E8F2DD] flex justify-between items-center px-2">
            <button
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm text-[#267A3E] font-semibold cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>{currentUser ? `Account: ${currentUser.name}` : 'Sign In / Register'}</span>
            </button>
            <div className="text-xs text-[#17251B]/60">PKR Currency</div>
          </div>
        </div>
      )}
    </header>
  );
};
