import { useQuery } from "@tanstack/react-query"
import { searchQuery } from "../../search"
import { useApp } from "@/app/app-provider"
import { useEffect } from "react";

export const useSearchResults = (params: SearchParams) => {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["search-results", params],
    queryFn: () => searchQuery(params),
    enabled: params.q.length > 1,
    staleTime: 60000, // 1 minute
    // keepPreviousData: true, // Keep previous results while loading new ones
  });

  // const { setUser } = useApp();

  // useEffect(() => {
  //   const user = data?.data?.user || [];
  //   if (user) setUser(user);
  // }, [data, setUser]);

  return {
    results: data?.data?.results || [],
    totalPages: data?.data?.totalPages || 0,
    currentPage: data?.data?.currentPage || 1,
    totalResults: data?.data?.totalResults || 0,
    isLoading,
    isFetching,
    error,
    refetch,
  }
}
