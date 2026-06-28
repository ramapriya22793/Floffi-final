import React, { useState } from 'react';
import floffiLogo from '../assets/floffi_logo.png';

interface FooterProps {
  onNavigate: (page: 'home' | 'story' | 'products') => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer id="footer" className="text-white pt-24 pb-6" style={{ background: 'linear-gradient(135deg, #FF8C00, #E65100)' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          
          {/* Col 1: Quick Links */}
          <div className="text-left">
            <h4 className="font-heading font-bold mb-6 text-white" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', color: 'rgba(255,255,255,0.95)' }}>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('story'); }} style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>About Us</a></li>
              <li><a href="#shop" onClick={(e) => { e.preventDefault(); onNavigate('products'); }} style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Shop</a></li>
              <li><a href="#contact" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Contact</a></li>
              <li><a href="#faqs" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>FAQs</a></li>
            </ul>
          </div>

          {/* Col 2: Legal */}
          <div className="text-left">
            <h4 className="font-heading font-bold mb-6 text-white" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
              Legal
            </h4>
            <ul className="space-y-4 text-sm" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px', color: 'rgba(255,255,255,0.95)' }}>
              <li><a href="#terms" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Terms & Conditions</a></li>
              <li><a href="#privacy" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Privacy Policy</a></li>
              <li><a href="#shipping" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}>Shipping Policy</a></li>
            </ul>
          </div>

          {/* Col 3: Newsletter */}
          <div className="text-left" style={{ flex: '1.5' }}>
            <h4 className="font-heading font-bold mb-6 text-white" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
              Subscribe to our newsletter
            </h4>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.95)', lineHeight: '1.5', marginBottom: '24px' }}>
              Get updates, tips, and exclusive offers straight to your inbox.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.7)',
                    padding: '8px 0',
                    color: 'white',
                    outline: 'none',
                    fontSize: '0.95rem'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    alignSelf: 'flex-start',
                    background: '#FFFFFF',
                    color: '#E65100',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '8px 24px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    transition: 'transform 0.2s ease',
                    marginTop: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Subscribe
                </button>
              </form>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '8px', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.3)', fontWeight: '500' }}>
                Thank you for subscribing!
              </div>
            )}
          </div>

          {/* Col 4: Follow Us & Logo */}
          <div className="text-left" style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 className="font-heading font-bold mb-6 text-white" style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
              Follow Us
            </h4>
            <div className="flex gap-4 mb-8" style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
              <a href="https://www.instagram.com/floffi_in/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors" aria-label="Instagram">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors" aria-label="Facebook">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors" aria-label="Twitter">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px' }}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
             <img src={floffiLogo} alt="Icon" style={{ height: '20px' }} />
          </div>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
            &copy; {new Date().getFullYear()} Floffi Foods - All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
