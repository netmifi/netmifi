import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn, splitCamelCaseToWords } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
const CustomFormField = ({
  control,
  name,
  type,
  textareaType = "normal",
  isPasswordVisible,
  placeholder,
  label = "",
  isNotLabeled = false,
  defaultValue = "",
  value = "",
  disabled = false,
  hidden = false,
}: CustomFormFieldProps) => {
  const isContactField = name === "phone";
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field }) => (
        <FormItem className="form-item" hidden={hidden}>
          <div className="w-full flex flex-col gap-1">
            <FormLabel className="capitalize">
              {!isNotLabeled ? label || splitCamelCaseToWords(name) : ""}
            </FormLabel>
            <FormControl>
              {type === "textarea" ? (
                <Textarea
                  rows={textareaType === "comment" ? 1 : 5}
                  placeholder={placeholder}
                  className={cn("resize-none", {
                    "min-h-1 border-e-0 border-s-0 border-t-0 border-b-2 focus-visible:ring-transparent focus-visible:border-b-base-foreground":
                      textareaType === "comment",
                  })}
                  {...field}
                  value={value || field.value || ""}
                />
              ) : isContactField ? (
                <div className="contact-input">
                  <div className=" inset-y-0 left-0 flex items-center">
                    <span className="text-white bg-primary rounded-xl px-3 py-2 ">
                      +234
                    </span>
                  </div>
                  <Input
                    type="tel"
                    name={name}
                    placeholder={placeholder}
                    hidden={hidden}
                    value={value || field.value || ""}
                    onChange={field.onChange}
                    readOnly={true}
                    className="border-none focus-visible:ring-0 bg-transparent"
                  />
                </div>
              ) : (
                <Input
                  className="border-none focus-visible:ring-secondary focus-visible:ring-1 focus-visible:border-0 bg-transparent"
                  placeholder={placeholder}
                  {...field}
                  type={
                    name === "password" && isPasswordVisible
                      ? "text"
                      : name === "password"
                      ? "password"
                      : "text"
                  }
                  value={value || field.value || ""}
                  onChange={field.onChange}
                />
              )}
            </FormControl>
          </div>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
