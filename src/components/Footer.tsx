import React, { useState } from 'react';
import { Sprout, Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#123D25] text-[#FAF9EF] pt-16 pb-12 border-t-4 border-[#267A3E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#267A3E]/50">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4CAF50] flex items-center justify-center text-[#123D25] shadow-md">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-serif-heading text-2xl font-bold tracking-tight text-white block leading-none">
                  GreenSpace
                </span>
                <span className="text-xs font-medium text-[#E8F2DD] tracking-wider uppercase block mt-1">
                  Grow Green. Live Clean.
                </span>
              </div>
            </div>

            <p className="text-sm text-[#E8F2DD]/80 max-w-sm leading-relaxed">
              Pakistan’s premier AI-powered vertical gardening platform. We engineer modular living walls, hydroponic towers, and intelligent plant care solutions for clean, sustainable urban living.
            </p>

            <div className="space-y-2 text-xs text-[#E8F2DD]/80 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4CAF50] shrink-0" />
                <span>Gulberg III, Lahore & Clifton Block 5, Karachi, Pakistan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#4CAF50] shrink-0" />
                <span>+92 300 1234567 | Mon-Sat 9am - 7pm PKT</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#4CAF50] shrink-0" />
                <span>care@greenspace.pk</span>
              </div>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#4CAF50]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#E8F2DD]/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Products & Shop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('plant-care')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Plant Care Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-assistant')}
                  className="hover:text-white transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>AI Assistant</span>
                  <span className="text-[10px] bg-[#4CAF50] px-1.5 py-0.5 rounded-full text-white font-bold">New</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('diy')}
                  className="hover:text-white transition cursor-pointer"
                >
                  DIY Vertical Ideas
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#4CAF50]">
              Vertical Systems
            </h4>
            <ul className="space-y-2 text-sm text-[#E8F2DD]/80">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Vertical Garden Stands
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Modular Wall Planters
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Hydroponic Towers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Micro-Drip Irrigation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-white transition cursor-pointer"
                >
                  Culinary Herb Kits
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#4CAF50]">
              Green Newsletter
            </h4>
            <p className="text-xs text-[#E8F2DD]/80">
              Receive seasonal vertical planting guides, pruning tips, and 10% off your first order.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex rounded-full overflow-hidden border border-[#267A3E] bg-[#17251B]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2 text-xs text-white placeholder-[#E8F2DD]/40 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#267A3E] hover:bg-[#4CAF50] text-white px-3.5 flex items-center justify-center transition cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  {subscribed ? <Check className="w-4 h-4 text-white" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#4CAF50] font-medium animate-in fade-in">
                  Welcome to GreenSpace club!
                </p>
              )}
            </form>

            <div className="pt-2">
              <span className="text-xs text-[#E8F2DD]/70 block mb-2 font-medium">Follow GreenSpace</span>
              <div className="flex items-center gap-3 text-[#E8F2DD]/80">
                <a href="#instagram" className="w-8 h-8 rounded-full bg-[#1b5032] flex items-center justify-center hover:bg-[#4CAF50] hover:text-white transition">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#facebook" className="w-8 h-8 rounded-full bg-[#1b5032] flex items-center justify-center hover:bg-[#4CAF50] hover:text-white transition">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#twitter" className="w-8 h-8 rounded-full bg-[#1b5032] flex items-center justify-center hover:bg-[#4CAF50] hover:text-white transition">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8F2DD]/60 gap-4">
          <p>© {new Date().getFullYear()} GreenSpace Technologies. All rights reserved. Grow Green. Live Clean.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition cursor-pointer">Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
