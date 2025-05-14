// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  mobileNumber: string | null;
  isAuthenticated: boolean;
  setToken: (token: string, mobileNumber: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      mobileNumber: null,
      isAuthenticated: false,
      setToken: (token, mobileNumber) => 
        set({ token, mobileNumber, isAuthenticated: true }),
      logout: () => 
        set({ token: null, mobileNumber: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);