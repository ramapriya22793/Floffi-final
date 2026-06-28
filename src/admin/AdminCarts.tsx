import { ShoppingCart } from 'lucide-react';

export default function AdminCarts() {
  const mockCarts = [
    { id: 'cart_01', customer: 'Rohan Gupta', items: 'Gulkhand Jam, Rose Nectar', value: 525, lastActive: '2 hours ago', status: 'Active' },
    { id: 'cart_02', customer: 'Sneha Patel', items: 'Banana Thokku', value: 230, lastActive: '1 day ago', status: 'Abandoned' },
    { id: 'cart_03', customer: 'Karan Mehra', items: 'Aavaram Jam, Hibiscus Nectar, Garlic Thokku', value: 780, lastActive: '5 hours ago', status: 'Active' },
  ];

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Customer Carts</h3>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Items in Cart</th>
              <th>Total Value</th>
              <th>Last Active</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCarts.map(cart => (
              <tr key={cart.id}>
                <td style={{ fontWeight: 500 }}>{cart.customer}</td>
                <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {cart.items}
                </td>
                <td style={{ fontWeight: 600 }}>₹{cart.value}</td>
                <td style={{ color: 'var(--admin-text-muted)' }}>{cart.lastActive}</td>
                <td>
                  <span className={`admin-badge admin-badge-${
                    cart.status === 'Active' ? 'info' : 'warning'
                  }`}>
                    {cart.status}
                  </span>
                </td>
                <td>
                  <button className="admin-btn" style={{ padding: '0.4rem 0.75rem', fontSize: '0.875rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ShoppingCart size={14} /> View Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
