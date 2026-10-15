import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import instaFamily from '../assets/insta_family.png';
import aavaramJam from '../assets/aavaram_jam.png';
import roseNectar from '../assets/rose_nectar.png';
import hibiscusNectar from '../assets/hibiscus_nectar.png';
import aavaramThokku from '../assets/aavaram_thokku.png';
import gulkhandJam from '../assets/gulkhand_jam.png';
import bananaThokku from '../assets/banana_thokku.png';
import cauliflowerThokku from '../assets/cauliflower_thokku.png';

interface ProductItem {
  id: string;
  name: string;
  image: string;
  category?: string;
}

interface RecipesSectionProps {
  onNavigate: (page: any, productId?: string) => void;
}

const LOCAL_FALLBACKS: Record<string, string> = {
  'aavaram-jam': aavaramJam,
  'rose-nectar': roseNectar,
  'hibiscus-nectar': hibiscusNectar,
  'aavaram-thokku': aavaramThokku,
  'gulkhand-jam': gulkhandJam,
  'banana-thokku': bananaThokku,
  'cauliflower-thokku': cauliflowerThokku,
};

const DEFAULT_PRODUCTS: ProductItem[] = [
  { id: 'gulkhand-jam', name: 'Gulkhand Jam', image: gulkhandJam, category: 'Floral Jam' },
  { id: 'aavaram-jam', name: 'Aavaram Jam', image: aavaramJam, category: 'Floral Jam' },
  { id: 'hibiscus-nectar', name: 'Hibiscus Nectar Spread', image: hibiscusNectar, category: 'Nectar Spread' },
  { id: 'rose-nectar', name: 'Rose Nectar Spread', image: roseNectar, category: 'Nectar Spread' },
  { id: 'aavaram-thokku', name: 'Aavaram Chutney', image: aavaramThokku, category: 'Floral Chutney' },
  { id: 'banana-thokku', name: 'Banana Chutney', image: bananaThokku, category: 'Floral Chutney' },
  { id: 'cauliflower-thokku', name: 'Cauliflower Chutney', image: cauliflowerThokku, category: 'Floral Chutney' },
];

const formatProductName = (name: string): string => {
  return name.replace(/thokku/gi, 'Chutney');
};

const getProductCategory = (product: ProductItem): string => {
  const name = (product.name || '').toLowerCase();
  const cat = (product.category || '').toLowerCase();
  if (cat.includes('nectar') || name.includes('nectar')) return 'Nectar Spread';
  if (cat.includes('chutney') || cat.includes('thokku') || name.includes('chutney') || name.includes('thokku')) return 'Floral Chutney';
  return 'Floral Jam';
};

export default function RecipesSection({ onNavigate }: RecipesSectionProps) {
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    { id: 'All', label: 'All Products' },
    { id: 'Floral Jam', label: 'Floral Jam' },
    { id: 'Nectar Spread', label: 'Nectar Spread' },
    { id: 'Floral Chutney', label: 'Floral Chutney' },
  ];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase.from('products').select('*');
        if (error) {
          console.warn('Error fetching products from Supabase DB:', error.message);
        } else if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.warn('Using default products fallback:', err);
      }
    }
    fetchProducts();
  }, []);

  const getProductImageUrl = (product: ProductItem) => {
    if (!product.image) return LOCAL_FALLBACKS[product.id] || '';
    if (product.image.startsWith('http') || product.image.startsWith('/') || product.image.startsWith('data:')) {
      return product.image;
    }
    try {
      const { data } = supabase.storage.from('Productimage').getPublicUrl(product.image);
      return data?.publicUrl || LOCAL_FALLBACKS[product.id] || product.image;
    } catch {
      return LOCAL_FALLBACKS[product.id] || product.image;
    }
  };

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => getProductCategory(p) === selectedCategory);

  return (
    <section id="our-products" className="bg-white" style={{ backgroundColor: '#fff', paddingTop: '40px', paddingBottom: '64px' }}>
      {/* Title */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 className="font-heading font-extrabold" style={{ fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--earthy-brown)' }}>
          Our Products
        </h2>
        <p style={{ color: 'var(--earthy-light, #666)', fontSize: '1rem', marginTop: '8px' }}>
          Pure, naturally crafted floral spreads & traditional condiments
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '36px', padding: '0 16px' }}>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '10px 24px',
                borderRadius: '30px',
                fontSize: '0.95rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.03em',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                backgroundColor: isActive ? '#FF8C00' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : 'var(--earthy-brown)',
                border: isActive ? '2px solid #FF8C00' : '2px solid rgba(62, 39, 35, 0.15)',
                boxShadow: isActive ? '0 4px 14px rgba(255, 140, 0, 0.35)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = '#FF8C00';
                  e.currentTarget.style.color = '#FF8C00';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'rgba(62, 39, 35, 0.15)';
                  e.currentTarget.style.color = 'var(--earthy-brown)';
                }
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Image Banner with Overlay Cards */}
      <div style={{ position: 'relative', width: '100%', minHeight: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 16px' }}>
        {/* Background Image */}
        <img 
          src={instaFamily} 
          alt="Floffi Family Breakfast" 
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.8 }}
        />
        
        {/* Content Overlay */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2px', backgroundColor: '#fff', padding: '2px' }}>
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => onNavigate('product-details', product.id)}
                style={{ backgroundColor: '#fff', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.3s ease' }}
                className="group hover:shadow-2xl"
              >
                {/* Gingham Background & Circle Image */}
                <div style={{ 
                  height: '250px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  /* Orange gingham pattern */
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255, 140, 0, 0.15) 10px, rgba(255, 140, 0, 0.15) 20px), repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255, 140, 0, 0.15) 10px, rgba(255, 140, 0, 0.15) 20px)'
                }}>
                  <div style={{ width: '180px', height: '180px', borderRadius: '50%', border: '8px solid #fff', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease' }}>
                    <img 
                      src={getProductImageUrl(product)} 
                      alt={formatProductName(product.name)} 
                      onError={(e) => {
                        const fallback = LOCAL_FALLBACKS[product.id];
                        if (fallback) {
                          (e.target as HTMLImageElement).src = fallback;
                        }
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                {/* Orange Title Bar */}
                <div style={{ backgroundColor: '#FF8C00', color: '#fff', textAlign: 'center', padding: '16px 12px', minHeight: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderTop: '2px solid rgba(255,255,255,0.2)' }}>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.05rem', margin: 0 }}>
                    {formatProductName(product.name)}
                  </h4>
                  <span style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '4px', textDecoration: 'underline' }}>
                    View Details &rarr;
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Button */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => onNavigate('products')}
              style={{ 
                backgroundColor: '#FF8C00', 
                color: '#fff', 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                padding: '16px 40px', 
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 140, 0, 0.3)'
              }}
            >
              View All Products
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
