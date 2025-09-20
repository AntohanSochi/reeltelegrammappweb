
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import twa from '../lib/twa';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { to: '/', label: 'Главная', icon: 'home' },
  { to: '/products', label: 'Продукты', icon: 'products' },
  { to: '/pricing', label: 'Тарифы', icon: 'pricing' },
  { to: '/referrals', label: 'Рефералы', icon: 'referrals' },
  { to: '/support', label: 'Поддержка', icon: 'support' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    twa.close();
    navigate('/login');
  };

  const handleLinkClick = () => {
    twa.hapticFeedback.impactOccurred('light');
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Меню</h3>
          <button className="modal-close-btn" onClick={onClose}>
            <img src="/icon-close.svg" alt="Закрыть" className="icon" />
          </button>
        </div>
        <nav>
          <ul className="sidebar-nav">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleLinkClick}>
                  <img src={`/icon-${link.icon}.svg`} alt="" className="icon" />
                  {link.label}
                </NavLink>
              </li>
            ))}
            {user?.role === 'admin' && (
              <li>
                <NavLink to="/admin" className={({ isActive }) => (isActive ? 'active' : '')} onClick={handleLinkClick}>
                  <img src="/icon-admin.svg" alt="" className="icon" />
                  Админка
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        {user && (
          <div className="sidebar-profile">
            <NavLink to="/profile" onClick={handleLinkClick}>
              <div className="sidebar-profile-avatar">
                {user.first_name.charAt(0)}
              </div>
              <div className="sidebar-profile-info">
                <div className="sidebar-profile-name">{user.first_name} {user.last_name}</div>
                <div className="sidebar-profile-plan">Тариф: {user.plan}</div>
              </div>
            </NavLink>
            <button onClick={handleLogout} className="btn btn-secondary btn-block" style={{ marginTop: '16px' }}>Выйти</button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
