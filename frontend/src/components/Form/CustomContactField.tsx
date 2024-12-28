import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check } from "lucide-react";

import { cn, splitCamelCaseToWords } from "@/lib/utils";
import { useState } from "react";
// import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa6";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { useCountries } from "react-countries";

const CustomContactField = ({
  // form,
  control,
  name,
  placeholder = "",
  label = "",
  hidden = false,
  readOnly = false,
  disabled = false,
  defaultValue = "",
  inputType = "text",
  dialCode = "",
  isOptional = false,
  isNotLabeled = false,
  setCountry,
}: CustomContactFieldProps) => {
  // FIXME: Add default country as nigeria and organize combobox
  const { countries } = useCountries();
  const [newDialCode, setNewDialCode] = useState(dialCode || '+234');
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className={cn({ "form-item": !hidden })} hidden={hidden}>
          <div
            className={cn({
              "form-field": !isNotLabeled,
              "unlabeled-form-field": isNotLabeled,
              filled:
                (!isNotLabeled && field.value) || open || newDialCode !== "+",
            })}
          >
            {!isNotLabeled && (
              <FormLabel className="capitalize flex gap-1">
                {label || splitCamelCaseToWords(name)}

                {isOptional && <FaAsterisk className="text-destructive" />}
              </FormLabel>
            )}

            <div className="flex h-full w-full rounded-lg overflow-x-hidden">
              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="no-pad"
                    type="button"
                    role="combobox"
                    className="flex gap-px p-0 text-xs"
                  >
                    {newDialCode}
                    {/* {field.value
                    ? countries.find(({ name }) => name === field.value)?.name
                    : dialCode} */}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandList>
                      <CommandEmpty>No country found.</CommandEmpty>
                      <CommandGroup>
                        {countries.map(
                          ({
                            name,
                            flag,
                            code,
                            dial_code,
                          }: {
                            name: string;
                            flag: string;
                            code: string;
                            dial_code: string;
                          }) => (
                            <CommandItem
                              value={name}
                              key={code}
                              onSelect={() => {
                                // form.setValue("country", {
                                setCountry!({
                                  name,
                                  flag,
                                  code,
                                  dialCode: dial_code,
                                });
                                // });
                                setNewDialCode(dial_code);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  name === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />

                              <div className="flex gap-2">
                                <span>{flag}</span>
                                {name}
                              </div>
                            </CommandItem>
                          )
                        )}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </DropdownMenuContent>
              </DropdownMenu>

              <FormControl>
                <Input
                  className="rounded-none ring-0 outline-none placeholder:text-xs"
                  placeholder={placeholder}
                  {...field}
                  type={inputType || "text"}
                  hidden={hidden}
                  readOnly={readOnly}
                />
              </FormControl>
            </div>
          </div>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomContactField;
