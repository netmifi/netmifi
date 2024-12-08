import { createCourseFormSchema } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
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

const CreateCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAccepted, setIsAccepted] = useState<CheckedState>(false);
  const [isAvailableForMentorship, setIsAvailableForMentorship] = useState("");

  const formSchema = createCourseFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const thumbnailRef = form.register("thumbnail");
  const introVideoRef = form.register("introVideo");
  const courseVideoRef = form.register("video");

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

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <main className="px-2 sm:px-4 bg-popover rounded-lg shadow-sm">
      <header className="w-full py-3 text-md sm:text-lg">
        Create New Course
      </header>

      <section className="bg-secondary py-3 px-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <section className="flex flex-wrap gap-3">
              <div className="flex flex-col gap-10 flex-grow">
                <CustomFormField
                  control={form.control}
                  name="title"
                  placeholder="Input course title"
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

              <div className="mt-14 flex flex-col gap-7 flex-grow min-w-[20em]">
                <CustomFileField
                  name="video"
                  control={form.control}
                  label="Course Video"
                  placeholder="Select a (.mp4) file (Max: 50mb)"
                  fileRef={courseVideoRef}
                  fileType=".mp4, .mpeg"
                />

                <CustomFormField
                  form={form}
                  control={form.control}
                  name="price"
                  placeholder="input price here"
                  isCurrency={true}
                />

                <CustomRadioGroup
                  control={form.control}
                  name={"mentorshipAvailability"}
                  label="will you be available for mentorship?"
                  group={radioGroupData}
                  defaultValue={"no"}
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
              </div>
            </section>

            <div className="flex flex-col gap-3 mt-4 sm:mt-8">
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
                  // onClick={form.}
                  type="submit"
                >
                  {isLoading ? <Loader type="all" /> : "Upload Course"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default CreateCourse;
