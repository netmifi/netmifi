// this file handles all user requests
import instance from "./instance";

const timeout = 3 * 60 * 1000; //5 minutes in milliseconds
export const findUser = async (credentials: unknown) => {
    const response = await instance.post("/user/find-user", credentials, {
        timeout,
    });
    return response.data;
};

export const checkUserAuth = async () => {
    const response = await instance.get("/user/check-user", {
        timeout,
    })
    return response.data;
};

export const updateProfile = async (credentials: unknown) => {
    const response = await instance.put("/user/update-profile", credentials, {
        timeout,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};
export const updatePassword = async (credentials: unknown) => {
    const response = await instance.put("/user/update-password", credentials, {
        timeout,
    });
    return response.data;
};

export const changeTheme = async (credentials: unknown) => {
    const response = await instance.post("/user/change-theme", credentials, {
        timeout,
    });
    return response.data;
};


