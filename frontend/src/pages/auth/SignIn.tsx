import CustomFormField from "@/components/form/CustomFormField";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { useLogin } from "@/api/hooks/auth/useLogin";
import { useApp } from "@/app/app-provider";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import GoogleAuth from "@/components/auth/GoogleAuth";

const SignIn = () => {
  const { setUser, setIsAuth } = useApp();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const loginMutation = useLogin();

  const formSchema = authFormSchema("sign-in");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await loginMutation.mutateAsync({
        ...values,
      });
      toast.success("Account login successful", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });

      setUser(data);
      setIsAuth(true);
      console.log(data);
      navigate(state && state.returnUrl ? state.returnUrl : "/");
    } catch (error) {
      mutationErrorHandler(loginMutation, error);
    }
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1>Hi, Welcome Back</h1>
        <p className="font-montserrat">
          Please fill in you details to get access
        </p>
      </div>

      <div className="flex flex-col gap-4  sm:mx-auto">
        <GoogleAuth />

        <div className="flex items-center my-8">
          <hr className="flex-grow border-t border-gray-300"></hr>
          <span className="mx-2 text-gray-400">Or Sign in Email</span>
          <hr className="flex-grow border-t border-gray-300"></hr>
        </div>

        <div className="flex flex-col gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-7"
            >
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

              <Link
                to={"/auth/forgot-password"}
                className="font-semibold text-sm text-right"
              >
                Forgotten password?
              </Link>

              <Button disabled={loginMutation.isPending} size={"lg"}>
                {loginMutation.isPending ? <Loader type="all" /> : "Sign In"}
              </Button>
            </form>
          </Form>
          <p className="text-center">
            By signing in, you agree to Netmifi’s{" "}
            <Link to={""} className="font-semibold underline">
              Terms of Service and Privacy Policy
            </Link>
          </p>

          <p className="text-center font-montserrat font-light">
            Not registered yet?{" "}
            <Link to="/auth/sign-up" className="font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
