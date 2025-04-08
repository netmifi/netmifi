// resauble wysigw text editor
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, splitCamelCaseToWords } from "@/lib/utils";
import { useState } from "react";
import TiptapEditor from "../TiptapEditor";

const CustomRichTextEditor = ({
  form,
  control,
  name,
  defaultValue,
  hidden = false,
  className = "",
  config,
}: CustomRichTextEditorProps) => {
  const [model, setModel] = useState("");
  const handleModelChange = (event) => {
    setModel(event);
  };
  return (
    <FormField
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className={cn({ "form-item": !hidden })} hidden={hidden}>
          <FormControl>
            <TiptapEditor
              initialContent={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomRichTextEditor;
