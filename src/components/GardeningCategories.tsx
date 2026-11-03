import React from 'react';
import { Home, Sun, Flower2, Droplets, Utensils, Grid3X3, ArrowRight } from 'lucide-react';

interface GardeningCategoriesProps {
  onSelectCategory: (categoryTitle: string) => void;
}

export const GardeningCategories: React.FC<GardeningCategoriesProps> = ({
  onSelectCategory,
}) => {
  const categories = [
    {
      id: 'indoor',
      title: 'Indoor Gardening',
      subtitle: 'Air-purifying foliage',
      icon: Home,
      targetCategory: 'Vertical Garden Stands',
    },
    {
      id: 'outdoor',
      title: 'Outdoor Gardening',
      subtitle: 'Sun-tolerant setups',
      icon: Sun,
      targetCategory: 'Modular Panels',
    },
    {
      id: 'balcony',
      title: 'Balcony Gardens',
      subtitle: 'Railing & tiered space',
      icon: Flower2,
      targetCategory: 'Hanging Pots',
    },
    {
      id: 'hydroponic',
      title: 'Hydroponic Systems',
      subtitle: 'Smart soil-free towers',
      icon: Droplets,
      targetCategory: 'Hydroponic Systems',
    },
    {
      id: 'kitchen',
      title: 'Kitchen Gardens',
      subtitle: 'Fresh edible herbs',
      icon: Utensils,
      targetCategory: 'Seeds and Plants',
    },
    {
      id: 'vertical',
      title: 'Vertical Wall Gardens',
      subtitle: 'Modular living panels',
      icon: Grid3X3,
      targetCategory: 'Wall Planters',
    },
  ];

  return (
    <section className="py-12 bg-white/70 border-y border-[#E8F2DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#267A3E]">
              Spaces & Systems
            </span>
            <h2 className="font-serif-heading text-2xl sm:text-3xl font-bold text-[#123D25] mt-1">
              Explore by Gardening Style
            </h2>
          </div>
          <p className="text-sm text-[#17251B]/70 max-w-md mt-2 sm:mt-0">
            Engineered specifically for Pakistani apartments, rooftops, balconies, and indoor walls.
          </p>
        </div>

        {/* 6 Category Circular Icons matching Screen 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.targetCategory)}
                className="group p-5 rounded-2xl bg-[#FAF9EF] hover:bg-[#E8F2DD] border border-[#E8F2DD] hover:border-[#267A3E]/30 text-center flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white group-hover:bg-[#123D25] flex items-center justify-center text-[#267A3E] group-hover:text-[#4CAF50] shadow-sm mb-4 transition-all duration-300 group-hover:scale-110">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-[#123D25] group-hover:text-[#267A3E] transition-colors leading-snug">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-[#17251B]/60 mt-1 line-clamp-1">
                  {cat.subtitle}
                </p>
                <span className="mt-3 text-xs font-semibold text-[#267A3E] inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
