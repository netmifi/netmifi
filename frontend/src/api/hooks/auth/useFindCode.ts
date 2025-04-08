//  this hook manages axios API's request and response for finding  generated code state amd expiry date
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { findCode } from "../../auth";

export const useFindCode = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: findCode,// **REF ../../auth**
        onSuccess: (data) => {
            queryClient.setQueryData(["generatedCode"], data);
        },
        onError: (error) => {
            console.error("Seek Error:", error);
        },
    });
};
