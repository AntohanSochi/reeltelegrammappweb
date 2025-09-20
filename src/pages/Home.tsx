
import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import ProductModal from '../components/ProductModal';
import { api } from '../lib/api';
import type { GenerationHistoryItem, Product } from '../types';
import dayjs from 'dayjs';

const quickActionsKeys = ['trendpulse', 'contentforge', 'ai_critic', 'engagemax', 'adgenius', 'clipsync'];
const quickActionProducts = products.filter(p => quickActionsKeys.includes(p.key));

const Home: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoadingHistory(true);
        const historyData = await api.getGenerationHistory();
        setHistory(historyData.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch history", error);
      } finally {
        setLoadingHistory(false);
      }
    };
    fetchHistory();
  }, []);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div>
      <section className="hero-block">
        <img src="/logo.svg" alt="ReelGenix Logo" />
        <h1>{import.meta.env.VITE_BRAND_NAME}</h1>
        <p className="subtitle">
          Автоматизация для блогеров: генерация, тренды, автопостинг, монетизация.
        </p>
      </section>

      <section>
        <h2>Быстрые действия</h2>
        <div className="grid grid-cols-3">
          {quickActionProducts.map(product => (
             <div key={product.key} className="card product-card" onClick={() => handleCardClick(product)}>
              <div className="product-card-icon">{product.icon}</div>
              <h3 className="product-card-name">{product.name}</h3>
            </div>
          ))}
        </div>
      </section>

      <section style={{marginTop: '40px'}}>
        <h2>История генераций</h2>
        <div className="card">
          {loadingHistory ? (
            <p>Загрузка истории...</p>
          ) : history.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Продукт</th>
                  <th>Дата</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {history.map(item => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>{dayjs(item.created_at).format('DD.MM.YYYY, HH:mm')}</td>
                    <td>{item.status === 'completed' ? '✅' : '❌'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Ваша история генераций пока пуста. Попробуйте что-нибудь создать!</p>
          )}
        </div>
      </section>

      <ProductModal 
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Home;
