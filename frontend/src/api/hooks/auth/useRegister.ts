import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register } from "../../auth";
import { useApp } from "@/app/app-provider";

export const useRegister = () => {
    // handles signup
    const queryClient = useQueryClient();
    const { setUser, setIsAuth } = useApp();


    return useMutation({
        mutationFn: register,// **REF ../../auth**
        onSuccess: (data) => {
            setUser(data);
            setIsAuth(true);
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Registration Error:", error);
        },
    });
};
