import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AdminApp from './admin/AdminApp.tsx'

const path = window.location.pathname;
const isAdminOnly = import.meta.env.VITE_ADMIN_ONLY === 'true';
const isAdmin = isAdminOnly || path.startsWith('/admin');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? <AdminApp /> : <App />}
  </StrictMode>,
)
