import { convertToReadableTime, createCourseSchema } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import CustomFormField from "@/components/form/CustomFormField";
import CustomRichTextEditor from "@/components/form/CustomRichTextEditor";
import { Button } from "@/components/ui/button";
import CustomFileField from "@/components/form/CustomFileField";
import CustomListForm from "@/components/form/CustomListForm";
import CustomRadioGroup from "@/components/form/CustomRadioGroup";
import CustomMultiSelect from "@/components/form/CustomMultiSelect";
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
import { useCreateCourse } from "@/api/hooks/instructor/useCreateCourse";
import { toast } from "sonner";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { Progress } from "@/components/ui/progress";
import { useApp } from "@/app/app-provider";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertDescription } from "@/components/ui/alert";
import CustomFormSelect from "@/components/form/CustomFormSelect";
import { categories } from "@/constants";

const CreateCourse = () => {
  const { courseUploadProgress } = useApp();
  const createCourseMutation = useCreateCourse();
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

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("mentorshipAvailability", values.mentorshipAvailability);
      formData.append(
        "mentorshipAvailabilityDays",
        JSON.stringify(values.mentorshipAvailabilityDays)
      );
      formData.append("from", values.from || "");
      formData.append("to", values.to || "");

      formData.append("thumbnail", values.thumbnail || "");
      formData.append("introVideo", values.introVideo || "");

      // Append dynamic fields (e.g., videos in `dynamicFields`)
      Object.keys(values.dynamicFields).forEach((fieldKey) => {
        const field = values.dynamicFields[fieldKey];
        formData.append(`dynamicFields[${fieldKey}][title]`, field.title);
        formData.append(
          `dynamicFields[${fieldKey}][description]`,
          field.description || ""
        );
        if (field.video) {
          formData.append(`dynamicFields[${fieldKey}][video]`, field.video);
        }
      });

      // console.log(formData.entries());

      // Use the mutation function to send FormData
      await createCourseMutation.mutateAsync(formData);
      toast.success("Upload successful", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });

      console.log(createCourseMutation);

      // console.log("formdata:" + formData);
      // TODO: Find the best route to navigate
      // navigate("/");
    } catch (error) {
      mutationErrorHandler(createCourseMutation, error);
    }
  };

  return (
    <div className="w-full px-2 sm:px-4 bg-popover rounded-lg shadow-sm">
      <AlertDialog open={createCourseMutation.isPending || false}>
        <AlertDialogContent>
          <AlertDialogHeader className="items-center">
            <Loader type="loader" size={55} className="w-fit *:text-red" />
            <span className="absolute top-[15%] text-sm bold text-center font-montserrat">
              {courseUploadProgress.progress}%
            </span>
            <AlertDialogTitle>Uploading your course...</AlertDialogTitle>
            <AlertDescription>
              Please do not close or refresh this page
            </AlertDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="">
            <div className="w-full flex flex-col">
              <div className="w-full">
                <Progress
                  className="h-1"
                  value={courseUploadProgress.progress}
                />
              </div>

              <div className="mt-1 w-full flex justify-between items-center text-sm">
                <span>{courseUploadProgress.rate}Kb/s</span>
                <span className="text-red">
                  {convertToReadableTime(courseUploadProgress.elapsedTime)}
                </span>
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* FIXME: FIND THE SOURCE OF THE DOUBLE SCROLL BAR */}
      <header className="w-full py-3 text-base sm:text-md flex justify-between gap-2 items-center">
        Create New Course
        <div className="relative">
          <img src={logo} className="w-[30px] grayscale" alt="logo" />
        </div>
      </header>
      <div className="max-w-full py-3 px-1">
        <Form {...form}>
          <form
            className="overflow-y-hidden"
            onSubmit={form.handleSubmit(handleSubmit)}
            // encType="multipart/form-data"
          >
            <section className="flex flex-wrap gap-3 mb-[10em] ">
              <div className="flex flex-col gap-10 flex-grow">
                <div className="flex gap-5 *:flex-grow">
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
                </div>

                <CustomFormSelect
                  control={form.control}
                  name="category"
                  options={categories}
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
                  className="shadow-md rounded-full w-fit [&_svg]:size-16 text-popover"
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
                  disabled={!isAccepted || createCourseMutation.isPending}
                  className="sm:ml-auto basis-full sm:basis-[30%]"
                  onClick={() => console.log(form.formState.errors)}
                  type="submit"
                >
                  {createCourseMutation.isPending ? (
                    <Loader type="all" />
                  ) : (
                    "Upload Course"
                  )}
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
