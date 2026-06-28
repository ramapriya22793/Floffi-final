import { motion } from 'framer-motion';
import { Award, Leaf, HeartHandshake, Sparkles } from 'lucide-react';
import instaField from '../assets/insta_field.png';

export default function StoryPage() {
  const highlights = [
    {
      icon: <Leaf className="text-leaf-green" style={{ color: 'var(--leaf-green)' }} />,
      title: '100% Sustainable Sourcing',
      description: 'Edible flowers are sourced directly from sustainable fields across the country, ensuring zero chemical runoff.'
    },
    {
      icon: <HeartHandshake className="text-hibiscus-red" style={{ color: 'var(--hibiscus-red)' }} />,
      title: 'Empowering Women Cooperatives',
      description: 'We partner with rural women cooperatives who specialize in hand-picking and sun-drying delicate petals.'
    },
    {
      icon: <Award className="text-aavaram-yellow" style={{ color: 'var(--aavaram-yellow)' }} />,
      title: 'Traditional Sun-Curing',
      description: 'We preserve our ingredients using time-tested sun-cooking methods, locking in natural nutrients and aromas.'
    }
  ];

  return (
    <div className="pt-20 bg-white relative">
      {/* Background scent blurs */}
      <div className="ambient-glow-blob" style={{ backgroundColor: 'var(--floral-pink)', width: '300px', height: '300px', top: '15%', left: '5%' }} />
      <div className="ambient-glow-blob" style={{ backgroundColor: 'var(--leaf-green)', width: '320px', height: '320px', bottom: '15%', right: '5%' }} />

      {/* Single Banner Image Section */}
      <div className="hero-slider border-t-4" style={{ borderColor: '#E31837' }}>
        <img 
          src={instaField} 
          alt="Floffi Heritage Banner" 
          className="hero-slide-img" 
        />
      </div>

      {/* Banner */}
      <section className="py-20 bg-cream-dark relative overflow-hidden" style={{ backgroundColor: 'var(--bg-cream-dark)' }}>
        <div className="container text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white rounded-full mb-4 shadow-sm">
            <Sparkles size={14} style={{ color: 'var(--hibiscus-red)' }} />
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-earthy-light">Heritage & Sourcing</span>
          </div>
          <h1 className="font-heading font-extrabold text-earthy-brown mb-4">About FLOFFI</h1>
          <p className="text-base text-earthy-light max-w-2xl mx-auto leading-relaxed">
            From local flower fields to supermarket shelves, learn how we are bringing the age-old tradition of floral delicacies back to modern family kitchens.
          </p>
        </div>
      </section>

      {/* Heritage Narrative */}
      <section className="section relative z-10">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-8 mb-20"
          >
            <h2 className="font-heading font-extrabold text-3xl text-earthy-brown text-center leading-tight">
              Pure Flower Delicacies for Everyday Homes
            </h2>
            <div className="text-sm md:text-base text-earthy-light leading-relaxed space-y-6 text-left">
              <p>
                Floffi is a modern food brand creating naturally crafted floral-based jams, spreads, sauces, and chutneys for everyday households. Built with the belief that healthy and flavorful food should be accessible to everyone, Floffi focuses on bringing unique flower-inspired ingredients into daily meals in a simple and affordable way.
              </p>
              <p>
                Our products are made using natural ingredients without artificial colors or artificial preservatives, delivering authentic taste with a fresh and wholesome experience. From breakfast spreads to snack pairings and everyday cooking, Floffi products are designed to fit naturally into modern lifestyles.
              </p>
              <p>
                With a focus on economical consumers, Floffi makes floral-based foods a regular part of every kitchen through supermarkets, hypermarkets, and local stores.
              </p>
            </div>
          </motion.div>

          <hr className="border-earthy-brown/10 mb-20" style={{ border: 'none', borderTop: '1px solid rgba(62,39,35,0.08)' }} />

          {/* Sourcing Initiative / Farmers Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="section-tag" style={{ color: 'var(--leaf-green)', backgroundColor: 'var(--leaf-green-light)', borderColor: 'rgba(90,143,67,0.1)' }}>The Floffi Growers Initiative</div>
            <h2 className="font-heading font-extrabold text-earthy-brown mb-4">
              Empowering Local Flower Growers
            </h2>
            <p className="text-base text-earthy-light leading-relaxed">
              We source 100% of our rose petals, hibiscus blossoms, and Aavaram flowers from local agricultural cooperatives and women flower harvesters in dry, sun-cured regions. This helps provide clean sustainable livelihoods for hundreds of rural families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl text-left bg-cream-dark border border-pink-200/10 shadow-sm"
                style={{ backgroundColor: 'var(--bg-cream-dark)' }}
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm mb-6">
                  {item.icon}
                </div>
                <h3 className="font-heading font-bold text-lg text-earthy-brown mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-earthy-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Sourcing Promise */}
          <div className="p-8 md:p-12 rounded-3xl text-left bg-white border border-pink-200/10 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-floral-pink opacity-10 rounded-full blur-xl pointer-events-none" />
            <h3 className="font-heading font-extrabold text-xl text-earthy-brown mb-4">
              Our 100% Real Flower Sourcing Promise
            </h3>
            <p className="text-base text-earthy-light leading-relaxed">
              We promise that every jar of Floffi jam, spread, and thokku contains real flower petals and natural food ingredients. We strictly prohibit the use of artificial colors, chemical preservatives, or synthetic food stabilizers. By keeping our processing minimal and using traditional glass jar packing, we preserve the authentic flavor, color, and nutritional goodness of edible flowers for you and your family.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
