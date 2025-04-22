// handles all cart related routes 
import instance from "./instance";
const timeout = 3 * 60 * 1000; //5 minutes in milliseconds

export const viewCart = async (credentials: unknown) => {
    const response = await instance.post("/cart/view", credentials, {
        timeout,
    });
    return response.data;
};

export const addToCart = async (credentials: unknown) => {
    const response = await instance.post("/cart/add", credentials, {
        timeout,
    });
    return response.data;
};
export const removeFromCart = async (credentials: unknown) => {
    const response = await instance.post("/cart/remove", credentials, {
        timeout,
    });
    return response.data;
};