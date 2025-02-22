import axios from "./axios";

const timeout = 3 * 60 * 1000; //5 minutes in milliseconds

export const newsletterSignup = async (credentials: { email: string;}) => {
    const response = await axios.post("/services/newsletter", credentials, {
        timeout,
    });
    return response.data;
};