import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CustomFormField from "../Form/CustomFormField";
import CustomFileField from "../Form/CustomFileField";
import CustomRichTextEditor from "../Form/CustomRichTextEditor";
import { Button } from "../ui/button";
import { XCircleIcon } from "lucide-react";

const fieldsInSection = (form: CourseVideoSectionProps["form"], id: string) => {
  const courseVideoRef = form.register(`dynamicFields.${id}.video`);
  // console.log(courseVideoRef);
  const config = {
    placeholderText: "Course section description (optional)",
    charCounterCount: true,
  };
  return (
    <>
      <CustomFormField
        control={form.control}
        name={`dynamicFields.${id}.title`}
        label="Title"
        placeholder="Input section title"
        {...form.register(`dynamicFields.${id}.title` as const)}
      />
      <CustomFileField
        name={`dynamicFields.${id}.video`}
        control={form.control}
        label="Course Video"
        placeholder="Select a (.mp4) file (Max: 50mb)"
        fileRef={form.register(`dynamicFields.${id}.video`)}
        // {...form.register(`dynamicFields.${id}.video` as const)}
        fileType=".mp4, .mpeg"
      />
      <CustomRichTextEditor
        control={form.control}
        name={`dynamicFields.${id}.description`}
        label="section description"
        config={config}
        isOptional
        // {...form.register(`dynamicFields.${id}.description` as const)}
      />
    </>
  );
};

const CourseVideoSection = ({
  form,
  isMoreThanOne,
  index,
  id,
  removeField,
}: CourseVideoSectionProps) => {
  return (
    <>
      {isMoreThanOne ? (
        <Accordion type="single" collapsible>
          <AccordionItem value={"item" + index}>
            <AccordionTrigger className="text-sm sm:text-base bg-secondary px-3 hover:no-underline ">
              <div className="flex gap-1 items-center">
                <Button
                  variant={"transparent"}
                  size={"no-pad"}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeField(id);
                  }}
                  className="h-fit [&_svg]:size-5"
                >
                  <XCircleIcon />
                </Button>
                Section {index + 1}
              </div>
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-3 mt-2">
              {fieldsInSection(form, id)}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        fieldsInSection(form, id)
      )}
    </>
  );
};

export default CourseVideoSection;
