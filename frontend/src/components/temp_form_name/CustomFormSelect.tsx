// reusable field for select
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, splitCamelCaseToWords } from "@/lib/utils";

const CustomFormSelect = ({
  control,
  name,
  placeholder,
  defaultOption = "",
  defaultValue = "",
  hidden = false,
  isNotLabeled = false,
  options, // select options
}: CustomFormSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className={cn({ "form-item": !hidden })} hidden={hidden}>
          <div
            className={cn({
              "form-field": !isNotLabeled,
              "unlabeled-form-field": isNotLabeled,
              filled: !isNotLabeled && field.value,
            })}
            // className="flex w-full gap-1 flex-col bg-secondary ring-2 ring-secondary rounded-lg p-2 focus-within:ring-destructive focus-within:bg-primary-foreground"
          >
            <FormLabel className="text-xs capitalize">
              {splitCamelCaseToWords(name)}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value || defaultValue || defaultOption}
            >
              <SelectTrigger className="py-5 text-gray-500 bg-transparent border-none p-0 h-auto focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {options.map((option, index) => (
                  <SelectItem key={index} value={typeof option === 'object' ? option.value : option}>
                    <span className="flex items-center capitalize">
                      {typeof option === 'object' ? option.label : option}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormSelect;
