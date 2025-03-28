import { useTheme } from "@/app/theme-provider";
import { useApp } from "@/app/app-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeftIcon, ArrowRight, XCircle } from "lucide-react";
import { logoText, logoTextWhite } from "@/assets/logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useInstructorRegister } from "@/api/hooks/auth/useInstructorRegister";
import CustomContactField from "@/components/form/CustomContactField";
import CustomFormField from "@/components/form/CustomFormField";
import Loader from "@/components/Loader";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { instructorFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { PaymentModal } from "@/components/ui/checkoutmodal";
import CustomCard from "@/components/CustomCard";
import NavSearch from "@/components/navbar/NavSearch";
import NavbarPopover from "@/components/navbar/NavbarPopover";
import AppSidebar, { NavSkeleton } from "@/layouts/navbar/user/AppSidebar";
import GuestNavbar from "@/layouts/navbar/guest/Index";
import { Sidebar } from "@/components/ui/sidebar";

const Welcome = () => {
  const navigate = useNavigate();
  const rootCourses = ["/auth/welcome/", "/auth/welcome"];
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const { user } = useApp();
  const { setUser } = useApp();
  const { state } = useLocation();
  const currentStep = "Checkouts";
  // const { countries } = useCountries();
  const instructorRegisterMutation = useInstructorRegister();
  const [isAccepted, setIsAccepted] = useState<CheckedState>(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
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

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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
      mutationErrorHandler(instructorRegisterMutation);
    }
  };

  useEffect(() => {
    form.setValue("country", country);
  }, [country, form]);

  return (
    <>
      <div className="flex flex-col gap-6 justify-center items-center w-full">
        <div className="flex flex-col items-center justify-center ">

        </div>
        <Card className="px-0 rounded-none bg-inherit border-0 w-full min-w-full lg:min-w-[70%] md:min-w-[90%] lg:w-[70%] md:w-[90%]">
          <CardContent className="px-[0.5px]">
            <CardHeader className="items-start flex">
              <div className="flex text-lg justify-between w-full gap-3">
                <Breadcrumb className="flex md:text-xl text-lg items-center justify-evenly">
                  <BreadcrumbList className="flex space-x-2 md:text-xl text-black">
                    <BreadcrumbItem
                      className={currentStep === "Carts" ? "font-bold" : ""}
                    >
                      Carts
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem
                      className={currentStep === "Checkouts" ? "font-bold" : ""}
                    >
                      Checkouts
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
                <Button
                  variant={"secondary"}
                  className="border self-end border-red bg-low-red py-6 "
                  onClick={() => navigate("/home")}
                >
                  <ArrowLeftIcon size={20} /> Back
                </Button>
              </div>{" "}
              <div className="flex flex-col gap-1 lg:max-w-[794px]">
                <h2 className="font-semibold md:text-sm text-xs ">
                  In your carts
                </h2>
                <p className="text-xs sm:text-sm">
                  Kick start with <b>Netmifi!</b> Tell us your plan and we’ll
                  customize the setup. But no matter what you choose, you’ll get
                  full access to our features!.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt- w-full flex flex-col gap-">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="w-full grid grid-cols-1 md:grid-cols-2 justify-between gap-5 *:flex-grow *:min-w-[50%]"
                  >
                    <div className="flex flex-col gap-3 ">
                      <div className="flex gap-3 items-start border rounded-xl p-6 relative">
                        <XCircle className="absolute top-3 right-3 text-gray-500 w-[15px] h-[15px]" />
                        <Checkbox
                          id="accept"
                          checked={isAccepted}
                          onCheckedChange={(checked) => setIsAccepted(checked)}
                        />
                        <div className="flex flex-col gap-2 w-full font-bold">
                          <div className="flex justify-between text-sm">
                            <p>Content Production - Tutorial </p>
                            <p className="text-red text-base">NGN 5,000</p>
                          </div>
                          <div className="flex justify-between text-xs font-thin text-gray-400">
                            <Badge className="bg-gray-200 text-gray-400 px-4py-1 text-xs">
                              By Angela Sun
                            </Badge>
                            <p>(N10,000)</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="flex justify-between w-full">
                          <p className="text-xs">Subtotal </p>
                          <p className="text-sm"> NGN 9,800.00</p>
                        </div>
                        <div className="flex justify-between w-full">
                          <p className="text-xs">Vat </p>
                          <p className="text-sm"> NGN 200.00</p>
                        </div>
                        <hr />
                        <div className="flex justify-between font-bold w-full">
                          <p className="text-xs">Cart Total</p>
                          <p className="text-base"> NGN 10,000.00</p>
                        </div>
                        <div className="flex w-full">
                          <Button
                            disabled={isCheckingOut}
                            className="sm:ml-auto basis-full "
                            type="submit"
                          >
                            {instructorRegisterMutation.isPending ? (
                              <Loader type="all" />
                            ) : (
                              "Checkout"
                            )}
                            <ArrowRight />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="max-h-[30rem] w-full p-6 border rounded-xl bg-gray-100 flex flex-col flex-wrap justify-between gap-2 *:flex-grow ">
                      <h1 className="font-semibold md:text-sm text-xs flex items-center gap-1">
                        Contact Information
                      </h1>
                      {/* {console.log(form.formState.errors)}{" "} */}
                      <div className="flex flex-col gap-6">
                        <CustomFormField
                          name="fullName"
                          control={form.control}
                          placeholder="Enter your full name"
                          label="full name"
                        />
                        <CustomFormField
                          name="email"
                          control={form.control}
                          placeholder="example@gmail.com"
                          label="Email"
                        />
                        <CustomContactField
                          form={form}
                          name="phone"
                          control={form.control}
                          placeholder="Enter your phone number"
                          label="phone number"
                          setDialCode={setDialCode}
                          setCountry={setCountry}
                        />
                      </div>
                      <div className="flex justify-between w-full">
                        <p className="text-xs">Cart Total</p>
                        <p className="text-sm"> NGN 10,000.00</p>
                      </div>
                      <hr />
                      <div className="flex justify-between font-bold w-full">
                        <p className="text-xs">Total</p>
                        <p className="text-base"> NGN 10,000.00</p>
                      </div>
                      <div className="flex w-full">
                        <PaymentModal
                          trigger={
                            <Button
                              disabled={
                                !isAccepted ||
                                instructorRegisterMutation.isPending
                              }
                              className="sm:ml-auto basis-full "
                              type="submit"
                            >
                              {instructorRegisterMutation.isPending ? (
                                <Loader type="all" />
                              ) : (
                                "Pay Now"
                              )}{" "}
                              <ArrowRight />
                            </Button>
                          }
                          title="How do you like to pay?"
                          description="“If your card hasn’t been enabled for online transactions, kindly opt for a bank transfer as an alternative”"
                          body={
                            <div className="grid md:grid-cols-2 gap-x-6 gap-y-2 grid-cols-1">
                              <CustomCard
                                logo={
                                  <svg
                                    width="29"
                                    height="26"
                                    viewBox="0 0 29 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M28.4121 4.67746L15.1366 0.103592C14.7264 -0.0345307 14.2742 -0.0345307 13.8639 0.103592L0.58793 4.67746C0.415233 4.73555 0.266419 4.83951 0.161363 4.97543C0.056308 5.11136 1.38358e-05 5.27279 0 5.43816L0 7.3125C0 7.76141 0.405547 8.125 0.90625 8.125H28.0938C28.5945 8.125 29 7.76141 29 7.3125V5.43816C29 5.09945 28.7655 4.79629 28.4121 4.67746ZM3.625 9.75V17.875H2.71875C2.21805 17.875 1.8125 18.2386 1.8125 18.6875V21.125H27.1875V18.6875C27.1875 18.2386 26.782 17.875 26.2812 17.875H25.375V9.75H21.75V17.875H16.3125V9.75H12.6875V17.875H7.25V9.75H3.625ZM28.0938 22.75H0.90625C0.405547 22.75 0 23.1136 0 23.5625V25.1875C0 25.6364 0.405547 26 0.90625 26H28.0938C28.5945 26 29 25.6364 29 25.1875V23.5625C29 23.1136 28.5945 22.75 28.0938 22.75Z"
                                      fill="#9E0000"
                                    />
                                  </svg>
                                }
                                title="Bank Transfer"
                                description="Transfer to Netmifi account"
                              />
                              <CustomCard
                                logo={
                                  <svg
                                    width="29"
                                    height="26"
                                    viewBox="0 0 29 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M28.4121 4.67746L15.1366 0.103592C14.7264 -0.0345307 14.2742 -0.0345307 13.8639 0.103592L0.58793 4.67746C0.415233 4.73555 0.266419 4.83951 0.161363 4.97543C0.056308 5.11136 1.38358e-05 5.27279 0 5.43816L0 7.3125C0 7.76141 0.405547 8.125 0.90625 8.125H28.0938C28.5945 8.125 29 7.76141 29 7.3125V5.43816C29 5.09945 28.7655 4.79629 28.4121 4.67746ZM3.625 9.75V17.875H2.71875C2.21805 17.875 1.8125 18.2386 1.8125 18.6875V21.125H27.1875V18.6875C27.1875 18.2386 26.782 17.875 26.2812 17.875H25.375V9.75H21.75V17.875H16.3125V9.75H12.6875V17.875H7.25V9.75H3.625ZM28.0938 22.75H0.90625C0.405547 22.75 0 23.1136 0 23.5625V25.1875C0 25.6364 0.405547 26 0.90625 26H28.0938C28.5945 26 29 25.6364 29 25.1875V23.5625C29 23.1136 28.5945 22.75 28.0938 22.75Z"
                                      fill="#9E0000"
                                    />
                                  </svg>
                                }
                                title="Bank Transfer"
                                description="Transfer to Netmifi account"
                              />
                              <CustomCard
                                logo={
                                  <svg
                                    width="29"
                                    height="26"
                                    viewBox="0 0 29 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M28.4121 4.67746L15.1366 0.103592C14.7264 -0.0345307 14.2742 -0.0345307 13.8639 0.103592L0.58793 4.67746C0.415233 4.73555 0.266419 4.83951 0.161363 4.97543C0.056308 5.11136 1.38358e-05 5.27279 0 5.43816L0 7.3125C0 7.76141 0.405547 8.125 0.90625 8.125H28.0938C28.5945 8.125 29 7.76141 29 7.3125V5.43816C29 5.09945 28.7655 4.79629 28.4121 4.67746ZM3.625 9.75V17.875H2.71875C2.21805 17.875 1.8125 18.2386 1.8125 18.6875V21.125H27.1875V18.6875C27.1875 18.2386 26.782 17.875 26.2812 17.875H25.375V9.75H21.75V17.875H16.3125V9.75H12.6875V17.875H7.25V9.75H3.625ZM28.0938 22.75H0.90625C0.405547 22.75 0 23.1136 0 23.5625V25.1875C0 25.6364 0.405547 26 0.90625 26H28.0938C28.5945 26 29 25.6364 29 25.1875V23.5625C29 23.1136 28.5945 22.75 28.0938 22.75Z"
                                      fill="#9E0000"
                                    />
                                  </svg>
                                }
                                title="Bank Transfer"
                                description="Transfer to Netmifi account"
                              />
                              <CustomCard
                                logo={
                                  <svg
                                    width="29"
                                    height="26"
                                    viewBox="0 0 29 26"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M28.4121 4.67746L15.1366 0.103592C14.7264 -0.0345307 14.2742 -0.0345307 13.8639 0.103592L0.58793 4.67746C0.415233 4.73555 0.266419 4.83951 0.161363 4.97543C0.056308 5.11136 1.38358e-05 5.27279 0 5.43816L0 7.3125C0 7.76141 0.405547 8.125 0.90625 8.125H28.0938C28.5945 8.125 29 7.76141 29 7.3125V5.43816C29 5.09945 28.7655 4.79629 28.4121 4.67746ZM3.625 9.75V17.875H2.71875C2.21805 17.875 1.8125 18.2386 1.8125 18.6875V21.125H27.1875V18.6875C27.1875 18.2386 26.782 17.875 26.2812 17.875H25.375V9.75H21.75V17.875H16.3125V9.75H12.6875V17.875H7.25V9.75H3.625ZM28.0938 22.75H0.90625C0.405547 22.75 0 23.1136 0 23.5625V25.1875C0 25.6364 0.405547 26 0.90625 26H28.0938C28.5945 26 29 25.6364 29 25.1875V23.5625C29 23.1136 28.5945 22.75 28.0938 22.75Z"
                                      fill="#9E0000"
                                    />
                                  </svg>
                                }
                                title="Bank Transfer"
                                description="Transfer to Netmifi account"
                              />
                            </div>
                          }
                        />
                      </div>
                      <div className="items-center flex flex-col">
                        <Label htmlFor="accept" className="md:text-xs text-sm">
                          By clicking the “Pay now” button, you agree to
                          Netmifi’s
                        </Label>
                        <Link
                          to="/t&c"
                          className="md:text-xs text-sm text-red "
                        >
                          Terms and conditions?
                        </Link>
                      </div>
                    </div>
                  </form>
                </Form>
              </div>
            </CardContent>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

// export default SignInstructor;

export default Welcome;
