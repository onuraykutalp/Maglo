import React, { useEffect } from 'react'
import { useScheduledTransferStore } from '../stores/useScheduledTransferStore';
import Spinner from './Spinner';
import currency from "currency.js";

const ScheduledTransfers = () => {

    const { transfers, loading, error, fetchScheduledTransfers } = useScheduledTransferStore();

    useEffect(() => {
        if (transfers.length === 0) fetchScheduledTransfers();
    }, [fetchScheduledTransfers, transfers.length]);

    if (loading) return <Spinner />;
    if (error) return <div>Error: {error}</div>;
    if (!transfers || transfers.length === 0) return <div>No scheduled transfers found.</div>;

    return (
        <>
            <div className='py-5 px-4 mt-24 w-full'>
                <h1 className='text-lg font-semibold mb-5'>Scheduled Transfers</h1>
                <div className='rounded-lg w-full'>
                    {
                        transfers.map((transfer) => (
                            <div className="flex flex-row justify-start gap-3 mb-4">
                                <img src={transfer.image} alt={transfer.name} className="rounded-md w-[50px] h-[50px]" />
                                <div className="flex flex-col gap-2">
                                    <span className="text-[14px] font-semibold">{transfer.name}</span>
                                    <span className="text-[12px] text-gray-500">
                                        {(() => {
                                            const d = new Date(transfer.date);
                                            const dateStr = d.toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            });
                                            const timeStr = d.toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: false
                                            });
                                            return `${dateStr} at ${timeStr}`;
                                        })()}
                                    </span>
                                </div>
                                <div className="flex flex-col items-end justify-around ml-auto">
                                    <span className="text-[16px] font-bold text-[#000000]">
                                        - {currency(Math.abs(transfer.amount), {
                                            symbol: transfer.currency + "",
                                            precision: 2,
                                            separator: ",",
                                            decimal: "."
                                        }).format()}
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default ScheduledTransfers