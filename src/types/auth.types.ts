//determining login form data
export interface LoginFormData {
    email: string;
    password: string;
}

//signup form data schema
export interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

export interface User {
    userId: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface AuthUser {
    userId: number | null;
    user: User | null;
    isAuthenticated: boolean;
    isCreated: boolean;
    message: string;
    signupAttempt: number;
    loginAttempt: number;
}
