import React, { useState, useEffect } from 'react';
// Fix: Import the Navigate component from react-router-dom
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import twa from '../lib/twa';
import { api } from '../lib/api';
import type { GenerationHistoryItem } from '../types';
import dayjs from 'dayjs';

const Profile: React.FC = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    useEffect(() => {
        api.getGenerationHistory()
            .then(data => setHistory(data.slice(0, 10)))
            .catch(err => console.error("Failed to fetch history", err))
            .finally(() => setLoadingHistory(false));
    }, []);

    const handleLogout = () => {
        logout();
        twa.hapticFeedback.notificationOccurred('success');
        twa.close();
        navigate('/login', { replace: true });
    };

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <div className="profile-info">
                <div className="profile-avatar">
                    {user.first_name.charAt(0).toUpperCase()}
                </div>
                <h1>{user.first_name} {user.last_name || ''}</h1>
                <p>@{user.username}</p>
                <div className="profile-details">
                    <div className="profile-detail-item">
                        <strong>{user.plan}</strong>
                        Текущий план
                    </div>
                    <div className="profile-detail-item">
                        <strong>{user.generations_left}</strong>
                        Осталось генераций
                    </div>
                    <div className="profile-detail-item">
                        <strong>{user.subscription_ends_at ? dayjs(user.subscription_ends_at).format('DD.MM.YYYY') : 'N/A'}</strong>
                        План активен до
                    </div>
                </div>
            </div>

            <div className="card">
                <h3>Последние 10 генераций</h3>
                {loadingHistory ? (
                    <p>Загрузка истории...</p>
                ) : history.length > 0 ? (
                    <table className="data-table">
                         <thead>
                            <tr>
                                <th>Продукт</th>
                                <th>Дата</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map(item => (
                                <tr key={item.id}>
                                    <td>{item.product_name}</td>
                                    <td>{dayjs(item.created_at).format('DD.MM.YYYY, HH:mm')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>История генераций пуста.</p>
                )}
            </div>

            <button
                onClick={handleLogout}
                className="btn btn-danger btn-block"
                style={{ marginTop: '40px', padding: '16px' }}
            >
                Выйти
            </button>
        </div>
    );
};

export default Profile;