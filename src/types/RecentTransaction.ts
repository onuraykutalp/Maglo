export interface RecentTransaction {
  id: string;
  name: string;
  business: string;
  image: string;
  type: string;
  amount: number;
  currency: string;
  date: string;
  status: string;
}

export interface RecentTransactionsSummary {
  totalIncome: number;
  totalExpense: number;
  count: number;
}

export interface RecentTransactionsResponse {
  transactions: RecentTransaction[];
  summary: RecentTransactionsSummary;
}