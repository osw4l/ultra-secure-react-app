import { create } from "zustand";

export interface Category {
  id: number;
  uuid: string;
  name: string;
  icon: string;
  selectedCategoryKey?: string;
  custom?: boolean;
}

interface CategoriesState {
  categories: Category[];
  isModalOpen: boolean;
  setCategories: (categories: Category[]) => void;
  clearCategories: () => void;
  toggleModalOpen: () => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  isModalOpen: false,
  setCategories: (categories: Category[]) => set({ categories }),
  clearCategories: () => set({ categories: [] }),
  toggleModalOpen: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));
