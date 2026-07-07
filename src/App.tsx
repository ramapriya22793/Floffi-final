import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import StoryPage from './components/StoryPage';
import ProductsPage from './components/ProductsPage';
import ProductDetailsPage from './components/ProductDetailsPage';
import EnquirySection from './components/EnquirySection';
import './App.css';

export type PageRoute = 'home' | 'story' | 'products' | 'product-details' | 'enquiry';

function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Replicate browser scroll reset on page transition (if not navigating to a specific product)
  useEffect(() => {
    if (!selectedProductId && currentPage !== 'product-details') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [currentPage, selectedProductId]);

  const handleNavigate = (page: PageRoute, productId?: string) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    } else {
      setSelectedProductId(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'story':
        return <StoryPage />;
      case 'products':
        return <ProductsPage selectedProductId={selectedProductId} onNavigate={handleNavigate} />;
      case 'product-details':
        return <ProductDetailsPage productId={selectedProductId} onNavigate={handleNavigate} />;
      case 'enquiry':
        return <div className="pt-24"><EnquirySection /></div>;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </>
  );
}

export default App;
