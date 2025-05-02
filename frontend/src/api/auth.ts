// this file handles all authentication related axios fetch request
//  !!! NOTE please use make sure to use the same request method with backend e.g POST, GET
//  !!! if no backend directive please use POST for new data, PUT for updates, DELETE for removal.

// ## Each function here should have a
// ___ a credential parameter
// ___ request that uses the axios instance
// ___ make sure to match the request url to the backend
// ___ send the credentials to the backend 
// ___ return the response data

import instance from "./instance";

const timeout = 3 * 60 * 1000; //5 minutes in milliseconds

export const login = async (credentials: { email: string; password: string }) => {
    // for login request
    const response = await instance.post("/auth/sign-in", credentials, {
        timeout,
    });
    return response.data;
};

export const register = async (credentials: unknown) => {
    const response = await instance.post("/auth/sign-up", credentials, {
        timeout,
    });
    return response.data;
};

export const googleAuth = async (credentials: unknown) => {
    const response = await instance.post("/auth/google", credentials, {
        timeout,
    });
    return response.data;
};

export const logout = async () => {
    const response = await instance.delete("/auth/logout", {
        timeout,
    });
    return response.data;
};

export const findCode = async (credentials: unknown) => {
    const response = await instance.post("/auth/find-code", credentials, {
        timeout,
    });
    return response.data;
};

export const verifyCode = async (credentials: { id: string; code: number; state: string }) => {
    const response = await instance.post("/auth/verify-code", credentials, {
        timeout,
    });
    return response.data;
};

export const resendCode = async (credentials: { state: string; email: string; }) => {
    const response = await instance.post("/auth/resend-code", credentials, {
        timeout,
    });
    return response.data;
};

export const mailCode = async (credentials: { email: string; }) => {
    const response = await instance.post("/auth/mail-code", credentials, {
        timeout,
    });
    return response.data;
};

export const changePassword = async (credentials: { email: string; password: string }) => {
    const response = await instance.put("/auth/change-password", credentials, {
        timeout,
    });
    return response.data;
};

export const interestAdSource = async (credentials: { interests: string[]; adSource: string[] }) => {
    const response = await instance.put("/auth/interests-adsource", credentials, {
        timeout,
    });
    return response.data;
};

export const instructorRegister = async (data: {
    phone: string;
    country: {
        name: string;
        dialCode: string;
        code: string;
        flag: string;
    };
    residentialAddress: string;
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    website?: string;
    niche: string;
    whyInterest: string;
    taughtBefore: string;
    mentoredPreviously: string;
    about: string;
}) => {
    try {
        const response = await instance.post('/auth/register-instructor', data);
        return response.data;
    } catch (error: any) {
        throw error.response?.data || error;
    }
};