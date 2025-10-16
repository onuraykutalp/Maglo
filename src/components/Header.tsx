import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {

    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleOpenMobileMenu = () => {
        setMobileMenuOpen(true);
    };

    const handleCloseMobileMenu = () => {
        setMobileMenuOpen(false);
    }

    const handleLogout = () => {
        document.cookie = "token=; path=/; max-age=0";
        navigate("/login");
    };


    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: '/icons/dashboard.png' },
        { name: 'Transactions', href: '#', icon: '/icons/transactions.png' },
        { name: 'Invoices', href: '#', icon: '/icons/invoices.png' },
        { name: 'My Wallets', href: '#', icon: '/icons/wallets.png' },
        { name: 'Settings', href: '#', icon: '/icons/settings.png' },
    ];

    return (
        <>
        <header className="hidden md:flex flex-col min-h-full items-center w-56 h-screen px-4 bg-[#FAFAFA] text-black shadow-md">
            <div className="text-md mt-6 flex justify-start w-full">
                <img src="/maglo.png" alt="Logo" className="w-28 h-auto" />
            </div>
            <div className='mt-4 flex flex-col justify-start w-full'>
                {navItems.map((item) => (
                    <div
                        key={item.name}
                        className={`flex flex-row justify-start mt-6 rounded-md text-md px-2 py-2 mb-[-4px] ${window.location.pathname === item.href
                                ? 'bg-[#c8ee44]'
                                : ''
                            }`}
                    >
                        {item.icon && (
                            <img src={item.icon} alt={`${item.name} icon`} className="w-5 h-5 mr-2" />
                        )}
                        <a
                            href={item.href}
                            className={`block text-gray-700 hover:text-gray-900 ${window.location.pathname === item.href
                                    ? 'text-black font-semibold'
                                    : ''
                                }`}
                        >
                            {item.name}
                        </a>
                    </div>
                ))}
            </div>
            <div className='flex flex-col mt-auto mb-20 justify-start w-full'>
                <a href="#" className='px-4 py-2 rounded-md w-full hover:text-[#b5dd3f] cursor-pointer'><img src="/icons/help.png" alt="Help" className="w-5 h-5 mr-2 inline" />Help</a>
                <a onClick={handleLogout} className='px-4 py-2 rounded-md w-full hover:text-[#b5dd3f] cursor-pointer'>
                    <img src="/icons/logout.png" alt="Settings" className="w-5 h-5 mr-2 inline" />Logout
                </a>
            </div>
        </header>

        <div className="md:hidden fixed top-2 left-1 w-10 h-10 flex items-center justify-center bg-white text-black shadow-md rounded-full z-50">
            <button
            className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            onClick={handleOpenMobileMenu}
            >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            </button>
        </div>

        {
            mobileMenuOpen && (
                <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                className="md:hidden fixed inset-0 z-50 bg-blur-md bg-opacity-50">
                    <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md p-4">
                        <div className="flex justify-between items-center mb-6">
                            <img src="/maglo.png" alt="Logo" className="w-24 h-auto" />
                            <button onClick={handleCloseMobileMenu} className="text-gray-700 hover:text-gray-900 focus:outline-none">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <nav className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-2 py-2 rounded-md text-gray-700 hover:text-gray-900 ${window.location.pathname === item.href
                                        ? 'bg-[#c8ee44] text-black font-semibold'
                                        : ''
                                        }`}
                                >
                                    {item.icon && (
                                        <img src={item.icon
                                            } alt={`${item.name} icon`} className="w-5 h-5 mr-2" />
                                    )}
                                    {item.name}
                                </a>
                            ))}
                            <a href="#" className='px-4 py-2 rounded-md w-full hover:text-[#b5dd3f] cursor-pointer flex items-center'>
                                <img src="/icons/help.png" alt="Help" className="w-5 h-5 mr-2 inline" />Help
                            </a>
                            <a onClick={handleLogout} className='px-4 py-2 rounded-md w-full hover:text-[#b5dd3f] cursor-pointer flex items-center'>
                                <img src="/icons/logout.png" alt="Settings" className="w-5 h-5 mr-2 inline" />Logout
                            </a>
                        </nav>
                    </div>
                </motion.div>
                </AnimatePresence>
            )
        }
        </>
    )
}

export default Header