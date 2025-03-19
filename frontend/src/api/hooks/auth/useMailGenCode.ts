import { useMutation, useQueryClient } from "@tanstack/react-query";
import { mailCode } from "../../auth";

export const useMailGenCode = () => {
    //  this function handles code generation for forgotten password 
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mailCode,// **REF ../../auth**
        onSuccess: (data) => {
            queryClient.setQueryData(["mailCode"], data);
        },
        onError: (error) => {
            console.error("Mail Error:", error);
        },
    });
};
