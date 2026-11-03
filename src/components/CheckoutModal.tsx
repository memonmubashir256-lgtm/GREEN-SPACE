import React, { useState } from 'react';
import { CartItem, calculateCartTotals, formatPKR } from '../utils/ecommerce';
import {
  X,
  CheckCircle2,
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  Building,
  ArrowRight,
  Sprout,
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: any) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Lahore',
    address: '',
    paymentMethod: 'cod',
    deliveryNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const totals = calculateCartTotals(items);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = {
        orderId: `GS-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        customer: formData,
        items: items,
        totals: totals,
        status: 'Processing',
      };

      setCompletedOrder(order);
      onOrderSuccess(order);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E8F2DD] relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-[#E8F2DD] bg-[#FAF9EF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#123D25] flex items-center justify-center text-white">
              <Sprout className="w-4 h-4 text-[#4CAF50]" />
            </div>
            <div>
              <h3 className="font-serif-heading font-bold text-xl text-[#123D25]">
                {completedOrder ? 'Order Confirmed!' : 'Express Checkout'}
              </h3>
              <p className="text-xs text-[#267A3E]">
                {completedOrder ? 'Thank you for choosing GreenSpace' : 'Fast delivery across Pakistan'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Order Confirmation Screen */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E8F2DD] text-[#267A3E] flex items-center justify-center mx-auto shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-[#4CAF50]" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-[#267A3E]">
                Booking Reference: {completedOrder.orderId}
              </span>
              <h2 className="font-serif-heading text-2xl font-bold text-[#123D25]">
                Your Green Journey Begins!
              </h2>
              <p className="text-xs sm:text-sm text-[#17251B]/70 max-w-md mx-auto">
                We have received your order for {formatPKR(completedOrder.totals.total)}. Our dispatch team in {completedOrder.customer.city} is preparing your vertical gardening hardware.
              </p>
            </div>

            <div className="bg-[#FAF9EF] p-5 rounded-2xl border border-[#E8F2DD] text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-gray-500">Recipient:</span>
                <span className="font-bold text-[#123D25]">{completedOrder.customer.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Contact:</span>
                <span className="font-medium text-[#123D25]">{completedOrder.customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Destination:</span>
                <span className="font-medium text-[#123D25]">{completedOrder.customer.address}, {completedOrder.customer.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method:</span>
                <span className="font-medium text-[#267A3E] capitalize">
                  {completedOrder.customer.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Bank / Digital Wallet'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3 rounded-full bg-[#123D25] hover:bg-[#267A3E] text-white font-semibold text-sm transition"
            >
              Continue Exploring GreenSpace
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Customer Details */}
            <div className="space-y-4">
              <h4 className="font-serif-heading font-bold text-base text-[#123D25] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#267A3E]" />
                <span>Shipping & Contact Information</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Mubashir Memon"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none focus:ring-2 focus:ring-[#267A3E]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                    Mobile Phone (for delivery SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0300 1234567"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none focus:ring-2 focus:ring-[#267A3E]/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                    City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none focus:ring-2 focus:ring-[#267A3E]/30"
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Sialkot">Sialkot</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-[#17251B]/70 mb-1">
                    Complete Street Address & Area *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House / Apartment #, Street, Sector / Colony"
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#E8F2DD] bg-[#FAF9EF] focus:outline-none focus:ring-2 focus:ring-[#267A3E]/30"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3 pt-4 border-t border-[#E8F2DD]">
              <h4 className="font-serif-heading font-bold text-base text-[#123D25] flex items-center gap-2">
                <Banknote className="w-4 h-4 text-[#267A3E]" />
                <span>Payment Preference</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition ${
                    formData.paymentMethod === 'cod'
                      ? 'border-[#267A3E] bg-[#E8F2DD]/40 ring-1 ring-[#267A3E]'
                      : 'border-[#E8F2DD] bg-[#FAF9EF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                    className="accent-[#267A3E]"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#123D25] block">
                      Cash on Delivery (COD)
                    </span>
                    <span className="text-[11px] text-[#17251B]/60">Pay when order arrives</span>
                  </div>
                </label>

                <label
                  className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition ${
                    formData.paymentMethod === 'digital'
                      ? 'border-[#267A3E] bg-[#E8F2DD]/40 ring-1 ring-[#267A3E]'
                      : 'border-[#E8F2DD] bg-[#FAF9EF]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="digital"
                    checked={formData.paymentMethod === 'digital'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'digital' })}
                    className="accent-[#267A3E]"
                  />
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#123D25] block">
                      JazzCash / EasyPaisa / Bank
                    </span>
                    <span className="text-[11px] text-[#17251B]/60">Account details sent on SMS</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-[#E8F2DD] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500 block">Payable Total:</span>
                <span className="text-2xl font-bold text-[#123D25]">
                  {formatPKR(totals.total)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#123D25] hover:bg-[#267A3E] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Confirm Order ({formatPKR(totals.total)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
