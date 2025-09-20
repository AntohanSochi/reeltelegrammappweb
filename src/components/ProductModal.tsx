
import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { api } from '../lib/api';
import twa from '../lib/twa';
import { useToast } from './Toast';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

type Step = 'form' | 'loading' | 'result';

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [step, setStep] = useState<Step>('form');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [result, setResult] = useState('');
  const showToast = useToast();

  useEffect(() => {
    if (isOpen && product) {
      const initialData = product.fields.reduce((acc, field) => {
        acc[field.name] = field.type === 'select' ? field.options?.[0] || '' : '';
        return acc;
      }, {} as Record<string, string>);
      setFormData(initialData);
      setStep('form');
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setStep('loading');
    twa.hapticFeedback.impactOccurred('medium');
    try {
      const response = await api.generate(product.key, formData);
      setResult(response.result);
      setStep('result');
      twa.hapticFeedback.notificationOccurred('success');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Не удалось выполнить генерацию';
      showToast(errorMessage, 'error');
      setStep('form');
      twa.hapticFeedback.notificationOccurred('error');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    showToast('Результат скопирован!', 'success');
    twa.hapticFeedback.impactOccurred('light');
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.key}_result.txt`;
    a.click();
    URL.revokeObjectURL(url);
    twa.hapticFeedback.impactOccurred('light');
  };

  const handleShare = () => {
    const textToShare = `Я сгенерировал контент с помощью ${product.name} в ReelGenixBloggerKit!`;
    twa.share(textToShare);
    twa.hapticFeedback.impactOccurred('light');
  };

  const handleAgain = () => {
    setStep('form');
  };

  return (
    <div className="modal-overlay open">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{product.name}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <img src="/icon-close.svg" alt="Закрыть" className="icon" />
          </button>
        </div>
        <div className="modal-body">
          {step === 'form' && (
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              {product.fields.map(field => (
                <div key={field.name} className="form-group">
                  <label htmlFor={field.name} className="form-label">{field.label}</label>
                  {field.type === 'textarea' && (
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                  {field.type === 'text' && (
                    <input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                  {field.type === 'select' && (
                    <select
                      id={field.name}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      className="form-control"
                      required={field.required}
                    >
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  )}
                </div>
              ))}
            </form>
          )}
          {step === 'loading' && (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Магия в процессе... Генерируем контент</p>
            </div>
          )}
          {step === 'result' && (
            <div>
              <h3>Ваш результат:</h3>
              <div className="generation-result">
                {result}
              </div>
              <div className="result-actions">
                <button onClick={handleCopy} className="btn btn-secondary">
                  <img src="/icon-copy.svg" alt="" className="icon" /> Скопировать
                </button>
                <button onClick={handleDownload} className="btn btn-secondary">
                  <img src="/icon-download.svg" alt="" className="icon" /> Скачать .txt
                </button>
                <button onClick={handleShare} className="btn btn-secondary">
                  <img src="/icon-share.svg" alt="" className="icon" /> Поделиться
                </button>
                <button onClick={handleAgain} className="btn btn-secondary">
                  <img src="/icon-refresh.svg" alt="" className="icon" /> Еще раз
                </button>
              </div>
            </div>
          )}
        </div>
        {step === 'form' && (
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Сгенерировать</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
