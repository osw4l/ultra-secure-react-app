import { create } from "zustand";

import { Category } from "@/stores/categoriesStore.ts";

export interface Credential {
  id: number;
  category?: number;
  user_category?: number;
  category_data?: Category;
  username: string;
  password: string;
  website: string;
  notes: string;
}

interface CredentialsState {
  credentials: Credential[];
  credentialDetail: Credential;
  loading: boolean;
  isModalOpen: boolean;
  setCredentials: (credentials: Credential[]) => void;
  clearCredentials: () => void;
  setLoading: (loading: boolean) => void;
  setCredentialDetail: (credential: Credential) => void;
  toggleModalOpen: () => void;
}

export const useCredentialsStore = create<CredentialsState>((set) => ({
  credentials: [],
  credentialDetail: {
    id: 0,
    username: "",
    password: "",
    website: "",
    notes: "",
  },
  loading: false,
  isModalOpen: false,
  setCredentials: (credentials: Credential[]) => set({ credentials }),
  clearCredentials: () => set({ credentials: [] }),
  setLoading: (loading: boolean) => set({ loading }),
  setCredentialDetail: (credential: Credential) => set({ credentialDetail: credential }),
  toggleModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));
