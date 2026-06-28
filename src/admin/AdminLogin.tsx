import { useState } from 'react';
import './admin.css';
import floffiLogo from '../assets/floffi_logo.png';

interface AdminLoginProps {
  onLogin: (status: boolean) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded auth for demo purposes, since there's no backend admin auth specified yet
    if (username === 'admin' && password === 'floffi123') {
      onLogin(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <img src={floffiLogo} alt="FLOFFI" style={{ height: '48px', objectFit: 'contain', marginBottom: '0.5rem' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--admin-text-main)' }}>Admin Panel</h2>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Sign in to manage your store</p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-input-group">
            <label className="admin-input-label">Username</label>
            <input 
              type="text" 
              className="admin-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin"
              required 
            />
          </div>
          <div className="admin-input-group">
            <label className="admin-input-label">Password</label>
            <input 
              type="password" 
              className="admin-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter floffi123"
              required 
            />
          </div>
          <button type="submit" className="admin-btn" style={{ marginTop: '1rem' }}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
