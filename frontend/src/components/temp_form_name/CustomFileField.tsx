/* eslint-disable @typescript-eslint/no-explicit-any */
// reusable form field for file input
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn, splitCamelCaseToWords } from "@/lib/utils";
import { useRef, useState } from "react";
import { FaAsterisk } from "react-icons/fa6";

const CustomFileField = ({
  control,
  name,
  placeholder = "",
  label = "",
  isNotLabeled = false,
  defaultValue = "",
  disabled = false,
  hidden = false,
  isOptional = false,
  fileRef,
  fileType = "*",
  className = "",
  parentClassName = "",
  defaultImg = "",
}: CustomFileFieldProps) => {
  const [selectedFile, setSelectedFile] = useState<FileList | undefined | any>(
    ""
  );
  const previewImageRef = useRef<HTMLImageElement>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // this function handles image preview
    const file = event.target.files?.[0];
    console.log("new", file);
    if (file) {
      previewImageRef.current.src = URL.createObjectURL(file);
      setSelectedFile(file);
    }
  };
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      render={() => (
        <FormItem className={cn(parentClassName)} hidden={hidden}>
          <div className="flex flex-col gap-2">
            {!isNotLabeled && (
              <FormLabel className="capitalize flex gap-1">
                {label || splitCamelCaseToWords(name)}
                {isOptional && <FaAsterisk className="text-destructive" />}
              </FormLabel>
            )}
          </div>

          <div className={cn("flex w-full", className)}>
            <FormLabel
              className={cn(
                "flex items-center justify-center h-[10em] w-full bg-popover p-3 rounded-xl border-2 border-primary/70 cursor-crosshair border-dashed text-base sm:text-lg text-center text-primary/70 overflow-hidden",
                {
                  "p-0":
                    selectedFile && selectedFile?.type.startsWith("image/"),
                }
              )}
            >
              <span
                className={cn({
                  hidden:
                    selectedFile && selectedFile?.type.startsWith("image/"),
                })}
              >
                {" "}
                {(selectedFile && selectedFile?.name) ||
                  placeholder ||
                  "Select a file"}
              </span>

              <img
                src={defaultImg ?? ""}
                ref={previewImageRef}
                className={cn("object-contain h-full w-full", {
                  hidden:
                    !selectedFile || !selectedFile?.type.startsWith("image/"),
                })}
                alt=""
              />

              {/* <video ref={previewImageRef} controls></video> */}
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                hidden={true}
                className="hidden"
                accept={fileType}
                {...fileRef}
                onChangeCapture={handleFileChange}
              />
            </FormControl>
          </div>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomFileField;
