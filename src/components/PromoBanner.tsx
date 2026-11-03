import React from 'react';
import { ArrowRight, Sparkles, ScanLine } from 'lucide-react';

interface PromoBannerProps {
  onAnalyzePlant: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onAnalyzePlant }) => {
  return (
    <section className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#123D25] text-white shadow-xl p-6 sm:p-10 lg:p-12">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#267A3E]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left plant image preview matching Screen 1 banner */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#267A3E]/20">
                <img
                  src="https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80"
                  alt="Plant ready for AI analysis"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-2 border-[#4CAF50]/60 rounded-2xl animate-pulse pointer-events-none flex items-center justify-center">
                  <ScanLine className="w-12 h-12 text-[#4CAF50]/80" />
                </div>
              </div>
            </div>

            {/* Right Banner Text matching Screen 1 */}
            <div className="md:col-span-8 space-y-3 sm:space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#E8F2DD] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#4CAF50]" />
                <span>AI Botanical Vision Engine</span>
              </div>

              <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                Not Sure Which Plant You Have?
              </h2>

              <p className="text-sm sm:text-base text-[#E8F2DD]/90 max-w-xl leading-relaxed">
                Upload a plant photo and discover its identity, care requirements and possible issues. Our AI analyzes foliage health, light exposure, and watering balance in seconds.
              </p>

              <div className="pt-2">
                <button
                  onClick={onAnalyzePlant}
                  className="px-6 py-3.5 rounded-full bg-[#4CAF50] hover:bg-[#3d9140] text-white font-semibold text-sm sm:text-base inline-flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Analyze My Plant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
