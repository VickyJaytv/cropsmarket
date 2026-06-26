export interface SignupInterface {
    name: string;
    email: string;
    phoneNo: string;
    password: string;
    confirmPassword: string;
    role: string;
}
export interface LoginInterface {
    email: string;
    password: string;
}
export interface confirmEmailInterface {
    email: string;
}
export interface ForgotPassword {
    email: string;
}
export interface ResetPassword {
    token: string;
    password: string;
    confirmPassword: string;
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