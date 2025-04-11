import type React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Clock, Search, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import useWindowSize from "@/hooks/useWindowSize";
import { useSearchSuggestion } from "@/api/hooks/search/useSearchSuggestion";

// Define the search form schema
const searchFormSchema = z.object({
  search: z.string().trim().optional(),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

// Define component props
interface NavSearchProps {
  containerClassName?: string;
  formClassName?: string;
  className?: string;
  searchFloatButtonClassName?: string;
  fullScreen?: "sm" | "md" | boolean;
  floating?: "always" | "float" | "none";
}

// Mock API functions - replace with your actual API calls
const fetchSuggestions = async (query: string): Promise<string[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Mock data for demonstration
  const allSuggestions = [
    "graphical design: quality and quantity balance",
    "basics of email marketing",
    "content creation: from amateur to professional",
    "project management from 1 to 100",
    "technical writing for pro",
    "digital marketing strategies",
    "social media management",
    "SEO optimization techniques",
    "user experience design principles",
    "responsive web development",
    "advanced javascript techniques for modern web applications",
    "how to create engaging content that converts visitors into customers",
  ];

  return query
    ? allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
    : [];
};

// Mock search history API
interface SearchHistoryItem {
  id: string;
  query: string;
  timestamp: number;
}

const fetchSearchHistory = async (): Promise<SearchHistoryItem[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // This would be your actual API call
  // return await fetch('/api/search-history').then(res => res.json())

  // Mock data
  return [
    {
      id: "1",
      query: "responsive design patterns",
      timestamp: Date.now() - 86400000,
    },
    {
      id: "2",
      query: "react server components",
      timestamp: Date.now() - 172800000,
    },
    {
      id: "3",
      query: "tailwind vs css modules",
      timestamp: Date.now() - 259200000,
    },
    {
      id: "4",
      query: "next.js app router tutorial",
      timestamp: Date.now() - 345600000,
    },
    {
      id: "5",
      query: "typescript best practices 2023",
      timestamp: Date.now() - 432000000,
    },
  ];
};

const deleteSearchHistoryItem = async (id: string): Promise<void> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  // This would be your actual API call
  // return await fetch(`/api/search-history/${id}`, { method: 'DELETE' })

  console.log(`Deleted search history item with ID: ${id}`);
  return;
};

const NavSearch = ({
  containerClassName,
  formClassName,
  className,
  searchFloatButtonClassName,
  fullScreen,
  floating = "none",
}: NavSearchProps) => {
  const { width } = useWindowSize();
  const [open, setOpen] = useState(false);
  // const [suggestions, setSuggestions] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchValue = form.watch("search") || "";

  // Debounce search input to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchValue);
      // suggestionQuery.refetch()
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Fetch suggestions using TanStack Query
  // const { data: suggestions, isLoading: suggestionsLoading } = useQuery({
  //   queryKey: ["suggestions", debouncedSearchTerm],
  //   queryFn: () => fetchSuggestions(debouncedSearchTerm),
  //   enabled: debouncedSearchTerm.length > 0,
  //   staleTime: 60000, // 1 minute
  // });

  // Fetch search history
  const { data: searchHistory, isLoading: historyLoading } = useQuery({
    queryKey: ["searchHistory"],
    queryFn: fetchSearchHistory,
    staleTime: 300000, // 5 minutes
  });

  const { data: suggestions, isLoading: suggestionsLoading }  = useSearchSuggestion(debouncedSearchTerm);

  // Delete history item mutation
  const deleteHistoryMutation = useMutation({
    mutationFn: deleteSearchHistoryItem,
    onSuccess: () => {
      // Invalidate and refetch search history
      queryClient.invalidateQueries({ queryKey: ["searchHistory"] });
    },
  });

  // const handleSuggestion = async (e: FormEvent<HTMLFormElement>) => {
  //   try {
  //     const { data } = await suggestionQuery.mutateAsync({
  //       q: e.target.value,
  //     });
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = (data: SearchFormValues) => {
    if (!data.search) return;

    console.log("Searching for:", data.search);
    // Here you would typically:
    // 1. Navigate to search results page
    // 2. Add the search term to history via API (to be hanlded by backend while the searching)
    // 3. Reset the form or keep the value as needed
  };

  const handleDeleteHistoryItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent triggering the parent button click
    deleteHistoryMutation.mutate(id);
  };

  const showSuggestions =
    searchValue.length > 0 && (suggestions?.length > 0 || suggestionsLoading);
  const showHistory =
    inputFocused &&
    !searchValue.length &&
    (searchHistory?.length > 0 || historyLoading);

  const mdWidth = width && width < 768;
  const smWidth = width && width < 640;

  function shortenSuggestion(suggestion: string) {
    return suggestion.slice(0, smWidth ? 25 : mdWidth ? 55 : 100);
  }

  const renderSearchButton = () => (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "rounded-full hover:bg-secondary",
        searchFloatButtonClassName
      )}
      onClick={() => floating === "float" && setOpen(true)}
    >
      <Search className="h-5 w-5" />
      <span className="sr-only">Search</span>
    </Button>
  );

  const renderSuggestions = () => (
    <div className="w-full absolute bg-background border rounded-b-lg shadow-md z-50">
      <ScrollArea className="max-h-[60vh]">
        {suggestionsLoading ? (
          // Skeleton loading state
          <div className="p-2 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center p-2">
                <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                <Skeleton className="h-4 flex-grow" />
              </div>
            ))}
          </div>
        ) : (
          suggestions?.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center hover:bg-muted/50 px-3 py-2"
            >
              <Button
                variant="ghost"
                className="justify-start text-left w-full h-auto px-2 py-1 font-normal truncate"
                onClick={() => form.setValue("search", suggestion)}
              >
                <Search className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">
                  {shortenSuggestion(suggestion)}
                </span>
              </Button>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );

  const renderSearchHistory = () => (
    <div className="w-full absolute bg-background border rounded-b-lg shadow-md z-50">
      <ScrollArea className="max-h-[60vh]">
        <div className="py-2">
          <div className="px-4 py-1 text-sm font-medium text-muted-foreground">
            Recent searches
          </div>

          {historyLoading ? (
            // Skeleton loading state
            <div className="p-2 space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center p-2">
                  <Skeleton className="h-4 w-4 mr-2 rounded-full" />
                  <Skeleton className="h-4 flex-grow" />
                  <Skeleton className="h-4 w-4 ml-2 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            searchHistory?.map((item) => (
              <div
                key={item.id}
                className="flex items-center hover:bg-muted/50 px-3 py-2"
              >
                <Button
                  variant="ghost"
                  className="justify-start overflow-hidden text-left w-full h-auto px-2 py-1 font-normal"
                  onClick={() => form.setValue("search", item.query)}
                >
                  <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {shortenSuggestion(item.query)}
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-fit flex-shrink-0 ml-2 text-muted-foreground hover:text-destructive"
                  onClick={(e) => handleDeleteHistoryItem(e, item.id)}
                >
                  <Trash2 className="size-5" />
                  <span className="sr-only">Remove from history</span>
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );

  const renderSearchForm = (isFullscreen: boolean, isFloat: boolean) => (
    <Form {...form}>
      <form
        // onInput={handleSuggestion}
        onSubmit={form.handleSubmit(handleSubmit)}
        className={cn(
          "relative w-full",
          { hidden: !open && isFloat },
          { "absolute left-0 top-0 z-50 bg-background p-2": isFloat },
          formClassName
        )}
      >
        <FormField
          name="search"
          control={form.control}
          render={({ field }) => (
            <div className="relative">
              <FormItem>
                <div
                  className={cn(
                    "flex items-center rounded-lg border bg-background overflow-hidden h-10",
                    { "p-2": isFullscreen },
                    className
                  )}
                >
                  {isFullscreen && (
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="mr-1">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back</span>
                      </Button>
                    </SheetClose>
                  )}

                  {!isFullscreen && (
                    <Search className="h-4 w-4 ml-3 text-muted-foreground" />
                  )}

                  <FormControl>
                    <Input
                      className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none px-2 [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden"
                      placeholder="Search anything..."
                      type="search"
                      autoComplete="off"
                      autoCorrect="off"
                      autoFocus={isFullscreen}
                      onFocus={() => setInputFocused(true)}
                      // onBlur={() => {
                      //   // Small delay to allow clicking on suggestions/history
                      //   setTimeout(() => setInputFocused(false), 200);
                      // }}
                      {...field}
                    />
                  </FormControl>

                  {field.value && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        form.setValue("search", "");
                        isFloat && setOpen(false);
                      }}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                  )}

                  {!isFullscreen && (
                    <Button
                      type="submit"
                      variant="destructive"
                      size="sm"
                      className="rounded-l-none h-full px-3 flex items-center justify-center"
                    >
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Search</span>
                    </Button>
                  )}
                </div>
              </FormItem>

              {showSuggestions && renderSuggestions()}
              {showHistory && renderSearchHistory()}
            </div>
          )}
        />
      </form>
    </Form>
  );

  const renderSearchSheet = () => (
    <Sheet>
      <SheetTrigger asChild>{renderSearchButton()}</SheetTrigger>
      <SheetContent side={"top"} className="p-4">
        <div className="flex flex-col h-full">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Search</h2>
          </div>
          {renderSearchForm(false, false)}
        </div>
      </SheetContent>
    </Sheet>
  );

  // Determine which search UI to render based on props and screen size
  if (floating === "always") {
    return (
      <div className={cn("relative", containerClassName)}>
        {renderSearchSheet()}
      </div>
    );
  }

  if (fullScreen) {
    if ((fullScreen === "md" && mdWidth) || (fullScreen === "sm" && smWidth)) {
      return renderSearchSheet();
    }
    return renderSearchForm(false, false);
  }

  if (floating === "float") {
    return (
      <div className={cn("relative", containerClassName)}>
        {renderSearchButton()}
        {renderSearchForm(false, true)}
      </div>
    );
  }

  return (
    <div className={cn("w-full", containerClassName)}>
      {renderSearchForm(false, false)}
    </div>
  );
};

export default NavSearch;
