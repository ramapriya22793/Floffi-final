import { motion } from 'framer-motion';
import aboutBreakfast from '../assets/about_breakfast.png';

interface OurStorySectionProps {
  onNavigate: (page: 'home' | 'story' | 'products') => void;
}

export default function OurStorySection({ onNavigate }: OurStorySectionProps) {
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
        
        {/* Content Overlay */}
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
              padding: '60px 48px', 
              maxWidth: '1000px', 
              width: '100%',
              margin: '0 auto', 
              textAlign: 'center',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.8)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.12)'
            }}
          >
            {/* About Us */}
            <h3 className="font-heading font-extrabold text-earthy-brown" style={{ fontSize: '1.75rem', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--earthy-brown)' }}>
              About Us
            </h3>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8', marginBottom: '20px', textAlign: 'left' }}>
              Floffi is a modern food brand creating naturally crafted floral-based jams, spreads, sauces, and chutneys for everyday households. Built with the belief that healthy and flavorful food should be accessible to everyone, Floffi focuses on bringing unique flower-inspired ingredients into daily meals in a simple and affordable way.
            </p>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8', marginBottom: '20px', textAlign: 'left' }}>
              Our products are made using natural ingredients without artificial colors or artificial preservatives, delivering authentic taste with a fresh and wholesome experience. From breakfast spreads to snack pairings and everyday cooking, Flowfi products are designed to fit naturally into modern lifestyles.
            </p>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8', marginBottom: '32px', textAlign: 'left' }}>
              With a focus economical consumers, floral-based foods a regular part of every kitchen through supermarkets, hypermarkets, and local stores.
            </p>

            {/* Divider */}
            <hr style={{ border: 'none', borderTop: '1px solid rgba(62,39,35,0.12)', margin: '36px 0' }} />

            {/* Mission & Vision Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '36px', textAlign: 'left' }}>
              <div>
                <h4 className="font-heading font-extrabold text-earthy-brown" style={{ fontSize: '1.35rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--hibiscus-red)' }}>
                  Mission Statement
                </h4>
                <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.75' }}>
                  To make natural floral-based foods a part of everyday life by creating healthy, flavorful, and affordable jams, spreads, sauces, and chutneys without artificial colors or preservatives for the next generation of consumers.
                </p>
              </div>

              <div>
                <h4 className="font-heading font-extrabold text-earthy-brown" style={{ fontSize: '1.35rem', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--hibiscus-red)' }}>
                  Vision Statement
                </h4>
                <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.75' }}>
                  To become a trusted household food brand by making floral-based products available across supermarkets, hypermarkets, and local stores, bringing natural and innovative flavors to every home.
                </p>
              </div>
            </div>

            {/* Read Full Story Button */}
            <div style={{ textAlign: 'center', marginTop: '48px' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate('story')}
                style={{ 
                  backgroundColor: 'var(--hibiscus-red)', 
                  color: '#fff', 
                  fontFamily: 'var(--font-heading)', 
                  fontWeight: 'bold', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  padding: '16px 48px', 
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(200, 42, 73, 0.3)',
                  transition: 'all 0.2s'
                }}
              >
                Learn More About Floffi
              </motion.button>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
