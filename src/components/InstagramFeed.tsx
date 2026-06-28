import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';

import instaToast from '../assets/insta_toast.png';
import instaField from '../assets/insta_field.png';
import instaFamily from '../assets/insta_family.png';
import instaPancakes from '../assets/insta_pancakes.png';

export default function InstagramFeed() {
  const posts = [
    {
      id: 1,
      image: instaToast,
      likes: '1.2k',
      comments: '84',
      caption: 'Crisp sourdough toast with our rich Hibiscus Nectar Spread. Edible petals for breakfast magic! ✨🌸 #floffifoods'
    },
    {
      id: 2,
      image: instaField,
      likes: '890',
      comments: '46',
      caption: 'Where our story begins: fresh organic rose fields basking in the morning sun. ☀️🌹 #naturallycrafted'
    },
    {
      id: 3,
      image: instaFamily,
      likes: '2.3k',
      comments: '112',
      caption: 'Wholesome family moments are better with a jar of Floffi sweet preserves. Preservative-free love. ❤️🍞'
    },
    {
      id: 4,
      image: instaPancakes,
      likes: '1.5k',
      comments: '72',
      caption: 'A stack of hot pancakes drizzled with golden yellow Aavaram nectar. Pure luxury in every bite. 🥞🍯'
    }
  ];

  return (
    <section className="section bg-cream-dark" style={{ backgroundColor: 'var(--bg-cream-dark)', borderTop: '1px solid rgba(232, 160, 181, 0.1)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag" style={{ color: 'var(--rose-pink)', backgroundColor: 'var(--floral-pink-light)', borderColor: 'rgba(229,124,149,0.1)' }}>Social Feed</div>
          <h2 className="section-title font-heading font-extrabold text-earthy-brown">
            Follow the Floral Life
          </h2>
          <p className="mt-4" style={{ color: 'var(--earthy-light)' }}>
            Join our growing community on Instagram. Share your recipes using <strong>@floffifoods</strong>
          </p>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: post.id * 0.1 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-sm group cursor-pointer border border-pink-200/10"
            >
              {/* Post Image */}
              <img
                src={post.image}
                alt="Instagram post showing FLOFFI floral food lifestyle"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-earthy-brown/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-left">
                
                {/* Header: Instagram logo icon */}
                <div className="flex justify-end">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-white/80" style={{ width: '20px', height: '20px' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </div>
                
                {/* Body: Caption text */}
                <p className="text-xs text-white/90 font-medium leading-relaxed mb-4 line-clamp-3">
                  {post.caption}
                </p>

                {/* Footer: Likes and comments count */}
                <div className="flex items-center gap-6 pt-4 border-t border-white/20 text-white/95">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Heart size={16} fill="white" className="text-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <MessageCircle size={16} fill="white" className="text-white" />
                    <span>{post.comments}</span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Action Button */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary gap-2"
          >
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-hibiscus-red" style={{ width: '18px', height: '18px', color: 'var(--hibiscus-red)' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            Follow @floffifoods
          </a>
        </div>

      </div>
    </section>
  );
}
