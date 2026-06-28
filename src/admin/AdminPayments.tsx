import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, FileText } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminPayments() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    setLoading(true);
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching payments:', error);
    } else {
      setTransactions(data || []);
    }
    setLoading(false);
  }

  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Payment Transactions</h3>
        <button className="admin-btn" style={{ width: 'auto', background: 'var(--admin-surface)', color: 'var(--admin-text-main)', border: '1px solid var(--admin-border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileText size={16} /> Export CSV
        </button>
      </div>

      <div className="admin-table-container">
        {loading ? (
          <p>Loading payments...</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Order ID</th>
                <th>Date & Time</th>
                <th>Customer Details</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>No payments found.</td>
                </tr>
              ) : (
                transactions.map(txn => (
                  <tr key={txn.id || txn.razorpay_payment_id}>
                    <td style={{ fontFamily: 'monospace', color: 'var(--admin-text-muted)' }}>{txn.razorpay_payment_id || 'N/A'}</td>
                    <td style={{ fontWeight: 500 }}>{txn.order_id || 'N/A'}</td>
                    <td>{new Date(txn.created_at).toLocaleString()}</td>
                    <td>
                      {txn.customer_name && <div style={{ fontWeight: 600 }}>{txn.customer_name}</div>}
                      {txn.customer_email && <div style={{ fontSize: '0.85em', color: 'var(--admin-text-muted)' }}>{txn.customer_email}</div>}
                      {txn.customer_phone && <div style={{ fontSize: '0.85em', color: 'var(--admin-text-muted)' }}>{txn.customer_phone}</div>}
                      {txn.shipping_address && (
                        <div style={{ fontSize: '0.85em', color: 'var(--admin-text-muted)', marginTop: '4px', maxWidth: '200px', whiteSpace: 'normal' }}>
                          {txn.shipping_address}
                        </div>
                      )}
                      {!txn.customer_name && !txn.customer_email && <span style={{ color: 'var(--admin-text-muted)' }}>Guest</span>}
                    </td>
                    <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {txn.status === 'Completed' ? (
                        <ArrowUpRight size={16} color="var(--admin-success)" />
                      ) : txn.status === 'Failed' ? (
                        <ArrowDownRight size={16} color="var(--admin-danger)" />
                      ) : (
                        <ArrowUpRight size={16} color="var(--admin-warning)" />
                      )}
                      ₹{txn.amount}
                    </td>
                    <td>
                      <span className={`admin-badge admin-badge-${
                        txn.status === 'Completed' ? 'success' : 
                        txn.status === 'Pending' ? 'warning' : 'danger'
                      }`}>
                        {txn.status || 'Pending'}
                      </span>
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

