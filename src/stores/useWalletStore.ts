import { create } from "zustand";
import axios from "axios";
import { getCookie } from "../utils/getCookie";
import type { WalletCardsResponse } from "../types/WalletCard";

const API_URL = import.meta.env.VITE_API_URL || "https://case.nodelabs.dev/api";

interface WalletState {
  wallet: WalletCardsResponse | null;
  loading: boolean;
  error: string | null;
  fetchWallet: () => Promise<void>;
}

export const useWalletStore = create<WalletState>((set) => ({
  wallet: null,
  loading: false,
  error: null,
  fetchWallet: async () => {
    set({ loading: true, error: null });
    try {
      const token = getCookie("token");
      const response = await axios.get(
        `${API_URL}/financial/wallet`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        set({ wallet: response.data.data, loading: false });
      } else {
        set({ error: response.data.message || "Unknown error", loading: false });
      }
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));