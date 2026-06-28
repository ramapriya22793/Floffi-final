import { motion } from 'framer-motion';
import { Store, ShieldCheck, MapPin } from 'lucide-react';

export default function SupermarketAvailability() {
  const storeTypes = [
    {
      icon: <Store size={20} />,
      title: 'Hypermarkets'
    },
    {
      icon: <ShieldCheck size={20} />,
      title: 'Supermarkets'
    },
    {
      icon: <MapPin size={20} />,
      title: 'Local Stores'
    }
  ];

  return (
    <section id="availability" className="py-12 bg-bg-cream border-t border-earthy-light/10">
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full text-[10px] font-bold uppercase tracking-wider border" style={{ color: 'var(--leaf-green)', backgroundColor: 'var(--leaf-green-light)', borderColor: 'rgba(90,143,67,0.2)' }}>
            Retail Availability
          </div>
          
          <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-earthy-brown mb-3">
            Coming Soon to Stores Near You
          </h2>
          
          <p className="max-w-2xl mx-auto text-earthy-light mb-8 text-sm leading-relaxed">
            We are working hard to bring FLOFFI's floral spreads to standard affordable rates at grocery stores, hypermarkets, and your local neighborhood provision shops.
          </p>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {storeTypes.map((store, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white px-5 py-2 rounded-full shadow-sm">
                <div className="text-hibiscus-red">
                  {store.icon}
                </div>
                <span className="font-heading font-bold text-sm text-earthy-brown">{store.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
