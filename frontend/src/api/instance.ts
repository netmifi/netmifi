//  THIS FILE SHOULD NOT BE TEMPERED WITH
//  this is the default axios request headers and 
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_ROUTE; // **REF .env file**

export default axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

// export const axiosPrivate = axios.create({
//     baseURL: BASE_URL,
//     headers: { "Content-Type": "application/json" },
//     withCredentials: true,
// });
