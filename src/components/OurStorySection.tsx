import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import aboutBreakfast from '../assets/about_breakfast.png';

interface OurStorySectionProps {
  onNavigate: (page: 'home' | 'story' | 'products') => void;
}

export default function OurStorySection({ onNavigate }: OurStorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section style={{ position: 'relative', zIndex: 10, paddingBottom: '0px', backgroundColor: 'var(--bg-cream, #F9F7F4)' }}>
      
      {/* Title Area with Cream Background */}
      <div style={{ paddingTop: '32px', paddingBottom: '100px', textAlign: 'center' }}>
        <h2 className="font-heading font-extrabold" style={{ fontSize: '2.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4A2A33' }}>
          Our Story
        </h2>
      </div>

      {/* Background Image block */}
      <div className="relative w-full" style={{ position: 'relative', width: '100%', paddingBottom: '80px' }}>
        
        {/* Background Image */}
        <img 
          src={aboutBreakfast} 
          alt="Floffi Breakfast" 
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 1 }}
        />
        
        {/* Content Overlay (Relatively positioned to give height to parent, pulled UP using negative margin) */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px', marginTop: '-60px' }}>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.98)', 
              backdropFilter: 'blur(4px)', 
              WebkitBackdropFilter: 'blur(4px)',
              padding: '60px', 
              maxWidth: '1000px', 
              width: '100%',
              margin: '0 auto', 
              textAlign: 'center',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.12)'
            }}
          >
            <h3 className="font-heading font-bold text-earthy-brown" style={{ fontSize: '1.5rem', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>About Us</h3>
            <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Floffi is a modern food brand creating naturally crafted floral-based jams, spreads, sauces, and chutneys for everyday households. Built with the belief that healthy and flavorful food should be accessible to everyone, Floffi focuses on bringing unique flower-inspired ingredients into daily meals in a simple and affordable way.
            </p>
            <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7', marginBottom: '20px' }}>
              Our products are made using natural ingredients without artificial colors or artificial preservatives, delivering authentic taste with a fresh and wholesome experience. From breakfast spreads to snack pairings and everyday cooking, Flowfi products are designed to fit naturally into modern lifestyles.
            </p>
            <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.7', marginBottom: '32px' }}>
              With a focus economical consumers, floral-based foods a regular part of every kitchen through supermarkets, hypermarkets, and local stores.
            </p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', textAlign: 'left', borderTop: '1px solid #eee', paddingTop: '32px', marginTop: '16px' }}>
                    <div>
                      <h3 className="font-heading font-bold text-earthy-brown" style={{ fontSize: '1.25rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mission Statement</h3>
                      <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: '1.6' }}>
                        To make natural floral-based foods a part of everyday life by creating healthy, flavorful, and affordable jams, spreads, sauces, and chutneys without artificial colors or preservatives for the next generation of consumers.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-earthy-brown" style={{ fontSize: '1.25rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vision Statement</h3>
                      <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: '1.6' }}>
                        To become a trusted household food brand by making floral-based products available across supermarkets, hypermarkets, and local stores, bringing natural and innovative flavors to every home.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => {
                if (!isExpanded) {
                  setIsExpanded(true);
                } else {
                  onNavigate('story');
                }
              }}
              style={{ 
                marginTop: '48px', 
                backgroundColor: 'var(--hibiscus-red)', 
                color: '#fff', 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 'bold', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em', 
                padding: '16px 48px', 
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(200, 42, 73, 0.3)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {isExpanded ? 'Go to Story Page' : 'Read Full Story'}
            </motion.button>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
