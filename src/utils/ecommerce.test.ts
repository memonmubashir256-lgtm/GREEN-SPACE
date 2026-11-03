import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCartTotals,
  filterAndSortProducts,
  filterPlants,
  formatPKR,
  Product,
  PlantCare,
} from './ecommerce';

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'Vertical Plant Stand',
    category: 'Vertical Garden Stands',
    price: 4099,
    rating: 4.8,
    reviewsCount: 1200,
    image: '/images/stand.jpg',
    description: 'Multi-tier powder-coated steel vertical plant stand for balcony and indoor',
    inStock: true,
  },
  {
    id: 'p2',
    name: 'Wall Planter Set',
    category: 'Wall Planters',
    price: 2499,
    rating: 4.7,
    reviewsCount: 856,
    image: '/images/planter.jpg',
    description: 'Set of 6 modular wall-hanging pots with drip trays',
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Hydroponic Kit',
    category: 'Hydroponic Systems',
    price: 5099,
    rating: 4.9,
    reviewsCount: 420,
    image: '/images/hydro.jpg',
    description: 'Complete nutrient film hydroponic vertical tower',
    inStock: true,
  },
];

const mockPlants: PlantCare[] = [
  {
    id: 'money-plant',
    name: 'Money Plant',
    scientificName: 'Epipremnum aureum',
    category: 'indoor',
    difficulty: 'Easy Care',
    image: '/images/money.jpg',
    sunlight: 'Bright Indirect Light',
    watering: 'Water Weekly',
    soil: 'Well-Draining Soil',
    humidity: 'Average (40-60%)',
    temperature: '18-30°C',
    fertilizer: 'Monthly during spring/summer',
    commonProblems: ['Yellow leaves from overwatering'],
    careInstructions: ['Allow top inch to dry between waterings'],
    description: 'Ideal beginner climbing vine for vertical walls',
    popularForVertical: true,
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    category: 'indoor',
    difficulty: 'Moderate',
    image: '/images/spider.jpg',
    sunlight: 'Medium to bright indirect',
    watering: 'When soil feels dry',
    soil: 'Loamy well draining',
    humidity: 'Moderate',
    temperature: '15-25°C',
    fertilizer: 'Twice a month',
    commonProblems: ['Brown tips from fluoridated tap water'],
    careInstructions: ['Mist occasionally and hang near windows'],
    description: 'Air-purifying cascading foliage',
    popularForVertical: true,
  },
];

test('formatPKR formats numbers to Pakistani Rupees format', () => {
  assert.equal(formatPKR(4099), 'PKR 4,099');
  assert.equal(formatPKR(0), 'PKR 0');
});

test('calculateCartTotals calculates subtotal, discounts and shipping correctly', () => {
  const items = [
    { product: mockProducts[0], quantity: 1 }, // 4099
    { product: mockProducts[1], quantity: 1 }, // 2499
  ];
  // Subtotal = 6598 (>= 5000, so shipping is free)
  const totals = calculateCartTotals(items);
  assert.equal(totals.itemCount, 2);
  assert.equal(totals.subtotal, 6598);
  assert.equal(totals.shipping, 0);
  assert.equal(totals.discount, 0);
  assert.equal(totals.total, 6598);

  // Under 5000 has 250 PKR shipping
  const singleItem = [{ product: mockProducts[1], quantity: 1 }]; // 2499
  const underTotals = calculateCartTotals(singleItem);
  assert.equal(underTotals.shipping, 250);
  assert.equal(underTotals.total, 2499 + 250);

  // Promo code applies discount
  const promoTotals = calculateCartTotals(singleItem, 'GREEN10');
  assert.equal(promoTotals.discount, Math.round(2499 * 0.10));
  assert.equal(promoTotals.total, 2499 - Math.round(2499 * 0.10) + 250);
});

test('filterAndSortProducts filters by category, price, search, and sorts correctly', () => {
  // Category filter
  const wallPlanters = filterAndSortProducts(mockProducts, { category: 'Wall Planters' });
  assert.equal(wallPlanters.length, 1);
  assert.equal(wallPlanters[0].id, 'p2');

  // Search query
  const searched = filterAndSortProducts(mockProducts, { query: 'hydroponic' });
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, 'p3');

  // Price range
  const priceFiltered = filterAndSortProducts(mockProducts, { minPrice: 3000, maxPrice: 5000 });
  assert.equal(priceFiltered.length, 1);
  assert.equal(priceFiltered[0].id, 'p1');

  // Sort by price-asc
  const sortedAsc = filterAndSortProducts(mockProducts, { sortBy: 'price-asc' });
  assert.equal(sortedAsc[0].price, 2499);
  assert.equal(sortedAsc[2].price, 5099);
});

test('filterPlants correctly handles category and query filters', () => {
  const easyPlants = filterPlants(mockPlants, { difficulty: 'Easy Care' });
  assert.equal(easyPlants.length, 1);
  assert.equal(easyPlants[0].id, 'money-plant');

  const queried = filterPlants(mockPlants, { query: 'Epipremnum' });
  assert.equal(queried.length, 1);
  assert.equal(queried[0].id, 'money-plant');
});
