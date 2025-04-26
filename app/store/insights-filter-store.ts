import { create } from "zustand";

interface InsightsState {
  searchQuery: string;
  setSearchQuery: (newValue: string) => void;
}

export const useInsightsStore = create<InsightsState>()((set) => ({
  searchQuery: "",
  setSearchQuery: (newValue: string) => set({ searchQuery: newValue }),
}));
