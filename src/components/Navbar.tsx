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
                      {/* Jams */}
                      <div className="dropdown-column">
                        <h5 className="dropdown-heading">
                          Jams
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

                      {/* Nectars */}
                      <div className="dropdown-column">
                        <h5 className="dropdown-heading">
                          Nectars
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

                      {/* Thokkus */}
                      <div className="dropdown-column">
                        <h5 className="dropdown-heading">
                          Thokkus
                        </h5>
                        <ul className="dropdown-list">
                          <li>
                            <button 
                              onClick={() => { onNavigate('products', 'aavaram-thokku'); setIsProductsHovered(false); }}
                              className="dropdown-item-btn"
                            >
                              Aavaram Thokku
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onNavigate('products', 'banana-thokku'); setIsProductsHovered(false); }}
                              className="dropdown-item-btn"
                            >
                              Banana Thokku
                            </button>
                          </li>
                          <li>
                            <button 
                              onClick={() => { onNavigate('products', 'cauliflower-thokku'); setIsProductsHovered(false); }}
                              className="dropdown-item-btn"
                            >
                              Cauliflower Thokku
                            </button>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Recipes Link (Placeholder) */}
              <button
                onClick={() => onNavigate('home')}
                className={`nav-link`}
              >
                RECIPES
              </button>

              {/* Story Link */}
              <button
                onClick={() => onNavigate('story')}
                className={`nav-link ${currentPage === 'story' ? 'active' : ''}`}
              >
                OUR STORY
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
              onClick={() => window.open('https://wa.me/918754887774', '_blank')}
              className="btn btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.85rem', borderRadius: '8px', marginRight: '8px' }}
            >
              PRE-ORDER
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
            <div className="flex items-center gap-5 ml-4 text-earthy-brown">
              <button 
                className="hover:text-hibiscus-red transition-colors cursor-pointer" 
                aria-label="Account"
                style={{ background: 'none', border: 'none', padding: 0, display: 'flex' }}
              >
                <User size={24} strokeWidth={1.5} />
              </button>
              <button 
                className="hover:text-hibiscus-red transition-colors cursor-pointer" 
                aria-label="Wishlist"
                style={{ background: 'none', border: 'none', padding: 0, display: 'flex' }}
              >
                <Heart size={24} strokeWidth={1.5} />
              </button>
              <button 
                className="hover:text-hibiscus-red transition-colors cursor-pointer relative" 
                aria-label="Cart"
                style={{ background: 'none', border: 'none', padding: 0, display: 'flex' }}
              >
                <ShoppingCart size={24} strokeWidth={1.5} />
                <span 
                  style={{ 
                    position: 'absolute', 
                    top: '-6px', 
                    right: '-8px', 
                    backgroundColor: '#E31837', 
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
            className="mobile-toggle"
            aria-label="Open menu"
          >
            <Menu size={24} />
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
                        {/* Jams Sub-List */}
                        <div className="mobile-dropdown-column">
                          <span className="mobile-dropdown-heading">Jams</span>
                          <button onClick={() => { onNavigate('products', 'gulkhand-jam'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Gulkhand Jam</button>
                          <button onClick={() => { onNavigate('products', 'aavaram-jam'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Aavaram Jam</button>
                        </div>

                        {/* Nectars Sub-List */}
                        <div className="mobile-dropdown-column">
                          <span className="mobile-dropdown-heading">Nectars</span>
                          <button onClick={() => { onNavigate('products', 'hibiscus-nectar'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Hibiscus Nectar</button>
                          <button onClick={() => { onNavigate('products', 'rose-nectar'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Rose Nectar</button>
                        </div>

                        {/* Thokkus Sub-List */}
                        <div className="mobile-dropdown-column">
                          <span className="mobile-dropdown-heading">Thokkus</span>
                          <button onClick={() => { onNavigate('products', 'aavaram-thokku'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Aavaram Thokku</button>
                          <button onClick={() => { onNavigate('products', 'banana-thokku'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Banana Thokku</button>
                          <button onClick={() => { onNavigate('products', 'cauliflower-thokku'); setIsOpen(false); }} className="mobile-dropdown-item-btn">Cauliflower Thokku</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Recipes Link */}
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className={`nav-link text-base flex justify-start w-full py-1`}
                  style={{ textAlign: 'left' }}
                >
                  <span>RECIPES</span>
                </button>

                {/* About FLOFFI Link */}
                <button
                  onClick={() => {
                    onNavigate('story');
                    setIsOpen(false);
                  }}
                  className={`nav-link text-base flex justify-start w-full py-1 ${
                    currentPage === 'story' ? 'active' : ''
                  }`}
                  style={{ textAlign: 'left' }}
                >
                  <span>OUR STORY</span>
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
                    window.open('https://wa.me/918754887774', '_blank');
                    setIsOpen(false);
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
                  PRE-ORDER
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
