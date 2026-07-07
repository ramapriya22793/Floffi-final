import { motion } from 'framer-motion';
import instaFamily from '../assets/insta_family.png';
import gulkhandJam from '../assets/gulkhand_jam.png';
import roseNectar from '../assets/rose_nectar.png';
import hibiscusNectar from '../assets/hibiscus_nectar.png';
import aavaramThokku from '../assets/aavaram_thokku.png';

interface RecipesSectionProps {
  onNavigate: (page: any) => void;
}

export default function RecipesSection({ onNavigate }: RecipesSectionProps) {
  const recipes = [
    { name: 'Gulkhand Jam', image: gulkhandJam },
    { name: 'Rose Nectar', image: roseNectar },
    { name: 'Hibiscus Nectar', image: hibiscusNectar },
    { name: 'Aavaram Thokku', image: aavaramThokku },
  ];

  return (
    <section className="bg-white" style={{ backgroundColor: '#fff', paddingTop: '32px', paddingBottom: '64px' }}>
      {/* Title */}
      <div className="container" style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2 className="font-heading font-extrabold" style={{ fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--earthy-brown)' }}>
          Recipes
        </h2>
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
            {recipes.map((recipe, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ backgroundColor: '#fff', overflow: 'hidden' }}
              >
                {/* Product Image Box */}
                <div style={{ 
                  height: '250px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: '#F9F7F4',
                  padding: '24px'
                }}>
                  <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} />
                </div>
                
                {/* Orange Title Bar */}
                <div style={{ backgroundColor: '#FF8C00', color: '#fff', textAlign: 'center', padding: '20px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '2px solid rgba(255,255,255,0.2)' }}>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', margin: 0 }}>
                    {recipe.name}
                  </h4>
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
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 140, 0, 0.3)'
              }}
            >
              View All Recipes
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
