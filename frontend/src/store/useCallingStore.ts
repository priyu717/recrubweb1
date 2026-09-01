import { create } from 'zustand';
import api from '../services/api';

interface CallingState {
  activeCallId: string | null;
  activeCandidateId: string | null;
  status: 'IDLE' | 'INITIATING' | 'RINGING' | 'CONNECTED' | 'COMPLETED';
  duration: number; // seconds
  startCall: (candidateId: string) => Promise<void>;
  endCall: (disposition: string) => Promise<void>;
  tickTimer: () => void;
  reset: () => void;
}

export const useCallingStore = create<CallingState>((set, get) => ({
  activeCallId: null,
  activeCandidateId: null,
  status: 'IDLE',
  duration: 0,

  startCall: async (candidateId: string) => {
    set({ status: 'INITIATING', activeCandidateId: candidateId, duration: 0 });
    try {
      const response = await api.post('/calls/initiate', { candidateId });
      set({ 
        activeCallId: response.data.data.id, 
        status: response.data.data.status // RINGING 
      });
      
      // Simulate answering after 3 seconds
      setTimeout(() => {
        const { status } = get();
        if (status === 'RINGING') {
          set({ status: 'CONNECTED' });
        }
      }, 3000);
      
    } catch (error) {
      set({ status: 'IDLE', activeCallId: null, activeCandidateId: null });
      throw error;
    }
  },

  endCall: async (disposition: string) => {
    const { activeCallId, duration } = get();
    if (!activeCallId) return;
    
    try {
      await api.post(`/calls/${activeCallId}/end`, { duration, disposition });
      set({ status: 'COMPLETED' });
    } catch (error) {
      console.error(error);
      set({ status: 'COMPLETED' }); // Force end locally anyway
    }
  },
  
  tickTimer: () => {
    set((state) => ({ duration: state.duration + 1 }));
  },

  reset: () => {
    set({ activeCallId: null, activeCandidateId: null, status: 'IDLE', duration: 0 });
  }
}));
