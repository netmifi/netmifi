//  manages instructor register request and response
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerInstructor } from "../../auth";
import { useApp } from "@/app/app-provider";

export const useInstructorRegister = () => {
    const { setUser, setIsAuth } = useApp();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerInstructor,// **REF ../../auth**
        onSuccess: (data) => {
            setUser(data.user); // update current user context state
            setIsAuth(true);
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Request error:", error);
        },
    });
};
