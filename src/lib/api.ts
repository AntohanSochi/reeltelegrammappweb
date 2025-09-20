
import { useAuthStore } from '../store/auth';
import type { AdminStats, FAQItem, GenerationHistoryItem, Pack, Plan, ReferralInfo } from '../types';

const BASE_URL = import.meta.env.VITE_API_BASE;

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const { jwt } = useAuthStore.getState();
  
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (jwt) {
    headers.set('Authorization', `Bearer ${jwt}`);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Произошла ошибка сети' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    // Handle no content response
    if (response.status === 204) {
      return null as T;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

// MOCK API RESPONSES - REPLACE WITH ACTUAL IMPLEMENTATION

export const api = {
  authTWA: async (initData: string, start_param?: string) => {
    console.log("Mock authTWA called", { initData, start_param });
    // In a real app, this would be:
    // return request('/twa/auth', { method: 'POST', body: JSON.stringify({ initData, start_param }) });
    return Promise.resolve({
      jwt: 'mock-jwt-token-12345',
      user: {
        id: '123456',
        username: 'testuser',
        first_name: 'Иван',
        last_name: 'Петров',
        role: 'admin', // or 'user'
        avatar_url: undefined,
        plan: 'Standard',
        generations_left: 42,
        subscription_ends_at: '2024-12-31T23:59:59Z',
        referral_code: 'IVAN123'
      }
    });
  },

  generate: async (product_key: string, params: Record<string, any>) => {
    console.log("Mock generate called", { product_key, params });
    await new Promise(res => setTimeout(res, 2000));
    // return request('/generate', { method: 'POST', body: JSON.stringify({ product_key, params }) });
    return Promise.resolve({
      result: `Это сгенерированный результат для продукта "${product_key}" с параметрами:\n${JSON.stringify(params, null, 2)}`
    });
  },
  
  getGenerationHistory: async (): Promise<GenerationHistoryItem[]> => {
    return Promise.resolve([
        {id: '1', product_name: 'ContentForge', created_at: '2023-10-27T10:00:00Z', status: 'completed'},
        {id: '2', product_name: 'TrendPulse AI', created_at: '2023-10-27T09:30:00Z', status: 'completed'},
        {id: '3', product_name: 'AdGenius', created_at: '2023-10-26T15:00:00Z', status: 'failed'},
        {id: '4', product_name: 'AI Critic', created_at: '2023-10-26T11:00:00Z', status: 'completed'},
        {id: '5', product_name: 'EngageMax', created_at: '2023-10-25T18:00:00Z', status: 'completed'},
    ]);
  },

  getPricing: async (): Promise<{ plans: Plan[], packs: Pack[] }> => {
    console.log("Mock getPricing called");
    return Promise.resolve({
        plans: [
            { id: 'free', name: 'Free', price: 0, period: 'month', features: ['5 генераций', 'Базовые продукты', 'Поддержка по Email'] },
            { id: 'standard', name: 'Standard', price: 499, period: 'month', features: ['50 генераций', 'Все продукты', 'Приоритетная поддержка'], is_popular: true },
            { id: 'pro', name: 'Pro', price: 999, period: 'month', features: ['150 генераций', 'Доступ к API', 'Персональный менеджер'] },
            { id: 'business', name: 'Business', price: 2499, period: 'month', features: ['500 генераций', 'Командный доступ', 'Кастомные решения'] },
        ],
        packs: [
            { id: 'pack10', name: '10 генераций', price: 149, generations: 10 },
            { id: 'pack50', name: '50 генераций', price: 599, generations: 50 },
            { id: 'pack100', name: '100 генераций', price: 999, generations: 100 },
        ]
    });
  },

  orderPack: async (pack_id: string) => {
    console.log("Mock orderPack called", { pack_id });
    // return request('/orders/pack', { method: 'POST', body: JSON.stringify({ pack_id }) });
    return Promise.resolve({ redirect_url: import.meta.env.VITE_BOOSTY_SUB_URL });
  },

  getReferral: async (): Promise<ReferralInfo> => {
    console.log("Mock getReferral called");
    return Promise.resolve({ invited_users: 15, bonus_earned: 750, code: 'IVAN123' });
  },

  getFAQ: async (): Promise<FAQItem[]> => {
    console.log("Mock getFAQ called");
    return Promise.resolve([
        {id: '1', question: 'Как работает генерация контента?', answer: 'Наши AI-модели анализируют ваш запрос и создают уникальный контент на основе лучших практик и трендов.'},
        {id: '2', question: 'Как оплатить подписку?', answer: 'Оплата происходит через сервис Boosty. Нажмите кнопку "Оформить" и следуйте инструкциям на странице оплаты.'},
    ]);
  },

  createTicket: async (subject: string, body: string) => {
    console.log("Mock createTicket called", { subject, body });
    await new Promise(res => setTimeout(res, 1000));
    // return request('/support/ticket', { method: 'POST', body: JSON.stringify({ subject, body }) });
    return Promise.resolve({ message: 'Тикет успешно создан!' });
  },

  adminStats: async (): Promise<AdminStats> => {
    console.log("Mock adminStats called");
    return Promise.resolve({
      total_users: 1234,
      monthly_revenue: 156789,
      active_subscriptions: 456,
      generations_today: 890,
      recent_generations: [
        { product: 'ContentForge', user: 'user1@test.com', date: new Date().toISOString() },
        { product: 'TrendPulse AI', user: 'blogger22', date: new Date().toISOString() },
      ],
      system_status: {
        frontend_version: '1.0.0',
        api_version: '1.2.3',
        api_ping_ms: 45,
        errors_24h: 3,
      },
    });
  }
};
