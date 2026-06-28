import { motion } from 'framer-motion';
import { Target, Compass } from 'lucide-react';

export default function MissionVision() {
  return (
    <section
      id="mission"
      className="section"
      style={{
        background: 'radial-gradient(circle at 10% 80%, var(--floral-pink-light) 0%, var(--bg-cream) 60%)',
        borderTop: '1px solid rgba(232, 160, 181, 0.15)',
        borderBottom: '1px solid rgba(232, 160, 181, 0.15)',
      }}
    >
      {/* Background floral patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="absolute top-10 left-[15%] w-48 h-48 text-floral-pink" fill="currentColor" viewBox="0 0 100 100">
          <path d="M50 0C55 25 75 45 100 50C75 55 55 75 50 100C45 75 25 55 0 50C25 45 45 25 50 0Z" />
        </svg>
        <svg className="absolute bottom-10 right-[15%] w-36 h-36 text-aavaram-yellow" fill="currentColor" viewBox="0 0 100 100">
          <path d="M50 0C55 25 75 45 100 50C75 55 55 75 50 100C45 75 25 55 0 50C25 45 45 25 50 0Z" />
        </svg>
      </div>

      <div className="container relative z-10">
        <div className="section-header">
          <div className="section-tag" style={{ color: 'var(--leaf-green)', backgroundColor: 'var(--leaf-green-light)', borderColor: 'rgba(90,143,67,0.1)' }}>Purpose & Future</div>
          <h2 className="section-title font-heading font-extrabold text-earthy-brown">
            What Drives FLOFFI
          </h2>
          <p className="mt-4" style={{ color: 'var(--earthy-light)' }}>
            We're reshaping how families think about breakfast spreads, by designing affordable, organic floral preserves that put natural ingredients first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md" style={{ backgroundColor: 'var(--floral-pink-light)' }}>
                <Target size={28} className="text-hibiscus-red" style={{ color: 'var(--hibiscus-red)' }} />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4 text-earthy-brown">Our Mission</h3>
              <p className="text-base text-earthy-light leading-relaxed">
                To make natural floral-based foods a part of everyday life by creating healthy, flavorful, and affordable jams, spreads, sauces, and chutneys without artificial colors or preservatives for the next generation of consumers.
              </p>
            </div>
            <div className="mt-8 flex justify-start items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--hibiscus-red)' }}>
              <span>Crafted with love</span>
              <span className="text-base">🌸</span>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-md" style={{ backgroundColor: 'var(--leaf-green-light)' }}>
                <Compass size={28} className="text-leaf-green" style={{ color: 'var(--leaf-green)' }} />
              </div>
              <h3 className="font-heading font-bold text-xl mb-4 text-earthy-brown">Our Vision</h3>
              <p className="text-base text-earthy-light leading-relaxed">
                To become a trusted household food brand by making floral-based products available across supermarkets, hypermarkets, and local stores, bringing natural and innovative flavors to every home.
              </p>
            </div>
            <div className="mt-8 flex justify-start items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--leaf-green)' }}>
              <span>Supermarket ready</span>
              <span className="text-base">🌿</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
