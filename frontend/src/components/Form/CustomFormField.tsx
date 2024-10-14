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
import { useState } from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { z } from "zod";
const CustomFormField = ({
  control,
  name,
  type = "input",
  textareaType = "normal",
  isPasswordVisible,
  placeholder = "",
  inputType = "",
  label = "",
  isNotLabeled = false,
  defaultValue = "",
  value = "",
  disabled = false,
  hidden = false,
  readOnly = false,
}: CustomFormFieldProps) => {
  const isContactField = name === "phone";

  const [inputValue, setInputValue] = useState(value || defaultValue || "");

  const handleInputValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<FieldValues, FieldPath<z.infer<any>>>
  ) => {
    const value = e.currentTarget.value;
    console.log(field.value);

    field.onChange(e);
    setInputValue(value);
  };

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
              filled: !isNotLabeled && field.value,
            })}
          >
            {!isNotLabeled && (
              <FormLabel className="capitalize">
                {label || splitCamelCaseToWords(name)}
              </FormLabel>
            )}
            <FormControl>
              {type === "textarea" ? (
                <Textarea
                  placeholder={placeholder}
                  className={cn("resize-none", {
                    "min-h-1 border-e-0 border-s-0 border-t-0 border-b-2 focus-visible:ring-transparent focus-visible:border-b-base-foreground":
                      textareaType === "comment",
                  })}
                  readOnly={readOnly}
                  // value={inputValue}
                  // onChange={(e) => handleInputValue(e, field)}
                  hidden={hidden}
                  {...field}
                />
              ) : isContactField ? (
                <div className="contact-input">
                  <div className=" inset-y-0 left-0 flex items-center">
                    <span className="text-white bg-primary rounded-0 px-3 py-2 ">
                      +234
                    </span>
                  </div>
                  <Input
                    type="tel"
                    placeholder={placeholder}
                    hidden={hidden}
                    readOnly={readOnly}
                    {...field}

                    // onChange={handleInputValue}
                    // className="border-none focus-visible:ring-0 bg-secondary focus-visible:bg-transparent"
                  />
                </div>
              ) : (
                <Input
                  placeholder={placeholder}
                  {...field}
                  type={
                    name === "password" && isPasswordVisible
                      ? "text"
                      : name === "password"
                      ? "password"
                      : "text"
                  }
                  hidden={hidden}
                  readOnly={readOnly}
                  // value={inputValue}
                  // onChange={(e) => handleInputValue(e, field)}
                  // {...field}
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
