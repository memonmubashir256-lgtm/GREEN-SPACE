import React, { useState, useMemo } from 'react';
import { Product, PlantCare, formatPKR } from '../utils/ecommerce';
import { Search, X, Package, Sprout, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  plants: PlantCare[];
  onSelectProduct: (product: Product) => void;
  onSelectPlant: (plant: PlantCare) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  plants,
  onSelectProduct,
  onSelectPlant,
}) => {
  const [query, setQuery] = useState('');

  const matchedProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [products, query]);

  const matchedPlants = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return plants
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.scientificName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [plants, query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E8F2DD] overflow-hidden animate-in fade-in duration-150">
        <div className="p-4 sm:p-6 border-b border-[#E8F2DD] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#267A3E] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search vertical stands, wall planters, Money Plant, Pothos..."
            className="w-full text-base text-[#17251B] placeholder-[#17251B]/40 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {!query.trim() ? (
            <div className="space-y-3">
              <span className="text-xs font-semibold text-[#17251B]/50 uppercase tracking-wider block">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Vertical Plant Stand',
                  'Wall Planter Set',
                  'Hydroponic Kit',
                  'Money Plant',
                  'Snake Plant',
                  'Hanging Pots',
                  'Spider Plant',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF9EF] hover:bg-[#E8F2DD] border border-[#E8F2DD] text-xs font-semibold text-[#123D25] transition cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Products match */}
              <div>
                <span className="text-xs font-bold text-[#267A3E] uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <Package className="w-3.5 h-3.5" />
                  <span>Products ({matchedProducts.length})</span>
                </span>
                {matchedProducts.length === 0 ? (
                  <p className="text-xs text-gray-400">No matching gardening products</p>
                ) : (
                  <div className="space-y-2">
                    {matchedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onSelectProduct(p);
                          onClose();
                        }}
                        className="p-3 rounded-2xl border border-[#E8F2DD] hover:bg-[#FAF9EF] flex items-center justify-between cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <h4 className="font-semibold text-sm text-[#123D25]">{p.name}</h4>
                            <span className="text-xs text-[#267A3E]">{formatPKR(p.price)}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Plants match */}
              <div>
                <span className="text-xs font-bold text-[#267A3E] uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <Sprout className="w-3.5 h-3.5" />
                  <span>Plant Care Guides ({matchedPlants.length})</span>
                </span>
                {matchedPlants.length === 0 ? (
                  <p className="text-xs text-gray-400">No matching plant care guides</p>
                ) : (
                  <div className="space-y-2">
                    {matchedPlants.map((plant) => (
                      <div
                        key={plant.id}
                        onClick={() => {
                          onSelectPlant(plant);
                          onClose();
                        }}
                        className="p-3 rounded-2xl border border-[#E8F2DD] hover:bg-[#FAF9EF] flex items-center justify-between cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={plant.image}
                            alt={plant.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0"
                          />
                          <div>
                            <h4 className="font-semibold text-sm text-[#123D25]">{plant.name}</h4>
                            <span className="text-xs italic text-[#267A3E]">{plant.scientificName}</span>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-[#E8F2DD] text-[#123D25] font-semibold">
                          {plant.difficulty}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
