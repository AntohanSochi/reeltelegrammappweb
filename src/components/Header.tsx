
import React from 'react';
import { useAuthStore } from '../store/auth';
import twa from '../lib/twa';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const user = useAuthStore(state => state.user);
  const brandName = import.meta.env.VITE_BRAND_NAME || 'ReelGenix';

  const handleMenuClick = () => {
    twa.hapticFeedback.impactOccurred('light');
    onMenuClick();
  };

  return (
    <header className="app-header">
      <div className="container">
        <div className="brand">
          <img src="/logo.svg" alt={`${brandName} Logo`} />
          <span>{user ? user.first_name : brandName}</span>
        </div>
        <button className="burger-btn" onClick={handleMenuClick} aria-label="Открыть меню">
          <img src="/icon-burger.svg" alt="Меню" className="icon" />
        </button>
      </div>
    </header>
  );
};

export default Header;
