import { motion } from 'framer-motion';
import instaFamily from '../assets/insta_family.png';
import { CATEGORY_REAL_IMAGES } from '../data/productImages';

interface CategoryItem {
  id: string; // Used to filter products on ProductsPage ('jam' | 'nectar-spread' | 'thokku')
  name: string;
  image: string;
  tagline: string;
  subtitle: string;
}

interface RecipesSectionProps {
  onNavigate: (page: any, productId?: string) => void;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'jam',
    name: 'Floral Jam',
    image: CATEGORY_REAL_IMAGES.jam,
    tagline: 'Pure Handcrafted Petal Jams',
    subtitle: 'Explore Products →',
  },
  {
    id: 'nectar-spread',
    name: 'Nectar Spread',
    image: CATEGORY_REAL_IMAGES.nectarSpread,
    tagline: 'Natural Floral Drizzles',
    subtitle: 'Explore Products →',
  },
  {
    id: 'thokku',
    name: 'Floral Chutney',
    image: CATEGORY_REAL_IMAGES.floralChutney,
    tagline: 'Authentic Savory Chutneys',
    subtitle: 'Explore Products →',
  },
];

export default function RecipesSection({ onNavigate }: RecipesSectionProps) {
  return (
    <section id="our-products" className="bg-white" style={{ backgroundColor: '#fff', paddingTop: '40px', paddingBottom: '64px' }}>
      {/* Title */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '36px' }}>
        <h2 className="font-heading font-extrabold" style={{ fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--earthy-brown)' }}>
          Our Category
        </h2>
        <p style={{ color: 'var(--earthy-light, #666)', fontSize: '1rem', marginTop: '8px' }}>
          Pure, naturally crafted floral spreads & traditional condiments
        </p>
      </div>

      {/* Image Banner with Category Cards */}
      <div style={{ position: 'relative', width: '100%', minHeight: '520px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 16px' }}>
        {/* Background Image */}
        <img 
          src={instaFamily} 
          alt="Floffi Family Breakfast" 
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.8 }}
        />
        
        {/* Content Overlay */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '8px', backgroundColor: '#fff', padding: '6px', borderRadius: '16px', boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}>
            {CATEGORIES.map((category, idx) => (
              <motion.div 
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                onClick={() => onNavigate('products', category.id)}
                style={{ backgroundColor: '#fff', overflow: 'hidden', cursor: 'pointer', borderRadius: '12px', transition: 'all 0.3s ease' }}
                className="group shadow-sm hover:shadow-xl"
              >
                {/* Gingham Background & Circle Image */}
                <div style={{ 
                  height: '270px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  /* Orange gingham pattern */
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(255, 140, 0, 0.15) 10px, rgba(255, 140, 0, 0.15) 20px), repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255, 140, 0, 0.15) 10px, rgba(255, 140, 0, 0.15) 20px)'
                }}>
                  <div style={{ width: '190px', height: '190px', borderRadius: '50%', border: '8px solid #fff', overflow: 'hidden', boxShadow: '0 6px 16px rgba(0,0,0,0.12)', transition: 'transform 0.3s ease', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      style={{ width: '90%', height: '90%', objectFit: 'contain' }} 
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                
                {/* Orange Title Bar */}
                <div style={{ backgroundColor: '#FF8C00', color: '#fff', textAlign: 'center', padding: '18px 16px', minHeight: '90px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderTop: '2px solid rgba(255,255,255,0.2)' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.35rem', margin: 0, letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                    {category.name}
                  </h3>
                  <span style={{ fontSize: '0.85rem', opacity: 0.95, marginTop: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {category.tagline} &bull; <span style={{ textDecoration: 'underline' }}>Explore &rarr;</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Products Button */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('products', 'all')}
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
                boxShadow: '0 6px 20px rgba(255, 140, 0, 0.4)'
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
