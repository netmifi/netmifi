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
    isEmailVerified: boolean;
    // refreshToken: string;
    generatedCode: {
        for: string;
        code: number;
    }
}

export interface SignInValuesType {
    email: string;
    password: string;
}

