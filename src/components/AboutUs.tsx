import { motion } from 'framer-motion';
import { Leaf, Award, Heart } from 'lucide-react';

export default function AboutUs() {
  const features = [
    {
      icon: <Leaf className="text-leaf-green" style={{ color: 'var(--leaf-green)' }} />,
      title: '100% Preservative-Free',
      description: 'Zero artificial colors, chemicals, or synthetic preservatives.',
    },
    {
      icon: <Award className="text-hibiscus-red" style={{ color: 'var(--hibiscus-red)' }} />,
      title: 'Supermarket-Ready',
      description: 'Top-tier packaging and consistent safety controls for families.',
    },
    {
      icon: <Heart className="text-rose-pink" style={{ color: 'var(--rose-pink)' }} />,
      title: 'Floral Delicacies',
      description: 'Capturing flower nectar to add pure joy to daily meals.',
    },
  ];

  return (
    <section id="about" className="section bg-white relative overflow-hidden" style={{ borderTop: '1px solid rgba(255,111,0,0.06)' }}>
      {/* Background scent blurs */}
      <div className="ambient-glow-blob" style={{ backgroundColor: 'var(--floral-pink-light)', width: '250px', height: '250px', top: '10%', left: '-5%' }} />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Custom SVG Flower Jar Illustration (No family photo) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex justify-center items-center relative"
          >
            {/* Soft backdrop accents */}
            <div className="absolute w-64 h-64 rounded-full blur-2xl opacity-20 -z-10" style={{ backgroundColor: 'var(--floral-pink)' }} />
            
            {/* Premium Floral Jam Jar Vector SVG */}
            <svg viewBox="0 0 200 200" width="100%" className="max-w-[280px] h-auto drop-shadow-xl">
              {/* Green stems in background */}
              <path d="M60 140 C50 100 80 80 100 60" stroke="var(--leaf-green)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
              <path d="M140 140 C150 100 120 80 100 60" stroke="var(--leaf-green)" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
              
              {/* Back Petals */}
              <circle cx="70" cy="80" r="15" fill="var(--floral-pink)" opacity="0.8" />
              <circle cx="130" cy="80" r="15" fill="var(--rose-pink)" opacity="0.8" />
              
              {/* Glass Jar Body */}
              <rect x="65" y="80" width="70" height="80" rx="16" fill="rgba(255,255,255,0.85)" stroke="rgba(62,39,35,0.12)" strokeWidth="2.5" />
              {/* Glass reflections */}
              <path d="M73 90 C73 140 76 150 78 150" stroke="rgba(255,255,255,0.95)" strokeWidth="4" strokeLinecap="round" fill="none" />
              <path d="M127 90 C127 140 124 150 122 150" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              
              {/* Jar Neck and Rim */}
              <rect x="73" y="70" width="54" height="10" rx="3" fill="rgba(255,255,255,0.9)" stroke="rgba(62,39,35,0.12)" strokeWidth="2" />
              
              {/* Gold Lid */}
              <rect x="70" y="60" width="60" height="12" rx="4" fill="var(--aavaram-yellow)" stroke="var(--aavaram-yellow-hover)" strokeWidth="1" />
              <line x1="75" y1="66" x2="125" y2="66" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
              
              {/* Floffi Content Fill (Orange Jam inside) */}
              <rect x="69" y="90" width="62" height="66" rx="8" fill="var(--hibiscus-red)" opacity="0.9" />
              
              {/* Brand Label on Jar */}
              <rect x="75" y="98" width="50" height="32" rx="4" fill="var(--bg-cream)" stroke="rgba(62,39,35,0.08)" strokeWidth="1" />
              
              {/* Small Label Text "Floffi" */}
              <text x="100" y="114" fill="var(--earthy-brown)" fontFamily="var(--font-heading)" fontWeight="900" fontSize="10" textAnchor="middle" letterSpacing="0.5">FLOFFI</text>
              <text x="100" y="123" fill="var(--earthy-light)" fontFamily="var(--font-body)" fontWeight="700" fontSize="4.5" textAnchor="middle">100% NATURAL</text>
              
              {/* Front Flower Blossoms */}
              <g transform="translate(130, 140)">
                {/* Yellow blossom */}
                <circle cx="0" cy="0" r="10" fill="var(--aavaram-yellow)" />
                <circle cx="-6" cy="-6" r="8" fill="var(--aavaram-yellow)" opacity="0.9" />
                <circle cx="6" cy="-6" r="8" fill="var(--aavaram-yellow)" opacity="0.9" />
                <circle cx="-8" cy="4" r="8" fill="var(--aavaram-yellow)" opacity="0.8" />
                <circle cx="8" cy="4" r="8" fill="var(--aavaram-yellow)" opacity="0.8" />
                <circle cx="0" cy="0" r="3" fill="var(--earthy-brown)" />
              </g>

              <g transform="translate(64, 130) scale(0.8)">
                {/* Rose/Hibiscus Blossom */}
                <circle cx="0" cy="0" r="12" fill="var(--rose-pink)" />
                <path d="M0 -15 C-6 -8 6 -8 0 0" stroke="var(--hibiscus-red)" strokeWidth="2" fill="none" />
                <circle cx="0" cy="0" r="4" fill="var(--bg-cream)" />
              </g>
            </svg>
          </motion.div>

          {/* Right Column: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 text-left"
          >
            <div className="section-tag" style={{ color: 'var(--hibiscus-red)', backgroundColor: 'var(--floral-pink-light)', borderColor: 'rgba(255,111,0,0.1)' }}>Our Brand</div>
            <h2 className="section-title font-heading font-extrabold text-earthy-brown mb-6">
              About FLOFFI
            </h2>

            <div className="space-y-6 text-earthy-light text-sm md:text-base leading-relaxed">
              <p>
                Floffi is a modern food brand creating naturally crafted floral-based jams, spreads, sauces, and chutneys for everyday households. Built with the belief that healthy and flavorful food should be accessible to everyone, Floffi focuses on bringing unique flower-inspired ingredients into daily meals in a simple and affordable way.
              </p>
              <p>
                Our products are made using natural ingredients without artificial colors or artificial preservatives, delivering authentic taste with a fresh and wholesome experience. From breakfast spreads to snack pairings and everyday cooking, Floffi products are designed to fit naturally into modern lifestyles.
              </p>
              <p>
                With a focus on economical consumers, Floffi aims to make floral-based foods a regular part of every kitchen through supermarkets, hypermarkets, and local stores.
              </p>
            </div>

            {/* Bullet features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl transition-colors duration-300"
                  style={{ backgroundColor: 'var(--bg-cream-dark)' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm mb-3">
                    {feat.icon}
                  </div>
                  <h4 className="font-heading font-bold text-xs mb-1 text-earthy-brown">{feat.title}</h4>
                  <p className="text-[11px] text-earthy-light leading-normal">{feat.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
