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

export interface instructorApplicationType {
    username: string;
    phoneNumber: string;
    country: {
        name: string;
        dialCode: string;
        code: string;
    },

    residentialAddress: string;
    facebook?: string;
    instagram: string;
    twitter: string;
    tiktok: string;
    youtube: string;
    website: string;

    niche: string;
    whyInterest: string;
    taughtOnlineBefore: 'yes' | 'no';
    beenMentor: 'yes' | 'no';
    about: string;
}

export interface verifiedRequest extends Request {
    user: any
}