// this field handles dynamic listing --- TO BE OPTIMIZED LATER
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, splitCamelCaseToWords } from "@/lib/utils";

import { useState } from "react";
import { Badge } from "../ui/badge";
import {
  XCircle,
} from "lucide-react";
import { FaAsterisk } from "react-icons/fa6";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { z } from "zod";

const CustomListForm = ({
  form,
  control,
  name,
  placeholder,
  defaultList,
  label,
  isNotLabeled,
  isOptional,
  readOnly,
  hidden,
  disabled,
}: CustomListFormProps) => {
  const [list, setList] = useState<string[]>(defaultList || []);
  const [value, setValue] = useState("");

  interface FieldProps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extends ControllerRenderProps<FieldValues, FieldPath<z.infer<any>>> {}

  const handleInputChange = (
    event: React.KeyboardEvent<HTMLInputElement>,
    field: FieldProps
  ) => {
    const newValue = event.currentTarget.value;
    const refinedValue = newValue.slice(0, newValue.length - 1).trim();
    // console.log(refinedValue);

    if (event.key === "," && newValue.length > 1) {
      setValue("");
      const newList = [...list, refinedValue];
      // field.value = newList;
      // form.setValue(name, newList);
      console.log(field.value);
      setList(newList);
    }
  };

  const clearAll = (field: FieldProps) => {
    console.log(form.value);

    setList([]);
    field.value = [];
  };

  const removeOption = (option: string) => {
    const newSelectedValues = list.includes(option)
      ? list.filter((value) => value !== option)
      : [...list, option];
    setList(newSelectedValues);
  };

  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultList}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className="form-item max-w-full" hidden={hidden}>
          <div className="flex flex-col w-full">
            <div
              className={cn({
                "form-field": !isNotLabeled,
                "unlabeled-form-field": isNotLabeled,
                filled: !isNotLabeled && field.value,
              })}
            >
              {!isNotLabeled && (
                <FormLabel className="capitalize flex gap-1">
                  {label || splitCamelCaseToWords(name)}
                  {isOptional && <FaAsterisk className="text-destructive" />}
                </FormLabel>
              )}
              <FormControl>
                <Input
                  inputMode="text"
                  placeholder={placeholder}
                  className="rounded-none ring-0 outline-none placeholder:text-xs border-b  border-none "
                  hidden={hidden}
                  readOnly={readOnly}
                  value={value}
                  onChange={(event) => {
                    setValue(event.currentTarget.value);
                    field.onChange(list)
                  }}
                  onKeyUp={(e) => handleInputChange(e, field)}
                />
              </FormControl>
            </div>
          </div>
          <div className=" min-h-16 bg-popover flex p-3 rounded-b-md">
            {list.length < 1 && (
              <div className="text-xs mx-auto my-auto">
                Separate with commas and using the enter key
              </div>
            )}

            {list.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex flex-wrap items-center gap-2 *:capitalize">
                  {list.map((value, index) => {
                    const option = list.find((o) => o === value);
                    return (
                      <Badge
                        key={index}
                        className="bg-low-red text-primary hover:bg-low-red hover:shadow-lg"
                      >
                        {option}
                        <Button
                          variant={"transparent"}
                          size={"no-pad"}
                          onClick={(event) => {
                            event.stopPropagation();
                            removeOption(value);
                          }}
                        >
                          <XCircle className="ml-2 h-4 w-4 cursor-pointer" />
                        </Button>
                      </Badge>
                    );
                  })}
                </div>
                <Badge className={"bg-red text-popover size-fit"}>
                  <Button
                    variant={"transparent"}
                    size={"no-pad"}
                    onClick={(event) => {
                      event.stopPropagation();
                      clearAll(field);
                    }}
                  >
                    Clear all
                    {/* <XCircle className="ml-2 h-4 w-4 cursor-pointer" /> */}
                  </Button>
                </Badge>
              </div>
            )}
          </div>

          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomListForm;
