
import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { AdminStats } from '../types';
import dayjs from 'dayjs';

const Admin: React.FC = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await api.adminStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to load admin stats", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>Загрузка админ-панели...</p>
            </div>
        );
    }
    
    if (!stats) {
        return <p>Не удалось загрузить статистику.</p>
    }

    return (
        <div>
            <h1>Панель администратора</h1>
            
            <div className="stats-grid">
                <div className="card stat-card">
                    <div className="stat-card-label">Всего пользователей</div>
                    <div className="stat-card-value">{stats.total_users}</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-card-label">Доход (месяц)</div>
                    <div className="stat-card-value success">{stats.monthly_revenue}₽</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-card-label">Активные подписки</div>
                    <div className="stat-card-value">{stats.active_subscriptions}</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-card-label">Генераций сегодня</div>
                    <div className="stat-card-value">{stats.generations_today}</div>
                </div>
            </div>

            <div className="card" style={{marginBottom: '32px'}}>
                <h3>Последние генерации</h3>
                <table className="data-table">
                    <thead>
                        <tr><th>Продукт</th><th>Пользователь</th><th>Дата</th></tr>
                    </thead>
                    <tbody>
                        {stats.recent_generations.map((gen, i) => (
                            <tr key={i}>
                                <td>{gen.product}</td>
                                <td>{gen.user}</td>
                                <td>{dayjs(gen.date).format('DD.MM.YYYY HH:mm')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="card">
                <h3>Состояние системы</h3>
                <ul style={{listStyle: 'none', padding: 0}}>
                    <li><strong>Версия фронта:</strong> {stats.system_status.frontend_version}</li>
                    <li><strong>Версия API:</strong> {stats.system_status.api_version}</li>
                    <li><strong>Пинг API:</strong> {stats.system_status.api_ping_ms} мс</li>
                    <li><strong>Ошибки (24ч):</strong> {stats.system_status.errors_24h}</li>
                </ul>
            </div>
        </div>
    );
};

export default Admin;
