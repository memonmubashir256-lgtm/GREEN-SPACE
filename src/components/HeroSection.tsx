import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onExploreProducts: () => void;
  onIdentifyPlant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreProducts,
  onIdentifyPlant,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle organic botanical background blur circles */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#E8F2DD]/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#4CAF50]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Text Content matching Screen 1 */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8F2DD] border border-[#d2e4c2] text-[#267A3E] text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-[#4CAF50]" />
              <span>Next-Gen Vertical Gardening & AI Botanical Vision</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#123D25] leading-[1.1] tracking-tight">
                Grow Green.<br />
                Live Clean.
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#267A3E] tracking-tight">
                Discover a Smarter Way to Grow.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#17251B]/80 max-w-xl leading-relaxed">
              Explore vertical gardening solutions, discover beautiful plants and get personalized care guidance. Transform apartments, balconies, and urban walls into flourishing living ecosystems.
            </p>

            {/* Action Buttons matching Screen 1 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreProducts}
                className="px-7 py-3.5 rounded-full bg-[#123D25] hover:bg-[#1b5032] text-white font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#123D25]/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onIdentifyPlant}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-[#FAF9EF] border-2 border-[#267A3E] text-[#123D25] font-semibold text-base flex items-center justify-center gap-2 hover:border-[#123D25] transition-all cursor-pointer shadow-sm"
              >
                <span>Identify Your Plant</span>
              </button>
            </div>

            {/* Trust highlights */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#E8F2DD]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-[#17251B]/80">Modular Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-[#17251B]/80">AI Plant Diagnostics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-[#17251B]/80">Delivery across PK</span>
              </div>
            </div>
          </div>

          {/* Right Column Large Realistic Vertical Garden Image matching Screen 1 */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer soft shadow frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white/40">
                <img
                  src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1200&q=85"
                  alt="GreenSpace modern vertical indoor garden with multi-tier shelving and cascading plants"
                  className="w-full h-[420px] sm:h-[480px] lg:h-[520px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#123D25]/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Image caption badge inside */}
                <div className="absolute bottom-5 left-5 right-5 text-white bg-[#123D25]/85 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#E8F2DD] font-semibold">Featured Vertical Setup</p>
                    <p className="text-sm font-bold">Modular 5-Tier Living Wall</p>
                  </div>
                  <span className="text-xs bg-[#4CAF50] px-2.5 py-1 rounded-full font-bold text-white">PKR 4,099</span>
                </div>
              </div>

              {/* Floating Badge Top Left */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white py-2.5 px-4 rounded-2xl shadow-xl border border-[#E8F2DD] flex items-center gap-3 animate-bounce-subtle hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-[#E8F2DD] flex items-center justify-center text-[#267A3E]">
                  🌿
                </div>
                <div>
                  <p className="text-xs font-bold text-[#123D25]">100% Eco-Certified</p>
                  <p className="text-[11px] text-[#267A3E]">Sustainable Living Walls</p>
                </div>
              </div>

              {/* Floating Badge Bottom Right */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white py-3 px-4 rounded-2xl shadow-xl border border-[#E8F2DD] flex items-center gap-3 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-[#123D25] flex items-center justify-center text-[#4CAF50]">
                  <Sparkles className="w-5 h-5 text-[#4CAF50]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#123D25]">AI Vision Powered</p>
                  <p className="text-[11px] text-[#267A3E]">Instant Plant Health Checks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
