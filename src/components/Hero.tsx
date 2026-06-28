import { motion } from 'framer-motion';
import heroBanner from '../assets/new_banner_latest.jpeg';

export default function Hero({ onNavigate }: { onNavigate: (page: 'home' | 'story' | 'products') => void }) {
  return (
    <section id="home" className="hero-section w-full bg-cream-light">
      <div 
        className="w-full relative cursor-pointer overflow-hidden flex items-center justify-center"
        onClick={() => onNavigate('products')}
      >
        <img
          src={heroBanner}
          className="w-full block"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          alt="Floffi Banner"
        />
      </div>
    </section>
  );
}
