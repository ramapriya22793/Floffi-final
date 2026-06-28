import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price?: number;
  original_price?: number;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from('products').select('*');
      if (!error && data) {
        setProducts(data);
      }
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http') || imagePath.startsWith('/')) return imagePath;
    const { data } = supabase.storage.from('Productimage').getPublicUrl(imagePath);
    return data.publicUrl;
  };

  const getProductPrice = (product: Product) => {
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

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Products List</h3>
        <button className="admin-btn" style={{ width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
          <Plus size={16} /> Add Product
        </button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading products...</div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => {
                const { price, original } = getProductPrice(product);
                return (
                  <tr key={product.id}>
                    <td>
                      <img 
                        src={getImageUrl(product.image)} 
                        alt={product.name} 
                        style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px' }} 
                      />
                    </td>
                    <td style={{ fontWeight: 500 }}>{product.name}</td>
                    <td style={{ textTransform: 'capitalize' }}>{product.category.replace('-', ' ')}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 600 }}>₹{price}</span>
                        {original && <span style={{ textDecoration: 'line-through', color: 'var(--admin-text-muted)', fontSize: '0.85em' }}>₹{original}</span>}
                      </div>
                    </td>
                    <td>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button style={{ background: 'none', border: 'none', color: 'var(--admin-primary)', cursor: 'pointer' }} title="Edit">
                        <Edit size={18} />
                      </button>
                      <button style={{ background: 'none', border: 'none', color: 'var(--admin-danger)', cursor: 'pointer' }} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
