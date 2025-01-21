import { useQuery } from "@tanstack/react-query";
import { checkUserAuth } from "../user";

export const useCheckUserAuth = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: checkUserAuth,
        gcTime: 1000 * 60 * 60 * 2,
        refetchInterval: 1000 * 60 * 2,
        retry: 5,
    });
};
