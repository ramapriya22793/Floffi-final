import { motion } from 'framer-motion';
import { Droplet, ShieldAlert, Sparkles, HeartPulse, ShieldCheck, Users } from 'lucide-react';

export default function WhyChooseUs() {
  const points = [
    {
      icon: <Droplet size={24} />,
      title: 'No Artificial Colors',
      description: 'The beautiful reds and yellows in our jars come entirely from raw floral extracts and fruits, never from synthetic food dyes.',
      bgColor: 'var(--floral-pink-light)',
      iconColor: 'var(--hibiscus-red)'
    },
    {
      icon: <ShieldAlert size={24} />,
      title: 'No Artificial Preservatives',
      description: 'We prioritize natural food preservation techniques so every spoonful delivers an authentic, wholesome, chemical-free experience.',
      bgColor: 'rgba(90, 143, 67, 0.08)',
      iconColor: 'var(--leaf-green)'
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Floral-Based Ingredients',
      description: 'Using unique flowers like Gulkhand rose petals and yellow Aavaram blossoms, we bring a fresh signature floral note to your household meals.',
      bgColor: 'rgba(244, 196, 48, 0.12)',
      iconColor: 'var(--aavaram-yellow)'
    },
    {
      icon: <HeartPulse size={24} />,
      title: 'Healthy Everyday Choice',
      description: 'Naturally sweetened and filled with flower properties, our products are built to be a guilt-free breakfast addition for healthy lifestyles.',
      bgColor: 'var(--floral-pink-light)',
      iconColor: 'var(--rose-pink)'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Affordable Premium Taste',
      description: 'Premium recipes do not have to come with inflated price tags. Floffi provides five-star gourmet taste at everyday pocket-friendly supermarket prices.',
      bgColor: 'rgba(62, 39, 35, 0.05)',
      iconColor: 'var(--earthy-brown)'
    },
    {
      icon: <Users size={24} />,
      title: 'Made for Modern Families',
      description: 'From quick breakfast jams on school mornings to savory thokkus for family dinners, our products are engineered to slot right into modern kitchens.',
      bgColor: 'rgba(90, 143, 67, 0.08)',
      iconColor: 'var(--leaf-green)'
    }
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="why-us" className="section" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: 'var(--hibiscus-red)', backgroundColor: 'var(--floral-pink-light)', borderColor: 'rgba(200,42,73,0.1)' }}>Why FLOFFI</div>
          <h2 className="section-title font-heading font-extrabold text-earthy-brown">
            Naturally Better in Every Way
          </h2>
          <p className="mt-4" style={{ color: 'var(--earthy-light)' }}>
            We bridge the gap between premium floral innovation and everyday household accessibility.
          </p>
        </div>

        {/* Points Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {points.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="p-8 rounded-3xl bg-white shadow-sm border border-pink-100/10 flex flex-col items-start text-left transition-all duration-300 hover:shadow-md"
            >
              {/* Icon Bubble */}
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-inner"
                style={{ backgroundColor: point.bgColor, color: point.iconColor }}
              >
                {point.icon}
              </div>

              <h3 className="font-heading font-bold text-lg mb-3 text-earthy-brown">
                {point.title}
              </h3>
              
              <p className="text-sm text-earthy-light leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
