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
