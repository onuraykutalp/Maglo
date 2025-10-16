import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/auth';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { setCookie } from '../utils/setCookie';
import { getCookie } from '../utils/getCookie';
import Spinner from './Spinner';
import { validateLogin } from '../utils/validateLogin';


const LoginForm = () => {

    const navigate = useNavigate()
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const token = getCookie("token")
        if (token) {
            navigate("/dashboard")
        }

        const timer = setTimeout(() => {
            setPageLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate]);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const login = useAuthStore((s) => s.login)
    const loading = useAuthStore((s) => s.loading)

    const [errors, setErrors] = useState<{ email?: string, password?: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        setErrors({ ...errors, [e.target.name]: undefined });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (loading) return

        const newErrors = validateLogin(formData);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});


        const result = await login(formData);
        console.log("Login token:", result.accessToken);

        if (result && result.accessToken) {
            setCookie("token", result.accessToken, 1)
            toast.success("Login successful!")
            navigate("/dashboard")
        } else {
            toast.error(result?.message || "Login failed! Please check your credentials.")
        }
    }

    if (pageLoading) {
        return <Spinner />
    }

    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full bg-white relative">
            <div className="w-full md:w-1/2 flex flex-col items-center px-4 py-8 md:py-0 md:px-8 max-w-lg mx-auto relative z-10">
                <div className="mb-8 md:absolute md:top-[-100px] md:left-0 flex justify-center md:justify-start w-full">
                    <img
                        src="../maglo.png"
                        alt="Logo"
                        className="w-20 h-auto md:w-24"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center">Sign In</h2>
                <span className="text-gray-600 mb-6 block text-center text-base md:text-lg">
                    Welcome back! Please enter your details
                </span>
                <form onSubmit={handleSubmit} className="space-y-5 w-full">
                    <div>
                        <label className="block mb-1 font-medium text-sm md:text-base">Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            disabled={loading}
                            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.email ? "border-red-500" : "border-gray-300"} ${loading ? "bg-gray-100 cursor-not-allowed" : ""} text-sm md:text-base`}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email}</span>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-medium text-sm md:text-base">Password</label>
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            disabled={loading}
                            className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.password ? "border-red-500" : "border-gray-300"} ${loading ? "bg-gray-100 cursor-not-allowed" : ""} text-sm md:text-base`}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password}</span>
                        )}
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2 px-4 font-semibold bg-[#c8ee44] text-black rounded-md hover:bg-[#b3d600] transition disabled:opacity-50 text-sm md:text-base"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                window.location.href = "/api/auth/google";
                            }}
                            disabled={loading}
                            className="w-full py-2 px-4 font-semibold bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            Sign in with Google
                        </button>
                    </div>
                </form>
                <div className="mt-6 text-center text-gray-400 text-sm md:text-base">
                    <span>
                        Don’t have an account?{" "}
                        <a
                            href="/register"
                            className="text-[#1b212d] hover:text-[#c8ee44] hover:font-semibold relative inline-flex items-center"
                        >
                            Sign up
                            <img
                                src="icons/underline.svg"
                                alt=""
                                className="absolute left-0 bottom-0 w-full top-6"
                                style={{ pointerEvents: "none" }}
                            />
                        </a>
                    </span>
                </div>
            </div>
            <div className="hidden md:flex w-1/2 justify-center items-center h-full">
                <img src="../image.png" alt="Image" className="w-full h-auto max-h-screen object-cover rounded-lg shadow-lg" />
            </div>
        </div>
    )
}

export default LoginForm