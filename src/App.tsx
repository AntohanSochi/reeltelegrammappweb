
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './store/auth';

import twa from './lib/twa';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';

import Home from './pages/Home';
import Products from './pages/Products';
import Pricing from './pages/Pricing';
import Referrals from './pages/Referrals';
import Support from './pages/Support';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Login from './pages/Login';

const ProtectedRoute: React.FC = () => {
  const { jwt, isHydrated } = useAuthStore();
  if (!isHydrated) return null; // Or a loading spinner
  return jwt ? <Outlet /> : <Navigate to="/login" replace />;
};

const AdminRoute: React.FC = () => {
  const { user, isHydrated } = useAuthStore();
  if (!isHydrated) return null;
  return user?.role === 'admin' ? <Outlet /> : <Navigate to="/" replace />;
};

const AppLayout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="page-container container">
        <Outlet />
      </main>
    </>
  );
};

const App: React.FC = () => {
  const { hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
    twa.ready();
    twa.expand();
  }, [hydrate]);

  return (
    <>
      <Toast />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
