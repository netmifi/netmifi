import { useQuery } from "@tanstack/react-query"
import { searchQuery } from "../../search"

export const useSearchQuery = (searchTerm: string) =>
  useQuery({
    queryKey: ["search query", searchTerm],
    queryFn: () => searchQuery({ q: searchTerm }),
    enabled: searchTerm.length > 0,
    staleTime: 60000, // 1 minute
  })
