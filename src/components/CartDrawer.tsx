import React, { useState } from 'react';
import { CartItem, calculateCartTotals, formatPKR } from '../utils/ecommerce';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoError, setPromoError] = useState('');

  const totals = calculateCartTotals(items, appliedPromo);

  if (!isOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'GREEN10' || code === 'ECOSAVE' || code === 'VERTGARDEN20') {
      setAppliedPromo(code);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try GREEN10 or ECOSAVE');
    }
  };

  // Free shipping threshold progress (PKR 5,000)
  const freeShippingThreshold = 5000;
  const progressPercent = Math.min(100, (totals.subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totals.subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E8F2DD] flex items-center justify-between bg-[#FAF9EF]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#267A3E]" />
              <h2 className="font-serif-heading text-xl font-bold text-[#123D25]">
                Your Shopping Cart
              </h2>
              <span className="text-xs bg-[#E8F2DD] text-[#123D25] font-bold px-2 py-0.5 rounded-full">
                {totals.itemCount}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="px-6 py-3 bg-[#E8F2DD]/50 border-b border-[#E8F2DD] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-[#123D25] mb-1.5 font-medium">
                Add <span className="font-bold text-[#267A3E]">{formatPKR(remainingForFreeShipping)}</span> more for Free Express Delivery!
              </p>
            ) : (
              <p className="text-[#267A3E] font-bold flex items-center gap-1 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>You unlocked Free Delivery across Pakistan!</span>
              </p>
            )}
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#267A3E] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF9EF] border border-[#E8F2DD] flex items-center justify-center mx-auto text-[#267A3E]">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h3 className="font-serif-heading font-bold text-lg text-[#123D25]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#17251B]/60 max-w-xs mx-auto">
                  Browse our vertical garden stands, wall planters, and hydroponic setups to begin.
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-2xl border border-[#E8F2DD] bg-[#FAF9EF] relative group"
                >
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-heading font-bold text-sm text-[#123D25] line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#267A3E] font-medium">
                        {product.category}
                      </p>
                      <p className="text-sm font-bold text-[#123D25] mt-1">
                        {formatPKR(product.price * quantity)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-lg border border-[#E8F2DD] bg-white">
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:bg-[#E8F2DD] text-[#123D25] rounded-l-lg transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-[#123D25]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:bg-[#E8F2DD] text-[#123D25] rounded-r-lg transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout button */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E8F2DD] bg-[#FAF9EF] space-y-4">
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Promo code (e.g. GREEN10)"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E8F2DD] text-[#123D25] focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#267A3E] hover:bg-[#123D25] text-white text-xs font-bold transition cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoError && <p className="text-[11px] text-red-500">{promoError}</p>}
              {appliedPromo && (
                <div className="flex items-center justify-between text-xs text-[#267A3E] font-semibold bg-[#E8F2DD] px-3 py-1.5 rounded-lg">
                  <span>Code {appliedPromo} applied (-10%)</span>
                  <button onClick={() => setAppliedPromo('')} className="text-gray-500 hover:text-red-500">
                    ✕
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#17251B]/80 pt-2 border-t border-[#E8F2DD]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPKR(totals.subtotal)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-[#267A3E] font-medium">
                    <span>Discount</span>
                    <span>-{formatPKR(totals.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery (TCS/Leopard Express)</span>
                  <span>{totals.shipping === 0 ? 'FREE' : formatPKR(totals.shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#123D25] pt-2 border-t border-[#E8F2DD]">
                  <span>Total (PKR)</span>
                  <span>{formatPKR(totals.total)}</span>
                </div>
              </div>

              {/* Proceed to Checkout button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 rounded-2xl bg-[#123D25] hover:bg-[#267A3E] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#17251B]/50">
                <ShieldCheck className="w-3.5 h-3.5 text-[#267A3E]" />
                <span>Cash on Delivery & Secure Bank Transfer Available</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
