import { GoogleIconSvg } from "@/assets/svg";
import CustomFormField from "@/components/Form/CustomFormField";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formSchema = authFormSchema("sign-up");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      navigate("/auth/otp-verification", {
        state: {
          type: "verify",
          email: data.email,
        },
      });

      toast("A verification code has been sent to your email ", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
        description: "Welcome, thank you for being part of us.",
      });
    }, 500);
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
        <Button variant={"secondary"} className="px-20 py-6">
          <Link to={""} className="flex gap-3 tex-lg">
            <img src={GoogleIconSvg} alt="google" />
            Sign in with google
          </Link>
        </Button>

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

              <Button disabled={isLoading} size={"lg"}>
                {isLoading ? <Loader type="all" /> : "Sign Up"}
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
