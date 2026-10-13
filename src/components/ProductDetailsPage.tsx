import { useState, useEffect } from 'react';
import { ArrowLeft, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { PageRoute } from '../App';

import gulkhandJamImg from '../assets/gulkhand_jam.png';
import aavaramJamImg from '../assets/aavaram_jam.png';
import hibiscusNectarImg from '../assets/hibiscus_nectar.png';
import roseNectarImg from '../assets/rose_nectar.png';
import aavaramThokkuImg from '../assets/aavaram_thokku.png';
import bananaThokkuImg from '../assets/banana_thokku.png';
import cauliflowerThokkuImg from '../assets/cauliflower_thokku.png';

interface ProductDetail {
  id: string;
  name: string;
  category: string;
  image: string;
  price?: number;
  original_price?: number;
  description?: string;
}

interface ProductDetailsPageProps {
  productId: string | null;
  onNavigate: (page: PageRoute, productId?: string) => void;
}

const DEFAULT_PRODUCTS: Record<string, ProductDetail> = {
  'gulkhand-jam': { id: 'gulkhand-jam', name: 'Gulkhand Jam', category: 'jam', image: gulkhandJamImg, price: 200, original_price: 245 },
  'aavaram-jam': { id: 'aavaram-jam', name: 'Aavaram Jam', category: 'jam', image: aavaramJamImg, price: 200, original_price: 245 },
  'hibiscus-nectar': { id: 'hibiscus-nectar', name: 'Hibiscus Nectar Spread', category: 'nectar-spread', image: hibiscusNectarImg, price: 350, original_price: 400 },
  'rose-nectar': { id: 'rose-nectar', name: 'Rose Nectar Spread', category: 'nectar-spread', image: roseNectarImg, price: 325, original_price: 375 },
  'aavaram-thokku': { id: 'aavaram-thokku', name: 'Aavaram Thokku', category: 'thokku', image: aavaramThokkuImg, price: 230, original_price: 270 },
  'banana-thokku': { id: 'banana-thokku', name: 'Banana Thokku', category: 'thokku', image: bananaThokkuImg, price: 230, original_price: 270 },
  'cauliflower-thokku': { id: 'cauliflower-thokku', name: 'Cauliflower Thokku', category: 'thokku', image: cauliflowerThokkuImg, price: 230, original_price: 270 }
};

export default function ProductDetailsPage({ productId, onNavigate }: ProductDetailsPageProps) {
  const [product, setProduct] = useState<ProductDetail | null>(() => {
    if (productId && DEFAULT_PRODUCTS[productId]) return DEFAULT_PRODUCTS[productId];
    return null;
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    async function fetchProduct() {
      if (!productId) {
        setIsLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();
          
        if (data) {
          setProduct(data);
        } else if (DEFAULT_PRODUCTS[productId]) {
          setProduct(DEFAULT_PRODUCTS[productId]);
        }
      } catch (err) {
        if (DEFAULT_PRODUCTS[productId]) {
          setProduct(DEFAULT_PRODUCTS[productId]);
        }
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchProduct();
  }, [productId]);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http') || imagePath.startsWith('/') || imagePath.startsWith('data:') || imagePath.startsWith('/src/assets/')) {
      return imagePath;
    }
    try {
      const { data } = supabase.storage.from('Productimage').getPublicUrl(imagePath);
      return data?.publicUrl || imagePath;
    } catch {
      return imagePath;
    }
  };

  const getProductPrice = (product: ProductDetail) => {
    if (product.price) {
      return { price: product.price, original: product.original_price };
    }
    
    const productName = product.name.toLowerCase();
    
    if (product.id === 'rose-nectar' || productName.includes('rose nectar')) {
      return { price: 325, original: 375 };
    }
    
    if (product.id === 'hibiscus-nectar' || productName.includes('hibiscus nectar')) {
      return { price: 350, original: 400 };
    }
    
    if (product.id === 'gulkhand' || productName.includes('gulkhand') || product.id === 'aavaram-jam' || productName.includes('aavaram jam')) {
      return { price: 200, original: 245 };
    }
    
    if (product.category === 'thokku' || productName.includes('thokku')) {
      return { price: 230, original: 270 };
    }
    
    return { price: 299, original: 349 };
  };

  const getProductDescription = (product: ProductDetail) => {
    if (product.description) {
      return product.description;
    }
    
    const productName = product.name.toLowerCase();
    
    if (productName.includes('gulkhand')) {
      return "A rich and naturally sweet floral jam made from carefully selected rose petals. FLOFFI Gulkhand Jam offers a smooth texture and refreshing taste that pairs perfectly with bread, desserts, rotis, pancakes, and snacks. Crafted without artificial colors or preservatives for a naturally delightful everyday spread.";
    }
    
    if (productName.includes('aavaram jam') || product.id === 'aavaram-jam') {
      return "A naturally crafted floral jam made from carefully selected Aavaram flowers, offering a unique blend of mild bitterness and natural sweetness. FLOFFI Aavaram Jam delivers a smooth texture and distinctive flavor that pairs perfectly with bread, toast, desserts, and everyday snacks. Made without artificial colors or preservatives for a wholesome and refreshing experience.";
    }
    
    if (productName.includes('hibiscus nectar') || product.id === 'hibiscus-nectar') {
      return "A vibrant floral nectar spread made using natural hibiscus extracts with a balanced sweet and tangy taste. Its smooth and rich texture makes it perfect for pancakes, toast, waffles, desserts, milkshakes, and breakfast dishes. FLOFFI Hibiscus Nectar Spread is created for modern households looking for natural and flavorful alternatives.";
    }
    
    if (productName.includes('rose nectar') || product.id === 'rose-nectar') {
      return "A smooth and aromatic floral nectar spread infused with the delicate essence of rose petals. Perfect as a topping, drizzle, or breakfast companion, this naturally inspired spread delivers refreshing floral sweetness with a rich texture and authentic taste without artificial colors or preservatives.";
    }
    
    if (productName.includes('aavaram thokku')) {
      return "A traditional-style savory thokku prepared using natural Aavaram flowers blended with authentic spices. With its signature balance of gentle bitterness, spice, and subtle sweetness, FLOFFI Aavaram Thokku brings a bold and unique flavor to rice, dosa, idli, chapati, and daily meals.";
    }
    
    if (productName.includes('banana thokku')) {
      return "A unique savory blend crafted from ripe bananas and traditional spices for a mildly sweet, tangy, and spicy flavor profile. FLOFFI Banana Thokku adds a distinctive twist to everyday meals and works perfectly as a flavorful side dish, spread, or accompaniment.";
    }
    
    if (productName.includes('cauliflower thokku')) {
      return "A rich and flavorful thokku made from fresh cauliflower blended with aromatic spices and traditional ingredients. FLOFFI Cauliflower Thokku delivers a bold homemade taste that pairs perfectly with rice, dosa, chapati, idli, and snacks for everyday enjoyment.";
    }
    
    return "A naturally crafted, artisanal product made with love. Perfect for adding a touch of floral goodness to your everyday meals.";
  };

  if (isLoading) {
    return (
      <div className="pt-28 bg-white min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hibiscus-red"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 bg-white min-h-screen flex flex-col justify-center items-center text-center">
        <h2 className="font-heading text-2xl font-bold text-earthy-brown mb-4">Product not found</h2>
        <button 
          onClick={() => onNavigate('products')}
          className="btn btn-primary"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const { price, original } = getProductPrice(product);

  return (
    <div className="pt-28 pb-24 bg-white min-h-screen">
      <div className="container max-w-6xl">
        
        <button 
          onClick={() => onNavigate('products')}
          className="flex items-center text-earthy-brown hover:text-hibiscus-red transition-colors mb-8 font-medium cursor-pointer"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start bg-[var(--bg-cream)] rounded-[32px] p-8 md:p-12 shadow-sm border border-[rgba(62,39,35,0.05)]">
          
          {/* Product Image Section */}
          <div 
            className="flex items-center justify-center bg-white rounded-[24px] shadow-sm relative" 
            style={{ 
              width: '100%', 
              maxWidth: '100%', 
              height: '400px', 
              overflow: 'hidden', 
              padding: '2rem',
              boxSizing: 'border-box'
            }}
          >
            <img 
              src={getImageUrl(product.image)} 
              alt={product.name} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', 
                maxWidth: '100%', 
                maxHeight: '100%',
                display: 'block'
              }}
            />
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col">
            <h1 className="font-heading font-black text-4xl md:text-5xl text-earthy-brown mb-2 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-earthy-brown/60 uppercase tracking-widest text-sm font-bold mb-8">
              {product.category === 'nectar-spread' ? 'Nectar Spread' : 
               product.category === 'jam' ? 'Premium Jam' : 'Chutneys & Thokkus'}
            </p>

            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-[rgba(62,39,35,0.1)]">
              {original && (
                <span className="text-xl opacity-60 mb-1" style={{ color: 'var(--earthy-brown)', textDecoration: 'line-through' }}>
                  ₹{original}
                </span>
              )}
              <span className="font-bold text-4xl" style={{ color: 'var(--hibiscus-red)' }}>
                ₹{price}
              </span>
            </div>

            <div className="mb-10">
              <h3 className="font-heading font-bold text-xl text-earthy-brown mb-4">Description</h3>
              <p className="text-earthy-brown/80 leading-relaxed text-lg text-justify">
                {getProductDescription(product)}
              </p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => {
                  const subject = encodeURIComponent(`Product Enquiry: ${product?.name || 'Floffi Product'}`);
                  const body = encodeURIComponent(
                    `Hi Floffi Team,\n\nI would like to enquire about ${product?.name || 'this product'}.\n\nPlease share more details, pricing, and availability.\n\nThank you!`
                  );
                  window.location.href = `mailto:floffiinfo@gmail.com?subject=${subject}&body=${body}`;
                }}
                className="btn btn-primary flex-1 flex items-center justify-center gap-2" 
                style={{ padding: '16px', fontSize: '1.1rem', borderRadius: '16px', boxShadow: '0 8px 24px rgba(255, 140, 0, 0.3)' }}
              >
                <Mail size={20} />
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
