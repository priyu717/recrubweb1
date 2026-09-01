import { create } from 'zustand';
import api from '../services/api';

export interface TeamMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: { name: string };
  createdAt: string;
}

interface TeamState {
  members: TeamMember[];
  roles: { id: string, name: string }[];
  isLoading: boolean;
  fetchTeam: () => Promise<void>;
  fetchRoles: () => Promise<void>;
  inviteMember: (data: any) => Promise<void>;
}

export const useTeamStore = create<TeamState>((set) => ({
  members: [],
  roles: [],
  isLoading: false,

  fetchTeam: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/users');
      set({ members: response.data.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error(error);
    }
  },

  fetchRoles: async () => {
    try {
      const response = await api.get('/users/roles');
      set({ roles: response.data.data });
    } catch (error) {
      console.error(error);
    }
  },

  inviteMember: async (data) => {
    try {
      await api.post('/users', data);
      // Refresh list
      const response = await api.get('/users');
      set({ members: response.data.data });
    } catch (error) {
      throw error;
    }
  }
}));
