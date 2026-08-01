import { getMe } from '@/service/getMe';
import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  profileImage?: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
}


export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const res = await getMe();
      if (res?.success && res?.data) {
        set({ user: res.data, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },

  clearUser: () => set({ user: null, isLoading: false }),
}));