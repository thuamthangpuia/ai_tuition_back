export interface RegisterUser {
     username: string;
        password: string;
        email: string;
        phone: string;
        full_name: string;
        user_type: string;
        address?: string; 
        dob?: string;
        gender?: string;
        school?: string;
        grade?: string;
}