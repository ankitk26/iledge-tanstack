import { create } from "zustand";

type AdminStoreState = {
  selectedCategoryId: number;
  selectedPayeeId: number;
  setSelectedCategoryId: (id: number) => void;
  setSelectedPayeeId: (id: number) => void;
};

export const useAdminStore = create<AdminStoreState>((set) => ({
  selectedCategoryId: 0,
  selectedPayeeId: 0,
  setSelectedCategoryId: (id: number) => set({ selectedCategoryId: id }),
  setSelectedPayeeId: (id: number) => set({ selectedPayeeId: id }),
}));
