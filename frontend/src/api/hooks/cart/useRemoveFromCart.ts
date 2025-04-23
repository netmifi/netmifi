import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../../cart";
import { useApp } from "@/app/app-provider";

export const useRemoveFromCart = () => {
    const { setUser, setIsAuth } = useApp();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFromCart,// **REF ../../cart**
        onSuccess: (data) => {
            setUser(data.data);
            setIsAuth(true);
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Cart Error:", error);
        },
    });
};
