//  hook manages welcome page's interests and advert sources
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { interestAdSource } from "../../auth";
import { useApp } from "@/app/app-provider";

export const useInterestAdSource = () => {
    const queryClient = useQueryClient();
    const { setUser, setIsAuth } = useApp();

    return useMutation({
        mutationFn: interestAdSource,// **REF ../../auth**
        onSuccess: (data) => {
            setUser(data.data); // update current user context state
            setIsAuth(true);
            queryClient.setQueryData(["currentUser"], data);
        },
        onError: (error) => {
            console.error("Update Error", error);
        },
    });
};
