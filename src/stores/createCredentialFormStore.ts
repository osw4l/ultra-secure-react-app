import { create } from "zustand";

import { Category } from "@/stores/categoriesStore.ts";

interface CredentialFormData {
  category?: Category;
  username?: string;
  password?: string;
  website?: string;
  notes?: string;
}

interface CredentialStore {
  credentialFormData: CredentialFormData;
  setCredentialFormData: (formData: CredentialFormData) => void;
  isModalOpen: boolean;
  toggleModalOpen: () => void;
  saving: boolean;
  currentFormStep: number;
  startSaving: () => void;
  stopSaving: () => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

export const useCredentialFormStore = create<CredentialStore>((set) => ({
  credentialFormData: {
    category: {
      id: 0,
      uuid: "",
      name: "",
      icon: "",
      selectedCategoryKey: "",
    },
    username: "",
    password: "",
    website: "",
    notes: "",
  },
  isModalOpen: false,
  saving: false,
  currentFormStep: 0,
  setCredentialFormData: (formData: CredentialFormData) => {
    set((state) => ({
      credentialFormData: {
        ...state.credentialFormData,
        ...formData,
      },
    }));
  },
  toggleModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
  startSaving: () => set({ saving: true }),
  stopSaving: () => set({ saving: false }),
  nextStep: () =>
    set((state) => ({ currentFormStep: state.currentFormStep + 1 })),
  prevStep: () =>
    set((state) => ({ currentFormStep: state.currentFormStep - 1 })),
  resetStep: () => set((_) => ({ currentFormStep: 0 })),
}));
