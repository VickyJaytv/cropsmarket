import type { SignupInput, LoginInput } from "@/app/schema/auth.schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  success: boolean;
  message: string | string[];
  data?: T;
}

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: "buyer" | "farmer";
  accountType: string;
  createdAt: string;
  updatedAt: string;
}

export async function signup(data: SignupInput): Promise<ApiResponse<UserData>> {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw {
      success: false,
      message: json.message,
    };
  }

  return json;
}

export async function login(
  data: LoginInput
): Promise<ApiResponse<UserData>> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw {
      success: false,
      message: json.message,
    };
  }

  return json;
}

export async function logout(): Promise<ApiResponse<null>> {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const json = await res.json();

  if (!res.ok) {
    throw {
      success: false,
      message: json.message,
    };
  }

  return json;
}
