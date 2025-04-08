import { useMutation, useQueryClient } from "@tanstack/react-query";
import { searchQuery } from "../../search";

export const useSearchQuery = () => {
    // hook handles code re-issue
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: searchQuery, // **REF ../../search**
        onSuccess: (data) => {
            queryClient.setQueryData(["query"], data);
        },
        onError: (error) => {
            console.error("query fetch error:", error);
        },
    });
};
