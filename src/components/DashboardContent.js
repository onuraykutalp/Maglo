import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useFinancialSummaryStore } from '../stores/useFinancialSummaryStore';
import Spinner from './Spinner';
import FinancialSummary from './FinancialSummary';
import WorkingCapital from './WorkingCapital';
import RecentTransaction from './RecentTransaction';
import Wallet from './Wallet';
import ScheduledTransfers from './ScheduledTransfers';
const DashboardContent = () => {
    const { loading, error, summary, fetchSummary } = useFinancialSummaryStore();
    useEffect(() => {
        if (!summary) {
            fetchSummary();
        }
    }, [fetchSummary, summary]);
    if (loading)
        return _jsx(Spinner, {});
    if (error)
        return _jsxs("div", { children: ["Error: ", error] });
    return (_jsx(_Fragment, { children: _jsxs("div", { className: 'flex flex-col lg:flex-row w-full h-full', children: [_jsxs("div", { className: 'w-full lg:w-4/5 px-4 md:px-8 py-4 md:py-6 gap-6 md:gap-10', children: [_jsx(FinancialSummary, { summary: summary }), _jsx(WorkingCapital, {}), _jsx(RecentTransaction, {})] }), _jsxs("div", { className: 'w-full lg:w-auto px-4 md:px-5 gap-2 md:gap-4', children: [_jsx(Wallet, {}), _jsx(ScheduledTransfers, {})] })] }) }));
};
export default DashboardContent;
