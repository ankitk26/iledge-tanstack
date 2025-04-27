import { create } from "zustand";

type AdminStoreState = {
  selectedCategoryId: number;
  selectedPayeeId: number;
  defaultCategoryId: number;
  setSelectedCategoryId: (id: number) => void;
  setSelectedPayeeId: (id: number) => void;
  setDefaultCategoryId: (id: number) => void;
  resetStore: () => void;
};

export const useAdminStore = create<AdminStoreState>((set) => ({
  selectedCategoryId: 0,
  selectedPayeeId: 0,
  defaultCategoryId: 0,
  setSelectedCategoryId: (id: number) => set({ selectedCategoryId: id }),
  setSelectedPayeeId: (id: number) => set({ selectedPayeeId: id }),
  setDefaultCategoryId: (id: number) => set({ defaultCategoryId: id }),
  resetStore: () =>
    set({ selectedCategoryId: 0, selectedPayeeId: 0, defaultCategoryId: 0 }),
}));
