export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  isFeatured?: boolean;
  tags?: string[];
  dimensions?: string;
  material?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PlantCare {
  id: string;
  name: string;
  scientificName: string;
  category: 'indoor' | 'outdoor' | 'flowering' | 'herbs' | 'vegetables' | 'succulents';
  difficulty: 'Easy Care' | 'Moderate' | 'Advanced';
  image: string;
  sunlight: string;
  watering: string;
  soil: string;
  humidity: string;
  temperature: string;
  fertilizer: string;
  commonProblems: string[];
  careInstructions: string[];
  description: string;
  popularForVertical: boolean;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
}

export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString('en-US')}`;
}

export function calculateCartTotals(
  items: CartItem[],
  promoCode?: string
): CartTotals {
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  let discountRate = 0;
  if (promoCode) {
    const code = promoCode.trim().toUpperCase();
    if (code === 'GREEN10') discountRate = 0.10;
    else if (code === 'ECOSAVE') discountRate = 0.15;
    else if (code === 'VERTGARDEN20') discountRate = 0.20;
  }

  const discount = Math.round(subtotal * discountRate);
  // Free delivery over PKR 5,000, otherwise flat PKR 250
  const shipping = subtotal === 0 ? 0 : subtotal >= 5000 ? 0 : 250;
  const total = Math.max(0, subtotal - discount + shipping);

  return {
    itemCount,
    subtotal,
    discount,
    shipping,
    total,
  };
}

export interface ProductFilterOptions {
  category?: string;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: 'popular' | 'price-asc' | 'price-desc' | 'rating';
}

export function filterAndSortProducts(
  products: Product[],
  options: ProductFilterOptions = {}
): Product[] {
  let result = products.filter((p) => {
    // Category filter
    if (options.category && options.category !== 'All') {
      if (p.category.toLowerCase() !== options.category.toLowerCase()) {
        return false;
      }
    }

    // Search query filter
    if (options.query && options.query.trim() !== '') {
      const q = options.query.toLowerCase().trim();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCategory) {
        return false;
      }
    }

    // Min price
    if (typeof options.minPrice === 'number' && p.price < options.minPrice) {
      return false;
    }

    // Max price
    if (typeof options.maxPrice === 'number' && p.price > options.maxPrice) {
      return false;
    }

    // Min rating
    if (typeof options.minRating === 'number' && p.rating < options.minRating) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortBy = options.sortBy || 'popular';
  result.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        return b.reviewsCount - a.reviewsCount;
    }
  });

  return result;
}

export interface PlantFilterOptions {
  category?: string;
  query?: string;
  difficulty?: string;
}

export function filterPlants(
  plants: PlantCare[],
  options: PlantFilterOptions = {}
): PlantCare[] {
  return plants.filter((plant) => {
    if (options.category && options.category !== 'all') {
      if (plant.category.toLowerCase() !== options.category.toLowerCase()) {
        return false;
      }
    }

    if (options.difficulty && options.difficulty !== 'all') {
      if (plant.difficulty.toLowerCase() !== options.difficulty.toLowerCase()) {
        return false;
      }
    }

    if (options.query && options.query.trim() !== '') {
      const q = options.query.toLowerCase().trim();
      const matchName = plant.name.toLowerCase().includes(q);
      const matchSci = plant.scientificName.toLowerCase().includes(q);
      const matchDesc = plant.description.toLowerCase().includes(q);
      if (!matchName && !matchSci && !matchDesc) {
        return false;
      }
    }

    return true;
  });
}
