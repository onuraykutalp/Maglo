import { create } from "zustand";
import axios from "axios";
import { getCookie } from "../utils/getCookie";
import type { ScheduledTransfer, ScheduledTransferSummary } from "../types/ScheduledTransfer";

const API_URL = import.meta.env.VITE_API_URL;

interface ScheduledTransferState {
  transfers: ScheduledTransfer[];
  summary: ScheduledTransferSummary | null;
  loading: boolean;
  error: string | null;
  fetchScheduledTransfers: () => Promise<void>;
}
export const useScheduledTransferStore = create<ScheduledTransferState>((set) => ({
    transfers: [],
    summary: null,
    loading: false,
    error: null,
    fetchScheduledTransfers: async () => {
        set({ loading: true, error: null });
        try {
            const token = getCookie("token");
            const response = await axios.get(`${API_URL}/financial/transfers/scheduled`, 
                 { headers: { Authorization: `Bearer ${token}` } }
            );
            if(response.data.success){
                set({ transfers: response.data.data.transfers, summary: response.data.data.summary, loading:false });
            }
        } catch (err: any) {
            set({ loading: false, error: err.message });
        }
    }
}))