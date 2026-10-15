import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import type { PageRoute } from '../App';

import productBanner from '../assets/new_product_banner_1.png';
import { REAL_PRODUCT_IMAGES } from '../data/productImages';

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

const DEFAULT_PRODUCTS: ProductDetail[] = [
  {
    id: 'gulkhand-jam',
    name: 'Gulkhand Jam',
    category: 'jam',
    image: REAL_PRODUCT_IMAGES['gulkhand-jam'],
    price: 200,
    original_price: 245
  },
  {
    id: 'aavaram-jam',
    name: 'Aavaram Jam',
    category: 'jam',
    image: REAL_PRODUCT_IMAGES['aavaram-jam'],
    price: 200,
    original_price: 245
  },
  {
    id: 'hibiscus-nectar',
    name: 'Hibiscus Nectar Spread',
    category: 'nectar-spread',
    image: REAL_PRODUCT_IMAGES['hibiscus-nectar'],
    price: 350,
    original_price: 400
  },
  {
    id: 'rose-nectar',
    name: 'Rose Nectar Spread',
    category: 'nectar-spread',
    image: REAL_PRODUCT_IMAGES['rose-nectar'],
    price: 325,
    original_price: 375
  },
  {
    id: 'aavaram-thokku',
    name: 'Aavaram Chutney',
    category: 'thokku',
    image: REAL_PRODUCT_IMAGES['aavaram-thokku'],
    price: 230,
    original_price: 270
  },
  {
    id: 'banana-thokku',
    name: 'Banana Chutney',
    category: 'thokku',
    image: REAL_PRODUCT_IMAGES['banana-thokku'],
    price: 230,
    original_price: 270
  },
  {
    id: 'cauliflower-thokku',
    name: 'Cauliflower Chutney',
    category: 'thokku',
    image: REAL_PRODUCT_IMAGES['cauliflower-thokku'],
    price: 230,
    original_price: 270
  }
];

export default function ProductsPage({ selectedProductId, onNavigate }: ProductsPageProps) {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductDetail[]>(DEFAULT_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
          
        if (error) {
          console.warn('Using default products fallback:', error.message);
        } else if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.warn('Using default products fallback');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  const getImageUrl = (imagePath: string, productId?: string) => {
    if (!imagePath) {
      if (productId && REAL_PRODUCT_IMAGES[productId]) return REAL_PRODUCT_IMAGES[productId];
      return '';
    }
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
      return imagePath;
    }
    try {
      const { data } = supabase.storage.from('Productimage').getPublicUrl(imagePath);
      if (data?.publicUrl) return data.publicUrl;
    } catch {}
    if (productId && REAL_PRODUCT_IMAGES[productId]) return REAL_PRODUCT_IMAGES[productId];
    return imagePath;
  };

  const getProductPrice = (product: ProductDetail) => {
    if (product.price) {
      return { price: product.price, original: product.original_price };
    }
    
    const productName = product.name.toLowerCase();
    
    if (product.id === 'rose-nectar' || productName.includes('rose nectar')) {
      return { price: 325, original: 375 };
    }
    if (product.id === 'hibiscus-nectar' || productName.includes('hibiscus nectar')) {
      return { price: 350, original: 400 };
    }
    if (product.id === 'gulkhand' || productName.includes('gulkhand') || product.id === 'aavaram-jam' || productName.includes('aavaram jam')) {
      return { price: 200, original: 245 };
    }
    if (product.category === 'thokku' || productName.includes('thokku') || productName.includes('chutney')) {
      return { price: 230, original: 270 };
    }
    return { price: 299, original: 349 };
  };

  useEffect(() => {
    if (selectedProductId) {
      if (selectedProductId === 'jam' || selectedProductId === 'floral-jam') {
        setActiveCategories(['jam']);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (selectedProductId === 'nectar-spread' || selectedProductId === 'nectar') {
        setActiveCategories(['nectar-spread']);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (selectedProductId === 'thokku' || selectedProductId === 'floral-chutney' || selectedProductId === 'chutney') {
        setActiveCategories(['thokku']);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (selectedProductId === 'all') {
        setActiveCategories([]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const found = products.find(p => p.id === selectedProductId);
      if (found) {
        setActiveCategories([found.category]);
        setTimeout(() => {
          const element = document.getElementById(selectedProductId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 300);
      }
    } else {
      setActiveCategories([]);
    }
  }, [selectedProductId, products]);

  const filteredProducts = activeCategories.length === 0 
    ? products 
    : products.filter(p => activeCategories.includes(p.category));

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

      {/* Main Products Grid Layout */}
      <section className="section pb-24 pt-8">
        <div className="container max-w-7xl">
          <div className="flex flex-col">

            {/* Category Filter Status Bar */}
            {activeCategories.length > 0 && (
              <div className="flex items-center justify-between mb-8 pb-3 border-b border-earthy-brown/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-earthy-light uppercase tracking-wider">Category:</span>
                  <span className="text-sm font-bold text-earthy-brown font-heading uppercase tracking-wide">
                    {activeCategories[0] === 'jam' ? 'Floral Jam' : activeCategories[0] === 'nectar-spread' ? 'Nectar Spread' : 'Floral Chutney'}
                  </span>
                </div>
                <button 
                  onClick={() => setActiveCategories([])}
                  className="text-xs font-bold hover:underline cursor-pointer flex items-center gap-1"
                  style={{ color: '#FF8C00' }}
                >
                  Show All Products &rarr;
                </button>
              </div>
            )}
            
            {/* Product Grid - Smaller & Compact Sizing */}
            <div className="w-full">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-hibiscus-red"></div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => {
                    const { price, original } = getProductPrice(product);
                    
                    return (
                      <motion.div
                        key={product.id}
                        id={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        onClick={() => {
                          if (onNavigate) {
                            onNavigate('product-details', product.id);
                          }
                        }}
                        className="group cursor-pointer flex flex-col items-center text-center product-card bg-white"
                        style={{
                          padding: '16px',
                          borderRadius: '16px',
                          boxShadow: '0 4px 16px rgba(62, 39, 35, 0.05)',
                          border: '1px solid rgba(62,39,35,0.06)',
                          width: '100%',
                          height: '100%',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div className="w-full flex flex-col items-center justify-center">
                          {/* Compact Real Product Image Container */}
                          <div 
                            className="w-full relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1" 
                            style={{ 
                              height: '160px', 
                              borderRadius: '12px', 
                              overflow: 'hidden', 
                              backgroundColor: '#fff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <img 
                              src={getImageUrl(product.image, product.id)} 
                              alt={product.name} 
                              onError={(e) => {
                                if (REAL_PRODUCT_IMAGES[product.id]) {
                                  (e.target as HTMLImageElement).src = REAL_PRODUCT_IMAGES[product.id];
                                }
                              }}
                              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                          </div>
                          
                          {/* Product Title */}
                          <h3 
                            className="font-heading font-bold text-center w-full text-earthy-brown mt-3 mb-1 group-hover:text-hibiscus-red transition-colors"
                            style={{ fontSize: '0.95rem', lineHeight: '1.3' }}
                          >
                            {product.name.replace(/thokku/gi, 'Chutney')}
                          </h3>

                          {/* Price Display */}
                          <div className="flex items-center justify-center gap-2 mb-3 mt-1">
                            {original && (
                              <span className="text-xs opacity-60" style={{ color: 'var(--earthy-brown)', textDecoration: 'line-through' }}>
                                ₹{original}
                              </span>
                            )}
                            <span className="font-bold text-sm" style={{ color: 'var(--hibiscus-red)' }}>
                              ₹{price}
                            </span>
                          </div>
                        </div>
                        
                        {/* Compact View Details Button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onNavigate) {
                              onNavigate('product-details', product.id);
                            }
                          }}
                          className="btn btn-primary" 
                          style={{ 
                            marginTop: 'auto', 
                            width: '100%',
                            color: 'var(--bg-cream)', 
                            borderRadius: '8px', 
                            padding: '8px 14px',
                            fontSize: '0.82rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 8px rgba(255, 140, 0, 0.25)',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          View Details
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
