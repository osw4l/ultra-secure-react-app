import { create } from "zustand";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
}));
