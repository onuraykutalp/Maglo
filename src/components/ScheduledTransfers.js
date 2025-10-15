import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useScheduledTransferStore } from '../stores/useScheduledTransferStore';
const ScheduledTransfers = () => {
    const { transfers, loading, error, fetchScheduledTransfers } = useScheduledTransferStore();
    useEffect(() => {
        if (transfers.length === 0)
            fetchScheduledTransfers();
    }, [fetchScheduledTransfers, transfers.length]);
    if (loading)
        return _jsx("div", { children: "Loading..." });
    if (error)
        return _jsxs("div", { children: ["Error: ", error] });
    if (!transfers || transfers.length === 0)
        return _jsx("div", { children: "No scheduled transfers found." });
    return (_jsx(_Fragment, { children: _jsxs("div", { className: 'py-5 px-4 mt-20 w-full', children: [_jsx("h1", { className: 'text-lg mb-5', children: "Scheduled Transfers" }), _jsx("div", { className: 'rounded-lg w-full', children: transfers.map((transfer) => (_jsxs("div", { className: "flex flex-row justify-start gap-3 mb-4", children: [_jsx("img", { src: transfer.image, alt: transfer.name, className: "rounded-md w-[33px] h-[33px]" }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-[14px]", children: transfer.name }), _jsx("span", { className: "text-[12px] text-gray-500", children: new Date(transfer.date).toLocaleDateString('en-US', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true
                                        }) })] }), _jsx("div", { className: "flex flex-col items-end justify-around ml-auto", children: _jsxs("span", { className: "text-[16px] font-bold text-[#000000]", children: ["- ", transfer.currency, Math.abs(transfer.amount)] }) })] }))) })] }) }));
};
export default ScheduledTransfers;
