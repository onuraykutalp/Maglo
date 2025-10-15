import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
const monthMap = {
    "Ocak": "January", "Şubat": "February", "Mart": "March", "Nisan": "April",
    "Mayıs": "May", "Haziran": "June", "Temmuz": "July", "Ağustos": "August",
    "Eylül": "September", "Ekim": "October", "Kasım": "November", "Aralık": "December"
};
const FILTERS = [
    { key: "last6Months", label: "Last 6 Months" },
    { key: "last3Months", label: "Last 3 Months" },
    { key: "lastMonth", label: "Last Month" },
];
const WorkingCapitalChart = ({ data, currency }) => {
    const [filter, setFilter] = useState("last6Months");
    const englishData = data.map(item => ({
        ...item,
        month: monthMap[item.month] || item.month,
    }));
    let filteredData = englishData;
    if (filter === "last3Months") {
        filteredData = englishData.slice(-3);
    }
    else if (filter === "lastMonth") {
        filteredData = englishData.slice(-1);
    }
    const maxValue = Math.max(...filteredData.flatMap(item => [item.income, item.expense]));
    const step = 10000;
    const yMax = Math.ceil(maxValue / step) * step;
    const ticks = Array.from({ length: Math.floor(yMax / step) + 1 }, (_, i) => i * step);
    return (_jsxs("div", { className: "bg-white rounded shadow p-4 my-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsx("h3", { className: "text-lg font-semibold", children: "Working Capital" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx("span", { className: "inline-block w-4 h-4 rounded-full", style: { background: "#17c964" } }), _jsx("span", { className: "font-medium text-sm mr-2", children: "Income" })] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx("span", { className: "inline-block w-4 h-4 rounded-full", style: { background: "#d6e60e" } }), _jsx("span", { className: "font-medium text-sm", children: "Expense" })] }), _jsxs("div", { className: "relative", children: [_jsx("select", { value: filter, onChange: e => setFilter(e.target.value), className: "bg-[#f8f8f8] p-4 pr-8 rounded appearance-none", children: FILTERS.map(opt => (_jsx("option", { value: opt.key, children: opt.label }, opt.key))) }), _jsx("span", { className: "pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666]", children: _jsx(IoIosArrowDown, {}) })] })] })] }), _jsx(ResponsiveContainer, { width: "100%", height: 300, children: _jsxs(LineChart, { data: filteredData, children: [_jsx(CartesianGrid, { stroke: "#eee", strokeDasharray: "3 3" }), _jsx(XAxis, { dataKey: "month" }), _jsx(YAxis, { tickFormatter: value => `${Math.round(value / 1000)}K`, domain: [0, yMax], ticks: ticks }), _jsx(Tooltip, { formatter: value => `${value.toLocaleString()} ${currency}`, labelFormatter: label => `${label}` }), _jsx(Legend, {}), _jsx(Line, { type: "monotone", dataKey: "income", stroke: "#17c964", name: "Income", strokeWidth: 3, dot: true }), _jsx(Line, { type: "monotone", dataKey: "expense", stroke: "#d6e60e", name: "Expense", strokeWidth: 3, dot: true })] }) })] }));
};
export default WorkingCapitalChart;
