import instance from "./instance";

const timeout =  60 * 1000; //1 minute in milliseconds

export const suggestions = async (credentials: { q: string }) => {
    // for login request
    const response = await instance.get(`/search/suggestion?q=${credentials.q}`, {
        timeout,
    });
    return response.data;
};

export const searchQuery = async (credentials: { q: string }) => {
    // for login request
    const response = await instance.get(`/search/query?q=${credentials.q}`, {
        timeout,
    });
    return response.data;
};