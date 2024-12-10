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
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  WandSparkles,
} from "lucide-react";

import { cva } from "class-variance-authority";
import { MultiSelect } from "../MultiSelect";

const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const CustomMultiSelect = ({
  form,
  control,
  name,
  placeholder,
  defaultOptions = [],
  hidden = false,
  isNotLabeled = false,
  options,
  animation = 0,
  maxCount = 3,
  className = "",
  modalPopover = false,
  variant = "inverted",
}: CustomMultiSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="form-item">
          <div
            className={cn({
              "flex flex-col relative": !isNotLabeled,
              "unlabeled-form-field": isNotLabeled,
              filled: !isNotLabeled && field.value,
            })}
          >
            <FormLabel className="bg-secondary text-xs capitalize px-1 py-px absolute -top-4 left-[1.5%] w-fit h-fit shadow-sm">
              {splitCamelCaseToWords(name)}
            </FormLabel>
            <FormControl>
              <MultiSelect
                options={options}
                onValueChange={field.onChange}
                defaultValue={field.value}
                placeholder={placeholder}
                variant={variant}
                animation={animation}
                maxCount={maxCount}
              />
            </FormControl>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomMultiSelect;
