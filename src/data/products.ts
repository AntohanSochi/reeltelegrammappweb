
import type { Product } from '../types';

export const products: Product[] = [
  {
    key: 'trendpulse',
    name: 'TrendPulse AI',
    description: 'Предсказание трендов и популярных тем для вашего контента.',
    icon: '📊',
    fields: [
      { type: 'text', name: 'niche', label: 'Ваша ниша', placeholder: 'Например, фитнес, кулинария, IT', required: true },
      { type: 'select', name: 'platform', label: 'Платформа', options: ['Instagram Reels', 'TikTok', 'YouTube Shorts'], required: true },
      { type: 'textarea', name: 'extra_hints', label: 'Дополнительные пожелания', placeholder: 'Упомянуть сезонные события, фокус на новичков...' },
    ],
  },
  {
    key: 'contentforge',
    name: 'ContentForge',
    description: 'Генерация готовых сценариев и контент-планов для соцсетей.',
    icon: '✍️',
    fields: [
      { type: 'text', name: 'topic', label: 'Основная тема', placeholder: 'Например, обзор нового гаджета', required: true },
      { type: 'select', name: 'format', label: 'Формат', options: ['Сценарий для видео', 'Пост для блога', 'Идея для Stories'], required: true },
      { type: 'text', name: 'tone', label: 'Тональность голоса', placeholder: 'Например, экспертный, юмористический, дружелюбный', required: true },
    ],
  },
  {
    key: 'ai_critic',
    name: 'AI Critic',
    description: 'Получите объективный анализ и оценку качества вашего контента.',
    icon: '🧐',
    fields: [
      { type: 'textarea', name: 'content_text', label: 'Текст вашего контента', placeholder: 'Вставьте сюда текст поста или сценарий видео', required: true },
      { type: 'text', name: 'goal', label: 'Цель контента', placeholder: 'Например, повысить вовлеченность, продать продукт' },
    ],
  },
  {
    key: 'engagemax',
    name: 'EngageMax',
    description: 'Создание релевантных комментариев и ответов для вовлечения.',
    icon: '💬',
    fields: [
      { type: 'text', name: 'post_url', label: 'URL поста для комментирования', placeholder: 'https://...', required: true },
      { type: 'select', name: 'goal', label: 'Цель комментария', options: ['Начать дискуссию', 'Поблагодарить автора', 'Задать вопрос'], required: true },
    ],
  },
  {
    key: 'adgenius',
    name: 'AdGenius',
    description: 'Разработка рекламных стратегий и создание креативных текстов.',
    icon: '🚀',
    fields: [
      { type: 'text', name: 'product_description', label: 'Описание продукта/услуги', placeholder: 'Что вы рекламируете?', required: true },
      { type: 'text', name: 'target_audience', label: 'Целевая аудитория', placeholder: 'Например, молодые мамы 25-35 лет', required: true },
      { type: 'select', name: 'platform', label: 'Рекламная платформа', options: ['Instagram', 'Telegram Ads', 'VK'], required: true },
    ],
  },
  {
    key: 'growthhacker',
    name: 'GrowthHacker',
    description: 'SWOT-анализ вашего блога и формирование стратегии роста.',
    icon: '📈',
    fields: [
      { type: 'text', name: 'blog_url', label: 'Ссылка на ваш блог/канал', placeholder: 'https://...', required: true },
      { type: 'textarea', name: 'current_challenges', label: 'Текущие сложности', placeholder: 'Низкий охват, мало подписчиков...' },
    ],
  },
  {
    key: 'ai_avatar',
    name: 'AI Avatar Studio',
    description: 'Создание видео с говорящими AI-аватарами по вашему тексту.',
    icon: '👤',
    fields: [
      { type: 'select', name: 'avatar_style', label: 'Стиль аватара', options: ['Фотореалистичный', 'Анимационный', 'Футуристичный'], required: true },
      { type: 'textarea', name: 'script', label: 'Текст для озвучки', placeholder: 'Введите текст, который должен произнести аватар', required: true },
    ],
  },
  {
    key: 'monetizemind',
    name: 'MonetizeMind',
    description: 'Генерация идей монетизации и поиск потенциальных партнёров.',
    icon: '💰',
    fields: [
      { type: 'text', name: 'niche', label: 'Ваша ниша', placeholder: 'Например, путешествия, образование', required: true },
      { type: 'text', name: 'audience_size', label: 'Размер аудитории', placeholder: 'Например, 10,000 подписчиков', required: true },
    ],
  },
  {
    key: 'clipsync',
    name: 'ClipSync Engine',
    description: 'Автоматическая нарезка длинных видео на вирусные клипы.',
    icon: '✂️',
    fields: [
      { type: 'text', name: 'video_url', label: 'URL длинного видео (YouTube, Vimeo)', placeholder: 'https://...', required: true },
      { type: 'text', name: 'clip_duration', label: 'Желаемая длина клипа (в секундах)', placeholder: '15-60', required: true },
    ],
  },
  {
    key: 'scriptforge',
    name: 'ScriptForge Pro',
    description: 'Профессиональные сценарии для TikTok и Reels с раскадровкой.',
    icon: '🎬',
    fields: [
      { type: 'text', name: 'idea', label: 'Идея видео', placeholder: 'Танец под популярный трек, туториал', required: true },
      { type: 'text', name: 'duration', label: 'Хронометраж', placeholder: 'Например, 15 секунд', required: true },
    ],
  },
  {
    key: 'stories_converter',
    name: 'Reels-to-Story Converter',
    description: 'Адаптация ваших Reels для интерактивного формата Stories.',
    icon: '🔄',
    fields: [
      { type: 'text', name: 'reel_url', label: 'URL вашего Reels', placeholder: 'https://...', required: true },
      { type: 'select', name: 'interactive_element', label: 'Добавить интерактив', options: ['Опрос', 'Викторина', 'Стикер "Ваш ответ"'], required: true },
    ],
  },
  {
    key: 'brand_voice',
    name: 'Brand Voice Generator',
    description: 'Определение и формирование уникального голоса вашего бренда.',
    icon: '🗣️',
    fields: [
      { type: 'textarea', name: 'about_brand', label: 'О вашем бренде/блоге', placeholder: 'Ценности, миссия, ключевые темы', required: true },
      { type: 'text', name: 'keywords', label: '3-5 ключевых прилагательных', placeholder: 'Смелый, экспертный, вдохновляющий' },
    ],
  },
];
