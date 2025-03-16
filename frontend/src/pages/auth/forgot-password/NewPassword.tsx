import CustomFormField from "@/components/Form/CustomFormField";
import { Form } from "@/components/ui/form";
import { onlyPasswordFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { useChangePassword } from "@/api/hooks/auth/useChangePassword";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useApp } from "@/app/app-provider";

const NewPassword = () => {
  const { user, setUser, setIsAuth } = useApp();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const changePasswordMutation = useChangePassword();
  const formSchema = onlyPasswordFormSchema();
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async ({ password }: { password: string }) => {
    try {
      const { data } = await changePasswordMutation.mutateAsync({
        email: user.email,
        password,
      });

      setUser(data);
      setIsAuth(true);
      toast.success("Account update successfully", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });

      console.log(data);
      navigate("/");
    } catch (error) {
      toast.error(mutationErrorHandler(changePasswordMutation, error));
    }
    // console.log(password);
    // setIsLoading(true);
    // toast("New password has been set. Redirecting... ", {
    //   duration: 4000,
    //   richColors: true,
    //   dismissible: true,
    //   important: true,
    //   description: "Welcome, we love to see you again.",
    // });
    // setTimeout(() => {
    //   setIsLoading(false);
    //   navigate("/");
    // }, 2000);
  };
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2 w-full mb-8">
        <h3 className="text-xl sm:text-2xl font-bold">Input new password</h3>
        <p className="text-sm sm:text-base">
          Set a new password to your <b>Netmifi</b> account.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
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

          <Button
            className="w-full mt-5"
            disabled={changePasswordMutation.isPending}
          >
            {" "}
            {changePasswordMutation.isPending ? (
              <Loader type="all" />
            ) : (
              "Confirm"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewPassword;
