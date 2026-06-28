import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag } from 'lucide-react';
import { loadRazorpayScript } from '../lib/razorpay';
import { supabase } from '../lib/supabase';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  basePrice: number;
  productImage: string;
}

export default function CheckoutModal({ isOpen, onClose, product, basePrice, productImage }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const DELIVERY_FEE = 50;
  
  // Calculate totals
  const subtotal = basePrice;
  const discountAmount = (subtotal * discount) / 100;
  const finalTotal = subtotal - discountAmount + DELIVERY_FEE;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'FLOFFI10') {
      setDiscount(10);
      setCouponMessage('10% discount applied successfully!');
    } else {
      setDiscount(0);
      setCouponMessage('Invalid or expired coupon code.');
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setIsProcessing(false);
        return;
      }

      const result = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalTotal,
          receipt: `rcpt_${product.id}_${Date.now()}`
        }),
      });

      if (!result.ok) {
        alert('Payment initialization failed. Please try again later.');
        setIsProcessing(false);
        return;
      }

      const order = await result.json();

      const options = {
        key: 'rzp_live_RnbwErlMvkWnMv',
        amount: order.amount,
        currency: order.currency,
        name: 'Floffi',
        description: `Pre-order for ${product.name}`,
        image: productImage,
        order_id: order.id,
        handler: async function (response: any) {
          // Save payment & customer details to Supabase
          const { error } = await supabase.from('payments').insert([{
            razorpay_payment_id: response.razorpay_payment_id,
            order_id: order.id,
            amount: finalTotal,
            status: 'Completed',
            customer_name: formData.name,
            customer_email: formData.email,
            customer_phone: formData.phone,
            shipping_address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
            created_at: new Date().toISOString()
          }]);
          
          if (error) {
            console.error('Error saving payment:', error);
            alert('Payment successful, but there was an error saving your order. Please contact support.');
          } else {
            alert('Pre-order successful! Thank you.');
            onClose();
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#ff8c00'
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert('Could not initiate pre-order.');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[var(--bg-cream)] rounded-[24px] shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          
          {/* Left Column: Form */}
          <div className="flex-1 p-8 overflow-y-auto" style={{ borderRight: '1px solid rgba(62,39,35,0.1)' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading font-bold text-2xl text-earthy-brown">Checkout Details</h2>
              <button onClick={onClose} className="md:hidden text-earthy-brown hover:text-hibiscus-red">
                <X size={24} />
              </button>
            </div>
            
            <form id="checkout-form" onSubmit={handlePayment} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-earthy-brown mb-1">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-[rgba(62,39,35,0.2)] focus:outline-none focus:border-hibiscus-red" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earthy-brown mb-1">Phone Number *</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-[rgba(62,39,35,0.2)] focus:outline-none focus:border-hibiscus-red" placeholder="+91 9876543210" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-earthy-brown mb-1">Email Address *</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-[rgba(62,39,35,0.2)] focus:outline-none focus:border-hibiscus-red" placeholder="john@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-earthy-brown mb-1">Delivery Address *</label>
                <textarea required name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full p-3 rounded-xl border border-[rgba(62,39,35,0.2)] focus:outline-none focus:border-hibiscus-red" placeholder="123 Main Street, Apt 4B..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-earthy-brown mb-1">City *</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-[rgba(62,39,35,0.2)] focus:outline-none focus:border-hibiscus-red" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-earthy-brown mb-1">Pincode *</label>
                  <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full p-3 rounded-xl border border-[rgba(62,39,35,0.2)] focus:outline-none focus:border-hibiscus-red" placeholder="400001" />
                </div>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary */}
          <div className="w-full md:w-80 bg-white p-8 flex flex-col relative">
            <button onClick={onClose} className="absolute top-4 right-4 hidden md:block text-earthy-brown hover:text-hibiscus-red">
              <X size={24} />
            </button>

            <h3 className="font-heading font-bold text-xl text-earthy-brown mb-6">Order Summary</h3>
            
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[rgba(62,39,35,0.1)]">
              <img src={productImage} alt={product?.name} className="w-16 h-16 object-cover rounded-lg bg-[var(--bg-cream)] p-1" />
              <div>
                <p className="font-bold text-earthy-brown text-sm">{product?.name}</p>
                <p className="text-earthy-brown/60 text-xs">Qty: 1</p>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-earthy-brown mb-2 flex items-center gap-2">
                <Tag size={16} /> Have a coupon?
              </label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={coupon} 
                  onChange={(e) => setCoupon(e.target.value)} 
                  className="flex-1 p-2 rounded-lg border border-[rgba(62,39,35,0.2)] text-sm uppercase" 
                  placeholder="e.g. FLOFFI10" 
                />
                <button type="button" onClick={applyCoupon} className="px-4 py-2 bg-earthy-brown text-white rounded-lg text-sm font-bold hover:opacity-90">
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p className={`text-xs mt-2 ${discount > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {couponMessage}
                </p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-3 mb-6 pb-6 border-b border-[rgba(62,39,35,0.1)]">
              <div className="flex justify-between text-sm text-earthy-brown/80">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount ({discount}%)</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-earthy-brown/80">
                <span>Delivery Fee</span>
                <span>₹{DELIVERY_FEE.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-8">
              <span className="font-bold text-lg text-earthy-brown">Total</span>
              <span className="font-bold text-2xl text-hibiscus-red">₹{finalTotal.toFixed(2)}</span>
            </div>

            <button 
              form="checkout-form"
              type="submit"
              disabled={isProcessing}
              className="w-full btn btn-primary py-4 rounded-xl text-lg font-bold flex justify-center items-center mt-auto"
              style={{ boxShadow: '0 4px 14px rgba(255, 140, 0, 0.3)' }}
            >
              {isProcessing ? 'Processing...' : `Pay ₹${finalTotal.toFixed(2)}`}
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
