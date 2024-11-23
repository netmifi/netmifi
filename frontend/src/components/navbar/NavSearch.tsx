import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { ArrowLeft, ArrowUpLeft, Search, X } from "lucide-react";
import { cn, searchFormSchema } from "@/lib/utils";
import useWindowSize from "@/hooks/useWindowSize";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

const NavSearch = ({
  containerClassName,
  formClassName,
  className,
  searchFloatButtonClassName,
  fullScreen,
  floating = "none",
}: NavSearchProps) => {
  const { width } = useWindowSize();

  const [_open, _setOpen] = useState(false);
  const [openSuggestion, setOpenSuggestion] = useState(false);
  const [filteredSuggestion, setFilteredSuggestion] = useState<
    string[] | undefined
  >([]);

  const [suggestions, setSuggestions] = useState([
    "graphical design: quality and quantity balance",
    "basics of email marketing",
    "content creation: from amateur to professional",
    "project management from 1 to 100",
    "technical writing for pro",
  ]);

  const formSchema = searchFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const mdWidth = width && width < 768;
  const smWidth = width && width < 640;

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data.search);
  };

  useEffect(() => {
    return () => {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(form.getValues("search"))
      );
      setFilteredSuggestion(filtered);
      setOpenSuggestion(
        form.getValues("search") && filtered.length > 0 ? true : false
      );
    };
  }, [form, suggestions]);

  const searchFloatButton = () => {
    return (
      <Button
        variant="transparent"
        className={cn("[&_svg]:size-6", searchFloatButtonClassName)}
        onClick={() => (floating === "float" ? _setOpen(true) : {})}
      >
        <Search />
      </Button>
    );
  };

  const searchForm = (isFullscreen: boolean, isFloat: boolean) => {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={cn(
            "w-full relative z-[50]",
            { hidden: !_open && isFloat },
            { "absolute w-full left-0 bg-popover top-0 h-full": isFloat },
            formClassName
          )}
        >
          <FormField
            name="search"
            control={form.control}
            render={({ field }) => (
              <div
                className={cn(
                  "flex items-center rounded-lg w-full h-fit p-0 overflow-hidden pr-2",
                  { "relative w-full top-2 left-1": isFloat },
                  { "w-full bg-popover p-0 shadow-sm": isFullscreen },
                  className
                )}
              >
                <FormItem
                  className={cn("flex-grow border rounded-s-full", {
                    "border-none w-full": isFullscreen,
                  })}
                >
                  <div className="flex items-center flex-grow pl-3 py-0 w-full">
                    {isFullscreen && (
                      <SheetClose>
                        <ArrowLeft size={18} />
                      </SheetClose>
                    )}

                    {!isFullscreen && (
                      <FormLabel className="p-0 text-red">
                        <Search size={18} />
                      </FormLabel>
                    )}

                    <FormControl>
                      <Input
                        className="bg-transparent border-none outline-none lowercase placeholder:capitalize"
                        placeholder="Search Anything..."
                        type="text"
                        inputMode="search"
                        {...field}
                        autoComplete="false"
                        autoCorrect="false"
                        aria-autocomplete="none"
                        autoFocus={isFullscreen}
                      />
                    </FormControl>

                    {(form.getValues("search") || isFloat) && (
                      <Button
                        variant={"transparent"}
                        className={cn("h-full", { "p-0": isFullscreen })}
                        type="button"
                        onClick={() => {
                          form.setValue("search", "");
                          isFloat && _setOpen(false);
                        }}
                        asChild
                      >
                        <FormLabel className="cursor-pointer text-red">
                          <X />
                        </FormLabel>
                      </Button>
                    )}
                  </div>
                </FormItem>

                {!isFullscreen && (
                  <Button
                    variant={"secondary"}
                    className="[&_svg]:size-5 h-full rounded-s-none rounded-e-full py-3"
                    onClick={() =>
                      isFloat && form.getValues("search") && _setOpen(false)
                    }
                  >
                    <Search />
                  </Button>
                )}
              </div>
            )}
          />
          <div
            className={cn("absolute bg-sidebar z-40 overflow-y-hidden w-full", {
              "static h-full": isFullscreen,
              hidden: !openSuggestion,
            })}
          >
            <ScrollArea className="h-full z-40">
              <div
                className={cn("max-h-[70dvh] w-full", {
                  "max-h-[98dvh]": isFullscreen,
                })}
              >
                {filteredSuggestion?.map((suggestion, index) => (
                  <div key={index} className="flex w-full">
                    <Button
                      variant={"transparent"}
                      className="lowercase hover:bg-secondary rounded-none text-left flex-grow justify-start max-w-[80%] overflow-x-hidden"
                      onClick={() => form.setValue("search", suggestion)}
                    >
                      <Search size={15} />
                      {suggestion}
                    </Button>

                    <Button
                      type="button"
                      variant={"transparent"}
                      className="hover:text-red"
                      onClick={() => form.setValue("search", suggestion)}
                    >
                      <ArrowUpLeft />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </form>
      </Form>
    );
  };

  const searchSheetDialog = () => {
    return (
      <Sheet>
        <SheetTrigger asChild>{searchFloatButton()}</SheetTrigger>
        <SheetContent
          className="top-0 bottom-0 bg-popover left-0 p-0"
          side="bottom"
        >
          {searchForm(true, false)}
        </SheetContent>
      </Sheet>
    );
  };

  return (
    <div className={cn("flex w-full", containerClassName)}>
      {fullScreen ? (
        fullScreen === "md" && mdWidth ? (
          searchSheetDialog()
        ) : fullScreen === "sm" && smWidth ? (
          searchSheetDialog()
        ) : (
          searchForm(false, false)
        )
      ) : floating === "float" ? (
        <>
          {searchFloatButton()}
          {searchForm(false, true)}
        </>
      ) : (
        searchForm(false, false)
      )}
    </div>
  );
};

export default NavSearch;
