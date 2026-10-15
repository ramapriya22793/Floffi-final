import { useState } from 'react';
import { Menu, X, Search, ChevronDown, User, Heart, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import floffiLogo from '../assets/floffi_logo.png';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: 'home' | 'story' | 'products' | 'enquiry', productId?: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsHovered, setIsProductsHovered] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('products');
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-container container">
          
          {/* Left: Logo & Nav Links */}
          <div className="nav-left">
            <button
              onClick={() => onNavigate('home')}
              className="logo-btn"
            >
              <img src={floffiLogo} alt="FLOFFI Logo" style={{ height: '42px', objectFit: 'contain' }} />
            </button>

            {/* Desktop Navigation Link Buttons */}
            <nav className="desktop-nav">
              
              {/* Products link with hover Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsProductsHovered(true)}
                onMouseLeave={() => setIsProductsHovered(false)}
                style={{ height: '100%', display: 'flex', alignItems: 'center' }}
              >
                <button
                  onClick={() => onNavigate('products')}
                  className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
                >
                  PRODUCTS
                </button>

                {/* Dropdown Menu (frosted container) */}
                <AnimatePresence>
                  {isProductsHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.2 }}
                      className="dropdown-menu-card"
                    >
                      {/* Floral Jam */}
                      <div className="dropdown-column">
                        <h5 
                          className="dropdown-heading cursor-pointer hover:text-earthy-brown transition-colors"
                          onClick={() => { onNavigate('products', 'jam'); setIsProductsHovered(false); }}
                        >
                          Floral Jam
                        </h5>
                        <ul className="dropdown-list">
                          <li>
                            <button 
                              onClick={() => { onNavigate('products', 'gulkhand-jam'); setIsProductsHovered(false); }}
                              className="dropdown-item-btn"
                            >
                              Gulkhand Jam
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onNavigate('products', 'aavaram-jam'); setIsProductsHovered(false); }}
                              className="dropdown-item-btn"
                            >
                              Aavaram Jam
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Nectar Spread */}
                      <div className="dropdown-column">
                        <h5 
                          className="dropdown-heading cursor-pointer hover:text-earthy-brown transition-colors"
                          onClick={() => { onNavigate('products', 'nectar-spread'); setIsProductsHovered(false); }}
                        >
                          Nectar Spread
                        </h5>
                        <ul className="dropdown-list">
                          <li>
                            <button 
                              onClick={() => { onNavigate('products', 'hibiscus-nectar'); setIsProductsHovered(false); }}
                              className="dropdown-item-btn"
                            >
                              Hibiscus Nectar
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onNavigate('products', 'rose-nectar'); setIsProductsHovered(false); }}
                              className="dropdown-item-btn"
                            >
                              Rose Nectar
                            </button>
                          </li>
                        </ul>
                      </div>

                      {/* Floral Chutney */}
                      <div className="dropdown-column">
                        <h5 
                          className="dropdown-heading cursor-pointer hover:text-earthy-brown transition-colors"
                          onClick={() => { onNavigate('products', 'thokku'); setIsProductsHovered(false); }}
                        >
                          Floral Chutney
                        </h5>
                        <ul className="dropdown-list">
                          <li>
                            <button 
                              onClick={() => { onNavigate('products', 'aavaram-thokku'); setIsProductsHovered(false); }}
                              className="dropdown-item-btn"
                            >
                              Aavaram Chutney
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onNavigate('products', 'banana-thokku'); setIsProductsHovered(false); }}
                              className="dropdown-item-btn"
                            >
                              Banana Chutney
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onNavigate('products', 'cauliflower-thokku'); setIsProductsHovered(false); }}
                              className="dropdown-item-btn"
                            >
                              Cauliflower Chutney
                            </button>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Category Link */}
              <button
                onClick={() => {
                  if (currentPage !== 'home') {
                    onNavigate('home');
                    setTimeout(() => {
                      document.getElementById('our-products')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    document.getElementById('our-products')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`nav-link`}
              >
                CATEGORY
              </button>

              {/* Enquiry Link */}
              <button
                onClick={() => onNavigate('enquiry')}
                className={`nav-link ${currentPage === 'enquiry' ? 'active' : ''}`}
              >
                RESELLER/DISTRIBUTOR
              </button>
            </nav>
          </div>

          {/* Right: Actions (PRE-ORDER & Search) */}
          <div className="nav-right" style={{ gap: '16px' }}>
            <button
              onClick={() => {
                window.open('https://wa.me/918754787774?text=' + encodeURIComponent('Hi Floffi, I would like to make an enquiry.'), '_blank');
              }}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#FF8C00',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                padding: '8px 18px',
                fontSize: '0.85rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                marginRight: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                transition: 'all 0.2s ease',
              }}
              className="hover:scale-105 active:scale-95"
            >
              ENQUIRE NOW
            </button>

            <form onSubmit={handleSearchSubmit} className="search-form">
              <span className="search-icon">
                <Search size={15} />
              </span>
              <input
                type="text"
                placeholder="Search products, recipes"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </form>

            {/* Icons: Account, Wishlist, Cart */}
            <div className="flex items-center gap-5 ml-4 text-white">
              <button 
                className="hover:opacity-80 transition-opacity cursor-pointer" 
                aria-label="Account"
                style={{ background: 'none', border: 'none', padding: 0, display: 'flex', color: '#FFFFFF' }}
              >
                <User size={24} strokeWidth={1.8} />
              </button>
              <button 
                className="hover:opacity-80 transition-opacity cursor-pointer" 
                aria-label="Wishlist"
                style={{ background: 'none', border: 'none', padding: 0, display: 'flex', color: '#FFFFFF' }}
              >
                <Heart size={24} strokeWidth={1.8} />
              </button>
              <button 
                className="hover:opacity-80 transition-opacity cursor-pointer relative" 
                aria-label="Cart"
                style={{ background: 'none', border: 'none', padding: 0, display: 'flex', color: '#FFFFFF' }}
              >
                <ShoppingCart size={24} strokeWidth={1.8} />
                <span 
                  style={{ 
                    position: 'absolute', 
                    top: '-6px', 
                    right: '-8px', 
                    backgroundColor: '#3E2723', 
                    color: 'white', 
                    fontSize: '10px', 
                    fontWeight: 'bold', 
                    height: '16px', 
                    width: '16px', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    lineHeight: '1'
                  }}
                >
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Icon Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="mobile-toggle text-white"
            style={{ color: '#FFFFFF' }}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="modal-overlay md:hidden"
              style={{ zIndex: 110 }}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[280px] bg-white p-6 shadow-2xl flex flex-col md:hidden"
              style={{
                zIndex: 120,
                borderLeft: '4px solid var(--hibiscus-red)',
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setIsOpen(false);
                  }}
                  className="logo-btn"
                >
                  <img src={floffiLogo} alt="FLOFFI Logo" style={{ height: '42px', objectFit: 'contain' }} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mobile-toggle"
                  style={{ display: 'block' }}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="search-form mb-6">
                <span className="search-icon">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Search products, recipes"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full search-input"
                />
              </form>

              <nav className="flex flex-col gap-5 mb-8 text-left">
                
                {/* Mobile Products Expandable List */}
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                    className={`nav-link text-left text-base flex justify-between items-center w-full py-1 ${
                      currentPage === 'products' ? 'active' : ''
                    }`}
                  >
                    <span>PRODUCTS</span>
                  </button>

                  <AnimatePresence>
                    {isMobileProductsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pl-4 flex flex-col gap-3.5 mt-2"
                        style={{ borderLeft: '1.5px solid rgba(62,39,35,0.1)' }}
                      >
                        {/* Floral Jam Sub-List */}
                        <div className="mobile-dropdown-column">
                          <span 
                            className="mobile-dropdown-heading cursor-pointer hover:text-earthy-brown"
                            onClick={() => { onNavigate('products', 'jam'); setIsOpen(false); }}
                          >
                            Floral Jam
                          </span>
                          <button onClick={() => { onNavigate('products', 'gulkhand-jam'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Gulkhand Jam</button>
                          <button onClick={() => { onNavigate('products', 'aavaram-jam'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Aavaram Jam</button>
                        </div>

                        {/* Nectar Spread Sub-List */}
                        <div className="mobile-dropdown-column">
                          <span 
                            className="mobile-dropdown-heading cursor-pointer hover:text-earthy-brown"
                            onClick={() => { onNavigate('products', 'nectar-spread'); setIsOpen(false); }}
                          >
                            Nectar Spread
                          </span>
                          <button onClick={() => { onNavigate('products', 'hibiscus-nectar'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Hibiscus Nectar</button>
                          <button onClick={() => { onNavigate('products', 'rose-nectar'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Rose Nectar</button>
                        </div>

                        {/* Floral Chutney Sub-List */}
                        <div className="mobile-dropdown-column">
                          <span 
                            className="mobile-dropdown-heading cursor-pointer hover:text-earthy-brown"
                            onClick={() => { onNavigate('products', 'thokku'); setIsOpen(false); }}
                          >
                            Floral Chutney
                          </span>
                          <button onClick={() => { onNavigate('products', 'aavaram-thokku'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Aavaram Chutney</button>
                          <button onClick={() => { onNavigate('products', 'banana-thokku'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Banana Chutney</button>
                          <button onClick={() => { onNavigate('products', 'cauliflower-thokku'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Cauliflower Chutney</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Category Link */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (currentPage !== 'home') {
                      onNavigate('home');
                      setTimeout(() => {
                        document.getElementById('our-products')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    } else {
                      document.getElementById('our-products')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`nav-link text-base flex justify-start w-full py-1`}
                  style={{ textAlign: 'left' }}
                >
                  <span>CATEGORY</span>
                </button>

                {/* Enquiry Link */}
                <button
                  onClick={() => {
                    onNavigate('enquiry');
                    setIsOpen(false);
                  }}
                  className={`nav-link text-base flex justify-start w-full py-1 ${
                    currentPage === 'enquiry' ? 'active' : ''
                  }`}
                  style={{ textAlign: 'left' }}
                >
                  <span>RESELLER/DISTRIBUTOR</span>
                </button>
              </nav>

              <div className="mt-auto">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.open('https://wa.me/918754787774?text=' + encodeURIComponent('Hi Floffi, I would like to make an enquiry.'), '_blank');
                  }}
                  className="btn btn-primary py-3"
                  style={{ 
                    backgroundColor: 'var(--hibiscus-red)', 
                    borderRadius: '12px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  ENQUIRE NOW
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
