export interface SignupInterface {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    role: string;
}
export interface LoginInterface {
    email: string;
    password: string;
}
export interface ForgotPassword {
    email: string;
}
export interface ResetPassword {
    token: string;
    password: string;
}
export interface AuthResponse {
    token: string;
    user: {
        id: string;
        name?: string;
        email: string;
        role: string;
    };
}
//# sourceMappingURL=auth.types.d.ts.map