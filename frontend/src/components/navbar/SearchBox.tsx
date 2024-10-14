// THIS COMPONENT IS FOR REUSABLE SEARCH BOX ON THE NAVBAR
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn, searchFormSchema } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import {
  DialogContent,
  DialogTrigger,
  DialogTitle,
  Dialog,
  DialogHeader,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { Search, X } from "lucide-react";
import { ClassValue } from "class-variance-authority/types";

const SearchBox = ({ type = "guest" }: { type?: "guest" | "user" }) => {
  const [search, setSearch] = useState<string>("");

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
    // value ? setOpen(true) : setOpen(false);
  };

  const formSchema = searchFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const suggestions = [
    "graphical design: quality and quantity balance",
    "basics of email marketing",
    "content creation: from amateur to professional",
    "project management from 1 to 100",
    "technical writing for pro",
  ];

  const searchField = () => {
    return (
      <FormField
        name="search"
        control={form.control}
        render={() => (
          <FormItem className="flex items-center border-b bg-secondary/20 focus-within:border-b-primary rounded-none focus-within:bg-background">
            <Button
              asChild
              type="button"
              variant={"transparent"}
              className="p-0 mt-2 text-primary/20"
            >
              <FormLabel>
                <Search size={16} className="" />
              </FormLabel>
            </Button>
            {/* <div> */}
            <FormControl className="p-0">
              <Input
                className="h-full bg-transparent pl-2 rounded-e-none py-0 border-none ring-0 focus-visible::ring-0 focus-visible:outline-none"
                placeholder="Search anything..."
                value={search}
                aria-label="Search"
                onInput={(e) => handleInput(e)}
              />
            </FormControl>

            <Button
              type="button"
              variant={"transparent"}
              onClick={() => setSearch("")}
              className={cn("p-0 text-primary/80", {
                "opacity-0 pointer-events-none": !search,
              })}
            >
              <X size={16} />
            </Button>
            {/* </div> */}
          </FormItem>
        )}
      />
    );
  };

  const suggestionArea = (className?: ClassValue) => {
    return (
      <div
        className={cn(
          "absolute -left-[10px] bg-background shadow-md",
          className,
          {
            hidden: search.length < 1,
          }
        )}
      >
        <ScrollArea>
          <div className="flex flex-col items-start min-w-fit max-w-full max-h-[70dvh]">
            {[...suggestions, ...suggestions, ...suggestions, ...suggestions]
              .filter((suggestion) => suggestion.includes(search))
              .map((suggestion) => (
                <Button
                  variant={"transparent"}
                  className="capitalize hover:bg-secondary rounded-none text-left min-w-full justify-start"
                  onClick={() => setSearch(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <>
      {type == "user" ? (
        <div className="relative">
          <Form {...form}>
            <form className="flex items-center w-full">{searchField()}</form>
          </Form>
          {suggestionArea()}
        </div>
      ) : (
        <Dialog>
          <DialogTrigger
            asChild
            className="rounded-s bg-transparent hover:bg-transparent text-low-contrast"
          >
            <Button
              variant={"secondary"}
              className="rounded-full px-3 py-2 text-red brightness-20"
            >
              <FaSearch size={16} />
            </Button>
          </DialogTrigger>

          <DialogContent className="flex flex-col justify-center max-h-screen top-[10%]">
            <div className="relative mt-4">
              <DialogHeader>
                <DialogTitle>
                  <Form {...form}>
                    <form className="flex items-center w-full bg-secondary *:w-full">
                      {searchField()}
                    </form>
                  </Form>
                </DialogTitle>
              </DialogHeader>

              {suggestionArea("top-full left-[0px] right-0")}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default SearchBox;
