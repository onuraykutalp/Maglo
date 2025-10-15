export interface ScheduledTransfer {
  id: string;
  name: string;
  image: string;
  date: string;
  amount: number;
  currency: string;
  status: "scheduled" | "completed" | "cancelled";
}

export interface ScheduledTransferSummary {
  totalScheduledAmount: number;
  count: number;
}

export interface ScheduledTransferResponse {
  success: boolean;
  message: string;
  data: {
    transfers: ScheduledTransfer[];
    summary: ScheduledTransferSummary;
  };
}