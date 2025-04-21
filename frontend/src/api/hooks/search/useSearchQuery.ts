import { useQuery } from "@tanstack/react-query"
import { searchQuery } from "../../search"

export const useSearchQuery = (params: SearchParams) =>
  useQuery({
    queryKey: ["search query", params],
    queryFn: () => searchQuery(params),
    enabled: params.q.length > 1,
    staleTime: 60000, // 1 minute
  })
