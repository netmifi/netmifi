import { purchase } from "@/api/payment";
import { useMutation } from "@tanstack/react-query";


export const usePurchase = () => {
    // handles newsletter signup 
    return useMutation({
        mutationFn: purchase,
        onError: (error) => {
            console.error("Purchase Error:", error);
        },
    });
};
