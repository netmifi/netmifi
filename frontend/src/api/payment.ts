// this file handles all user requests
import instance from "./instance";

const timeout = 10 * 60 * 1000; //5 minutes in milliseconds
export const purchase = async (credentials: unknown) => {
    const response = await instance.post("/payments/purchase", credentials, {
        timeout,
    });
    return response.data;
};


