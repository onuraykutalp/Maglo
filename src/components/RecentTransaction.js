import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { useRecentTransactionsStore } from "../stores/useRecentTransactionStore";
import Spinner from "./Spinner";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
const RecentTransactions = () => {
    const { recent, loading, error, fetchRecentTransactions } = useRecentTransactionsStore();
    const [viewAll, setViewAll] = useState(false);
    const showAllTransactions = () => {
        setViewAll(true);
    };
    const closeAllTransactions = () => {
        setViewAll(false);
    };
    const transactionsRef = useRef(null);
    useEffect(() => {
        if (!recent)
            fetchRecentTransactions();
    }, [fetchRecentTransactions, recent]);
    if (loading)
        return _jsx(Spinner, {});
    if (error)
        return _jsxs("div", { className: "text-red-500", children: ["Error: ", error] });
    if (!recent)
        return null;
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-white rounded shadow p-4 my-4 relative", children: [_jsx("div", { className: "absolute top-4 right-4", children: _jsxs("button", { className: "flex flex-row items-center text-[#29a073] font-semibold cursor-pointer", onClick: showAllTransactions, children: ["View All ", _jsx(MdKeyboardArrowRight, {})] }) }), _jsx("h3", { className: "text-lg font-semibold mb-4", children: "Recent Transactions" }), _jsxs("div", { className: "rounded-md", children: [_jsxs("table", { className: "w-full text-left mb-4", children: [_jsx("thead", { children: _jsxs("tr", { className: "", children: [_jsx("th", { className: "py-2 px-2 text-[#929eae]", children: "BUSINESS" }), _jsx("th", { className: "py-2 px-2 text-[#929eae]", children: "NAME" }), _jsx("th", { className: "py-2 px-2 text-[#929eae]", children: "TYPE" }), _jsx("th", { className: "py-2 px-2 text-[#929eae]", children: "AMOUNT" }), _jsx("th", { className: "py-2 px-2 text-[#929eae]", children: "DATE" })] }) }), _jsx("tbody", { children: recent.transactions.slice(0, 3).map(transaction => (_jsxs("tr", { className: "border-b border-gray-100", children: [_jsxs("td", { className: "py-2 px-2 flex items-center", children: [_jsx("img", { src: transaction.image, alt: transaction.business, className: "w-8 h-8 rounded mr-2" }), _jsx("span", { className: "font-medium", children: transaction.business })] }), _jsx("td", { className: "py-2 px-2", children: transaction.name }), _jsx("td", { className: "py-2 px-2", children: transaction.type }), _jsxs("td", { className: `py-2 px-2 font-bold ${transaction.amount < 0 ? "text-red-500" : "text-green-600"}`, children: [transaction.amount < 0 ? "-" : "+", Math.abs(transaction.amount).toLocaleString(), " ", transaction.currency] }), _jsx("td", { className: "py-2 px-2 text-xs text-gray-500 text-[16px]", children: new Date(transaction.date).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }) })] }, transaction.id))) })] }), _jsxs("div", { className: "flex justify-between mt-6 text-sm text-gray-700", children: [_jsxs("div", { children: [_jsx("strong", { children: "Total Income:" }), " ", recent.summary.totalIncome.toLocaleString(), " ", recent.transactions[0]?.currency] }), _jsxs("div", { children: [_jsx("strong", { children: "Total Expense:" }), " ", recent.summary.totalExpense.toLocaleString(), " ", recent.transactions[0]?.currency] }), _jsxs("div", { children: [_jsx("strong", { children: "Count:" }), " ", recent.summary.count] })] })] })] }), _jsx(AnimatePresence, { children: viewAll && (_jsx(motion.div, { className: "fixed inset-0 flex justify-center items-start pt-20 z-50 overflow-scroll", style: {
                        backdropFilter: "blur(8px)",
                        WebkitBackdropFilter: "blur(8px)",
                        backgroundColor: "rgba(255,255,255,0.1)"
                    }, initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: closeAllTransactions, children: _jsxs("div", { className: "bg-white rounded shadow p-6 max-w-7xl w-full", onClick: e => e.stopPropagation(), ref: transactionsRef, children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h3", { className: "text-lg font-semibold", children: "All Transactions" }), _jsx("button", { className: "text-[#29a073] font-semibold", onClick: closeAllTransactions, children: "Close" })] }), _jsxs("table", { className: "w-full text-left mb-4", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { className: "py-2 px-2 text-[#929eae]", children: "BUSINESS" }), _jsx("th", { className: "py-2 px-2 text-[#929eae]", children: "NAME" }), _jsx("th", { className: "py-2 px-2 text-[#929eae]", children: "TYPE" }), _jsx("th", { className: "py-2 px-2 text-[#929eae]", children: "AMOUNT" }), _jsx("th", { className: "py-2 px-2 text-[#929eae]", children: "DATE" })] }) }), _jsx("tbody", { children: recent.transactions.map(transaction => (_jsxs("tr", { className: "border-b border-gray-100", children: [_jsxs("td", { className: "py-2 px-2 flex items-center", children: [_jsx("img", { src: transaction.image, alt: transaction.business, className: "w-8 h-8 rounded mr-2" }), _jsx("span", { className: "font-medium", children: transaction.business })] }), _jsx("td", { className: "py-2 px-2", children: transaction.name }), _jsx("td", { className: "py-2 px-2", children: transaction.type }), _jsxs("td", { className: `py-2 px-2 font-bold ${transaction.amount < 0 ? "text-red-500" : "text-green-600"}`, children: [transaction.amount < 0 ? "-" : "+", Math.abs(transaction.amount).toLocaleString(), " ", transaction.currency] }), _jsx("td", { className: "py-2 px-2 text-xs text-gray-500 text-[16px]", children: new Date(transaction.date).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    }) })] }, transaction.id))) })] })] }) })) })] }));
};
export default RecentTransactions;
