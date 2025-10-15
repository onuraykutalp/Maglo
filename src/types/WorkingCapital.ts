export interface WorkingCapitalMonth {
  month: string;
  income: number;
  expense: number;
  net: number;
}

export interface WorkingCapitalSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}

export interface WorkingCapitalData {
  period: string;
  currency: string;
  data: WorkingCapitalMonth[];
  summary: WorkingCapitalSummary;
}