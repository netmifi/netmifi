import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyCode } from "../auth";

export const useVerifyCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: verifyCode,
        onSuccess: (data) => {
            queryClient.setQueryData(["verifiedData"], data);
        },
        onError: (error) => {
            console.error("Verification error:", error);
        },
    });
};
