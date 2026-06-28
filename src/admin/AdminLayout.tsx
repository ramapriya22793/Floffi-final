import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, Heart, CreditCard, LogOut, ShoppingBag } from 'lucide-react';
import './admin.css';
import floffiLogo from '../assets/floffi_logo.png';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

export default function AdminLayout({ children, activeTab, setActiveTab, onLogout }: AdminLayoutProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'products', label: 'Products', icon: <Package size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag size={20} /> },
    { id: 'carts', label: 'Active Carts', icon: <ShoppingCart size={20} /> },
    { id: 'wishlist', label: 'Wishlists', icon: <Heart size={20} /> },
    { id: 'payments', label: 'Payments', icon: <CreditCard size={20} /> },
  ];

  return (
    <div className="admin-app">
      <div className="admin-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <img src={floffiLogo} alt="FLOFFI Admin" style={{ height: '36px', objectFit: 'contain' }} />
          </div>
          
          <nav className="admin-nav">
            {navItems.map(item => (
              <button
                key={item.id}
                className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
          
          <div style={{ padding: '1rem', borderTop: '1px solid var(--admin-border)' }}>
            <button 
              className="admin-nav-item" 
              onClick={onLogout}
              style={{ color: 'var(--admin-danger)' }}
            >
              <LogOut size={20} />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="admin-main">
          <header className="admin-header">
            <h1 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>
              {navItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Admin User</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>admin@floffi.com</div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 600, color: '#4B5563' }}>A</span>
              </div>
            </div>
          </header>
          
          <div className="admin-content">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
