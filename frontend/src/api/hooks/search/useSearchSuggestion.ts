import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { suggestions } from "../../search";

export const useSearchSuggestion = (searchTerm: string) => useQuery({
    queryKey: ["suggestions", searchTerm],
    queryFn: () => suggestions({ q: searchTerm }),
    enabled: searchTerm.length > 0,
    staleTime: 60000, // 1 minute
});