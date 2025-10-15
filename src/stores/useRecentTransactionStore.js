import { create } from "zustand";
import axios from "axios";
import { getCookie } from "../utils/getCookie";
const API_URL = import.meta.env.VITE_API_URL || "https://case.nodelabs.dev/api";
export const useRecentTransactionsStore = create((set) => ({
    recent: null,
    loading: false,
    error: null,
    fetchRecentTransactions: async () => {
        set({ loading: true, error: null });
        try {
            const token = getCookie("token");
            const response = await axios.get(`${API_URL}/financial/transactions/recent`, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.success) {
                set({ recent: response.data.data, loading: false });
            }
            else {
                set({ error: response.data.message || "Unknown error", loading: false });
            }
        }
        catch (err) {
            set({ error: err.message, loading: false });
        }
    },
}));
