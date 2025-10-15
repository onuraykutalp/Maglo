import { create } from "zustand";
import axios from "axios";
import { getCookie } from "../utils/getCookie";
import type { RecentTransactionsResponse } from "../types/RecentTransaction";

const API_URL = import.meta.env.VITE_API_URL || "https://case.nodelabs.dev/api";

interface RecentTransactionsState {
  recent: RecentTransactionsResponse | null;
  loading: boolean;
  error: string | null;
  fetchRecentTransactions: () => Promise<void>;
}

export const useRecentTransactionsStore = create<RecentTransactionsState>((set) => ({
  recent: null,
  loading: false,
  error: null,
  fetchRecentTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const token = getCookie("token");
      const response = await axios.get(
        `${API_URL}/financial/transactions/recent`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        set({ recent: response.data.data, loading: false });
      } else {
        set({ error: response.data.message || "Unknown error", loading: false });
      }
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));