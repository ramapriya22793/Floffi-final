import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  name: string;
  image: string;
  category?: string;
  price?: number;
  original_price?: number;
}

interface ProductCarouselProps {
  onNavigate?: (page: any, productId?: string) => void;
}

export default function ProductCarousel({ onNavigate }: ProductCarouselProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getProductPrice = (product: Product) => {
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
    
    if (product.category === 'thokku' || productName.includes('thokku')) {
      return { price: 230, original: 270 };
    }
    
    return { price: 299, original: 349 };
  };

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*');
      if (data && data.length > 0) {
        // Duplicate products to create a nice scrolling effect if there are too few
        let displayProducts = [...data];
        while (displayProducts.length < 10) {
          displayProducts = [...displayProducts, ...data];
        }
        setProducts(displayProducts);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    // Auto-scroll logic
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        
        if (scrollLeft >= maxScroll - 10) {
          // Reset to start smoothly
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="product-carousel-section" style={{ backgroundColor: 'var(--bg-cream, #F9F7F4)', padding: '60px 20px 20px 20px', position: 'relative', overflow: 'hidden' }}>
      <style>
        {`
          .product-carousel-section {
            font-family: inherit;
          }
          .pc-header {
            max-width: 1200px;
            margin: 0 auto 40px auto;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
          }
          .pc-title {
            font-family: var(--font-heading, serif);
            font-size: 2.5rem;
            font-weight: 800;
            color: var(--earthy-brown, #3E2723);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 12px;
          }
          .pc-subtitle {
            color: rgba(62, 39, 35, 0.7);
            font-size: 1.1rem;
            max-width: 600px;
          }
          .pc-controls {
            display: none;
            gap: 12px;
          }
          @media (min-width: 768px) {
            .pc-controls { display: flex; }
          }
          .pc-btn {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            border: 1px solid rgba(62, 39, 35, 0.3);
            background: transparent;
            color: var(--earthy-brown, #3E2723);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .pc-btn:hover {
            background: var(--earthy-brown, #3E2723);
            color: white;
          }
          .pc-track {
            display: flex;
            overflow-x: auto;
            gap: 24px;
            padding: 20px 20px 40px 20px;
            scroll-snap-type: x mandatory;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .pc-track::-webkit-scrollbar {
            display: none;
          }
          .pc-card {
            min-width: 280px;
            max-width: 280px;
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0,0,0,0.06);
            transition: all 0.3s ease;
            scroll-snap-align: center;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(62, 39, 35, 0.05);
          }
          @media (min-width: 768px) {
            .pc-card {
              min-width: 320px;
              max-width: 320px;
            }
          }
          .pc-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          }
          .pc-img-box {
            height: 350px;
            width: 100%;
            background: #F9F7F4;
            padding: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
          }
          .pc-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            filter: drop-shadow(0 20px 20px rgba(0,0,0,0.15));
            transition: transform 0.5s ease;
          }
          .pc-card:hover .pc-img {
            transform: scale(1.05);
          }
          .pc-content {
            padding: 32px;
            text-align: center;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: white;
            position: relative;
          }
          .pc-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 48px;
            height: 4px;
            background: linear-gradient(90deg, transparent, rgba(62,39,35,0.2), transparent);
          }
          .pc-name {
            font-family: var(--font-heading, serif);
            font-weight: 700;
            font-size: 1.25rem;
            color: var(--earthy-brown, #3E2723);
            margin-bottom: 8px;
          }
          .pc-category {
            font-size: 0.85rem;
            font-weight: 600;
            color: rgba(62, 39, 35, 0.5);
            text-transform: uppercase;
            letter-spacing: 0.1em;
          }
          .pc-mobile-controls {
            display: flex;
            justify-content: center;
            gap: 16px;
            margin-top: 16px;
          }
          @media (min-width: 768px) {
            .pc-mobile-controls { display: none; }
          }
        `}
      </style>

      <div className="pc-header">
        <div>
          <h2 className="pc-title">Our Products</h2>
          <p className="pc-subtitle">
            Discover our naturally crafted floral goods, made with pure ingredients and timeless recipes.
          </p>
        </div>
        <div className="pc-controls">
          <button onClick={() => scroll('left')} className="pc-btn">
            <ChevronLeft size={24} />
          </button>
          <button onClick={() => scroll('right')} className="pc-btn">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="pc-track">
        {products.map((product, idx) => {
          const imageUrl = supabase.storage.from('Productimage').getPublicUrl(product.image).data.publicUrl;

          return (
            <div 
              key={`${product.id}-${idx}`} 
              className="pc-card cursor-pointer"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('product-details', product.id);
                }
              }}
            >
              <div className="pc-img-box">
                <img 
                  src={imageUrl} 
                  alt={product.name}
                  className="pc-img"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Product';
                  }}
                />
              </div>
              <div className="pc-content w-full flex flex-col items-center justify-center">
                <h3 className="pc-name text-center w-full">{product.name}</h3>
                
                {/* Price Display */}
                <div className="flex items-center justify-center gap-2 mb-4" style={{ marginTop: '8px' }}>
                  {(() => {
                    const { price, original } = getProductPrice(product);
                    return (
                      <>
                        {original && (
                          <span className="text-sm opacity-60" style={{ color: 'var(--earthy-brown)', textDecoration: 'line-through' }}>
                            ₹{original}
                          </span>
                        )}
                        <span className="font-bold text-lg" style={{ color: 'var(--hibiscus-red)' }}>
                          ₹{price}
                        </span>
                      </>
                    );
                  })()}
                </div>
                
                {/* Pre-order Button */}
                <button 
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
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="pc-mobile-controls">
        <button onClick={() => scroll('left')} className="pc-btn">
          <ChevronLeft size={28} />
        </button>
        <button onClick={() => scroll('right')} className="pc-btn">
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  );
}
