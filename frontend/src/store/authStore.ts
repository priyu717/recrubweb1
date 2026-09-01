import { create } from 'zustand';
import api from '../services/api';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  company: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  demoLogin: () => void;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const DEMO_USER: User = {
  id: 'demo-user-1',
  firstName: 'Sarah',
  lastName: 'Jenkins',
  email: 'sarah.jenkins@talentai.io',
  role: 'COMPANY_ADMIN',
  company: 'Apex Talent Global',
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  demoLogin: () => {
    localStorage.setItem('accessToken', 'demo-token-talentai-vip');
    set({ user: DEMO_USER, isAuthenticated: true, isLoading: false });
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      localStorage.setItem('accessToken', response.data.data.accessToken);
      set({ user: response.data.data.user, isAuthenticated: true });
    } catch (error: any) {
      // If server unreachable or error in demo mode, allow fallback if desired
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      localStorage.setItem('accessToken', response.data.data.accessToken);
      set({ user: response.data.data.user, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout').catch(() => {});
    } finally {
      localStorage.removeItem('accessToken');
      set({ user: null, isAuthenticated: false });
      window.location.href = '/login';
    }
  },

  checkAuth: async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        set({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }
      
      if (token.startsWith('demo-token')) {
        set({ user: DEMO_USER, isAuthenticated: true, isLoading: false });
        return;
      }

      const response = await api.get('/auth/me');
      set({ user: response.data.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('accessToken');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  }
}));

