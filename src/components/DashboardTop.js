import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../stores/auth';
import { useNavigate } from 'react-router';
import { getCookie } from '../utils/getCookie';
import axios from 'axios';
import Spinner from './Spinner';
import { AnimatePresence, motion } from 'framer-motion';
import { IoMdClose } from "react-icons/io";
const DashboardTop = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const user = useAuthStore((s) => s.user);
    const fetchUser = useAuthStore((s) => s.fetchUser);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchInput, setSearchInput] = useState(false);
    const [openNotifications, setOpenNotifications] = useState(false);
    const handleOpenSearch = () => {
        setSearchInput(true);
    };
    const handleCloseSearch = () => {
        setSearchInput(false);
    };
    const handleOpenNotifications = () => {
        setOpenNotifications(true);
    };
    const handleCloseNotifications = () => {
        setOpenNotifications(false);
    };
    const notification = useRef(null);
    useEffect(() => {
        fetchUser();
        const handleClickOutside = (event) => {
            if (notification.current && !notification.current.contains(event.target)) {
                setOpenNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [fetchUser, notification]);
    const dropdownRef = useRef(null);
    useEffect(() => {
        const token = getCookie("token");
        if (!token) {
            navigate("/login");
            return;
        }
        axios.get("/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
            setLoading(false);
        })
            .catch(() => {
            setLoading(false);
            navigate("/login");
        });
    }, [navigate]);
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);
    const handleLogout = () => {
        document.cookie = "token=; path=/; max-age=0";
        navigate("/login");
    };
    if (loading) {
        return (_jsx(Spinner, {}));
    }
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "flex flex-row items-center justify-between p-10 bg-white text-black", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Dashboard" }), _jsxs("div", { className: "flex items-center", children: [_jsx("div", { className: "relative flex items-center mr-4", children: searchInput ? (_jsxs(AnimatePresence, { children: [_jsx(motion.input, { initial: { opacity: 0, scale: 0.95, x: 30 }, animate: { opacity: 1, scale: 1, x: 0 }, exit: { opacity: 0, scale: 0.95, x: 30 }, transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25,
                                            duration: 0.25
                                        }, type: "text", className: "absolute right-10 p-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring bg-white w-48", placeholder: "Search...", autoFocus: true, onBlur: handleCloseSearch }), _jsx("button", { className: "p-2 rounded-md cursor-pointer", onClick: handleCloseSearch, "aria-label": "Close Search", children: _jsx(IoMdClose, { className: "w-5 h-5" }) })] })) : (_jsx("button", { className: "p-2 text-white rounded-md cursor-pointer", onClick: handleOpenSearch, "aria-label": "Search", children: _jsx("img", { src: "/icons/search.png", alt: "Search", className: "w-5 h-5" }) })) }), _jsxs("div", { className: "relative", ref: notification, children: [_jsx("button", { onClick: handleOpenNotifications, className: "ml-2 p-2 text-white rounded-md cursor-pointer", children: _jsx("img", { src: "/icons/notification.png", alt: "Notifications", className: "w-5 h-5" }) }), openNotifications && (_jsx(AnimatePresence, { children: _jsxs(motion.div, { ref: notification, initial: { opacity: 0, scale: 0.95, y: -20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -20 }, transition: {
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 25,
                                            duration: 0.25
                                        }, className: "absolute mt-2 w-64 bg-white rounded shadow-lg z-50", children: [_jsx("div", { className: "flex justify-between items-center px-4 py-2", children: _jsx("span", { className: "font-medium text-black", children: "Notifications" }) }), _jsx("div", { className: "p-4", children: _jsx("p", { className: "text-sm text-gray-600", children: "No new notifications." }) }), _jsx("div", { className: 'absolute top-1 right-1', children: _jsx("button", { className: "p-1 rounded-md cursor-pointer z-20", onClick: handleCloseNotifications, "aria-label": "Close Notifications", children: _jsx(IoMdClose, { className: "w-4 h-4 text-gray-400 cursor-pointer" }) }) })] }) }))] }), _jsxs("div", { className: "relative ml-4 bg-[#fafafa] rounded-xl", ref: dropdownRef, children: [_jsxs("button", { ref: dropdownRef, className: "flex items-center px-4 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer", onClick: toggleDropdown, children: [_jsx("img", { src: "./johndoe.jpg", alt: user?.fullName || "User", className: "w-8 h-auto rounded-full mr-2" }), _jsx("span", { className: "font-medium text-black", children: user?.fullName || "Kullanıcı" }), _jsx("svg", { className: "w-4 h-4 ml-1", fill: "none", stroke: "currentColor", strokeWidth: 2, viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" }) })] }), dropdownOpen && (_jsx(AnimatePresence, { children: _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, className: "absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-90", children: _jsxs("button", { className: "block w-full px-4 py-2 text-left hover:bg-gray-100", onClick: handleLogout, children: [_jsx("img", { src: "/icons/logout.png", alt: "Logout", className: "w-5 h-5 mr-2 inline" }), "Logout"] }) }) }))] })] })] }) }));
};
export default DashboardTop;
