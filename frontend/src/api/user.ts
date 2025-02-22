import axios from "./axios";
const timeout = 3 * 60 * 1000; //5 minutes in milliseconds


export const findUser = async (credentials: unknown) => {
    const response = await axios.post("/user/find-user", credentials, {
        timeout,
    });
    return response.data;
};

export const checkUserAuth = async () => {
    const response = await axios.get("/user/check-user", {
        timeout,
    })
    return response.data;
};

export const updateProfile = async (credentials: unknown) => {
    const response = await axios.put("/user/update-profile", credentials, {
        timeout,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};
export const updatePassword = async (credentials: unknown) => {
    const response = await axios.put("/user/update-password", credentials, {
        timeout,
    });

    return response.data;
};
export const changeTheme = async (credentials: unknown) => {
    const response = await axios.put("/user/change-theme", credentials, {
        timeout,
    });
    return response.data;
};


