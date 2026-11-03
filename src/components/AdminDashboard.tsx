import React, { useState } from 'react';
import { Product, PlantCare, formatPKR } from '../utils/ecommerce';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Clock,
  ArrowUpRight,
  X,
  Sprout,
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  plants: PlantCare[];
  orders: any[];
  onUpdateOrderStatus: (orderId: string, status: string) => void;
  onCloseAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  plants,
  orders,
  onUpdateOrderStatus,
  onCloseAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'plants'>('analytics');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state for adding/editing product
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Vertical Garden Stands',
    price: 3499,
    description: '',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
    dimensions: '120cm H x 50cm W',
    material: 'Rust-Proof Steel',
  });

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 184500);
  const totalOrdersCount = orders.length + 42;
  const totalCustomersCount = orders.length + 38;

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Vertical Garden Stands',
      price: 3499,
      description: '',
      image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80',
      dimensions: '120cm H x 50cm W',
      material: 'Powder-coated steel',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      description: prod.description,
      image: prod.image,
      dimensions: prod.dimensions || 'Standard',
      material: prod.material || 'Eco composite',
    });
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;

    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        ...productForm,
      });
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: productForm.name,
        category: productForm.category,
        price: Number(productForm.price),
        rating: 4.8,
        reviewsCount: 1,
        image: productForm.image,
        description: productForm.description,
        inStock: true,
        dimensions: productForm.dimensions,
        material: productForm.material,
      };
      onAddProduct(newProd);
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF9EF] pb-24">
      {/* Top Admin Header */}
      <div className="bg-[#123D25] text-white py-6 px-4 sm:px-8 border-b-4 border-[#267A3E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4CAF50] text-[#123D25] flex items-center justify-center font-bold">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif-heading text-2xl font-bold tracking-tight">
                GreenSpace Admin Portal
              </h1>
              <p className="text-xs text-[#E8F2DD]/80">
                Inventory, Catalog & Order Operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-[#4CAF50] hover:bg-[#3d9140] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>

            <button
              onClick={onCloseAdmin}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition cursor-pointer"
            >
              Exit to Store
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#E8F2DD] pb-4 mb-8 overflow-x-auto">
          {[
            { id: 'analytics', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'products', label: `Products (${products.length})`, icon: Package },
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'plants', label: `Plant Guides (${plants.length})`, icon: Sprout },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#123D25] text-white shadow-md'
                    : 'bg-white text-[#17251B] border border-[#E8F2DD] hover:bg-[#E8F2DD]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Analytics Overview */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-[#E8F2DD] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#17251B]/60 font-semibold block uppercase">
                    Total Revenue
                  </span>
                  <span className="text-2xl font-bold text-[#123D25] mt-1 block">
                    {formatPKR(totalRevenue)}
                  </span>
                  <span className="text-[11px] text-[#267A3E] font-medium flex items-center gap-0.5 mt-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> +24% this month
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8F2DD] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#17251B]/60 font-semibold block uppercase">
                    Total Orders
                  </span>
                  <span className="text-2xl font-bold text-[#123D25] mt-1 block">
                    {totalOrdersCount}
                  </span>
                  <span className="text-[11px] text-[#267A3E] font-medium flex items-center gap-0.5 mt-1">
                    <ArrowUpRight className="w-3.5 h-3.5" /> 98% fulfillment rate
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8F2DD] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#17251B]/60 font-semibold block uppercase">
                    Active Catalog
                  </span>
                  <span className="text-2xl font-bold text-[#123D25] mt-1 block">
                    {products.length} Items
                  </span>
                  <span className="text-[11px] text-[#267A3E] font-medium flex items-center gap-0.5 mt-1">
                    All in stock
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-[#E8F2DD] shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#17251B]/60 font-semibold block uppercase">
                    Registered Gardeners
                  </span>
                  <span className="text-2xl font-bold text-[#123D25] mt-1 block">
                    {totalCustomersCount}
                  </span>
                  <span className="text-[11px] text-[#267A3E] font-medium flex items-center gap-0.5 mt-1">
                    Across 14 cities
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Recent Orders table */}
            <div className="bg-white rounded-3xl p-6 border border-[#E8F2DD] shadow-sm space-y-4">
              <h3 className="font-serif-heading font-bold text-xl text-[#123D25]">
                Recent Customer Orders
              </h3>
              {orders.length === 0 ? (
                <p className="text-xs text-[#17251B]/60 py-4">No new live orders yet. Place an order on the store to see it appear here in real time!</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E8F2DD] text-[#17251B]/60">
                        <th className="pb-3">Order ID</th>
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Destination</th>
                        <th className="pb-3">Items</th>
                        <th className="pb-3">Total</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8F2DD]">
                      {orders.map((ord) => (
                        <tr key={ord.orderId}>
                          <td className="py-3 font-bold text-[#123D25]">{ord.orderId}</td>
                          <td className="py-3">{ord.customer.fullName}</td>
                          <td className="py-3">{ord.customer.city}</td>
                          <td className="py-3">{ord.items.length} product(s)</td>
                          <td className="py-3 font-bold">{formatPKR(ord.totals.total)}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full bg-[#E8F2DD] text-[#267A3E] font-bold text-[10px]">
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() =>
                                onUpdateOrderStatus(
                                  ord.orderId,
                                  ord.status === 'Processing' ? 'Shipped' : 'Delivered'
                                )
                              }
                              className="text-[11px] text-[#267A3E] hover:underline font-semibold"
                            >
                              Advance Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Manage Products */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-heading font-bold text-xl text-[#123D25]">
                Manage Hardware & Planters Catalog
              </h3>
              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 rounded-xl bg-[#123D25] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-3xl p-5 border border-[#E8F2DD] shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-[#FAF9EF] shrink-0"
                    />
                    <div className="flex-1">
                      <span className="text-[11px] font-semibold text-[#267A3E]">
                        {product.category}
                      </span>
                      <h4 className="font-serif-heading font-bold text-base text-[#123D25] line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-base font-bold text-[#123D25] mt-1">
                        {formatPKR(product.price)}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#17251B]/70 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="pt-3 border-t border-[#E8F2DD] flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="p-2 rounded-xl border border-[#E8F2DD] hover:bg-[#FAF9EF] text-gray-700 text-xs flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="p-2 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-xs flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Manage Orders */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl p-6 border border-[#E8F2DD] shadow-sm space-y-4 animate-in fade-in">
            <h3 className="font-serif-heading font-bold text-xl text-[#123D25]">
              Customer Orders Fulfillment
            </h3>
            {orders.length === 0 ? (
              <p className="text-xs text-[#17251B]/60 py-6">No customer orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.orderId} className="p-4 rounded-2xl border border-[#E8F2DD] bg-[#FAF9EF] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-[#123D25] text-sm">{ord.orderId}</span>
                        <span className="text-xs text-[#17251B]/60 ml-3">{ord.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E8F2DD] text-[#267A3E]">
                          {ord.status}
                        </span>
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.orderId, e.target.value)}
                          className="px-2.5 py-1 text-xs rounded-xl bg-white border border-[#E8F2DD] font-medium"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="text-xs text-[#17251B]/80 space-y-1">
                      <p><span className="font-semibold">Customer:</span> {ord.customer.fullName} ({ord.customer.phone})</p>
                      <p><span className="font-semibold">Address:</span> {ord.customer.address}, {ord.customer.city}</p>
                      <p><span className="font-semibold">Total:</span> {formatPKR(ord.totals.total)} ({ord.customer.paymentMethod.toUpperCase()})</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Plant Care Records */}
        {activeTab === 'plants' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in">
            {plants.map((plant) => (
              <div key={plant.id} className="bg-white p-5 rounded-3xl border border-[#E8F2DD] shadow-sm space-y-3">
                <div className="flex gap-4">
                  <img src={plant.image} alt={plant.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <h4 className="font-serif-heading font-bold text-base text-[#123D25]">{plant.name}</h4>
                    <p className="text-xs italic text-[#267A3E]">{plant.scientificName}</p>
                    <span className="text-[10px] bg-[#E8F2DD] px-2 py-0.5 rounded-full font-bold text-[#123D25] mt-1 inline-block">
                      {plant.difficulty}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#17251B]/70 line-clamp-2">{plant.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E8F2DD] shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif-heading font-bold text-xl text-[#123D25] mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Vertical Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none"
                  >
                    <option value="Vertical Garden Stands">Vertical Garden Stands</option>
                    <option value="Wall Planters">Wall Planters</option>
                    <option value="Hanging Pots">Hanging Pots</option>
                    <option value="Modular Panels">Modular Panels</option>
                    <option value="Hydroponic Systems">Hydroponic Systems</option>
                    <option value="Gardening Tools">Gardening Tools</option>
                    <option value="Seeds and Plants">Seeds and Plants</option>
                    <option value="Irrigation Accessories">Irrigation Accessories</option>
                    <option value="Starter Kits">Starter Kits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                    Price in PKR *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E8F2DD] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#123D25] hover:bg-[#267A3E] text-white text-xs font-bold transition cursor-pointer"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
