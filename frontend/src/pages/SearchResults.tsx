import { useSearchResults } from "@/api/hooks/search/useSearchResults";
import CourseCard from "@/components/courses/CourseCard";
import InstructorCard from "@/components/instructors/InstructorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || undefined;
  const page = Number.parseInt(searchParams.get("page") || "1");
  const limit = Number.parseInt(searchParams.get("limit") || "10");

  const { results, isLoading, error, totalPages, totalResults, currentPage } =
    useSearchResults({
      q: query,
      type,
      page,
      limit,
    });
  
  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border rounded-md p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
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

  if (!results || results.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Search Results</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No results found for "{query}"</p>
        </div>
      </div>
    );
  }

  // Group results by type for better organization
  const courseResults = results.filter(
    (result: { type: string }) => result.type === "course"
  );
  const instructorResults = results.filter(
    (result: { type: string }) => result.type === "instructor"
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
        Search Results for "{query}" ({totalResults} results)
      </h2>

      {/* Display course results if any */}
      {courseResults.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-3">
            Courses ({courseResults.length})
          </h3>

          <div className="flex flex-wrap gap-3 justify-stretch">
            {courseResults.map((result: Course) => (
              <CourseCard key={result.id} course={result} />
            ))}
          </div>
        </div>
      )}

      {/* Display instructor results if any */}
      {instructorResults.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3">
            Instructors ({instructorResults.length})
          </h3>
          <div className="flex flex-wrap gap-3 justify-stretch">
            {instructorResults.map((result: Instructor) => (
              <InstructorCard key={result.id} instructor={result} />
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center mt-6">
          <nav className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <a
                  key={pageNum}
                  href={`/search?q=${query}${
                    type ? `&type=${type}` : ""
                  }&page=${pageNum}&limit=${limit}`}
                  className={cn("px-3 py-1 rounded-md bg-secondary text-primary/70 hover:bg-secondary/70", {
"bg-red text-background":   pageNum === currentPage
                  })}
                >
                  {pageNum}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { useSearchQuery } from "../api/hooks/search/useSearchQuery";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import InstructorCard from "@/components/instructors/InstructorCard";
// import CourseCard from "@/components/courses/CourseCard";

// const SearchResults = () => {
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get("q") || "";
//   const type = searchParams.get("type") || undefined;
//   const [tabs, setTabs] = useState(["courses", "instructors"]);

//   const [defaultTabValue, setDefaultTabValue] = useState(tabs[0]);
//   // Use TanStack Query for search results
//   const { data, isLoading, error, refetch } = useSearchQuery(query);
//   const results = data.data || [];
//   console.log(tabs);
//   // Refetch when query or type changes
//   useEffect(() => {
//     if (query) {
//       refetch();
//       setTabs(Object.keys(results));
//       console.log(
//         "REFETCH: ",
//         query,
//         data.data,
//         // !data.data,
//         tabs.shift(),
//         Object.keys(results)
//       );
//     }
//   }, [query, type, refetch]);

//   if (isLoading) {
//     return (
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-4">Search Results</h2>
//         <div className="space-y-4">
//           {[...Array(5)].map((_, i) => (
//             <div key={i} className="border rounded-md p-4 animate-pulse">
//               <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
//               <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-4">Search Results</h2>
//         <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
//           Error: {error instanceof Error ? error.message : "An error occurred"}
//         </div>
//       </div>
//     );
//   }

//   if (!results || Object.keys(results).length === 0) {
//     return (
//       <div className="p-4">
//         <h2 className="text-xl font-semibold mb-4">Search Results</h2>
//         <div className="text-center py-8">
//           <p className="text-gray-500">No results found</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <section className="bg-accent px-4 py-5 flex gap-3 text-lg sm:text-xl">
//         Search Results{" "}
//         {query && (
//           <span className="font-normal text-primary/80">for "{query}"</span>
//         )}
//       </section>

//       <Tabs defaultValue={defaultTabValue}>
//         <TabsList className="p-0 h-fit w-full items-start justify-start">
//           {tabs.map((tab) => (
//             <TabsTrigger
//               key={tab}
//               value={tab.toLowerCase()}
//               className="uppercase text-base rounded-none data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
//             >
//               {tab}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {tabs.map((tab) => (
//           <TabsContent value={tab.toLowerCase()} className="px-2 sm:px-4">
//             {results[tab].results.length > 0 ? (
//               results[tab].results.map((data: Course & Instructor ) => (
//                 <>
//                   {tab === "courses" ? (
//                     <CourseCard course={data as Course} />
//                   ) : (
//                     <InstructorCard instructor={data} />
//                   )}
//                 </>
//               ))
//             ) : (
//               <p className="text-lg text-primary/80">No content found</p>
//             )}
//           </TabsContent>
//         ))}
//       </Tabs>

//       {/* <div className="space-y-4">
//         {results.flatMap((result) => (
//           <div key={result.id} className="border rounded-md p-4 hover:shadow-md transition-shadow">
//             <h3 className="font-medium">{result.title || result.firstName + " " + result.lastName}</h3>
//             {result.type === "course" && (
//               <div className="mt-2">
//                 <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
//                 <div className="mt-2 flex items-center">
//                   <span className="text-sm font-medium">${result.price}</span>
//                   {result.oldPrice && (
//                     <span className="ml-2 text-sm text-gray-500 line-through">${result.oldPrice}</span>
//                   )}
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">By {result.instructorName}</p>
//               </div>
//             )}
//             {result.type === "instructor" && (
//               <div className="mt-2">
//                 <p className="text-sm text-gray-600">{result.niche || "Instructor"}</p>
//                 <p className="text-xs text-gray-500 mt-1">{result.courseCount} courses</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div> */}
//     </div>
//   );
// };

// export default SearchResults;
