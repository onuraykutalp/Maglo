import { create } from "zustand";
import axios from "axios";
import { getCookie } from "../utils/getCookie";
const API_URL = import.meta.env.VITE_API_URL + "/financial/summary";
export const useFinancialSummaryStore = create((set) => ({
    summary: null,
    loading: false,
    error: null,
    fetchSummary: async () => {
        set({ loading: true, error: null });
        try {
            const token = getCookie("token");
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.data.success) {
                set({ summary: response.data.data, loading: false });
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
