import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn, splitCamelCaseToWords } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

const CountryFormSelect = ({
  control,
  form,
  label,
  name,
  isNotLabeled = false,
  defaultOption = "",
  defaultValue = "",
  countries,
  
}: CountryFormSelect) => {
  return (
    <FormField
      control={control}
      name={name}
      // defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className={cn("form-item")}>
          <div
            className={cn({
              "form-field": !isNotLabeled,
              "unlabeled-form-field": isNotLabeled,
              filled: !isNotLabeled && field.value,
            })}
          >
            {!isNotLabeled && (
              <FormLabel className="capitalize">
                {label || splitCamelCaseToWords(name)}
              </FormLabel>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? countries.find(({ name }) => name === field.value)?.name
                      : "Select Country"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search language..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map(({ name, flag, code }) => (
                        <CommandItem
                          value={name}
                          key={code}
                          onSelect={() => {
                            form.setValue("country", name);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              name === field.value ? "opacity-100" : "opacity-0"
                            )}
                          />

                          <div className="flex gap-2">
                            <span>{flag}</span>
                            {name}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CountryFormSelect;
