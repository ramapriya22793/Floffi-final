import { useState, useEffect } from 'react';
import { Package, ShoppingBag, DollarSign, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminDashboard() {
  const [revenue, setRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      // Fetch Products Count
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });
      if (productCount) setTotalProducts(productCount);

      // Fetch Payments (Orders)
      const { data: payments } = await supabase
        .from('payments')
        .select('*')
        .order('created_at', { ascending: false });

      if (payments) {
        setTotalOrders(payments.length);
        
        // Calculate Revenue
        const totalRev = payments
          .filter(p => p.status === 'Completed' || p.status === 'Delivered')
          .reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
        setRevenue(totalRev);

        // Get 5 recent orders
        setRecentOrders(payments.slice(0, 5));
      }
    }

    fetchDashboardData();
  }, []);

  return (
    <div>
      <div className="admin-dashboard-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon blue">
            <DollarSign size={24} />
          </div>
          <div className="admin-stat-content">
            <h4>Total Revenue</h4>
            <h2>₹{revenue.toLocaleString()}</h2>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon green">
            <ShoppingBag size={24} />
          </div>
          <div className="admin-stat-content">
            <h4>Total Orders</h4>
            <h2>{totalOrders}</h2>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon purple">
            <Package size={24} />
          </div>
          <div className="admin-stat-content">
            <h4>Products</h4>
            <h2>{totalProducts}</h2>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon orange">
            <Users size={24} />
          </div>
          <div className="admin-stat-content">
            <h4>Active Customers</h4>
            <h2>{totalOrders} {/* Assuming each order is a customer for now */}</h2>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.125rem' }}>Recent Orders</h3>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>No recent orders.</td>
                </tr>
              ) : (
                recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.order_id || 'N/A'}</td>
                    <td>{order.customer_name || 'Guest'}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td style={{ fontWeight: 600 }}>₹{order.amount}</td>
                    <td>
                      <span className={`admin-badge admin-badge-${
                        order.status === 'Completed' || order.status === 'Delivered' ? 'success' : 
                        order.status === 'Cancelled' ? 'danger' : 'warning'
                      }`}>
                        {order.status || 'Processing'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
