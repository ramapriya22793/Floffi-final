import { ShoppingBag } from 'lucide-react';
import Hero from './Hero';
import OurStorySection from './OurStorySection';
import RecipesSection from './RecipesSection';
import ProductCarousel from './ProductCarousel';
import EnquirySection from './EnquirySection';

import type { PageRoute } from '../App';

interface HomePageProps {
  onNavigate: (page: PageRoute, productId?: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      {/* Hero auto-rotating banner carousel */}
      <Hero onNavigate={onNavigate} />

      {/* Our Story Section (Overlapping Style) */}
      <OurStorySection onNavigate={onNavigate} />

      {/* Recipes Section (Kissan Style) */}
      <RecipesSection onNavigate={onNavigate} />

      {/* Auto-Scrolling Product Carousel */}
      <ProductCarousel onNavigate={onNavigate} />

      {/* Enquiry Form */}
      <EnquirySection />
    </>
  );
}
