import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart, ShoppingBag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  color: string;
  accentColor: string;
  badge: string;
  size: string;
}

interface ProductCategoriesProps {
  onNavigate?: (page: 'home' | 'story' | 'products') => void;
}

export default function ProductCategories({ onNavigate }: ProductCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<'jams' | 'nectars' | 'thokkus'>('jams');

  const categories = [
    { id: 'jams', name: 'Premium Jams' },
    { id: 'nectars', name: 'Nectar Spreads' },
    { id: 'thokkus', name: 'Chutneys & Thokkus' },
  ];

  const products: Product[] = [
    {
      id: 'gulkhand-jam',
      name: 'Gulkhand Jam',
      category: 'jams',
      description: 'A rich and naturally sweet floral jam made from carefully selected rose petals. FLOFFI Gulkhand Jam offers a smooth texture and refreshing taste that pairs perfectly with bread, desserts, rotis, pancakes, and snacks. Crafted without artificial colors or preservatives for a naturally delightful everyday spread.',
      color: 'var(--floral-pink-light)',
      accentColor: 'var(--hibiscus-red)',
      badge: 'Classic Sweet',
      size: '250g'
    },
    {
      id: 'aavaram-jam',
      name: 'Aavaram Jam',
      category: 'jams',
      description: 'A naturally crafted floral jam made from carefully selected Aavaram flowers, offering a unique blend of mild bitterness and natural sweetness. FLOFFI Aavaram Jam delivers a smooth texture and distinctive flavor that pairs perfectly with bread, toast, desserts, and everyday snacks. Made without artificial colors or preservatives for a wholesome and refreshing experience.',
      color: 'rgba(244, 196, 48, 0.12)',
      accentColor: 'var(--aavaram-yellow)',
      badge: 'Herbal Sweet',
      size: '250g'
    },
    {
      id: 'hibiscus-nectar',
      name: 'Hibiscus Nectar Spread',
      category: 'nectars',
      description: 'A vibrant floral nectar spread made using natural hibiscus extracts with a balanced sweet and tangy taste. Its smooth and rich texture makes it perfect for pancakes, toast, waffles, desserts, milkshakes, and breakfast dishes. FLOFFI Hibiscus Nectar Spread is created for modern households looking for natural and flavorful alternatives.',
      color: 'rgba(200, 42, 73, 0.08)',
      accentColor: 'var(--hibiscus-red)',
      badge: 'Rich & Tangy',
      size: '220g'
    },
    {
      id: 'rose-nectar',
      name: 'Rose Nectar Spread',
      category: 'nectars',
      description: 'A smooth and aromatic floral nectar spread infused with the delicate essence of rose petals. Perfect as a topping, drizzle, or breakfast companion, this naturally inspired spread delivers refreshing floral sweetness with a rich texture and authentic taste without artificial colors or preservatives.',
      color: 'var(--floral-pink-light)',
      accentColor: 'var(--rose-pink)',
      badge: 'Fragrant',
      size: '220g'
    },
    {
      id: 'aavaram-thokku',
      name: 'Aavaram Thokku',
      category: 'thokkus',
      description: 'A traditional-style savory thokku prepared using natural Aavaram flowers blended with authentic spices. With its signature balance of gentle bitterness, spice, and subtle sweetness, FLOFFI Aavaram Thokku brings a bold and unique flavor to rice, dosa, idli, chapati, and daily meals.',
      color: 'rgba(244, 196, 48, 0.12)',
      accentColor: 'var(--aavaram-yellow)',
      badge: 'Spicy Herbal',
      size: '200g'
    },
    {
      id: 'banana-thokku',
      name: 'Banana Thokku',
      category: 'thokkus',
      description: 'A unique savory blend crafted from ripe bananas and traditional spices for a mildly sweet, tangy, and spicy flavor profile. FLOFFI Banana Thokku adds a distinctive twist to everyday meals and works perfectly as a flavorful side dish, spread, or accompaniment.',
      color: 'rgba(90, 143, 67, 0.08)',
      accentColor: 'var(--leaf-green)',
      badge: 'Unique Savior',
      size: '200g'
    },
    {
      id: 'cauliflower-thokku',
      name: 'Cauliflower Thokku',
      category: 'thokkus',
      description: 'A rich and flavorful thokku made from fresh cauliflower blended with aromatic spices and traditional ingredients. FLOFFI Cauliflower Thokku delivers a bold homemade taste that pairs perfectly with rice, dosa, chapati, idli, and snacks for everyday enjoyment.',
      color: 'rgba(62, 39, 35, 0.05)',
      accentColor: 'var(--earthy-brown)',
      badge: 'Savory & Tangy',
      size: '200g'
    },
  ];

  const filteredProducts = products.filter(p => p.category === activeCategory);

  const renderFlowerSVG = (id: string) => {
    switch (id) {
      case 'gulkhand-jam':
      case 'rose-nectar':
        return (
          <svg viewBox="0 0 64 64" width="70" height="70" className="svg-flower-icon">
            <path d="M32 38C32 46 30 52 28 56" stroke="var(--leaf-green)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M29 44C24 44 21 41 19 37C23 37 28 41 29 44Z" fill="var(--leaf-green)" opacity="0.8" />
            <path d="M31 48C35 48 38 45 40 41C37 41 32 45 31 48Z" fill="var(--leaf-green)" opacity="0.8" />
            <circle cx="32" cy="26" r="16" fill="var(--rose-pink)" />
            <path d="M32 10C24 10 21 17 26 23C20 21 15 27 19 34C26 36 29 30 29 25C29 18 35 12 32 10Z" fill="var(--hibiscus-red)" opacity="0.9" />
            <path d="M32 10C40 10 43 17 38 23C44 21 49 27 45 34C38 36 35 30 35 25C35 18 29 12 32 10Z" fill="var(--hibiscus-red)" opacity="0.8" />
            <circle cx="32" cy="24" r="5" fill="#FFF" opacity="0.3" />
          </svg>
        );
      case 'hibiscus-nectar':
        return (
          <svg viewBox="0 0 64 64" width="70" height="70" className="svg-flower-icon">
            <path d="M32 34V56" stroke="var(--leaf-green)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M32 28C28 17 17 20 21 29C25 36 32 33 32 28Z" fill="var(--hibiscus-red)" />
            <path d="M32 28C36 17 47 20 43 29C39 36 32 33 32 28Z" fill="var(--hibiscus-red)" opacity="0.95" />
            <path d="M32 28C23 33 25 44 33 42C40 40 35 33 32 28Z" fill="var(--hibiscus-red)" opacity="0.9" />
            <path d="M32 28C41 33 39 44 31 42C24 40 29 33 32 28Z" fill="var(--hibiscus-red)" opacity="0.85" />
            <path d="M32 28V12" stroke="var(--aavaram-yellow)" strokeWidth="2" strokeLinecap="round" fill="none" />
            <circle cx="32" cy="11" r="2.5" fill="var(--aavaram-yellow)" />
            <circle cx="29" cy="14" r="1.2" fill="var(--aavaram-yellow)" />
            <circle cx="35" cy="14" r="1.2" fill="var(--aavaram-yellow)" />
          </svg>
        );
      case 'aavaram-jam':
      case 'aavaram-thokku':
        return (
          <svg viewBox="0 0 64 64" width="70" height="70" className="svg-flower-icon">
            <path d="M32 40V56" stroke="var(--leaf-green)" strokeWidth="2" fill="none" />
            <g transform="translate(32, 24)">
              <circle cx="0" cy="0" r="9" fill="var(--aavaram-yellow)" />
              <circle cx="-7" cy="-7" r="6" fill="var(--aavaram-yellow)" opacity="0.9" />
              <circle cx="7" cy="-7" r="6" fill="var(--aavaram-yellow)" opacity="0.9" />
              <circle cx="-9" cy="3" r="6" fill="var(--aavaram-yellow)" opacity="0.8" />
              <circle cx="9" cy="3" r="6" fill="var(--aavaram-yellow)" opacity="0.8" />
              <circle cx="0" cy="0" r="2" fill="var(--earthy-brown)" />
              <circle cx="-7" cy="-7" r="1.5" fill="var(--earthy-brown)" />
              <circle cx="7" cy="-7" r="1.5" fill="var(--earthy-brown)" />
              <circle cx="-9" cy="3" r="1.5" fill="var(--earthy-brown)" />
              <circle cx="9" cy="3" r="1.5" fill="var(--earthy-brown)" />
            </g>
          </svg>
        );
      case 'banana-thokku':
        return (
          <svg viewBox="0 0 64 64" width="70" height="70" className="svg-flower-icon">
            <path d="M15 45C22 38 29 17 47 12C41 23 34 43 18 49Z" fill="var(--leaf-green)" />
            <path d="M15 45C26 36 34 25 47 12" stroke="var(--leaf-green-light)" strokeWidth="1.8" fill="none" opacity="0.5" />
            <path d="M26 28L21 30" stroke="var(--leaf-green-light)" strokeWidth="1.2" opacity="0.5" />
            <path d="M31 23L26 25" stroke="var(--leaf-green-light)" strokeWidth="1.2" opacity="0.5" />
            <path d="M36 18L31 20" stroke="var(--leaf-green-light)" strokeWidth="1.2" opacity="0.5" />
          </svg>
        );
      case 'cauliflower-thokku':
        return (
          <svg viewBox="0 0 64 64" width="70" height="70" className="svg-flower-icon">
            <path d="M16 35C14 28 21 19 32 21C43 19 50 28 48 35C43 45 21 45 16 35Z" fill="var(--leaf-green)" opacity="0.85" />
            <circle cx="32" cy="27" r="10" fill="var(--bg-cream-dark)" />
            <circle cx="25" cy="27" r="7" fill="var(--bg-cream-dark)" />
            <circle cx="39" cy="27" r="7" fill="var(--bg-cream-dark)" />
            <circle cx="32" cy="20" r="7" fill="var(--bg-cream-dark)" />
            <circle cx="29" cy="24" r="2.5" fill="#FFF" opacity="0.4" />
            <circle cx="35" cy="24" r="2.5" fill="#FFF" opacity="0.4" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="products" className="section bg-white" style={{ borderTop: '1px solid rgba(232, 160, 181, 0.1)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">Supermarket Ready</div>
          <h2 className="section-title font-heading font-extrabold text-earthy-brown">
            Explore Our Products
          </h2>
          <p className="mt-4" style={{ color: 'var(--earthy-light)' }}>
            Drawn from premium floral ingredients. Perfect spreads, jams, and traditional thokkus without artificial colors or preservatives.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-16">
          <div className="product-categories-tab-box">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`product-categories-tab ${activeCategory === cat.id ? 'active' : ''}`}
                style={{
                  color: 'var(--earthy-light)'
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="product-card"
                  style={{
                    padding: '28px',
                    textAlign: 'left',
                    backgroundColor: 'var(--white)',
                    borderRadius: '24px',
                    boxShadow: 'var(--card-shadow)',
                    border: '1px solid rgba(62,39,35,0.06)'
                  }}
                >
                  {/* Card Header (Badge & Size) */}
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="text-white font-bold"
                      style={{
                        backgroundColor: product.accentColor,
                        fontSize: '0.68rem',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {product.badge}
                    </span>
                    <span className="text-xs font-semibold text-earthy-light">
                      {product.size}
                    </span>
                  </div>

                  {/* Stylized Floral SVG Container */}
                  <div
                    className="flex justify-center items-center py-8 mb-5 rounded-2xl"
                    style={{
                      backgroundColor: product.color,
                      minHeight: '120px'
                    }}
                  >
                    {renderFlowerSVG(product.id)}
                  </div>

                  {/* Card Info */}
                  <div className="mb-6 flex-grow">
                    <h3 className="font-heading font-extrabold text-xl text-earthy-brown mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[10px] text-earthy-light font-bold mb-3.5 uppercase tracking-wider">
                      {activeCategory === 'jams' ? 'Breakfast Preserve' : activeCategory === 'nectars' ? 'Gourmet Spread' : 'Traditional Condiment'}
                    </p>
                    <p className="text-xs text-earthy-light leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-cream-dark" style={{ borderTop: '1px solid var(--bg-cream-dark)' }}>
                    <button
                      onClick={() => onNavigate && onNavigate('products')}
                      className="btn btn-primary"
                      style={{ 
                        backgroundColor: product.accentColor, 
                        borderRadius: '30px',
                        color: 'var(--bg-cream)',
                        padding: '8px 18px',
                        fontSize: '0.75rem',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        boxShadow: `0 4px 12px ${product.accentColor}40`,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <ShoppingBag size={14} />
                      Pre-order
                    </button>
                    <button className="text-pink-300 hover:text-hibiscus-red transition-colors p-1.5 bg-transparent border-none cursor-pointer">
                      <Heart size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
