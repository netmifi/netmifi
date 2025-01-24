import { createCourseSchema } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import CustomFormField from "@/components/Form/CustomFormField";
import CustomRichTextEditor from "@/components/Form/CustomRichTextEditor";
import { Button } from "@/components/ui/button";
import CustomFileField from "@/components/Form/CustomFileField";
import CustomListForm from "@/components/Form/CustomListForm";
import CustomRadioGroup from "@/components/Form/CustomRadioGroup";
import CustomMultiSelect from "@/components/Form/CustomMultiSelect";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import Loader from "@/components/Loader";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { CheckedState } from "@radix-ui/react-checkbox";
import CourseVideoSection from "@/components/instructor_dashboard/CourseVideoSection";
import { PlusSquareIcon } from "lucide-react";
import { logo } from "@/assets/logo";

const CreateCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sectionsCount, setSectionsCount] = useState(1);
  const [fields, setFields] = useState<
    Record<string, { title: string; video: File | null; description: string }>
  >({
    field1: {
      title: "",
      video: null,
      description: "",
    },
  });
  const [isAccepted, setIsAccepted] = useState<CheckedState>(false);
  const [isAvailableForMentorship, setIsAvailableForMentorship] = useState("");

  const formSchema = createCourseSchema;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mentorshipAvailability: "no",
      dynamicFields: {},
    },
  });
  const thumbnailRef = form.register("thumbnail");
  const introVideoRef = form.register("introVideo");

  const config = {
    placeholderText: "Course Description",
    charCounterCount: true,
  };

  const radioGroupData = [
    {
      label: "yes",
      value: "yes",
    },
    {
      label: "no",
      value: "no",
    },
  ];

  const addField = () => {
    setSectionsCount(sectionsCount + 1);
    const newKey = `field${Object.keys(fields).length + 1}`;
    setFields((prev) => ({
      ...prev,
      [newKey]: { title: "", video: null, description: "" },
    }));
  };

  const removeField = (key: string) => {
    const updatedFields = { ...fields };
    delete updatedFields[key];
    setFields(updatedFields);
    setSectionsCount(sectionsCount - 1);
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data, form.formState);
  };

  return (
    <div className="w-full px-2 sm:px-4 bg-popover rounded-lg shadow-sm">
      <header className="w-full py-3 text-base sm:text-md flex justify-between gap-2 items-center">
        Create New Course
        <div className="relative">
          <img src={logo} className="w-[30px]" alt="logo" />
        </div>
      </header>
      {/* FIXME: FIND THE SOURCE OF THE DOUBLE SCROLL BAR */}
      <div className="max-w-full py-3 px-1">
        <Form {...form}>
          <form
            className="overflow-y-hidden"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <section className="flex flex-wrap gap-3 mb-[10em] ">
              <div className="flex flex-col gap-10 flex-grow">
                <CustomFormField
                  control={form.control}
                  name="title"
                  placeholder="Input course title"
                />
                <CustomFormField
                  form={form}
                  control={form.control}
                  name="price"
                  placeholder="input price here"
                  isCurrency={true}
                />

                <CustomRichTextEditor
                  control={form.control}
                  name="description"
                  label="course description"
                  config={config}
                />

                <CustomFileField
                  name="thumbnail"
                  control={form.control}
                  label="thumbnail"
                  placeholder="Select a file (.jpg, .png, .jpeg) file (Max: 3mb)"
                  fileRef={thumbnailRef}
                  fileType=".jpg, .png, .jpeg"
                />

                <CustomListForm
                  name="requirements"
                  control={form.control}
                  form={form}
                  placeholder="Input none if no requirements"
                />

                <CustomFileField
                  name="introVideo"
                  control={form.control}
                  label="introduction video"
                  placeholder="Select a (.mp4) file (Max: 15mb)"
                  fileRef={introVideoRef}
                  fileType=".mp4, .mpeg"
                />
              </div>

              <div className="flex flex-col gap-7 flex-grow">
                <CustomRadioGroup
                  control={form.control}
                  name={"mentorshipAvailability"}
                  label="will you be available for mentorship?"
                  group={radioGroupData}
                  defaultChecked={"no"}
                  setDetectedValueChange={setIsAvailableForMentorship}
                />
                {isAvailableForMentorship === "yes" && (
                  <div className="flex flex-col gap-px">
                    <CustomMultiSelect
                      form={form}
                      control={form.control}
                      name={"mentorshipAvailabilityDays"}
                      placeholder="Pick days you are available for mentorship"
                      options={[
                        "sunday",
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                        "saturday",
                      ]}
                    />

                    <div className="flex gap-5  items-center mt-4">
                      <div className="flex-grow">
                        <CustomFormField
                          control={form.control}
                          name={"from"}
                          label="from:"
                          inputType="time"
                        />
                      </div>

                      <Separator orientation="vertical" className="w-px" />

                      <div className="flex-grow">
                        <CustomFormField
                          control={form.control}
                          name={"to"}
                          label="to:"
                          inputType="time"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-5">
                  <h2 className="text-base sm:text-lg text-red border-t-2 pt-2">
                    Course section
                  </h2>

                  <FormField
                    control={form.control}
                    name="dynamicFields"
                    render={({ field }) => (
                      <>
                        {Object.keys(fields).map((key, index) => (
                          <FormItem key={field.name + key}>
                            <CourseVideoSection
                              key={key}
                              index={index}
                              id={key}
                              isMoreThanOne={sectionsCount > 1}
                              form={form}
                              removeField={removeField}
                            />
                          </FormItem>
                        ))}
                      </>
                    )}
                  />
                </div>
                <Button
                  type="button"
                  className="shadow-md rounded-full w-fit [&_svg]:size-16 text-secondary"
                  onClick={addField}
                >
                  <PlusSquareIcon />{" "}
                  <span className="max-sm:hidden">Add Section</span>{" "}
                </Button>
              </div>
            </section>

            <div className="flex flex-col gap-3 mt-10 sm:mt-10">
              <div className="flex gap-3 items-center">
                <Checkbox
                  id="accept"
                  checked={isAccepted}
                  onCheckedChange={(checked) => setIsAccepted(checked)}
                />
                <div className="inline-flex gap-1">
                  <Label htmlFor="accept" className="text-xs sm:text-sm">
                    Do you accept all our
                  </Label>
                  <Link
                    to="/t&c"
                    className="text-xs sm:text-sm text-blue underline"
                  >
                    Terms and conditions?
                  </Link>
                </div>
              </div>

              <div className="flex w-full">
                <Button
                  disabled={!isAccepted || isLoading}
                  className="sm:ml-auto basis-full sm:basis-[30%]"
                  onClick={() => console.log(form.formState.errors)}
                  type="submit"
                >
                  {isLoading ? <Loader type="all" /> : "Upload Course"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCourse;
