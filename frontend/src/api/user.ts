import axios from "./axios";


export const findUser = async (credentials: unknown) => {
    const response = await axios.post("/user/find-user", credentials, {
        timeout: 3 * 60 * 60 * 1000,
    });
    return response.data;
};

export const checkUserAuth = async () => {
    const response = await axios.get("/user/check-user", {
        timeout: 3 * 60 * 60 * 1000,
    })
    return response.data;
};
