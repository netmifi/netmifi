// Reusable radio group field
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { splitCamelCaseToWords } from "@/lib/utils";

const CustomRadioGroup = ({
  control,
  name,
  label = "",
  group,
  isNotLabeled = false,
  defaultChecked, // default value to check
  setDetectedValueChange,
}: CustomRadioGroupProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          {!isNotLabeled && (
            <FormLabel className="capitalize flex gap-1">
              {label || splitCamelCaseToWords(name)}
            </FormLabel>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                setDetectedValueChange && setDetectedValueChange(value);
              }}
              value={field.value || defaultChecked}
              className="flex flex-col space-y-1"
            >
              {group.map(({ label, value }) => (
                <FormItem
                  key={value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className="font-normal capitalize">
                    {label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomRadioGroup;
