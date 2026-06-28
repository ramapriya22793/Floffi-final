import { useState, useEffect } from 'react';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  }

  async function updateOrderStatus(id: string, newStatus: string) {
    const { error } = await supabase
      .from('payments')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } else {
      fetchOrders();
    }
  }

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Orders Management</h3>
        <select className="admin-input" style={{ width: 'auto', padding: '0.5rem' }}>
          <option>All Statuses</option>
          <option>Completed</option>
          <option>Processing</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>No orders found.</td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id}>
                    <td style={{ fontWeight: 500 }}>{order.order_id || 'N/A'}</td>
                    <td>
                      {order.customer_name || 'Guest'}
                      {order.customer_phone && <div style={{ fontSize: '0.85em', color: 'var(--admin-text-muted)' }}>{order.customer_phone}</div>}
                    </td>
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
                    <td>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--admin-primary)', cursor: 'pointer' }} title="View Details">
                          <Eye size={18} />
                        </button>
                        {order.status !== 'Completed' && order.status !== 'Delivered' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Delivered')}
                            style={{ background: 'none', border: 'none', color: 'var(--admin-success)', cursor: 'pointer' }} 
                            title="Mark Delivered"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        {order.status !== 'Cancelled' && (
                          <button 
                            onClick={() => updateOrderStatus(order.id, 'Cancelled')}
                            style={{ background: 'none', border: 'none', color: 'var(--admin-danger)', cursor: 'pointer' }} 
                            title="Cancel Order"
                          >
                            <XCircle size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
