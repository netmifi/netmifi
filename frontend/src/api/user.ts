import { useApp } from "@/app/app-provider";
import axios from "./axios";
import Cookies from "js-cookie";


export const findUser = async (credentials: unknown) => {
    const response = await axios.post("/user/find-user", credentials, {
        timeout: 3 * 60 * 60 * 1000,
    });
    return response.data;
};

export const checkUserAuth = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
 
    const response = await axios.get("/user/check-user", {
        timeout: 3 * 60 * 60 * 1000,
    })
    // }
    // if (response.status === 200) {
    //     console.log(response.data.data)
    // }

    return response.data;
};
