import React from 'react';
import { Sprout, ShieldCheck, Heart, Leaf, Award, Users } from 'lucide-react';

interface AboutPageProps {
  onExploreProducts: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onExploreProducts }) => {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <div className="bg-[#123D25] text-white py-16 sm:py-24 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <span className="text-xs uppercase font-bold tracking-widest text-[#4CAF50]">
            Our Mission & Philosophy
          </span>
          <h1 className="font-serif-heading text-4xl sm:text-5xl font-bold">
            Grow Green. Live Clean.
          </h1>
          <p className="text-base sm:text-lg text-[#E8F2DD]/90 max-w-2xl mx-auto leading-relaxed">
            GreenSpace was founded to bring lush botanical sanctuaries into dense urban spaces, combining precision vertical hardware with artificial intelligence plant diagnostics.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8F2DD] shadow-xl space-y-12">
          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center mx-auto">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="font-serif-heading font-bold text-xl text-[#123D25]">
                Sustainable Materials
              </h3>
              <p className="text-xs text-[#17251B]/70 leading-relaxed">
                Every planter, grid, and frame is built from 100% rust-proof carbon steel and recycled food-safe polymers designed to last decades.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif-heading font-bold text-xl text-[#123D25]">
                AI-Driven Health
              </h3>
              <p className="text-xs text-[#17251B]/70 leading-relaxed">
                Our proprietary vision model assesses leaf discoloration, hydration deficiency, and micro-nutrient balances in real time.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center mx-auto">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-serif-heading font-bold text-xl text-[#123D25]">
                Built for Pakistan
              </h3>
              <p className="text-xs text-[#17251B]/70 leading-relaxed">
                Tested in the high-heat climates of Lahore, Karachi, and Islamabad with optimized water reservoirs and thermal shield coatings.
              </p>
            </div>
          </div>

          {/* Story Quote */}
          <div className="p-8 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD] text-center space-y-3">
            <p className="font-serif-heading italic text-lg sm:text-xl text-[#123D25]">
              “When concrete expands horizontally, our only choice is to grow vertically. GreenSpace transforms every bare wall into oxygen, calm, and fresh produce.”
            </p>
            <span className="text-xs font-bold text-[#267A3E] tracking-wider uppercase block">
              — GreenSpace Botanical Design Collective
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
