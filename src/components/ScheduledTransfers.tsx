import React, { useEffect } from 'react'
import { useScheduledTransferStore } from '../stores/useScheduledTransferStore';

const ScheduledTransfers = () => {

    const { transfers, loading, error, fetchScheduledTransfers } = useScheduledTransferStore();

    useEffect(() => {
        if (transfers.length === 0) fetchScheduledTransfers();
    }, [fetchScheduledTransfers, transfers.length]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!transfers || transfers.length === 0) return <div>No scheduled transfers found.</div>;

    return (
        <>
            <div className='py-5 px-4 mt-20 w-full'>
                <h1 className='text-lg mb-5'>Scheduled Transfers</h1>
                <div className='rounded-lg w-full'>
                    {
                        transfers.map((transfer) => (
                            <div className="flex flex-row justify-start gap-3 mb-4">
                                <img src={transfer.image} alt={transfer.name} className="rounded-md w-[33px] h-[33px]" />
                                <div className="flex flex-col">
                                    <span className="text-[14px]">{transfer.name}</span>
                                    <span className="text-[12px] text-gray-500">{
                                      new Date(transfer.date).toLocaleDateString('en-US', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                      })
                                }</span>
                                </div>
                                <div className="flex flex-col items-end justify-around ml-auto">
                                    <span className="text-[16px] font-bold text-[#000000]">- {transfer.currency}{Math.abs(transfer.amount)}</span>
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