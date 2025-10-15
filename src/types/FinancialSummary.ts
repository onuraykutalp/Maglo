export interface ChangeInfo {
    percentage: number;
    trend: 'up' | 'down';
}

export interface FinancialSummary {
    totalBalance: {
        amount: number;
        currency: string;
        change: ChangeInfo;
    };
    totalExpense: {
        amount: number;
        currency: string;
        change: ChangeInfo;
    };
    totalSavings: {
        amount: number;
        currency: string;
        change: ChangeInfo;
    };
}