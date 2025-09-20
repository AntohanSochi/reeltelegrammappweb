// Fix: Add Telegram to the Window interface for TypeScript
interface Window {
  Telegram?: any;
}

const tg = window.Telegram?.WebApp;

const twa = {
  ready: () => {
    tg?.ready();
  },
  expand: () => {
    tg?.expand();
  },
  get initData() {
    return tg?.initData || '';
  },
  get initDataUnsafe() {
    return tg?.initDataUnsafe || {};
  },
  get themeParams() {
    return tg?.themeParams || {};
  },
  hapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy') => {
      tg?.HapticFeedback?.impactOccurred(style);
    },
    notificationOccurred: (type: 'error' | 'success' | 'warning') => {
      tg?.HapticFeedback?.notificationOccurred(type);
    }
  },
  openLink: (url: string) => {
    tg?.openLink(url);
  },
  share: (text: string) => {
    const url = `https://t.me/share/url?text=${encodeURIComponent(text)}`;
    twa.openLink(url);
  },
  close: () => {
    tg?.close();
  }
};

export default twa;