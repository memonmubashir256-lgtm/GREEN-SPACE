import React, { useState, useMemo } from 'react';
import { Product, filterAndSortProducts, formatPKR } from '../utils/ecommerce';
import {
  Search,
  Star,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Check,
} from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  initialCategory?: string;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  initialCategory = 'All',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = [
    'All',
    'Vertical Garden Stands',
    'Wall Planters',
    'Hanging Pots',
    'Modular Panels',
    'Hydroponic Systems',
    'Gardening Tools',
    'Seeds and Plants',
    'Irrigation Accessories',
    'Starter Kits',
  ];

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, {
      category: selectedCategory === 'All' ? undefined : selectedCategory,
      query: searchQuery,
      maxPrice: maxPrice,
      minRating: minRating > 0 ? minRating : undefined,
      sortBy: sortBy,
    });
  }, [products, selectedCategory, searchQuery, maxPrice, minRating, sortBy]);

  // Pagination (6 items per page matching reference desktop mockup)
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Premium Green Hero Banner matching Screen 2 */}
      <div className="relative bg-[#123D25] text-white py-12 sm:py-16 overflow-hidden">
        {/* Background glow and subtle botanical texture */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#267A3E]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#4CAF50]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#E8F2DD] text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#4CAF50]" />
            <span>Curated Vertical Hardware & Botanicals</span>
          </div>
          <h1 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Our Products
          </h1>
          <p className="text-base sm:text-lg text-[#E8F2DD]/90 max-w-2xl mx-auto">
            Premium gardening solutions for every space. Transform blank walls and compact balconies into thriving vertical greenery.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Mobile Filter toggle button */}
        <div className="lg:hidden mb-6 flex items-center justify-between">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#E8F2DD] text-sm font-semibold text-[#123D25] shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#267A3E]" />
            <span>Filters & Categories</span>
            {selectedCategory !== 'All' && (
              <span className="w-2 h-2 rounded-full bg-[#4CAF50]" />
            )}
          </button>

          <span className="text-xs text-[#17251B]/60">
            {filteredProducts.length} items found
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar matching Screen 2 */}
          <aside
            className={`fixed inset-y-0 left-0 z-50 w-80 bg-white p-6 shadow-2xl transition-transform duration-300 lg:static lg:z-auto lg:w-auto lg:p-0 lg:shadow-none lg:translate-x-0 lg:col-span-3 ${
              mobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Mobile close button */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E8F2DD] lg:hidden mb-6">
              <h3 className="font-serif-heading font-bold text-lg text-[#123D25]">
                Filter Products
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-8 bg-white lg:p-6 lg:rounded-3xl lg:border lg:border-[#E8F2DD] lg:shadow-sm">
              {/* Categories list matching Screen 2 */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif-heading font-bold text-base text-[#123D25]">
                    Categories
                  </h3>
                  {selectedCategory !== 'All' && (
                    <button
                      onClick={() => handleCategoryChange('All')}
                      className="text-xs text-[#267A3E] hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
                <div className="space-y-1.5">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          handleCategoryChange(cat);
                          setMobileFilterOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-[#123D25] text-white font-semibold shadow-sm'
                            : 'text-[#17251B]/80 hover:bg-[#E8F2DD] hover:text-[#123D25]'
                        }`}
                      >
                        <span>{cat}</span>
                        {isSelected && <span className="text-xs">→</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Filter matching Screen 2 */}
              <div className="pt-6 border-t border-[#E8F2DD]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif-heading font-bold text-base text-[#123D25]">
                    Price Range
                  </h3>
                  <span className="text-xs font-semibold text-[#267A3E]">
                    Up to {formatPKR(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="w-full accent-[#267A3E] cursor-pointer"
                />
                <div className="flex justify-between text-xs text-[#17251B]/50 mt-1">
                  <span>PKR 0</span>
                  <span>PKR 10,000</span>
                </div>
              </div>

              {/* Rating Filter matching Screen 2 */}
              <div className="pt-6 border-t border-[#E8F2DD]">
                <h3 className="font-serif-heading font-bold text-base text-[#123D25] mb-3">
                  Rating
                </h3>
                <div className="space-y-2">
                  {[
                    { label: '4.8 & Up', val: 4.8 },
                    { label: '4.5 & Up', val: 4.5 },
                    { label: '4.0 & Up', val: 4.0 },
                    { label: 'All Ratings', val: 0 },
                  ].map((rate) => (
                    <button
                      key={rate.val}
                      onClick={() => {
                        setMinRating(rate.val);
                        setCurrentPage(1);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition ${
                        minRating === rate.val
                          ? 'bg-[#E8F2DD] text-[#123D25] font-bold'
                          : 'text-[#17251B]/70 hover:bg-[#FAF9EF]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-[#17251B]">{rate.label}</span>
                      </div>
                      {minRating === rate.val && <Check className="w-3.5 h-3.5 text-[#267A3E]" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Backdrop for mobile filter drawer */}
          {mobileFilterOpen && (
            <div
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
            />
          )}

          {/* Right Product Grid Area matching Screen 2 */}
          <main className="lg:col-span-9 space-y-6">
            {/* Top Toolbar: Search + Sort dropdown */}
            <div className="bg-white p-4 rounded-2xl border border-[#E8F2DD] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Search input matching Screen 2 */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF9EF] border border-[#E8F2DD] text-sm text-[#17251B] placeholder-[#17251B]/40 focus:outline-none focus:ring-2 focus:ring-[#267A3E]/30"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort by dropdown matching Screen 2 */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-[#17251B]/60 whitespace-nowrap">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3.5 py-2 rounded-xl bg-[#FAF9EF] border border-[#E8F2DD] text-xs sm:text-sm font-semibold text-[#123D25] focus:outline-none focus:ring-2 focus:ring-[#267A3E]/30 cursor-pointer"
                >
                  <option value="popular">Popular →</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            {/* Active filters badges */}
            {(selectedCategory !== 'All' || searchQuery || maxPrice < 10000 || minRating > 0) && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-[#17251B]/60 font-medium">Active filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F2DD] text-xs font-semibold text-[#123D25]">
                    Category: {selectedCategory}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleCategoryChange('All')}
                    />
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F2DD] text-xs font-semibold text-[#123D25]">
                    Query: "{searchQuery}"
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => setSearchQuery('')}
                    />
                  </span>
                )}
                {maxPrice < 10000 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F2DD] text-xs font-semibold text-[#123D25]">
                    Max: {formatPKR(maxPrice)}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => setMaxPrice(10000)}
                    />
                  </span>
                )}
                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8F2DD] text-xs font-semibold text-[#123D25]">
                    Rating: {minRating}★+
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-500"
                      onClick={() => setMinRating(0)}
                    />
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E8F2DD] space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#E8F2DD] mx-auto flex items-center justify-center text-[#267A3E]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-heading font-bold text-xl text-[#123D25]">
                  No products found
                </h3>
                <p className="text-sm text-[#17251B]/60 max-w-sm mx-auto">
                  Try broadening your search or resetting category filters to discover vertical gardening items.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setMaxPrice(10000);
                    setMinRating(0);
                  }}
                  className="px-5 py-2 rounded-full bg-[#123D25] text-white text-xs font-semibold hover:bg-[#267A3E] transition"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      className="group bg-white rounded-3xl overflow-hidden border border-[#E8F2DD] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                    >
                      {/* Product Image Container */}
                      <div className="relative aspect-4/3 bg-[#FAF9EF] overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          onClick={() => {
                            setSelectedProductModal(product);
                            setModalQuantity(1);
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                        />

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

                        {/* Category badge */}
                        <span className="absolute bottom-3 left-3 bg-[#123D25]/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                          {product.category}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h3
                            onClick={() => {
                              setSelectedProductModal(product);
                              setModalQuantity(1);
                            }}
                            className="font-serif-heading font-bold text-base sm:text-lg text-[#123D25] hover:text-[#267A3E] transition-colors cursor-pointer line-clamp-1"
                          >
                            {product.name}
                          </h3>

                          {/* Star Ratings */}
                          <div className="flex items-center gap-1.5 mt-1">
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
                            <span className="text-[11px] text-[#17251B]/50">
                              ({product.reviewsCount})
                            </span>
                          </div>

                          <p className="text-xs text-[#17251B]/70 mt-2 line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>

                        {/* Price & Add to Cart button matching Screen 2 */}
                        <div className="pt-3 border-t border-[#E8F2DD] flex items-center justify-between">
                          <div>
                            <span className="text-xs text-[#17251B]/50 block">Price</span>
                            <span className="text-base sm:text-lg font-bold text-[#123D25]">
                              {formatPKR(product.price)}
                            </span>
                          </div>

                          <button
                            onClick={() => onAddToCart(product)}
                            className="px-4 py-2 rounded-full bg-[#123D25] hover:bg-[#267A3E] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls matching Screen 2 (< 1 2 3 >) */}
            {totalPages > 1 && (
              <div className="pt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl bg-white border border-[#E8F2DD] text-[#123D25] disabled:opacity-40 hover:bg-[#E8F2DD] transition cursor-pointer"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const pNum = i + 1;
                  const isActive = currentPage === pNum;
                  return (
                    <button
                      key={pNum}
                      onClick={() => setCurrentPage(pNum)}
                      className={`w-9 h-9 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                        isActive
                          ? 'bg-[#123D25] text-white shadow-md'
                          : 'bg-white border border-[#E8F2DD] text-[#17251B] hover:bg-[#E8F2DD]'
                      }`}
                    >
                      {pNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl bg-white border border-[#E8F2DD] text-[#123D25] disabled:opacity-40 hover:bg-[#E8F2DD] transition cursor-pointer"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Product Modal */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8F2DD] relative">
            <button
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-gray-500 hover:text-gray-800 shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-64 md:h-full bg-[#FAF9EF]">
                <img
                  src={selectedProductModal.image}
                  alt={selectedProductModal.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#E8F2DD] text-[#267A3E]">
                    {selectedProductModal.category}
                  </span>
                  <h3 className="font-serif-heading font-bold text-2xl text-[#123D25] mt-2">
                    {selectedProductModal.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(selectedProductModal.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-[#123D25]">
                      {selectedProductModal.rating}
                    </span>
                    <span className="text-xs text-[#17251B]/50">
                      ({selectedProductModal.reviewsCount} customer reviews)
                    </span>
                  </div>

                  <p className="text-2xl font-bold text-[#123D25] mt-3">
                    {formatPKR(selectedProductModal.price)}
                  </p>

                  <p className="text-xs text-[#17251B]/70 mt-3 leading-relaxed">
                    {selectedProductModal.description}
                  </p>

                  {selectedProductModal.dimensions && (
                    <div className="mt-4 pt-4 border-t border-[#E8F2DD] space-y-1 text-xs text-[#17251B]/80">
                      <p><span className="font-semibold text-[#123D25]">Dimensions:</span> {selectedProductModal.dimensions}</p>
                      {selectedProductModal.material && (
                        <p><span className="font-semibold text-[#123D25]">Material:</span> {selectedProductModal.material}</p>
                      )}
                    </div>
                  )}

                  <div className="mt-3 flex items-center gap-4 text-xs text-[#267A3E]">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> Dispatched in 24h
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> 1-Year Warranty
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8F2DD] space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#17251B]/70">Quantity:</span>
                    <div className="flex items-center rounded-xl border border-[#E8F2DD] bg-[#FAF9EF]">
                      <button
                        onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-1 text-sm font-bold text-[#123D25] hover:bg-[#E8F2DD] rounded-l-xl"
                      >
                        -
                      </button>
                      <span className="px-3 text-sm font-semibold">{modalQuantity}</span>
                      <button
                        onClick={() => setModalQuantity((q) => q + 1)}
                        className="px-3 py-1 text-sm font-bold text-[#123D25] hover:bg-[#E8F2DD] rounded-r-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(selectedProductModal, modalQuantity);
                      setSelectedProductModal(null);
                    }}
                    className="w-full py-3 rounded-xl bg-[#123D25] hover:bg-[#267A3E] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add {modalQuantity} to Cart • {formatPKR(selectedProductModal.price * modalQuantity)}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
