import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn, splitCamelCaseToWords } from "@/lib/utils";
import { useState } from "react";
import FroalaEditor from "react-froala-wysiwyg";

const CustomRichTextEditor = ({
  form,
  control,
  name,
  defaultValue,
  hidden = false,
  isNotLabeled = false,
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
            <FroalaEditor
              tag="textarea"
              config={config}
              model={field.value}
              onModelChange={field.onChange}
              // {...field}
            />
          </FormControl>
          <FormMessage className="form-message" />
        </FormItem>
      )}
    />
  );
};

export default CustomRichTextEditor;
