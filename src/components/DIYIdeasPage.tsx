import React from 'react';
import { Hammer, Sparkles, ArrowRight, Lightbulb, CheckCircle2 } from 'lucide-react';

interface DIYIdeasPageProps {
  onExploreProducts: () => void;
}

export const DIYIdeasPage: React.FC<DIYIdeasPageProps> = ({ onExploreProducts }) => {
  const guides = [
    {
      id: 'diy-1',
      title: 'How to Build a Balcony Trellis Wall for Climbing Pothos',
      level: 'Beginner (2-3 Hours)',
      tools: 'Modular wall clips, jute twine, powder-coated grid, drill',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      steps: [
        'Select a balcony wall that receives at least 3-4 hours of bright indirect sunlight.',
        'Fasten the rust-proof metal grid 2 inches away from the wall to permit air circulation.',
        'Position heavy baseline planters along the bottom tier to establish weight balance.',
        'Gently weave mature vines upward through the grid using non-chafing botanical clips.',
      ],
    },
    {
      id: 'diy-2',
      title: 'Automated Micro-Drip Irrigation for Tiered Stands',
      level: 'Intermediate (1 Hour)',
      tools: '1/4" distribution tubing, 2L/hr dripper heads, digital faucet timer',
      image: 'https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=800&q=80',
      steps: [
        'Run main 1/4" tubing up the spine of the vertical stand using zip ties.',
        'Insert pressure-compensating emitter spikes directly into each pot.',
        'Calibrate the timer for a 2-minute morning cycle every 48 hours.',
        'Attach drip capture trays beneath each tier to reuse runoff moisture.',
      ],
    },
    {
      id: 'diy-3',
      title: 'Living Kitchen Herb Wall: Basil, Mint, and Rosemary',
      level: 'Beginner (45 Minutes)',
      tools: 'Felt pocket vertical panel, moisture meter, organic potting soil',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80',
      steps: [
        'Mount the breathable geotextile panel near your brightest kitchen window.',
        'Fill upper pockets with sun-loving culinary herbs like Rosemary and Thyme.',
        'Dedicate middle tiers to leafy moisture-loving Sweet Basil and Spearmint.',
        'Harvest topmost sprigs weekly to stimulate bushy lateral branching.',
      ],
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      <div className="bg-[#123D25] text-white py-14 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#E8F2DD] text-xs font-semibold">
            <Lightbulb className="w-3.5 h-3.5 text-[#4CAF50]" />
            <span>Urban Botanical Architecture</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-5xl font-bold">
            DIY Vertical Garden Guides
          </h1>
          <p className="text-sm sm:text-base text-[#E8F2DD]/90 max-w-xl mx-auto">
            Practical, step-by-step blueprints for crafting flourishing green walls in apartments, balconies, and indoor rooms.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="space-y-8">
          {guides.map((guide, idx) => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8F2DD] shadow-md grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-5 h-60 rounded-2xl overflow-hidden bg-[#FAF9EF]">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-[#E8F2DD] text-[#123D25] font-bold px-2.5 py-1 rounded-full">
                    Guide #{idx + 1}
                  </span>
                  <span className="text-xs text-[#267A3E] font-semibold">{guide.level}</span>
                </div>

                <h3 className="font-serif-heading font-bold text-xl sm:text-2xl text-[#123D25]">
                  {guide.title}
                </h3>

                <p className="text-xs text-[#17251B]/70">
                  <span className="font-semibold text-[#123D25]">Materials needed:</span> {guide.tools}
                </p>

                <div className="space-y-2 pt-2">
                  {guide.steps.map((st, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#17251B]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 rounded-3xl bg-[#E8F2DD] border border-[#C4D7BC] space-y-3">
          <h3 className="font-serif-heading font-bold text-2xl text-[#123D25]">
            Need the Hardware to Build Your Wall?
          </h3>
          <p className="text-sm text-[#17251B]/80 max-w-md mx-auto">
            Order ready-to-assemble steel stands, modular planters, and irrigation accessories with same-day dispatch.
          </p>
          <button
            onClick={onExploreProducts}
            className="px-6 py-3 rounded-full bg-[#123D25] hover:bg-[#267A3E] text-white text-sm font-semibold inline-flex items-center gap-2 transition"
          >
            <span>Shop DIY Components</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
