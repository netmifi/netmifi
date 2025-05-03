import { convertToReadableTime, createCourseSchema } from "@/lib/utils";
import { useForm, useFieldArray } from "react-hook-form";
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
import CourseVideoSection from "@/components/dashboard/CourseVideoSection";
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
import { VideoProcessor, VideoSection } from "@/services/videoProcessor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [videoSections, setVideoSections] = useState<VideoSection[]>([]);
  const [processingStatus, setProcessingStatus] = useState<{
    stage: "idle" | "validating" | "processing" | "complete";
    progress: number;
    message: string;
  }>({
    stage: "idle",
    progress: 0,
    message: "",
  });

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

  const handleVideoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setProcessingStatus({
        stage: "validating",
        progress: 0,
        message: "Validating video file...",
      });

      // Create video processor
      const processor = new VideoProcessor(URL.createObjectURL(file));

      // Process video with progress updates
      const processedVideo = await processor.processVideo(
        file,
        form.getValues("title"),
        (progress) => {
          setProcessingStatus({
            stage: progress.stage,
            progress: progress.progress,
            message: progress.message,
          });
        }
      );

      // Update form with video file
      form.setValue("introVideo", file);

      // Update sections
      setVideoSections(processedVideo.sections);

      // Add sections to form
      processedVideo.sections.forEach((section) => {
        form.setValue(`dynamicFields[${section.id}][title]`, section.title);
        form.setValue(
          `dynamicFields[${section.id}][description]`,
          section.description
        );
        form.setValue(`dynamicFields[${section.id}][video]`, file);
      });

      toast.success("Video processed successfully");
    } catch (error) {
      console.error("Error processing video:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to process video"
      );
      setProcessingStatus({
        stage: "idle",
        progress: 0,
        message: "",
      });
    }
  };

  const handleSectionUpdate = (index: number, field: string, value: string) => {
    const updatedSections = [...videoSections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value,
    };
    setVideoSections(updatedSections);

    // Update form field
    form.setValue(
      `dynamicFields[${updatedSections[index].id}][${field}]`,
      value
    );
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("price", values.price.toString());
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

      // Add sections data
      formData.append("sections", JSON.stringify(videoSections));

      // Use the mutation function to send FormData
      await createCourseMutation.mutateAsync(formData);
      toast.success("Upload successful", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });

      console.log(createCourseMutation);

      // Reset form and navigate
      form.reset();
      setVideoSections([]);
    } catch (error) {
      mutationErrorHandler(error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 bg-popover rounded-lg shadow-sm">
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

                <Card>
                  <CardHeader>
                    <CardTitle>Course Video</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="video">Upload Video</Label>
                      <Input
                        id="video"
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        onChange={handleVideoUpload}
                        disabled={processingStatus.stage !== "idle"}
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Supported formats: MP4, WebM, QuickTime (Max: 500MB)
                      </p>
                    </div>

                    {processingStatus.stage !== "idle" && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>{processingStatus.message}</Label>
                          <span className="text-sm text-gray-500">
                            {processingStatus.progress}%
                          </span>
                        </div>
                        <Progress value={processingStatus.progress} />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {videoSections.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Sections</CardTitle>
                      <p className="text-sm text-gray-500">
                        {videoSections.length} sections created automatically
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {videoSections.map((section, index) => (
                        <div
                          key={section.id}
                          className="space-y-4 p-4 border rounded-lg"
                        >
                          <div>
                            <Label>Section Title</Label>
                            <Input
                              value={section.title}
                              onChange={(e) =>
                                handleSectionUpdate(
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={section.description}
                              onChange={(e) =>
                                handleSectionUpdate(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Duration</Label>
                              <p className="text-sm text-gray-500">
                                {Math.round(section.duration)} minutes
                              </p>
                            </div>
                            <div>
                              <Label>XP Reward</Label>
                              <p className="text-sm text-gray-500">
                                {section.xpReward} XP
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
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
