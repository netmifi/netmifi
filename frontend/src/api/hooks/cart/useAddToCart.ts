import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../cart";
import { useApp } from "@/app/app-provider";

export const useAddToCart = () => {
    const { setUser, setIsAuth } = useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addToCart,// **REF ../../cart**
        onSuccess: (data) => {
            console.log(data.data)
            setUser(data.data);
            setIsAuth(true);
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Login Error:", error);
        },
    });
};
