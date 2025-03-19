// tanstack hook for managing req and res from google auth to our server
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { register as googleAuth } from "../../auth";
import { useApp } from "@/app/app-provider";

export const useGoogleAuth = () => {
    const queryClient = useQueryClient();
    const { setUser, setIsAuth } = useApp();

    return useMutation({
        mutationFn: googleAuth,// **REF ../../auth**
        onSuccess: (data) => {
            setUser(data);
            setIsAuth(true);
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Authentication Error:", error);
        },
    });
};
