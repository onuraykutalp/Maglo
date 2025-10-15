import React, { useEffect } from "react";
import { useWalletStore } from "../stores/useWalletStore";
import { HiOutlineDotsHorizontal } from "react-icons/hi";


const Wallet = () => {
    const { wallet, loading, error, fetchWallet } = useWalletStore();

    useEffect(() => {
        if (!wallet) fetchWallet();
    }, [fetchWallet, wallet]);

    if (loading) return (
        <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-[170px] w-[340px] bg-gray-300 rounded-2xl"></div>
        </div>
    );
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!wallet || wallet.cards.length === 0) return <div>No card found.</div>;

    const card = wallet.cards[0];

    return (
        <>
            <div className="flex flex-row">
                <h2 className="text-xl font-semibold mb-4">Wallet</h2>
                <button className="justify-end ml-auto p-2 text-[#929eae] rounded-md cursor-pointer">
                    <HiOutlineDotsHorizontal size={24} />
                </button>
            </div>
            <div className="relative w-[370px] h-[340px] mx-auto flex justify-center">

                {/* Koyu kart */}
                <div className="absolute top-0 left-0 w-full z-10">
                    <div className="rounded-2xl p-6 shadow-xl min-w-[340px] min-h-[170px] flex flex-col gap-4
      bg-[radial-gradient(circle_at_60%_40%,#636363_0%,#232323_100%)] text-white">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">

                                <span className="ml-2 font-medium text-gray-300">{card.bank}</span>
                            </div>
                            <span className="text-xl opacity-70 ml-2">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16C10.4183 16 14 19.5817 14 24" stroke="#444" strokeWidth="2" /><path d="M18 16C22.4183 16 26 19.5817 26 24" stroke="#444" strokeWidth="2" /></svg>
                            </span>
                        </div>
                        <div className="flex items-center gap-3 mt-4 mb-2">
                            <span className="bg-[#cfcfcf] w-10 h-8 rounded flex items-center justify-center text-gray-700 text-lg">
                                <img src="./icons/chip.png" alt="Chip" />
                            </span>
                        </div>
                        <div className="mb-2 font-mono tracking-widest select-none text-2xl font-bold">
                            {card.cardNumber}
                        </div>
                        <div className="flex justify-between items-end mt-1">
                            <span className="text-base opacity-70">
                                {String(card.expiryMonth).padStart(2, "0")}/{String(card.expiryYear).slice(-2)}
                            </span>
                            <img src="./icons/visa.png" alt="VISA" />
                        </div>
                    </div>
                </div>

                {/* şeffaf-blurlu kart) */}
                <div className="absolute top-[185px] left-1/2 z-30 -translate-x-1/2">
                    <div className="
                        rounded-2xl p-5 shadow-xl min-w-[340px] min-h-[100px] flex flex-col gap-3
                        bg-gradient-to-br from-[#e4e3de]/50 via-[#e4e3de]/50 to-[#f7f7f2]/50
                        border border-[#e8e7e3] text-[#15181A]
                        backdrop-blur-xs
                        bg-opacity-80
                        relative
                    ">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="ml-2 font-medium text-white">{card.bank}</span>
                            </div>
                            <span className="text-xl opacity-60 ml-2">
                                <img src="./icons/wifi.png" alt="Wireless" className="mt-6" />
                            </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 mb-1">
                            <img src="./icons/chip.png" alt="Chip" className="w-8 h-6" />
                        </div>
                        <div className="mb-1 font-mono tracking-widest select-none text-xl font-extrabold">
                            {card.cardNumber.slice(0, 8) + "****"}
                        </div>
                        <div className="flex justify-between items-end mt-0">
                            <span className="text-sm text-gray-500">
                                {String(card.expiryMonth).padStart(2, "0")}/{String(card.expiryYear).slice(-2)}
                            </span>
                            <img src="./icons/visa.png" alt="VISA" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wallet;