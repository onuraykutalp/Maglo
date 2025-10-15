import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
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
    };
    const handleLogout = () => {
        document.cookie = "token=; path=/; max-age=0";
        navigate("/login");
    };
    const navItems = [
        { name: 'Dashboard', href: '/dashboard', icon: '/icons/dashboard.png' },
        { name: 'Transactions', href: '/transactions', icon: '/icons/transactions.png' },
        { name: 'Invoices', href: '/invoices', icon: '/icons/invoices.png' },
        { name: 'My Wallets', href: '/my-wallets', icon: '/icons/wallets.png' },
        { name: 'Settings', href: '/settings', icon: '/icons/settings.png' },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs("header", { className: "hidden md:flex flex-col min-h-full items-center w-56 h-screen px-4 bg-[#FAFAFA] text-black shadow-md", children: [_jsx("div", { className: "text-md mt-6 flex justify-start w-full", children: _jsx("img", { src: "/maglo.png", alt: "Logo", className: "w-28 h-auto" }) }), _jsx("div", { className: 'mt-4 flex flex-col justify-start w-full', children: navItems.map((item) => (_jsxs("div", { className: `flex flex-row justify-start mt-6 rounded-md text-md px-2 py-2 mb-[-4px] ${window.location.pathname === item.href
                                ? 'bg-[#c8ee44]'
                                : ''}`, children: [item.icon && (_jsx("img", { src: item.icon, alt: `${item.name} icon`, className: "w-5 h-5 mr-2" })), _jsx("a", { href: item.href, className: `block text-gray-700 hover:text-gray-900 ${window.location.pathname === item.href
                                        ? 'text-black font-semibold'
                                        : ''}`, children: item.name })] }, item.name))) }), _jsxs("div", { className: 'flex flex-col mt-auto mb-4 justify-start w-full', children: [_jsxs("a", { href: "#", className: 'px-4 py-2 rounded-md w-full hover:text-[#b5dd3f] cursor-pointer', children: [_jsx("img", { src: "/icons/help.png", alt: "Help", className: "w-5 h-5 mr-2 inline" }), "Help"] }), _jsxs("a", { onClick: handleLogout, className: 'px-4 py-2 rounded-md w-full hover:text-[#b5dd3f] cursor-pointer', children: [_jsx("img", { src: "/icons/logout.png", alt: "Settings", className: "w-5 h-5 mr-2 inline" }), "Logout"] })] })] }), _jsx("div", { className: "md:hidden fixed top-2 left-1 w-10 h-10 flex items-center justify-center bg-white text-black shadow-md rounded-full z-50", children: _jsx("button", { className: "p-2 text-gray-700 hover:text-gray-900 focus:outline-none", onClick: handleOpenMobileMenu, children: _jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) }) }), mobileMenuOpen && (_jsx(AnimatePresence, { children: _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, className: "md:hidden fixed inset-0 z-50 bg-blur-md bg-opacity-50", children: _jsxs("div", { className: "fixed top-0 left-0 w-64 h-full bg-white shadow-md p-4", children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsx("img", { src: "/maglo.png", alt: "Logo", className: "w-24 h-auto" }), _jsx("button", { onClick: handleCloseMobileMenu, className: "text-gray-700 hover:text-gray-900 focus:outline-none", children: _jsx("svg", { className: "h-6 w-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), _jsxs("nav", { className: "flex flex-col space-y-4", children: [navItems.map((item) => (_jsxs("a", { href: item.href, className: `flex items-center px-2 py-2 rounded-md text-gray-700 hover:text-gray-900 ${window.location.pathname === item.href
                                            ? 'bg-[#c8ee44] text-black font-semibold'
                                            : ''}`, children: [item.icon && (_jsx("img", { src: item.icon, alt: `${item.name} icon`, className: "w-5 h-5 mr-2" })), item.name] }, item.name))), _jsxs("a", { href: "#", className: 'px-4 py-2 rounded-md w-full hover:text-[#b5dd3f] cursor-pointer flex items-center', children: [_jsx("img", { src: "/icons/help.png", alt: "Help", className: "w-5 h-5 mr-2 inline" }), "Help"] }), _jsxs("a", { onClick: handleLogout, className: 'px-4 py-2 rounded-md w-full hover:text-[#b5dd3f] cursor-pointer flex items-center', children: [_jsx("img", { src: "/icons/logout.png", alt: "Settings", className: "w-5 h-5 mr-2 inline" }), "Logout"] })] })] }) }) }))] }));
};
export default Header;
