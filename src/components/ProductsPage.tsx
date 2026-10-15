import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { PageRoute } from '../App';

import productBanner from '../assets/new_product_banner_1.png';
import heroJars from '../assets/hero_jars.png';
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
  const [sortBy, setSortBy] = useState<string>('featured');
  const [products, setProducts] = useState<ProductDetail[]>(DEFAULT_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const categoryTabs = [
    {
      id: 'all',
      label: 'Shop All',
      image: heroJars,
      isAll: true,
    },
    {
      id: 'jam',
      label: 'Floral Jam',
      image: REAL_PRODUCT_IMAGES['gulkhand-jam'],
      isAll: false,
    },
    {
      id: 'nectar-spread',
      label: 'Nectar Spread',
      image: REAL_PRODUCT_IMAGES['rose-nectar'],
      isAll: false,
    },
    {
      id: 'thokku',
      label: 'Floral Chutney',
      image: REAL_PRODUCT_IMAGES['aavaram-thokku'],
      isAll: false,
    },
  ];

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

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = getProductPrice(a).price;
    const priceB = getProductPrice(b).price;
    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
    return 0; // featured default
  });

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

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

      {/* Main E-commerce Layout */}
      <section className="section pb-24 pt-8">
        <div className="container">
          <div className="flex flex-col">

            {/* Breadcrumb & Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-earthy-brown/10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-earthy-light">
                  Home <span className="mx-1">•</span> <strong className="text-earthy-brown font-bold">Shop All</strong>
                </span>
                <div 
                  className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-earthy-brown/15 text-xs font-bold text-earthy-brown bg-white shadow-sm"
                >
                  <SlidersHorizontal size={14} className="text-hibiscus-red" />
                  <span>FILTER</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-semibold text-earthy-light">
                <span>{sortedProducts.length} products</span>
                <span className="text-earthy-brown/20">•</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-earthy-brown uppercase tracking-wider text-[11px]">SORT BY:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-bold text-earthy-brown text-xs outline-none cursor-pointer border-b border-dotted border-earthy-brown/40 pb-0.5 hover:text-hibiscus-red"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Circular Category Navigation (Image 3 Reference Style) */}
            <div className="relative w-full flex items-center justify-center mb-12 py-2">
              <button 
                onClick={scrollLeft}
                aria-label="Scroll categories left"
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-cream-dark/60 text-earthy-brown hover:bg-white hover:shadow-md transition-all mr-3 flex-shrink-0"
                style={{ backgroundColor: 'rgba(62, 39, 35, 0.05)' }}
              >
                <ChevronLeft size={18} />
              </button>

              <div 
                ref={scrollContainerRef}
                className="flex items-center justify-start md:justify-center gap-8 md:gap-14 overflow-x-auto no-scrollbar py-2 px-2 scroll-smooth w-full max-w-4xl"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {categoryTabs.map((tab) => {
                  const isActive = tab.isAll 
                    ? activeCategories.length === 0 
                    : (activeCategories.length === 1 && activeCategories[0] === tab.id);

                  return (
                    <div 
                      key={tab.id}
                      onClick={() => {
                        if (tab.isAll) {
                          setActiveCategories([]);
                        } else {
                          setActiveCategories([tab.id]);
                        }
                      }}
                      className="flex flex-col items-center cursor-pointer group flex-shrink-0 select-none"
                      style={{ minWidth: '85px', textAlign: 'center' }}
                    >
                      {/* Circle Thumbnail */}
                      <div 
                        className="transition-all duration-300 group-hover:scale-105"
                        style={{
                          width: '74px',
                          height: '74px',
                          borderRadius: '50%',
                          backgroundColor: '#FAF7F0',
                          border: isActive ? '2.5px solid #FF8C00' : '2px solid rgba(62, 39, 35, 0.08)',
                          boxShadow: isActive ? '0 4px 16px rgba(255, 140, 0, 0.28)' : '0 2px 8px rgba(0,0,0,0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                          padding: tab.isAll ? '12px' : '6px',
                          marginBottom: '8px'
                        }}
                      >
                        <img 
                          src={tab.image} 
                          alt={tab.label}
                          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      </div>

                      {/* Category Label */}
                      <span 
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '0.88rem',
                          fontWeight: isActive ? 800 : 600,
                          color: isActive ? 'var(--earthy-brown)' : 'var(--earthy-light)',
                          lineHeight: '1.2',
                          transition: 'color 0.2s ease'
                        }}
                        className="group-hover:text-hibiscus-red"
                      >
                        {tab.label}
                      </span>

                      {/* Bold Orange Active Underline Indicator */}
                      <div 
                        style={{
                          width: '32px',
                          height: '3.5px',
                          backgroundColor: isActive ? '#FF8C00' : 'transparent',
                          borderRadius: '2px',
                          marginTop: '6px',
                          transition: 'all 0.25s ease'
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={scrollRight}
                aria-label="Scroll categories right"
                className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-cream-dark/60 text-earthy-brown hover:bg-white hover:shadow-md transition-all ml-3 flex-shrink-0"
                style={{ backgroundColor: 'rgba(62, 39, 35, 0.05)' }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
            
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
                  {sortedProducts.map((product) => {
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
                          {/* Floating Real Product Image */}
                          <div className="w-full relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2" style={{ height: '240px', borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fff' }}>
                            <img 
                              src={getImageUrl(product.image, product.id)} 
                              alt={product.name} 
                              onError={(e) => {
                                if (REAL_PRODUCT_IMAGES[product.id]) {
                                  (e.target as HTMLImageElement).src = REAL_PRODUCT_IMAGES[product.id];
                                }
                              }}
                              style={{ width: '85%', height: '85%', objectFit: 'contain' }}
                            />
                          </div>
                          
                          {/* Product Title */}
                          <h3 className="font-heading font-bold text-center w-full text-earthy-brown mt-6 mb-1 text-lg group-hover:text-hibiscus-red transition-colors">
                            {product.name.replace(/thokku/gi, 'Chutney')}
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
                        
                        {/* View Details Button */}
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
