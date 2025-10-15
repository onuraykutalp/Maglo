import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { getCookie } from "../utils/getCookie";
import { validate } from "../utils/validateRegister";
const Register = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);
    const registerAction = useAuthStore((s) => s.register);
    const loading = useAuthStore((s) => s.loading);
    const error = useAuthStore((s) => s.error);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({ ...errors, [e.target.name]: undefined });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        const success = await registerAction(formData);
        if (success) {
            toast.success("Register is successful! Please log in.");
            navigate("/login");
        }
        else {
            toast.error(error || "Register failed! Please check your information.");
        }
    };
    return (_jsxs("div", { className: "flex flex-col md:flex-row justify-around items-center max-w-screen max-h-screen w-full bg-white relative", children: [_jsxs("div", { className: "w-full md:w-1/2 max-w-md mx-auto", children: [_jsx("div", { className: "absolute top-20", children: _jsx("img", { src: "../maglo.png", alt: "Logo", className: "w-24 h-auto mb-4" }) }), _jsx("h2", { className: "text-2xl font-semibold mb-2", children: "Create new account" }), _jsx("span", { className: "text-gray-600 mb-6 block", children: "Welcome! Please enter your details" }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Full Name" }), _jsx("input", { name: "fullName", value: formData.fullName, onChange: handleChange, className: `w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.fullName ? "border-red-500" : "border-gray-300"}` }), errors.fullName && _jsx("span", { className: "text-red-500 text-sm", children: errors.fullName })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Email" }), _jsx("input", { name: "email", value: formData.email, onChange: handleChange, type: "email", className: `w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.email ? "border-red-500" : "border-gray-300"}` }), errors.email && _jsx("span", { className: "text-red-500 text-sm", children: errors.email })] }), _jsxs("div", { children: [_jsx("label", { className: "block mb-1 font-medium", children: "Password" }), _jsx("input", { name: "password", value: formData.password, onChange: handleChange, type: "password", required: true, className: `w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.fullName ? "border-red-500" : "border-gray-300"}` }), errors.password && _jsx("span", { className: "text-red-500 text-sm", children: errors.password })] }), error && _jsx("div", { className: "text-red-500", children: error }), _jsx("button", { type: "submit", disabled: loading, className: "w-full py-2 px-4 font-semibold bg-[#c8ee44] text-black rounded-md hover:bg-[#b3d600] transition disabled:opacity-50", children: loading ? "Creating Account" : "Create Account" }), _jsxs("button", { type: "button", className: "w-full py-2 px-4 font-semibold bg-white border border-gray-200 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition", onClick: () => window.location.href = "/api/auth/google", disabled: loading, children: [_jsx("img", { src: "https://www.svgrepo.com/show/355037/google.svg", alt: "Google", className: "w-5 h-5" }), "Sign up with Google"] }), _jsx("div", { className: "mt-6 text-center text-gray-400", children: _jsxs("span", { children: ["Already have an account?", " ", _jsxs("a", { href: "/login", className: "text-[#1b212d] hover:text-[#c8ee44] hover:font-semibold relative inline-flex items-center", children: ["Sign in", _jsx("img", { src: "icons/underline.svg", alt: "", className: "absolute left-0 bottom-0 w-full top-6", style: { pointerEvents: "none" } })] })] }) })] })] }), _jsx("div", { className: "w-full md:w-1/2 flex justify-center items-center", children: _jsx("img", { src: "../image.png", alt: "Image", className: "w-full h-auto max-h-screen object-cover" }) })] }));
};
export default Register;
