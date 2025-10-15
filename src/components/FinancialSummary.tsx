import React from 'react';
import type { FinancialSummary as FinancialSummaryType } from '../types/FinancialSummary';

interface Props {
  summary: FinancialSummaryType | null;
}

const FinancialSummary: React.FC<Props> = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="py-2 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full">
        {/* Total Balance */}
        <div className="bg-[#363a3f] rounded-xl shadow p-2 sm:p-3 md:p-4 h-[125px] flex flex-row items-center">
          <div className="mr-2 sm:mr-3 flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 bg-[#4e5257] rounded-full">
            <img
              src="/icons/wallet.png"
              alt="Total Balance"
              className="object-cover w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
            />
          </div>
          <div className="ml-2">
            <h3 className="text-[#757575] mb-1 sm:mb-1 text-xs sm:text-sm md:text-base lg:text-lg font-medium">Total balance</h3>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              {summary.totalBalance.amount.toLocaleString()} {summary.totalBalance.currency}
            </div>
          </div>
        </div>
        {/* Total Expense */}
        <div className="bg-[#f8f8f8] rounded-xl shadow p-2 sm:p-3 md:p-4 h-[125px] flex flex-row items-center">
          <div className="mr-2 sm:mr-3 flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 bg-[#ebe8e8] rounded-full">
            <img
              src="/icons/wallet-gray.png"
              alt="Total Expense"
              className="object-cover w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
            />
          </div>
          <div className="ml-2">
            <h3 className="text-[#4e5257] mb-1 sm:mb-1 text-xs sm:text-sm md:text-base lg:text-lg font-medium">Total spending</h3>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#1b212d]">
              {summary.totalExpense.amount.toLocaleString()} {summary.totalExpense.currency}
            </div>
          </div>
        </div>
        {/* Total Savings */}
        <div className="bg-[#f8f8f8] rounded-xl shadow p-2 sm:p-3 md:p-4 h-[125px] flex flex-row items-center">
          <div className="mr-2 sm:mr-3 flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 bg-[#ebe8e8] rounded-full">
            <img
              src="/icons/saving.png"
              alt="Total Savings"
              className="object-cover w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
            />
          </div>
          <div className="ml-2">
            <h3 className="text-[#4e5257] mb-1 sm:mb-1 text-xs sm:text-sm md:text-base lg:text-lg font-medium">Total savings</h3>
            <div className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#1b212d]">
              {summary.totalSavings.amount.toLocaleString()} {summary.totalSavings.currency}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;