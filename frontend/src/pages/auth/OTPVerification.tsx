import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { logoText, logoTextWhite } from "@/assets/logo";
import { useTheme } from "@/app/theme-provider";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, onlyOTPFormSchema } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import Loader from "@/components/Loader";
import { useApp } from "@/app/app-provider";
import { useFindCode } from "@/api/hooks/auth/useFindCode";
import { toast } from "sonner";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useVerifyCode } from "@/api/hooks/auth/useVerifyCode";
import { Skeleton } from "@/components/ui/skeleton";
import { useResendCode } from "@/api/hooks/auth/useResendCode";

const OTPVerification = () => {
  const resendCodeTime = 14398.35; // this reps the time diff divided by 100
  const MAXLENGTH = 5;

  const { user, setUser } = useApp();
  const findCodeMutation = useFindCode();
  const resendCodeMutation = useResendCode();
  const verifyCodeMutation = useVerifyCode();

  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isFilled, setIsFilled] = useState(false);

  const formSchema = onlyOTPFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // use the verify type to verify where the otp is coming from
  // either from signup or forgot password
  const {
    state: { type: verifyType, email },
  } = useLocation();

  const handleOtpLastInput = (value: string) => {
    if (value.length === MAXLENGTH) setIsFilled(true);
    else setIsFilled(false);
  };

  const handleResendCode = async () => {
    try {
      const { data } = await resendCodeMutation.mutateAsync({
        state: verifyType || "verify",
        email: user.email || email,
      });

      // console.log(data);
      setUser(data);
      toast.success("Code resent successfully", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });
    } catch (error) {
      mutationErrorHandler(findCodeMutation, error);
    }
  };

  const handleSubmit = async ({ otp }: { otp: string }) => {
    try {
      const { data } = await verifyCodeMutation.mutateAsync({
        id: user.id,
        code: parseInt(otp),
        state: verifyType || "verify",
      });

      setUser(data);
      toast.success("Verification Code matched", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });

      if (verifyType === "forgot") {
        navigate("/auth/forgot-password/new-password");
      } else {
        navigate("/auth/welcome");
      }
    } catch (error) {
      mutationErrorHandler(findCodeMutation, error);
    }
  };

  const [, setTargetTime] = useState<Date>(new Date());
  const [timeLeft, setTimeLeft] = useState<string>("00:00");
  const [timeDifference, setTimeDifference] = useState<number>(0);
  // console.log(user._id)
  useEffect(() => {
    // const newTargetTime = new 9(verificationDetails?.expiresIn as Date);
    const newTargetTime = new Date(
      (user.generatedCode.expiresIn as Date) || Date()
    );
    setTargetTime(newTargetTime);

    // Update the countdown every second
    const timer = setInterval(() => {
      const now = new Date();
      const difference = newTargetTime.getTime() - now.getTime();
      setTimeDifference(difference / 100);

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft("Code expired");
      } else {
        const minutes = Math.floor(difference / 60000);
        const seconds = Math.floor((difference % 60000) / 1000);
        setTimeLeft(
          `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      }
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [user]);

  // useEffect(() => {
  //   async function handleVerificationDetails() {
  //     try {
  //       const { data } = await findCodeMutation.mutateAsync({
  //         id: user.id,
  //       });
  //       setVerificationDetails(data);
  //       // console.log();
  //     } catch (error) {
  //       toast.error(mutationErrorHandler(findCodeMutation, error));
  //     }
  //   }

  //   handleVerificationDetails();
  // }, []);

  if (!user) {
    return <Navigate to={"/auth/"} />;
  }

  return (
    <div className="bg-destructive/20 w-screen flex flex-col items-center">
      <img
        src={theme === "dark" ? logoTextWhite : logoText}
        className="w-[7rem] sm:mr-auto sm:mt-10 sm:ml-10 mt-auto"
        alt="logo"
      />
      <Card className="max-sm:mt-auto sm:my-auto max-sm:h-[60vh] md:w-[25em] max-w-full rounded-none sm:rounded-3xl">
        <CardContent className="p-5 sm:p-7">
          <CardHeader className="items-start gap-5 p-0 mb-5">
            <Button
              variant={"secondary"}
              className="border border-red bg-destructive/10 py-6"
              onClick={() => navigate(-1)}
            >
              <ArrowLeftIcon size={20} /> Back
            </Button>
            <div className="flex flex-col gap-1">
              <h3 className="text-xl sm:text-2xl font-bold">
                Email verification
              </h3>
              <p className="text-sm sm:text-base">
                An OTP code has been sent to your email {email}
              </p>
            </div>
          </CardHeader>
          <CardFooter className="p-0 w-full flex-col gap-3 justify-start">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="w-full flex flex-col gap-3 justify-start"
              >
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl {...field}>
                        <InputOTP
                          maxLength={MAXLENGTH}
                          onChange={(value) => handleOtpLastInput(value)}
                          pattern={REGEXP_ONLY_DIGITS}
                          className="flex justify-center w-full"
                          containerClassName="w-full"
                        >
                          <InputOTPGroup
                            className="w-full flex gap-3 justify-between *:rounded-xl *:sm:size-12 *:size-10"
                            onChange={(value) => handleOtpLastInput(value)}
                          >
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-1 w-full text-sm items-center">
                    Didn't receive any code?{" "}
                    <Button
                      variant="transparent"
                      size="no-pad"
                      className={cn("text-red", {
                        hidden: timeDifference > resendCodeTime,
                      })}
                      type="button"
                      disabled={resendCodeMutation.pending}
                      onClick={handleResendCode}
                    >
                      {resendCodeMutation.pending ? (
                        <Loader type="loader" />
                      ) : (
                        "Resend"
                      )}
                    </Button>
                  </div>

                  <p className="text-red text-sm">
                    <Suspense fallback={<Skeleton />}>{timeLeft}</Suspense>
                  </p>
                </div>

                <Button
                  disabled={!isFilled || verifyCodeMutation.isPending}
                  className="w-full mt-3"
                >
                  {verifyCodeMutation.isPending ? (
                    <Loader type="all" />
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </Form>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;
