import { create } from "zustand";

interface Filter {
  search?: string;
  category?: number | null;
  user_category?: number | null;
}

interface FilterState {
  filter: Filter;
  selectedCategoryUUID: string;
  setFilter: (filterData: Filter) => void;
  clearFilter: () => void;
  setSelectedCategory: (uuid: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  filter: {
    search: "",
    category: null,
    user_category: null,
  },
  selectedCategoryUUID: "",
  setFilter: (filterData: Filter) => {
    set((state) => ({
      filter: {
        ...state.filter,
        ...filterData,
      },
    }));
  },
  clearFilter: () =>
    set({
      filter: {
        search: "",
        category: null,
        user_category: null,
      },
      selectedCategoryUUID: "",
    }),
  setSelectedCategory: (uuid: string) => set({ selectedCategoryUUID: uuid }),
}));
