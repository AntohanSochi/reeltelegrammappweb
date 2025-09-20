
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { api } from '../lib/api';
import twa from '../lib/twa';

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore(state => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    twa.hapticFeedback.impactOccurred('medium');

    const initData = twa.initData;
    const startParam = twa.initDataUnsafe.start_param;

    if (!initData) {
      setError('Не удалось получить данные Telegram. Попробуйте перезапустить приложение.');
      setIsLoading(false);
      twa.hapticFeedback.notificationOccurred('error');
      return;
    }

    try {
      const { jwt, user } = await api.authTWA(initData, startParam);
      login(user, jwt);
      twa.hapticFeedback.notificationOccurred('success');
      navigate('/', { replace: true });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла неизвестная ошибка';
      setError(`Ошибка авторизации: ${errorMessage}`);
      setIsLoading(false);
      twa.hapticFeedback.notificationOccurred('error');
    }
  };

  return (
    <div className="login-page">
      <img src="/logo.svg" alt="ReelGenix Logo" />
      <h1>Добро пожаловать в ReelGenixBloggerKit</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '400px', margin: '16px auto 32px' }}>
        Ваш личный AI-ассистент для создания вирусного контента.
      </p>
      
      {error && <p style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error}</p>}
      
      <button onClick={handleLogin} disabled={isLoading} className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
        {isLoading ? 'Входим...' : 'Войти через Telegram'}
      </button>
    </div>
  );
};

export default Login;
