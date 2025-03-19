import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyCode } from "../../auth";

export const useVerifyCode = () => {
    // this hook handles code matching (verification)
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: verifyCode, // **REF ../../auth**
        onSuccess: (data) => {
            queryClient.setQueryData(["verifiedData"], data);
        },
        onError: (error) => {
            console.error("Verification error:", error);
        },
    });
};
