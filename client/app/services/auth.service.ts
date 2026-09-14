import { axiosInstance } from "./axiosInstance";

export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "farmer" | "buyer" | "FARMER" | "BUYER";
  accountType: "INDIVIDUAL" | "BUSINESS";
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  signup: async (payload: SignupPayload) => {
    // Normalize role string to lowercase matching backend enum ("farmer" | "buyer")
    const normalizedRole = payload.role.toLowerCase() as "farmer" | "buyer";
    const response = await axiosInstance.post("/auth/signup", {
      ...payload,
      role: normalizedRole,
    });
    return response.data;
  },

  login: async (payload: LoginPayload) => {
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  },

  forgotPassword: async (email: string) => {
    const response = await axiosInstance.post("/auth/forgot-password", { email });
    return response.data;
  },
};

export const signup = authService.signup;
export const login = authService.login;
export const logout = authService.logout;
