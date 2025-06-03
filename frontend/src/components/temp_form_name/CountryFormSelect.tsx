// This form field is used for country listing
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
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
  setDialCode,
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
              "relative bg-primary-foreground rounded-lg border border-primary/20 overflow-hidden focus-within:overflow-visible":
                !isNotLabeled,
              "unlabeled-form-field": isNotLabeled,
              filled: !isNotLabeled && field.value,
            })}
          >
            {/* {!isNotLabeled && (
              <FormLabel className="capitalize">
                {label || splitCamelCaseToWords(name)}
              </FormLabel>
            )} */}
            <Popover>
              <PopoverTrigger asChild> 
                <FormControl>
                <Button
                  variant="transparent"
                  type="button"
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
                  <CommandInput placeholder="Search country..." />
                  <CommandList>
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {countries.map(({ name, flag, code, dial_code }) => (
                        <CommandItem
                          value={name}
                          key={code}
                          onSelect={() => {
                            form.setValue("country", name);
                            setDialCode!(dial_code);
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
