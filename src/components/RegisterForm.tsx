import React, { useEffect, useState } from "react";
import { useAuthStore } from "../stores/auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { getCookie } from "../utils/getCookie";
import { validate } from "../utils/validateRegister";
import Spinner from "./Spinner";

const Register: React.FC = () => {
  const navigate = useNavigate();

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

  const registerAction = useAuthStore((s) => s.register);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState<{ fullName?: string, email?: string, password?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: undefined });
  };



  const handleSubmit = async (e: React.FormEvent) => {
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
    } else {
      toast.error(error || "Register failed! Please check your information.");
    }
  };

  if (pageLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full bg-white relative">
      <div className="w-full md:w-1/2 max-w-md mx-auto px-4 py-8 md:py-0 flex flex-col justify-center">
        <div className="flex justify-center md:justify-start mb-6 md:mb-8">
          <img src="../maglo.png" alt="Logo" className="w-20 h-auto md:w-24" />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-center md:text-left">Create new account</h2>
        <span className="text-gray-600 mb-6 block text-center md:text-left">Welcome! Please enter your details</span>
        <form onSubmit={handleSubmit} className={`space-y-5 ${loading ? "opacity-60 pointer-events-none" : ""}`}>
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={loading}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.fullName ? "border-red-500" : "border-gray-300"} ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
            {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              disabled={loading}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.email ? "border-red-500" : "border-gray-300"} ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              required
              disabled={loading}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${errors.password ? "border-red-500" : "border-gray-300"} ${loading ? "bg-gray-100 cursor-not-allowed" : ""}`}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 font-semibold bg-[#c8ee44] text-black rounded-md hover:bg-[#b3d600] transition disabled:opacity-50"
          >
            {loading ? "Creating Account" : "Create Account"}
          </button>
          <button
            type="button"
            className="w-full py-2 px-4 font-semibold bg-white border border-gray-200 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition"
            onClick={() => window.location.href = "/api/auth/google"}
            disabled={loading}
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
            <span className="truncate">Sign up with Google</span>
          </button>
          <div className="mt-6 text-center text-gray-400">
            <span>
              Already have an account?{" "}
              <a href="/login" className="text-[#1b212d] hover:text-[#c8ee44] hover:font-semibold relative inline-flex items-center">
                Sign in
                <img
                  src="icons/underline.svg"
                  alt=""
                  className="absolute left-0 bottom-0 w-full top-6"
                  style={{ pointerEvents: "none" }}
                />
              </a>
            </span>
          </div>
        </form>
      </div>
      <div className="hidden md:flex w-1/2 justify-center items-center h-full">
        <img src="../image.png" alt="Image" className="w-full h-auto max-h-screen object-cover rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default Register;