import React, { useEffect, useRef, useState } from "react";
import { useRecentTransactionsStore } from "../stores/useRecentTransactionStore";
import Spinner from "./Spinner";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";


const RecentTransactions: React.FC = () => {
    const { recent, loading, error, fetchRecentTransactions } = useRecentTransactionsStore();

    const [viewAll, setViewAll] = useState(false);

    const showAllTransactions = () => {
        setViewAll(true);
    };

    const closeAllTransactions = () => {
        setViewAll(false);
    };

    const transactionsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!recent) fetchRecentTransactions();
    }, [fetchRecentTransactions, recent]);

    if (loading) return <Spinner />;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!recent) return null;

    return (
        <>
            <div className="bg-white rounded shadow p-4 my-4 relative">
                <div className="absolute top-4 right-4">
                    <button className="flex flex-row items-center text-[#29a073] font-semibold cursor-pointer"
                        onClick={showAllTransactions}>View All <MdKeyboardArrowRight />
                    </button>
                </div>
                <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                <div className="rounded-md">
                    <table className="w-full text-left mb-4">
                        <thead>
                            <tr className="">
                                <th className="py-2 px-2 text-[#929eae]">BUSINESS</th>
                                <th className="py-2 px-2 text-[#929eae]">NAME</th>
                                <th className="py-2 px-2 text-[#929eae]">TYPE</th>
                                <th className="py-2 px-2 text-[#929eae]">AMOUNT</th>
                                <th className="py-2 px-2 text-[#929eae]">DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recent.transactions.slice(0, 3).map(transaction => (
                                <tr key={transaction.id} className="border-b border-gray-100">
                                    <td className="py-2 px-2 flex items-center">
                                        <img src={transaction.image} alt={transaction.business} className="w-8 h-8 rounded mr-2" />
                                        <span className="font-medium">{transaction.business}</span>
                                    </td>
                                    <td className="py-2 px-2">{transaction.name}</td>
                                    <td className="py-2 px-2">{transaction.type}</td>
                                    <td className={`py-2 px-2 font-bold ${transaction.amount < 0 ? "text-red-500" : "text-green-600"}`}>
                                        {transaction.amount < 0 ? "-" : "+"}{Math.abs(transaction.amount).toLocaleString()} {transaction.currency}
                                    </td>
                                    <td className="py-2 px-2 text-xs text-gray-500 text-[16px]">
                                        {new Date(transaction.date).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-6 text-sm text-gray-700">
                        <div>
                            <strong>Total Income:</strong> {recent.summary.totalIncome.toLocaleString()} {recent.transactions[0]?.currency}
                        </div>
                        <div>
                            <strong>Total Expense:</strong> {recent.summary.totalExpense.toLocaleString()} {recent.transactions[0]?.currency}
                        </div>
                        <div>
                            <strong>Count:</strong> {recent.summary.count}
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence>
                {viewAll && (
                    <motion.div
                        className="fixed inset-0 flex justify-center items-start pt-20 z-50 overflow-scroll"
                        style={{
                            backdropFilter: "blur(8px)",
                            WebkitBackdropFilter: "blur(8px)",
                            backgroundColor: "rgba(255,255,255,0.1)"
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAllTransactions}
                    >
                        <div
                            className="bg-white rounded shadow p-6 max-w-7xl w-full"
                            onClick={e => e.stopPropagation()}
                            ref={transactionsRef}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">All Transactions</h3>
                                <button
                                    className="text-[#29a073] font-semibold"
                                    onClick={closeAllTransactions}
                                >
                                    Close
                                </button>
                            </div>
                            <table className="w-full text-left mb-4">
                                <thead>
                                    <tr>
                                        <th className="py-2 px-2 text-[#929eae]">BUSINESS</th>
                                        <th className="py-2 px-2 text-[#929eae]">NAME</th>
                                        <th className="py-2 px-2 text-[#929eae]">TYPE</th>
                                        <th className="py-2 px-2 text-[#929eae]">AMOUNT</th>
                                        <th className="py-2 px-2 text-[#929eae]">DATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recent.transactions.map(transaction => (
                                        <tr key={transaction.id} className="border-b border-gray-100">
                                            <td className="py-2 px-2 flex items-center">
                                                <img src={transaction.image} alt={transaction.business} className="w-8 h-8 rounded mr-2" />
                                                <span className="font-medium">{transaction.business}</span>
                                            </td>
                                            <td className="py-2 px-2">{transaction.name}</td>
                                            <td className="py-2 px-2">{transaction.type}</td>
                                            <td className={`py-2 px-2 font-bold ${transaction.amount < 0 ? "text-red-500" : "text-green-600"}`}>
                                                {transaction.amount < 0 ? "-" : "+"}{Math.abs(transaction.amount).toLocaleString()} {transaction.currency}
                                            </td>
                                            <td className="py-2 px-2 text-xs text-gray-500 text-[16px]">
                                                {new Date(transaction.date).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default RecentTransactions;