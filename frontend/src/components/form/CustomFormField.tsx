// this reusable field handles basic input and textarea, e.g password field, text, url etc
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
import { LinkIcon } from "lucide-react";
import { FaAsterisk, FaNairaSign } from "react-icons/fa6";
const CustomFormField = ({
  form,
  control,
  name,
  type = "input", // textarea
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
  isOptional = false,
  isCurrency = false,
  URLIcon,
}: CustomFormFieldProps) => {
  const isHyperlinkField = inputType === "url";

  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const value = parseInt(event.currentTarget.value);
  //   if (isCurrency && isNaN(value)) {
  //     form.setValue(name, value.toLocaleString());
  //     // parseInt(value)
  //   }
  //   console.log();
  // };

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
              <FormLabel className="capitalize flex gap-1">
                {label || splitCamelCaseToWords(name)}
                {isOptional && <FaAsterisk className="text-destructive" />}
              </FormLabel>
            )}

            <div className="flex h-full w-full rounded-lg overflow-x-hidden">
              {/* {isContactField && (
                <div className="bg-primary text-secondary text-sm sm:text-base flex justify-center items-center px-2">
                  {dialCode}
                </div>
              )} */}

              {/* TODO: convert input to standard currency string i.e with commas */}
              {isCurrency && (
                <div className="text-sm sm:text-base flex justify-center items-center px-2 *:text-base *:size-5">
                  <FaNairaSign />
                </div>
              )}

              {isHyperlinkField && (
                <div className="text-sm sm:text-base flex justify-center items-center px-2 *:text-base *:size-5">
                  {URLIcon ?? <LinkIcon />}
                </div>
              )}
              <FormControl>
                {type === "textarea" ? (
                  <Textarea
                    placeholder={placeholder}
                    className={cn("", {
                      "min-h-1 border-e-0 border-s-0 border-t-0 border-b-2 focus-visible:ring-transparent focus-visible:border-b-base-foreground placeholder:text-xs":
                        textareaType === "comment",
                    })}
                    readOnly={readOnly}
                    // value={inputValue}
                    // onChange={(e) => handleInputValue(e, field)}
                    hidden={hidden}
                    {...field}
                  />
                ) : (
                  <Input
                    className="rounded-none ring-0 outline-none placeholder:text-xs"
                    placeholder={placeholder}
                    {...field}
                    // onChange={handleInputChange}
                    type={
                      (name === "password" ||
                        String(name).includes("assword")) &&
                      isPasswordVisible
                        ? "text"
                        : name === "password"
                        ? "password"
                        : inputType ?? "text"
                    }
                    hidden={hidden}
                    readOnly={readOnly}
                  />
                )}
              </FormControl>
            </div>
          </div>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
