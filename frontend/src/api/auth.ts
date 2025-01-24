import axios from "./axios";

const timeout = 60 * 60 * 10;

export const login = async (credentials: { email: string; password: string }) => {
    const response = await axios.post("/auth/sign-in", credentials, {
        timeout,
    });
    return response.data;
};

export const register = async (credentials: unknown) => {
    const response = await axios.post("/auth/sign-up", credentials, {
        timeout,
    });
    return response.data;
};

export const logout = async () => {
    const response = await axios.delete("/auth/logout", {
        timeout,
    });
    return response.data;
};

export const findCode = async (credentials: unknown) => {
    const response = await axios.post("/auth/find-code", credentials, {
        timeout,
    });
    return response.data;
};

export const verifyCode = async (credentials: { id: string; code: number; state: string }) => {
    const response = await axios.post("/auth/verify-code", credentials, {
        timeout,
    });
    return response.data;
};

export const resendCode = async (credentials: { state: string; email: string; }) => {
    const response = await axios.post("/auth/resend-code", credentials, {
        timeout,
    });
    return response.data;
};
export const mailCode = async (credentials: { email: string; }) => {
    const response = await axios.post("/auth/mail-code", credentials, {
        timeout,
    });
    return response.data;
};
export const changePassword = async (credentials: { email: string; password: string }) => {
    const response = await axios.put("/auth/change-password", credentials, {
        timeout,
    });
    return response.data;
};

export const interestAdSource = async (credentials: { interests: string[]; adSource: string[] }) => {
    const response = await axios.put("/auth/interests-adsource", credentials, {
        timeout,
    });
    return response.data;
};

export const registerInstructor = async (credentials: unknown) => {
    const response = await axios.post("/auth/register-instructor", credentials, {
        timeout,
    });
    return response.data;
};



