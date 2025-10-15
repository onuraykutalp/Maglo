import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import type { WorkingCapitalMonth } from "../types/WorkingCapital";

const monthMap: { [key: string]: string } = {
    "Ocak": "January", "Şubat": "February", "Mart": "March", "Nisan": "April",
    "Mayıs": "May", "Haziran": "June", "Temmuz": "July", "Ağustos": "August",
    "Eylül": "September", "Ekim": "October", "Kasım": "November", "Aralık": "December"
};

interface Props {
    data: WorkingCapitalMonth[];
    currency: string;
}

const FILTERS = [
    { key: "last6Months", label: "Last 6 Months" },
    { key: "last3Months", label: "Last 3 Months" },
    { key: "lastMonth", label: "Last Month" },
];

const WorkingCapitalChart: React.FC<Props> = ({ data, currency }) => {
    const [filter, setFilter] = useState("last6Months");

    const englishData = data.map(item => ({
        ...item,
        month: monthMap[item.month] || item.month,
    }));

    let filteredData = englishData;
    if (filter === "last3Months") {
        filteredData = englishData.slice(-3);
    } else if (filter === "lastMonth") {
        filteredData = englishData.slice(-1);
    }

    const maxValue = Math.max(...filteredData.flatMap(item => [item.income, item.expense]));
    const step = 10000;
    const yMax = Math.ceil(maxValue / step) * step;
    const ticks = Array.from({ length: Math.floor(yMax / step) + 1 }, (_, i) => i * step);

    return (
        <div className="bg-white rounded shadow p-4 my-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Working Capital</h3>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <span className="inline-block w-4 h-4 rounded-full" style={{ background: "#17c964" }} />
                        <span className="font-medium text-sm mr-2">Income</span>
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="inline-block w-4 h-4 rounded-full" style={{ background: "#d6e60e" }} />
                        <span className="font-medium text-sm">Expense</span>
                    </span>
                    {/* Filtre Dropdown */}
                    <div className="relative">
                        <select
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            className="bg-[#f8f8f8] p-4 pr-8 rounded appearance-none"
                        >
                            {FILTERS.map(opt => (
                                <option key={opt.key} value={opt.key}>{opt.label}</option>
                            ))}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#666]">
                            <IoIosArrowDown />
                        </span>
                    </div>
                    {/* Legend açıklamaları */}

                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={filteredData}>
                    <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis
                        tickFormatter={value => `${Math.round(value / 1000)}K`}
                        domain={[0, yMax]}
                        ticks={ticks}
                    />
                    <Tooltip
                        formatter={value => `${value.toLocaleString()} ${currency}`}
                        labelFormatter={label => `${label}`}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#17c964"
                        name="Income"
                        strokeWidth={3}
                        dot={true}
                    />
                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#d6e60e"
                        name="Expense"
                        strokeWidth={3}
                        dot={true}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default WorkingCapitalChart;