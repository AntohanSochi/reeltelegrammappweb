
import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import type { FAQItem } from '../types';
import { useToast } from '../components/Toast';

const defaultFaqs: FAQItem[] = [
    { id: 'd1', question: 'Как работает генерация контента?', answer: 'Используя передовые AI-модели, мы анализируем ваш запрос и создаем уникальный контент, соответствующий трендам выбранной платформы.' },
    { id: 'd2', question: 'Как оплатить подписку?', answer: 'Оплата производится через нашего партнера Boosty. Вы можете выбрать удобный тариф на странице "Тарифы" и следовать инструкциям.' },
    { id: 'd3', question: 'Что делать, если закончились генерации?', answer: 'Вы можете приобрести дополнительные пакеты генераций на странице "Тарифы" или дождаться обновления лимита в следующем месяце по вашей подписке.' },
    { id: 'd4', question: 'Можно ли использовать API?', answer: 'Да, доступ к API предоставляется на тарифе "Pro" и выше. Документация доступна в вашем личном кабинете после оформления подписки.' },
    { id: 'd5', question: 'Как работает реферальная программа?', answer: 'Делитесь своей уникальной ссылкой с друзьями. Вы будете получать бонусы за каждого пользователя, который оформит платную подписку.' },
    { id: 'd6', question: 'Как отменить подписку?', answer: 'Отменить подписку можно в любой момент в вашем профиле на сервисе Boosty.' },
];

const FaqItemComponent: React.FC<{ item: FAQItem }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="faq-item">
            <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                {item.question}
                <span style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▼</span>
            </button>
            <div className="faq-answer" data-open={isOpen}>
                <p>{item.answer}</p>
            </div>
        </div>
    );
};

const Support: React.FC = () => {
    const [faqs, setFaqs] = useState<FAQItem[]>([]);
    const [loadingFaqs, setLoadingFaqs] = useState(true);
    const [ticketSubject, setTicketSubject] = useState('');
    const [ticketBody, setTicketBody] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const showToast = useToast();

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                setLoadingFaqs(true);
                const data = await api.getFAQ();
                setFaqs(data.length > 0 ? data : defaultFaqs);
            } catch (error) {
                setFaqs(defaultFaqs);
            } finally {
                setLoadingFaqs(false);
            }
        };
        fetchFaqs();
    }, []);

    const handleTicketSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!ticketSubject || !ticketBody) {
            showToast('Пожалуйста, заполните все поля.', 'error');
            return;
        }
        setIsSubmitting(true);
        try {
            await api.createTicket(ticketSubject, ticketBody);
            showToast('Ваш тикет успешно создан! Мы скоро с вами свяжемся.', 'success');
            setTicketSubject('');
            setTicketBody('');
        } catch (error) {
            showToast('Не удалось создать тикет. Попробуйте позже.', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h1>Центр Поддержки</h1>
            <p>Мы здесь, чтобы помочь вам.</p>
            
            <section style={{ marginBottom: '40px' }}>
                <h2>Часто задаваемые вопросы (FAQ)</h2>
                <div className="card">
                    {loadingFaqs ? <p>Загрузка...</p> : faqs.map(faq => <FaqItemComponent key={faq.id} item={faq} />)}
                </div>
            </section>
            
            <section style={{ marginBottom: '40px' }}>
                <h2>Создать тикет</h2>
                <div className="card">
                    <form onSubmit={handleTicketSubmit}>
                        <div className="form-group">
                            <label htmlFor="subject" className="form-label">Тема</label>
                            <input type="text" id="subject" className="form-control" value={ticketSubject} onChange={e => setTicketSubject(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="body" className="form-label">Описание проблемы</label>
                            <textarea id="body" className="form-control" value={ticketBody} onChange={e => setTicketBody(e.target.value)} required />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Отправка...' : 'Отправить тикет'}
                        </button>
                    </form>
                </div>
            </section>
            
            <section>
                <h2>Контакты</h2>
                <div className="card">
                    <p><strong>Telegram:</strong> <a href="https://t.me/ReelGenix-Help" target="_blank" rel="noopener noreferrer">@ReelGenix-Help</a></p>
                    <p><strong>Email:</strong> <a href="mailto:reelgenix@gmail.com">reelgenix@gmail.com</a></p>
                </div>
            </section>
        </div>
    );
};

export default Support;
