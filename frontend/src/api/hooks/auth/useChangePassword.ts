// tanstack hook for managing password change request

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "../../auth";

export const useChangePassword = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: changePassword, // **REF ../../auth**
        onSuccess: (data) => {
            queryClient.setQueryData(["currentUser"], data); // cache response
        },
        onError: (error) => {
            console.error("Update Error:", error);
        },
    });
};
