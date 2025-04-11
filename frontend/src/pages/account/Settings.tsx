import CustomContactField from "@/components/form/CustomContactField";
import CustomFileField from "@/components/form/CustomFileField";
import CustomFormField from "@/components/form/CustomFormField";
import { Form } from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { passwordChangeSchema, updateProfileSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, Lock, SunMoon, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useProfileUpdate } from "@/api/hooks/user/useProfileUpdate";
import { toast } from "sonner";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { Link } from "react-router-dom";
import Loader from "@/components/Loader";
import { useApp } from "@/app/app-provider";
import { parsePhoneNumber } from "libphonenumber-js";
import { useUpdatePassword } from "@/api/hooks/user/useNewPassword";
import { themeFormSchema } from "../../lib/utils";
import { useChangeTheme } from "@/api/hooks/user/useChangeTheme";
import CustomRadioGroup from "@/components/form/CustomRadioGroup";

const ProfileSection = () => {
  const { user } = useApp();
  const mutation = useProfileUpdate();
  const [country, setCountry] = useState<Country | undefined>(
    user.country ?? {
      name: "Nigeria",
      dialCode: "+234",
      code: "NG",
      flag: "🇳🇬",
    }
  );
  const [, setDialCode] = useState(country?.dialCode || '');
  const formSchema = updateProfileSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile: null,
      cover: null,
      country: user.country,
      phone: parsePhoneNumber(user.phone).nationalNumber,
      residentialAddress: user.residentialAddress,
      ...user.handles,
      about: user.about,
    },
  });

  const profileRef = form.register("profile");
  const coverRef = form.register("cover");

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const cleanedValues = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v != null && v != "") // Filters out null and undefined
      );

      const formData = new FormData();
      if (cleanedValues.profile) {
        formData.append("profile", cleanedValues.profile as string);
      }
      if (cleanedValues.cover) {
        formData.append("cover", cleanedValues.cover as string);
      }
      // Append other fields to the form data
      for (const key in cleanedValues) {
        if (key !== "profile" && key !== "cover") {
          formData.append(key, cleanedValues[key] as string);
        }
      }
      // 3. Make your API request
      await mutation.mutateAsync(formData);
      toast.success("Profile update successful");
      // navigate("/account/profile");
    } catch (error) {
      mutationErrorHandler(error);
    }
  };
  return (
    <section>
      <img
        src={`http://localhost:3000/uploads/profile/${user.profile}`}
        alt="no image"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <section className="relative w-full h-fit overflow-x-hidden">
            <div className="relative">
              <CustomFileField
                name="cover"
                control={form.control}
                label="cover photo"
                placeholder="Select a jpg, png or jpeg file"
                fileRef={coverRef}
                fileType=".jpg, .png, .jpeg"
                className="[&_label]:rounded-none [&_label]:h-[15rem] [&_label]:sm:h-[20rem] [&_img]:object-cover"
              />
            </div>

            <div className="translate-y-[-60%] translate-x-7">
              <CustomFileField
                name="profile"
                control={form.control}
                label="profile"
                isNotLabeled
                placeholder="profile"
                fileRef={profileRef}
                fileType=".jpg, .png, .jpeg"
                defaultImg={`http://localhost:3000/uploads/profile/${user.profile}`}
                className="[&_label]:rounded-full [&_label]:size-28 [&_label]:sm:size-36 [&_img]:object-cover"
              />
            </div>
          </section>

          <section className="mx-auto flex flex-wrap gap-5 sm:gap-8 lg:w-[80%] *:flex-grow">
            <h3 className="w-full">Your details</h3>
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
            />

            <div className="flex flex-col gap-1 my-5">
              <h4 className="text-base sm:text-lg">
                Your social medial handles
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

            <div className="w-full">
              <CustomFormField
                name="about"
                label="talk about you"
                placeholder="Tip* Talk in third person"
                control={form.control}
                type="textarea"
              />
            </div>

            <div className="w-full">
              <Button disabled={mutation.isPending} className="mt-7 px-16">
                {mutation.isPending ? <Loader type="all" /> : "Save Changes"}
              </Button>
            </div>
          </section>
        </form>
      </Form>
    </section>
  );
};

const PasswordChangeSection = () => {
  const [isCurrentVisible, setIsCurrentVisible] = useState(false);
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const mutation = useUpdatePassword();

  const formSchema = passwordChangeSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fields = [
    {
      name: "currentPassword",
      state: isCurrentVisible,
      stateFn: setIsCurrentVisible,
    },
    {
      name: "newPassword",
      state: isNewVisible,
      stateFn: setIsNewVisible,
    },
    {
      name: "confirmPassword",
      state: isConfirmVisible,
      stateFn: setIsConfirmVisible,
    },
  ];

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync({ ...values });
      toast.success("Password update successful");
      // navigate("/account/profile");
    } catch (error) {
      mutationErrorHandler(error);
    }
  };

  return (
    <section className="md:w-[60%] mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5"
        >
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col">
              <Button
                type="button"
                variant={"transparent"}
                className="p-0 ml-auto h-fit"
                onClick={() => field.stateFn(!field.state)}
              >
                {field.state ? "Hide" : "Show"}
              </Button>

              <CustomFormField
                control={form.control}
                name={field.name}
                inputType="password"
                isPasswordVisible={field.state}
              />
            </div>
          ))}

          <div className="mx-auto flex flex-col gap-5 items-center">
            <Link to="/auth/forgot-password">Forgot Password?</Link>
            <Button disabled={mutation.isPending} className="px-16">
              {mutation.isPending ? <Loader type="all" /> : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

const ThemeSection = () => {
  const { user } = useApp();
  const mutation = useChangeTheme();

  const formSchema = themeFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme: user.theme || "system",
    },
  });

  const radioGroupData = [
    {
      label: "system",
      value: "system",
    },
    {
      label: "light",
      value: "light",
    },
    {
      label: "dark",
      value: "dark",
    },
  ];

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutation.mutateAsync({ ...values });
      toast.success(
        `Your app is now on ${values.theme} ${
          values.theme === "system" ? "default" : ""
        } theme `
      );
      // navigate("/account/profile");
    } catch (error) {
      mutationErrorHandler(error);
    }
  };

  return (
    <section>
      <Form {...form}>
        <form onChange={form.handleSubmit(handleSubmit)}>
          <br />
          <CustomRadioGroup
            control={form.control}
            name={"theme"}
            label="Select default theme"
            group={radioGroupData}
          />
        </form>
      </Form>
    </section>
  );
};
const Settings = () => {
  return (
    <main className="flex flex-col gap-6 px-2 sm:px-4 py-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-3xl sm:text-4xl">Settings</h2>
        <p className="text-sm sm:text-base">
          Take control of your account preferences, be your own boss.
        </p>
      </div>

      <div className="w-full max-md:hidden ">
        <Tabs className="overflow-x-auto" defaultValue="profile">
          <TabsList
            defaultValue="profile"
            className="gap-3 *:px-8 overflow-x-auto overflow-y-hidden"
          >
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-primary data-[state=active]:text-popover"
            >
              <User /> Profile
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="data-[state=active]:bg-primary data-[state=active]:text-popover"
            >
              <CreditCard /> Payment
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="data-[state=active]:bg-primary data-[state=active]:text-popover"
            >
              <Lock /> Password
            </TabsTrigger>
            <TabsTrigger
              value="theme"
              className="data-[state=active]:bg-primary data-[state=active]:text-popover"
            >
              <SunMoon /> Theme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSection />
          </TabsContent>

          <TabsContent value="payment">
            Payment setup not supported yet
          </TabsContent>
          <TabsContent value="password">
            <PasswordChangeSection />
          </TabsContent>
          <TabsContent value="theme">
            <ThemeSection />
          </TabsContent>
        </Tabs>
      </div>

      <div className="md:hidden flex flex-col w-full *:w-full *:bg-transparent *:border-none">
        <Accordion type="single" collapsible>
          <AccordionItem value="profile">
            <AccordionTrigger className="bg-popover px-3 hover:no-underline">
              <div className="flex items-center gap-3 text-sm">
                <User /> Edit Profile
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-5 flex flex-col gap-3">
              <ProfileSection />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="payment">
            <AccordionTrigger className="bg-popover px-3 hover:no-underline">
              <div className="flex items-center gap-3 text-sm">
                <CreditCard /> Payment
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-5 flex flex-col gap-3"></AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="password">
            <AccordionTrigger className="bg-popover px-3 hover:no-underline">
              <div className="flex items-center gap-3 text-sm">
                <Lock /> Password
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-5 flex flex-col">
              <PasswordChangeSection />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="theme">
            <AccordionTrigger className="bg-popover px-3 hover:no-underline">
              <div className="flex items-center gap-3 text-sm">
                <SunMoon /> Theme
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-5 flex flex-col gap-3">
              <ThemeSection />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
};

export default Settings;
