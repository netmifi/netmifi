import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useInstructorRegister } from "@/api/hooks/auth/useInstructorRegister";
import { useApp } from "@/app/app-provider";
import CountryFormSelect from "@/components/form/CountryFormSelect";
import CustomContactField from "@/components/form/CustomContactField";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import CustomFormField from "@/components/form/CustomFormField";
import CustomFormSelect from "@/components/form/CustomFormSelect";
import CustomMultiSelect from "@/components/form/CustomMultiSelect";
import CustomRadioGroup from "@/components/form/CustomRadioGroup";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { categories } from "@/constants";
import { instructorFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { useCountries } from "react-countries";
import { useForm } from "react-hook-form";
import {
  FaAsterisk,
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const SignInstructor = () => {
  const { setUser } = useApp();
  const { state } = useLocation();
  // const { countries } = useCountries();
  const instructorRegisterMutation = useInstructorRegister();
  const [isAccepted, setIsAccepted] = useState<CheckedState>(false);
  // const [isAvailableForMentorship, setIsAvailableForMentorship] = useState("");
  const [country, setCountry] = useState<Country>({
    name: "Nigeria",
    dialCode: "+234",
    code: "NG",
    flag: "🇳🇬",
  });
  const [, setDialCode] = useState(country?.dialCode || "+234");

  const formSchema = instructorFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: { name: "Nigeria", dialCode: "+234", code: "NG", flag: "🇳🇬" },
    },
  });
  const navigate = useNavigate();

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

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    try {
      // if (form.formState.errors.country) {
      //   return;
      // }
      const { data } = await instructorRegisterMutation.mutateAsync({
        ...values,
      });
      toast.success("Request received", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });

      setUser(data.user);
      console.log(data);
      navigate(
        state && state.returnUrl ? state.returnUrl : "/auth/welcome/interest"
      );
    } catch (error) {
      mutationErrorHandler(instructorRegisterMutation, error);
    }
  };

  useEffect(() => {
    form.setValue("country", country);
  }, [country, form]);

  return (
    <div className="mt-5 w-full flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="font-semibold text-lg sm:text-xl ">
          Instructors Application Form
        </h2>
        <p className="text-xs sm:text-sm">
          Welcome!, we are excited that you’re interested in sharing your
          journey, skills and idea on Netmifi. To help us to know you better and
          ensure you’re a great fit for our community, please complete this
          short application form.
        </p>
      </div>

      <p className="text-xs flex items-center gap-1">
        Optional fields are marked as{" "}
        <FaAsterisk className="text-destructive" />
      </p>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(handleSubmit)}
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-wrap justify between gap-6 *:flex-grow *:min-w-[45%]"
        >
          {/* {console.log(form.formState.errors)}{" "} */}
          <CustomFormField
            name="fullName"
            control={form.control}
            placeholder="Enter your full name"
            label="full name"
          />
          {/* <CustomFormField
            name="email"
            control={form.control}
            placeholder="Enter your email address"
            label="email address"
          /> */}
          {/* <CustomFormField
            name="username"
            control={form.control}
            placeholder="Enter your unique username"
            label="username"
          /> */}
          {/* <CountryFormSelect
            form={form}
            control={form.control}
            countries={countries}
            name={"country"}
            label="country"
            // dialCode={dialCode}
            // setDialCode={setDialCode}
          /> */}
          <CustomContactField
            form={form}
            name="phone"
            control={form.control}
            placeholder="Enter your phone number"
            label="phone number"
            setDialCode={setDialCode}
            setCountry={setCountry}
          />
          <CustomFormField
            name="residentialAddress"
            control={form.control}
            placeholder="Enter your residential address info"
            isOptional
          />
          <div className="flex flex-col gap-1 my-5">
            <h4 className="text-base sm:text-lg">
              Your social medial handles{" "}
              <small className="text-primary/50">
                at least two is required
              </small>
            </h4>
            <div className="flex flex-wrap gap-5 *:flex-grow *:min-w-[40%]">
              <CustomFormField
                name="facebook"
                placeholder="e.g https://facebook.com/your-handle"
                control={form.control}
                inputType="url"
                isNotLabeled
                URLIcon={<FaFacebookF />}
              />
              <CustomFormField
                name="instagram"
                placeholder="e.g https://instagram.com/your-handle"
                control={form.control}
                inputType="url"
                isNotLabeled
                URLIcon={<FaInstagram />}
              />
              <CustomFormField
                name="tiktok"
                placeholder="e.g https://tiktok.com/your-handle"
                control={form.control}
                inputType="url"
                isNotLabeled
                URLIcon={<FaTiktok />}
              />
              <CustomFormField
                name="youtube"
                placeholder="e.g https://youtube.com/your-handle"
                control={form.control}
                inputType="url"
                isNotLabeled
                URLIcon={<FaYoutube />}
              />

              <CustomFormField
                name="website"
                placeholder="e.g https://mywebsite.com"
                control={form.control}
                inputType="url"
                isNotLabeled
              />
            </div>
          </div>
          <CustomFormSelect
            name="niche"
            control={form.control}
            placeholder="Select your area of expertise"
            options={categories}
            label="are of expertise"
          />
          <CustomFormField
            name="whyInterest"
            control={form.control}
            placeholder="why are you interested in our platform"
            isOptional
          />
          <div className="flex gap-6 *:flex-grow flex-wrap">
            <CustomRadioGroup
              control={form.control}
              name={"taughtBefore"}
              label="have you taught online before?"
              group={radioGroupData}
            />
            <CustomRadioGroup
              control={form.control}
              name={"mentoredPreviously"}
              label="have you been a mentor previously?"
              group={radioGroupData}
            />

            {/* <CustomRadioGroup
              control={form.control}
              name={"mentorshipAvailability"}
              label="will you be available for mentorship?"
              group={radioGroupData}
              setDetectedValueChange={setIsAvailableForMentorship}
            /> */}
          </div>
          {/* 
          {isAvailableForMentorship === "yes" && (
            <div className="flex flex-col gap-px mt-5 *:flex-grow basis-full">
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
          )} */}
          <div className="w-full mt-3">
            <CustomFormField
              control={form.control}
              name={"about"}
              label={"Something about you"}
              placeholder={
                "Tell us and something about you, your history, your career. Tip* talk in third person"
              }
              type="textarea"
              textareaType="normal"
            />
          </div>
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
                disabled={!isAccepted || instructorRegisterMutation.isPending}
                className="sm:ml-auto basis-full sm:basis-[30%]"
                type="submit"
              >
                {instructorRegisterMutation.isPending ? (
                  <Loader type="all" />
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInstructor;
