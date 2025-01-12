import axios from "./axios";

export const findUser = async (credentials: unknown) => {
    const response = await axios.post("/auth/sign-up", credentials, {
        timeout: 3 * 60 * 60 * 1000,
    });
    return response.data;
};
