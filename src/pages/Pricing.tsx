
import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { Pack, Plan } from '../types';
import twa from '../lib/twa';
import { useToast } from '../components/Toast';

const Pricing: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [packs, setPacks] = useState<Pack[]>([]);
    const [loading, setLoading] = useState(true);
    const showToast = useToast();

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                setLoading(true);
                const data = await api.getPricing();
                setPlans(data.plans);
                setPacks(data.packs);
            } catch (error) {
                showToast('Не удалось загрузить тарифы. Показываем стандартные.', 'error');
                // Set default data on error
                const defaultData = await api.getPricing(); // Using mock as default
                setPlans(defaultData.plans);
                setPacks(defaultData.packs);
            } finally {
                setLoading(false);
            }
        };
        fetchPricing();
    }, [showToast]);

    const handleSubscribe = () => {
        twa.hapticFeedback.impactOccurred('light');
        twa.openLink(import.meta.env.VITE_BOOSTY_SUB_URL);
    };

    const handleBuyPack = async (packId: string) => {
        twa.hapticFeedback.impactOccurred('light');
        try {
            const { redirect_url } = await api.orderPack(packId);
            twa.openLink(redirect_url);
        } catch (error) {
            showToast('Не удалось создать заказ. Попробуйте позже.', 'error');
        }
    };

    if (loading) {
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p>Загружаем актуальные тарифы...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Тарифы и Пакеты</h1>
            <p>Выберите подходящий план для ваших задач.</p>
            
            <section style={{ marginBottom: '40px' }}>
                <h2>Подписки</h2>
                <div className="grid pricing-grid">
                    {plans.map(plan => (
                        <div key={plan.id} className="card pricing-card">
                            {plan.is_popular && <div className="popular-badge">Популярный</div>}
                            <h3 className="pricing-card-name">{plan.name}</h3>
                            <div className="pricing-card-price">
                                {plan.price}₽<span>/мес</span>
                            </div>
                            <ul className="pricing-card-features">
                                {plan.features.map((feature, i) => <li key={i}>{feature}</li>)}
                            </ul>
                            <button onClick={handleSubscribe} className="btn btn-primary">Оформить</button>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2>Разовые пакеты</h2>
                <div className="grid pricing-grid">
                    {packs.map(pack => (
                        <div key={pack.id} className="card pricing-card">
                             <h3 className="pricing-card-name">{pack.name}</h3>
                             <div className="pricing-card-price" style={{flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                {pack.price}₽
                            </div>
                            <button onClick={() => handleBuyPack(pack.id)} className="btn btn-secondary">Купить</button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Pricing;
