import React from 'react';
import type { FinancialSummary as FinancialSummaryType } from '../types/FinancialSummary';
import currency from "currency.js";

interface Props {
  summary: FinancialSummaryType | null;
}

function getCurrencySymbol(code: string): string {
  switch (code) {
    case "USD": return "$";
    case "EUR": return "€";
    case "TRY": return "₺";
    case "GBP": return "£";
    default: return code + " ";
  }
}

const FinancialSummary: React.FC<Props> = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="py-2 w-full">
      <div className="grid grid-cols-1 max-[1300px]:grid-cols-2 min-[1000px]:grid-cols-2 max-[1000px]:grid-cols-1 min-[1300px]:grid-cols-3 xxx:grid-cols-3 gap-3 w-full">

        <div className="bg-[#363a3f] rounded-xl shadow p-2 sm:p-3 md:p-2 h-[125px] flex flex-row items-center transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
          <div className="mr-2 sm:mr-3 flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 bg-[#4e5257] rounded-full">
            <img
              src="/icons/wallet.png"
              alt="Total Balance"
              className="object-cover w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
            />
          </div>
          <div className="ml-2">
            <h3 className="text-[#757575] mb-1 sm:mb-1 text-xs sm:text-sm md:text-base lg:text-lg font-medium">Total balance</h3>
            <div className="p-0">
              <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
                {currency(summary.totalBalance.amount, {
                  symbol: getCurrencySymbol(summary.totalBalance.currency) + " ",
                  precision: 2,
                  separator: ",",
                  decimal: "."
                }).format()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[#f8f8f8] rounded-xl shadow p-2 sm:p-3 md:p-2 h-[125px] flex flex-row items-center transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
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
              {currency(summary.totalExpense.amount, {
                symbol: getCurrencySymbol(summary.totalExpense.currency) + " ",
                precision: 2,
                separator: ",",
                decimal: "."
              }).format()}
            </div>
          </div>
        </div>

        <div className="bg-[#f8f8f8] rounded-xl shadow p-2 sm:p-3 md:p-2 h-[125px] flex flex-row items-center transition-transform duration-200 hover:scale-105 hover:shadow-lg cursor-pointer">
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
              {currency(summary.totalSavings.amount, {
                symbol: getCurrencySymbol(summary.totalSavings.currency) + " ",
                precision: 2,
                separator: ",",
                decimal: "."
              }).format()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;