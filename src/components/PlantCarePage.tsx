import React, { useState, useMemo } from 'react';
import { PlantCare, filterPlants } from '../utils/ecommerce';
import {
  Search,
  Sun,
  Droplets,
  Wind,
  Thermometer,
  Sparkles,
  Heart,
  X,
  AlertCircle,
  CheckCircle2,
  Bookmark,
  Sprout,
  ArrowRight,
} from 'lucide-react';

interface PlantCarePageProps {
  plants: PlantCare[];
  onOpenAIAssistant: (plantHint?: string) => void;
}

export const PlantCarePage: React.FC<PlantCarePageProps> = ({
  plants,
  onOpenAIAssistant,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedPlantModal, setSelectedPlantModal] = useState<PlantCare | null>(null);
  const [savedPlants, setSavedPlants] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('greenspace_saved_plants');
      return saved ? JSON.parse(saved) : ['money-plant'];
    } catch {
      return ['money-plant'];
    }
  });

  const categories = [
    { id: 'all', label: 'All Plants' },
    { id: 'indoor', label: 'Indoor Plants' },
    { id: 'outdoor', label: 'Outdoor Plants' },
    { id: 'flowering', label: 'Flowering Plants' },
    { id: 'herbs', label: 'Herbs' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'succulents', label: 'Succulents' },
  ];

  const filteredPlants = useMemo(() => {
    return filterPlants(plants, {
      category: selectedCategory,
      query: searchQuery,
      difficulty: selectedDifficulty,
    });
  }, [plants, selectedCategory, searchQuery, selectedDifficulty]);

  const toggleSavePlant = (plantId: string) => {
    setSavedPlants((prev) => {
      const next = prev.includes(plantId)
        ? prev.filter((id) => id !== plantId)
        : [...prev, plantId];
      localStorage.setItem('greenspace_saved_plants', JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Botanical Banner matching Screen 3 */}
      <div className="relative bg-[#123D25] text-white py-14 sm:py-20 overflow-hidden">
        {/* Background photo with caring hands holding seedling */}
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80"
            alt="Caring hands holding lush seedling in rich soil"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#123D25] via-[#123D25]/90 to-[#267A3E]/80 z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#E8F2DD] text-xs font-semibold backdrop-blur-sm">
            <Sprout className="w-3.5 h-3.5 text-[#4CAF50]" />
            <span>Horticultural Science & Vertical Growth Encyclopedia</span>
          </div>

          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Plant Care Guide
          </h1>
          <p className="text-base sm:text-lg text-[#E8F2DD]/90 max-w-2xl mx-auto">
            Expert tips for healthy and happy plants. Comprehensive watering schedules, sunlight requirements, and vertical wall guidance tailored for urban spaces.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        {/* Search Bar matching Screen 3 */}
        <div className="max-w-2xl mx-auto bg-white p-2.5 rounded-2xl shadow-lg border border-[#E8F2DD] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#267A3E] ml-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plants by name, scientific name or condition..."
            className="w-full py-1.5 text-sm sm:text-base text-[#17251B] placeholder-[#17251B]/40 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full hover:bg-gray-100 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills matching Screen 3 */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#123D25] text-white shadow-md scale-105'
                    : 'bg-white hover:bg-[#E8F2DD] text-[#17251B] border border-[#E8F2DD]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Plant Cards Grid matching Screen 3 (Money Plant, Pothos, Spider Plant, Snake Plant, Fern, Aloe Vera) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {filteredPlants.map((plant) => {
            const isSaved = savedPlants.includes(plant.id);
            return (
              <div
                key={plant.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E8F2DD] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Container with Difficulty Badge and Favorite button */}
                <div className="relative aspect-4/3 bg-[#FAF9EF] overflow-hidden">
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => setSelectedPlantModal(plant)}
                  />

                  {/* Difficulty Badge matching Screen 3 */}
                  <span
                    className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
                      plant.difficulty === 'Easy Care'
                        ? 'bg-[#E8F2DD] text-[#123D25] border border-[#C4D7BC]'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {plant.difficulty}
                  </span>

                  {/* Save to My Plants button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSavePlant(plant.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all cursor-pointer shadow-md ${
                      isSaved
                        ? 'bg-[#123D25] text-[#4CAF50]'
                        : 'bg-white/90 text-[#17251B] hover:text-[#267A3E]'
                    }`}
                    aria-label={isSaved ? 'Saved to My Plants' : 'Save to My Plants'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Card Info matching Screen 3 */}
                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3
                          onClick={() => setSelectedPlantModal(plant)}
                          className="font-serif-heading font-bold text-xl text-[#123D25] hover:text-[#267A3E] transition-colors cursor-pointer"
                        >
                          {plant.name}
                        </h3>
                        <p className="text-xs italic text-[#267A3E]">
                          {plant.scientificName}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#17251B]/70 mt-3 line-clamp-2 leading-relaxed">
                      {plant.description}
                    </p>

                    {/* Quick Care Preview specs */}
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#E8F2DD] text-xs">
                      <div className="flex items-center gap-1.5 text-[#17251B]/80">
                        <Sun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span className="truncate">{plant.sunlight}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#17251B]/80">
                        <Droplets className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="truncate">{plant.watering}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button matching Screen 3 */}
                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedPlantModal(plant)}
                      className="w-full py-2.5 rounded-xl bg-[#FAF9EF] hover:bg-[#123D25] text-[#123D25] hover:text-white border border-[#E8F2DD] hover:border-[#123D25] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:bg-[#123D25] group-hover:text-white"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Plant Detail Modal matching requirements */}
      {selectedPlantModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8F2DD] relative">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-[#E8F2DD] px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-serif-heading font-bold text-2xl text-[#123D25]">
                  {selectedPlantModal.name}
                </h3>
                <p className="text-xs italic text-[#267A3E]">
                  {selectedPlantModal.scientificName}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlantModal(null)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Image & Quick badges */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 h-56 rounded-2xl overflow-hidden bg-[#FAF9EF]">
                  <img
                    src={selectedPlantModal.image}
                    alt={selectedPlantModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-7 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#E8F2DD] text-[#123D25] text-xs font-bold">
                      {selectedPlantModal.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FAF9EF] border border-[#E8F2DD] text-[#267A3E] text-xs font-semibold capitalize">
                      {selectedPlantModal.category}
                    </span>
                    {selectedPlantModal.popularForVertical && (
                      <span className="px-3 py-1 rounded-full bg-[#123D25] text-white text-xs font-bold">
                        🌟 Recommended for Vertical Walls
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#17251B]/80 leading-relaxed">
                    {selectedPlantModal.description}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => toggleSavePlant(selectedPlantModal.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                        savedPlants.includes(selectedPlantModal.id)
                          ? 'bg-[#123D25] text-white'
                          : 'bg-[#FAF9EF] border border-[#E8F2DD] text-[#17251B] hover:bg-[#E8F2DD]'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>
                        {savedPlants.includes(selectedPlantModal.id)
                          ? 'Saved to My Garden'
                          : 'Save Plant'}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        onOpenAIAssistant(selectedPlantModal.name);
                        setSelectedPlantModal(null);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#267A3E] hover:bg-[#123D25] text-white text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#4CAF50]" />
                      <span>Diagnose with AI</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Detailed 6-Parameter Care Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-[#E8F2DD]">
                <div className="p-4 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD]">
                  <div className="flex items-center gap-2 text-[#267A3E] font-bold text-xs uppercase mb-1">
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Sunlight Requirements</span>
                  </div>
                  <p className="text-sm font-semibold text-[#123D25]">
                    {selectedPlantModal.sunlight}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD]">
                  <div className="flex items-center gap-2 text-[#267A3E] font-bold text-xs uppercase mb-1">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>Watering Schedule</span>
                  </div>
                  <p className="text-sm font-semibold text-[#123D25]">
                    {selectedPlantModal.watering}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD]">
                  <div className="flex items-center gap-2 text-[#267A3E] font-bold text-xs uppercase mb-1">
                    <Sprout className="w-4 h-4 text-emerald-600" />
                    <span>Soil Mix</span>
                  </div>
                  <p className="text-sm font-semibold text-[#123D25]">
                    {selectedPlantModal.soil}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD]">
                  <div className="flex items-center gap-2 text-[#267A3E] font-bold text-xs uppercase mb-1">
                    <Wind className="w-4 h-4 text-cyan-600" />
                    <span>Humidity</span>
                  </div>
                  <p className="text-sm font-semibold text-[#123D25]">
                    {selectedPlantModal.humidity}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD]">
                  <div className="flex items-center gap-2 text-[#267A3E] font-bold text-xs uppercase mb-1">
                    <Thermometer className="w-4 h-4 text-rose-500" />
                    <span>Temperature Range</span>
                  </div>
                  <p className="text-sm font-semibold text-[#123D25]">
                    {selectedPlantModal.temperature}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF9EF] border border-[#E8F2DD]">
                  <div className="flex items-center gap-2 text-[#267A3E] font-bold text-xs uppercase mb-1">
                    <Sparkles className="w-4 h-4 text-[#4CAF50]" />
                    <span>Fertilizer Routine</span>
                  </div>
                  <p className="text-sm font-semibold text-[#123D25]">
                    {selectedPlantModal.fertilizer}
                  </p>
                </div>
              </div>

              {/* Care Instructions List */}
              <div className="space-y-3">
                <h4 className="font-serif-heading font-bold text-lg text-[#123D25]">
                  Step-by-Step Care Instructions
                </h4>
                <div className="space-y-2">
                  {selectedPlantModal.careInstructions.map((instruction, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-[#17251B]/80">
                      <CheckCircle2 className="w-4 h-4 text-[#4CAF50] shrink-0 mt-0.5" />
                      <span>{instruction}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Problems & Troubleshooting */}
              <div className="space-y-3 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
                <h4 className="font-serif-heading font-bold text-base text-amber-950 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Common Problems & Troubleshooting</span>
                </h4>
                <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm text-amber-900/90">
                  {selectedPlantModal.commonProblems.map((prob, idx) => (
                    <li key={idx}>{prob}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
