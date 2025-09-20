
import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  jwt: string | null;
  isHydrated: boolean;
  login: (user: User, jwt: string) => void;
  logout: () => void;
  hydrate: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  jwt: null,
  isHydrated: false,
  login: (user, jwt) => {
    set({ user, jwt });
    sessionStorage.setItem('auth-storage', JSON.stringify({ user, jwt }));
  },
  logout: () => {
    set({ user: null, jwt: null });
    sessionStorage.removeItem('auth-storage');
  },
  hydrate: () => {
    try {
      const storedState = sessionStorage.getItem('auth-storage');
      if (storedState) {
        const { user, jwt } = JSON.parse(storedState);
        set({ user, jwt, isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    } catch (e) {
      console.error('Could not hydrate auth state', e);
      set({ isHydrated: true });
    }
  },
}));
