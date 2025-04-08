import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resendCode } from "../../auth";

export const useResendCode = () => {
    // hook handles code re-issue
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: resendCode, // **REF ../../auth**
        onSuccess: (data) => {
            queryClient.setQueryData(["resentData"], data);
        },
        onError: (error) => {
            console.error("Resend code error find error:", error);
        },
    });
};
