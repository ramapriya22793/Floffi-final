import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { loadRazorpayScript } from '../lib/razorpay';
import CheckoutModal from './CheckoutModal';
import type { PageRoute } from '../App';

import instaField from '../assets/insta_field.png';
import heroJars from '../assets/hero_jars.png';
import productBanner from '../assets/new_product_banner_1.png';

// Product jar images
import gulkhandJamImg from '../assets/gulkhand_jam.png';
import aavaramJamImg from '../assets/aavaram_jam.png';
import hibiscusNectarImg from '../assets/hibiscus_nectar.png';
import roseNectarImg from '../assets/rose_nectar.png';
import aavaramThokkuImg from '../assets/aavaram_thokku.png';
import bananaThokkuImg from '../assets/banana_thokku.png';
import cauliflowerThokkuImg from '../assets/cauliflower_thokku.png';

interface ProductDetail {
  id: string;
  name: string;
  category: 'jam' | 'nectar-spread' | 'thokku';
  image: string;
  price?: number;
  original_price?: number;
}

interface ProductsPageProps {
  selectedProductId?: string | null;
  onNavigate?: (page: any, productId?: string) => void;
}

export default function ProductsPage({ selectedProductId, onNavigate }: ProductsPageProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');

  const [products, setProducts] = useState<ProductDetail[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*');
        
      if (error) {
        console.error('Error fetching products:', error);
      } else if (data) {
        setProducts(data);
      }
      setIsLoading(false);
    }
    
    fetchProducts();
  }, []);

  const [checkoutProduct, setCheckoutProduct] = useState<ProductDetail | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
      return imagePath;
    }
    const { data } = supabase.storage.from('Productimage').getPublicUrl(imagePath);
    return data.publicUrl;
  };

  const handlePreOrder = (product: ProductDetail, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to product details
    setCheckoutProduct(product);
    setIsCheckoutOpen(true);
  };

  const getProductPrice = (product: ProductDetail) => {
    if (product.price) {
      return { price: product.price, original: product.original_price };
    }
    
    const productName = product.name.toLowerCase();
    
    // Specific hardcoded price for Rose Nectar Spread
    if (product.id === 'rose-nectar' || productName.includes('rose nectar')) {
      return { price: 325, original: 375 };
    }
    
    // Specific hardcoded price for Hibiscus Nectar Spread
    if (product.id === 'hibiscus-nectar' || productName.includes('hibiscus nectar')) {
      return { price: 350, original: 400 };
    }
    
    // Specific hardcoded price for Gulkhand Jam and Aavaram Jam
    if (product.id === 'gulkhand' || productName.includes('gulkhand') || product.id === 'aavaram-jam' || productName.includes('aavaram jam')) {
      return { price: 200, original: 245 };
    }
    
    // Specific hardcoded price for all Thokkus
    if (product.category === 'thokku' || productName.includes('thokku')) {
      return { price: 230, original: 270 };
    }
    
    // Fallback for others to maintain consistent UI, user can update later
    return { price: 299, original: 349 };
  };

  const categoriesList = [
    { id: 'jam', label: 'Premium Jams' },
    { id: 'nectar-spread', label: 'Nectar Spreads' },
    { id: 'thokku', label: 'Chutneys & Thokkus' }
  ];

  const toggleCategory = (catId: string) => {
    setActiveCategories(prev => 
      prev.includes(catId) 
        ? prev.filter(c => c !== catId)
        : [...prev, catId]
    );
  };

  const filteredProducts = activeCategories.length === 0 
    ? products 
    : products.filter(p => activeCategories.includes(p.category));

  useEffect(() => {
    if (selectedProductId) {
      const found = products.find(p => p.id === selectedProductId);
      if (found) {
        setActiveCategories([found.category]);
      }
      setTimeout(() => {
        const element = document.getElementById(selectedProductId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [selectedProductId]);

  return (
    <div className="pt-20 bg-white min-h-screen">
      
      {/* Single Banner Image Section */}
      <div className="hero-slider border-t-4" style={{ borderColor: '#E31837' }}>
        <img 
          src={productBanner} 
          alt="Floffi Products Banner" 
          className="hero-slide-img" 
        />
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
        product={checkoutProduct}
        basePrice={checkoutProduct ? getProductPrice(checkoutProduct).price : 0}
        productImage={checkoutProduct ? getImageUrl(checkoutProduct.image) : ''}
      />

      {/* Main E-commerce Layout */}
      <section className="section pb-24 pt-12">
        <div className="container">
          <div className="flex flex-col">
            
            {/* Product Grid */}
            <div className="w-full">
              
              {/* Grid */}
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hibiscus-red"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
                  <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => {
                    const { price, original } = getProductPrice(product);
                    
                    return (
                      <motion.div
                        key={product.id}
                        id={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate('product-details', product.id);
                          }
                        }}
                        className="group cursor-pointer flex flex-col items-center text-center product-card bg-white"
                        style={{
                          padding: '24px',
                          borderRadius: '24px',
                          boxShadow: '0 8px 30px rgba(62, 39, 35, 0.06)',
                          border: '1px solid rgba(62,39,35,0.05)',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div className="w-full flex flex-col items-center justify-center">
                          {/* Floating Product Image (No Background Box) */}
                          <div className="w-full relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2" style={{ height: '240px', borderRadius: '16px', overflow: 'hidden' }}>
                            <img 
                              src={getImageUrl(product.image)} 
                              alt={product.name} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                          </div>
                          
                          {/* Product Title */}
                          <h3 className="font-heading font-bold text-center w-full text-earthy-brown mt-6 mb-1 text-lg group-hover:text-hibiscus-red transition-colors">
                            {product.name}
                          </h3>

                          {/* Price Display */}
                          <div className="flex items-center justify-center gap-2 mb-4">
                            {original && (
                              <span className="text-sm opacity-60" style={{ color: 'var(--earthy-brown)', textDecoration: 'line-through' }}>
                                ₹{original}
                              </span>
                            )}
                            <span className="font-bold text-lg" style={{ color: 'var(--hibiscus-red)' }}>
                              ₹{price}
                            </span>
                          </div>
                        </div>
                        
                        {/* Pre-order Button */}
                        <button 
                          onClick={(e) => handlePreOrder(product, e)}
                          className="btn btn-primary" 
                          style={{ 
                            marginTop: 'auto', 
                            width: '100%',
                            color: 'var(--bg-cream)', 
                            borderRadius: '12px', 
                            padding: '12px 22px',
                            fontSize: '0.95rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 14px rgba(255, 140, 0, 0.3)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <ShoppingBag size={18} />
                          Pre-order
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
