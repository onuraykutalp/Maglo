import { create } from "zustand";
import api from "../api/client";
import type { User } from "../types/User";
import type { AuthResponse } from "../types/AuthResponse";
import type { LoginRequest } from "../types/LoginRequest";
import type { RegisterRequest } from "../types/RegisterRequest";
import type { RegisterResponse } from "../types/RegisterResponse";
import type { LoginResponse } from "../types/LoginResponse";
import { setCookie } from "../utils/setCookie";
import { getCookie } from "../utils/getCookie";

const API_URL = import.meta.env.VITE_API_URL;

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (data: LoginRequest) => Promise<LoginResponse>;
    register: (data: RegisterRequest) => Promise<boolean>;
    logout: () => void;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    loading: false,
    error: null,
    login: async (data: LoginRequest): Promise<LoginResponse> => {
        set({ loading: true, error: null });
        try {
            const res = await api.post(`${API_URL}/users/login`, data);
            setCookie("token", res.data.data.accessToken, 1);
            set({
                user: res.data.data.user,
                token: res.data.data.accessToken,
                loading: false,
                error: null
            });
            return {
                success: res.data.success,
                message: res.data.message,
                user: res.data.data.user,
                accessToken: res.data.data.accessToken
            };
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Login failed", loading: false });
            return {
                success: false,
                message: err?.response?.data?.message || "Login failed"
            };
        }
    },
    register: async (data) => {
        set({ loading: true, error: null });
        try {
            const res = await api.post<RegisterResponse>(`${API_URL}/users/register`, data);
            set({
                user: res.data.data,
                loading: false,
                error: null,
            });
            console.log("Registration successful:", res.data);
            return true;
        } catch (err: any) {
            console.log("Register error:", err?.response?.data);
            if (err?.response?.data?.details) {
                console.log("Validation details:", err.response.data.details);
            }
            set({
                error: err?.response?.data?.message || "Registration failed",
                loading: false
            });
            return false;
        }
    },
    logout: () => {
        set({ user: null, token: null });
        document.cookie = "token=; path=/; max-age=0";
    },
    fetchUser: async () => {
        set({ loading: true, error: null });
        try {
            const token = getCookie("token");
            if (!token) {
                set({ user: null, loading: false });
                return;
            }
            const response = await api.get("users/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log("API response:", response.data);
            set({ user: response.data.data, loading: false });
        } catch (error: any) {
            console.error("fetchUser error:", error);
            set({ error: error.message, loading: false });
        }
    }
}));