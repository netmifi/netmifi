
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../user";

export const useUpdatePassword = () => {
    // hook for password update
    return useMutation({
        mutationFn: updatePassword,
        onError: (error) => {
            console.error("Update Error:", error);
        },
    });
};
