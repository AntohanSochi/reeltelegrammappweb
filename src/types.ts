
export interface User {
  id: string;
  username: string;
  first_name: string;
  last_name?: string;
  role: 'user' | 'admin';
  avatar_url?: string;
  plan: string;
  generations_left: number;
  subscription_ends_at?: string;
  referral_code: string;
}

export type ProductFieldType = 'text' | 'select' | 'textarea';

export interface ProductField {
  type: ProductFieldType;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface Product {
  key: string;
  name: string;
  description: string;
  icon: string;
  fields: ProductField[];
}

export interface GenerationHistoryItem {
  id: string;
  product_name: string;
  created_at: string;
  status: 'completed' | 'failed';
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  features: string[];
  is_popular?: boolean;
}

export interface Pack {
  id: string;
  name: string;
  price: number;
  generations: number;
}

export interface ReferralInfo {
  invited_users: number;
  bonus_earned: number;
  code: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface AdminStats {
  total_users: number;
  monthly_revenue: number;
  active_subscriptions: number;
  generations_today: number;
  recent_generations: {
    product: string;
    user: string;
    date: string;
  }[];
  system_status: {
    frontend_version: string;
    api_version: string;
    api_ping_ms: number;
    errors_24h: number;
  };
}
