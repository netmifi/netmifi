export interface UserSchemaDocument {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    theme: 'system' | 'light' | 'dark';
    roles: string[];
    interests: string[];
    adSources: string[];
    isUserVerified: boolean,
    isEmailVerified: boolean;
}

