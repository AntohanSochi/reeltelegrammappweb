
import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { ReferralInfo } from '../types';
import twa from '../lib/twa';
import { useToast } from '../components/Toast';

const Referrals: React.FC = () => {
    const [referralInfo, setReferralInfo] = useState<ReferralInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const showToast = useToast();
    const refBaseUrl = import.meta.env.VITE_REF_BASE;

    useEffect(() => {
        const fetchReferralInfo = async () => {
            try {
                setLoading(true);
                const data = await api.getReferral();
                setReferralInfo(data);
            } catch (error) {
                showToast('Не удалось загрузить реферальную информацию.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchReferralInfo();
    }, [showToast]);

    const referralLink = referralInfo ? `${refBaseUrl}${referralInfo.code}` : '';

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        showToast('Реферальная ссылка скопирована!', 'success');
        twa.hapticFeedback.impactOccurred('light');
    };

    const handleShare = () => {
        const text = `Присоединяйся к ReelGenixBloggerKit и получай бонусы! Моя ссылка: ${referralLink}`;
        twa.share(text);
        twa.hapticFeedback.impactOccurred('light');
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>Загружаем вашу реферальную статистику...</p>
            </div>
        );
    }

    if (!referralInfo) {
        return <p>Не удалось загрузить данные. Попробуйте обновить страницу.</p>;
    }

    return (
        <div>
            <h1>Реферальная программа</h1>
            <p>Приглашайте друзей и получайте бонусы за каждого нового пользователя!</p>
            
            <div className="stats-grid" style={{gridTemplateColumns: '1fr 1fr', marginTop: '32px'}}>
                <div className="card stat-card">
                    <div className="stat-card-label">Приглашено</div>
                    <div className="stat-card-value">{referralInfo.invited_users}</div>
                </div>
                <div className="card stat-card">
                    <div className="stat-card-label">Заработано бонусов</div>
                    <div className="stat-card-value success">{referralInfo.bonus_earned}₽</div>
                </div>
            </div>

            <div className="card" style={{marginTop: '32px'}}>
                <h3>Ваша реферальная ссылка</h3>
                <input 
                    type="text" 
                    className="form-control" 
                    value={referralLink} 
                    readOnly 
                    style={{backgroundColor: 'var(--bg)', marginBottom: '16px'}} 
                />
                <div style={{display: 'flex', gap: '12px'}}>
                    <button onClick={handleCopy} className="btn btn-primary">
                        <img src="/icon-copy.svg" alt="" className="icon" /> Скопировать
                    </button>
                    <button onClick={handleShare} className="btn btn-secondary">
                        <img src="/icon-share.svg" alt="" className="icon" /> Поделиться в TG
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Referrals;
