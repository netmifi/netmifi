"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchQuery } from "../api/hooks/search/useSearchQuery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || undefined;
  const [tabs, setTabs] = useState(["courses", "instructors"]);
  // Use TanStack Query for search results
  const { data, isLoading, error, refetch } = useSearchQuery(query);
  const results = data.data || [];
  console.log(tabs);
  // Refetch when query or type changes
  useEffect(() => {
    if (query) {
      refetch();
      console.log(
        "REFETCH: ",
        query,
        data.data,
        !data.data,
        tabs.shift(),
        Object.keys(results)
      );

      setTabs(Object.keys(results));
    }
  }, [query, type, refetch]);

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border rounded-md p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          Error: {error instanceof Error ? error.message : "An error occurred"}
        </div>
      </div>
    );
  }

  if (!results || Object.key(results).length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No results found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <section className="bg-accent padding-x padding-y flex gap-3 text-2xl">
        Search Results{" "}
        {query && (
          <span className="font-normal text-gray-500">for "{query}"</span>
        )}
      </section>

      <Tabs defaultValue={""}>
        <TabsList className="p-0 h-fit w-full items-start justify-start">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab.toLowerCase()}
              className="uppercase text-base rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
             <TabsContent value={tab.toLowerCase()}>
               {tab} page
           </TabsContent>
        ))}
     
      </Tabs>

      {/* <div className="space-y-4">
        {results.flatMap((result) => (
          <div key={result.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium">{result.title || result.firstName + " " + result.lastName}</h3>
            {result.type === "course" && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-sm font-medium">${result.price}</span>
                  {result.oldPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">${result.oldPrice}</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">By {result.instructorName}</p>
              </div>
            )}
            {result.type === "instructor" && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">{result.niche || "Instructor"}</p>
                <p className="text-xs text-gray-500 mt-1">{result.courseCount} courses</p>
              </div>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default SearchResults;
