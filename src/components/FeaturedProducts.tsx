import React from 'react';
import { Product, formatPKR } from '../utils/ecommerce';
import { Star, Heart, ArrowRight, ShoppingBag } from 'lucide-react';

interface FeaturedProductsProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onViewAll: () => void;
  onSelectProduct: (product: Product) => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onViewAll,
  onSelectProduct,
}) => {
  // Show first 3 products matching Screen 1 (Vertical Plant Stand, Wall Planter Set, Hanging Pots)
  const featured = products.slice(0, 3);

  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header matching Screen 1 */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#123D25]">
              Featured Products
            </h2>
            <p className="text-sm text-[#17251B]/70 mt-1">
              Top-rated vertical architecture, wall planters, and space-saving essentials.
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="group flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#267A3E] hover:text-[#123D25] transition-colors cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Product Cards matching Screen 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="group bg-white rounded-3xl overflow-hidden border border-[#E8F2DD] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Wishlist Container */}
                <div className="relative aspect-4/3 bg-[#FAF9EF] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  />
                  {/* Category tag */}
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#123D25] text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
                    {product.category}
                  </span>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all cursor-pointer shadow-md ${
                      isWishlisted
                        ? 'bg-red-50 text-red-500 scale-110'
                        : 'bg-white/90 text-[#17251B] hover:text-red-500 hover:bg-white'
                    }`}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3
                      onClick={() => onSelectProduct(product)}
                      className="font-serif-heading font-bold text-lg sm:text-xl text-[#123D25] hover:text-[#267A3E] transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>

                    {/* Star Rating & Review Count */}
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-[#17251B]">
                        {product.rating}
                      </span>
                      <span className="text-xs text-[#17251B]/50">
                        ({product.reviewsCount})
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#17251B]/70 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8F2DD] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#17251B]/50 block">Price</span>
                      <span className="text-lg sm:text-xl font-bold text-[#123D25]">
                        {formatPKR(product.price)}
                      </span>
                    </div>

                    {/* Green Add to Cart Button matching Screen 1 */}
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-4 py-2.5 rounded-full bg-[#123D25] hover:bg-[#267A3E] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
