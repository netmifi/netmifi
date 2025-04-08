import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useRegister } from "@/api/hooks/auth/useRegister";
import { useApp } from "@/app/app-provider";
import { GoogleIconSvg } from "@/assets/svg";
import GoogleAuth from "@/components/auth/GoogleAuth";
import CustomFormField from "@/components/form/CustomFormField";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const SignUp = () => {
  const { setUser } = useApp();
  const registerMutation = useRegister();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formSchema = authFormSchema("sign-up");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await registerMutation.mutateAsync({
        ...values,
      });

      navigate("/auth/otp-verification", {
        state: {
          type: "verify",
          email: values.email,
        },
      });

      toast("A verification code has been sent to your email ", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });
      console.log(data);

      setUser(data);
      console.log(data);
    } catch (error) {
      mutationErrorHandler(error);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1>
          Hi, Welcome to <span className="text-red">NETMIFI</span>
        </h1>
        <p className="font-montserrat">
          Please fill in you details to get access
        </p>
      </div>

      <div className="flex flex-col gap-4  sm:mx-auto">
        <GoogleAuth />

        <div className="flex items-center my-8">
          <hr className="flex-grow border-t border-gray-300"></hr>
          <span className="mx-2 text-gray-400">Or Sign up with Email</span>
          <hr className="flex-grow border-t border-gray-300"></hr>
        </div>

        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-7"
            >
              <div className="flex flex-wrap gap-6 sm:gap-3 *:flex-grow">
                <CustomFormField control={form.control} name="firstName" />
                <CustomFormField control={form.control} name="lastName" />
              </div>
              <CustomFormField control={form.control} name="username" />
              <CustomFormField control={form.control} name="email" />
              <div className="flex flex-col">
                <Button
                  type="button"
                  variant={"transparent"}
                  className="p-0 ml-auto h-fit"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </Button>

                <CustomFormField
                  control={form.control}
                  name="password"
                  isPasswordVisible={isPasswordVisible}
                />
              </div>

              <Button disabled={registerMutation.isPending} size={"lg"}>
                {registerMutation.isPending ? <Loader type="all" /> : "Sign Up"}
              </Button>
            </form>
          </Form>
          <p className="text-center">
            By signing in, you agree to Netmifi’s{" "}
            <Link to={""} className="font-semibold underline">
              Terms of Service and Privacy Policy
            </Link>
          </p>
          <p className="font-montserrat font-light">
            Already registered?{" "}
            <Link to="/auth/sign-in" className="font-semibold">
              Log in your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
