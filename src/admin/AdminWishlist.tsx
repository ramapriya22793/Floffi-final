import { Heart } from 'lucide-react';

export default function AdminWishlist() {
  const mockWishlistStats = [
    { product: 'Gulkhand Jam', count: 45, category: 'Jam' },
    { product: 'Rose Nectar Spread', count: 38, category: 'Nectar Spread' },
    { product: 'Garlic Thokku', count: 29, category: 'Thokku' },
    { product: 'Hibiscus Nectar Spread', count: 22, category: 'Nectar Spread' },
    { product: 'Aavaram Jam', count: 18, category: 'Jam' },
  ];

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Most Wishlisted Products</h3>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Wishlist Count</th>
              <th>Popularity</th>
            </tr>
          </thead>
          <tbody>
            {mockWishlistStats.map((item, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Heart size={16} color="var(--admin-danger)" fill="var(--admin-danger)" />
                  {item.product}
                </td>
                <td>{item.category}</td>
                <td>
                  <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{item.count}</span> users
                </td>
                <td>
                  <div style={{ width: '100%', maxWidth: '200px', height: '8px', backgroundColor: 'var(--admin-border)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(item.count / 50) * 100}%`, height: '100%', backgroundColor: 'var(--admin-primary)' }}></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
