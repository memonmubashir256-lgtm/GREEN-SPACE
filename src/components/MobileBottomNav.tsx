import React from 'react';
import { Home, Compass, Sparkles, Sprout, User } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Explore', icon: Compass },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Sparkles, isCenter: true },
    { id: 'plant-care', label: 'My Plants', icon: Sprout },
    { id: 'auth', label: 'Profile', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8F2DD] py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          if (item.isCenter) {
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative -top-4 flex flex-col items-center group cursor-pointer focus:outline-none"
                aria-label="AI Assistant"
              >
                <div
                  className={`w-13 h-13 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-[#123D25] ring-4 ring-[#4CAF50]/30 scale-110'
                      : 'bg-[#267A3E] hover:bg-[#123D25]'
                  }`}
                >
                  <Sparkles className="w-6 h-6 text-[#E8F2DD]" />
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 ${
                    isActive ? 'text-[#123D25]' : 'text-[#267A3E]'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center py-1 px-2 relative transition cursor-pointer ${
                isActive ? 'text-[#123D25]' : 'text-[#17251B]/60 hover:text-[#267A3E]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#123D25] text-white text-[9px] font-bold flex items-center justify-center">
                    {item.count}
                  </span>
                )}
              </div>
              <span
                className={`text-[10px] mt-1 ${
                  isActive ? 'font-bold text-[#123D25]' : 'font-medium'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
