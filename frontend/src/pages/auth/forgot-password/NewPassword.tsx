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

const NewPassword = () => {
  const formSchema = onlyPasswordFormSchema();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = ({ password }: { password: string }) => {
    console.log(password);
    setIsLoading(true);
    toast("New password has been set. Redirecting... ", {
      duration: 4000,
      richColors: true,
      dismissible: true,
      important: true,
      description: "Welcome, we love to see you again.",
    });
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 2000);
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
          <CustomFormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter new password"
          />

          <Button className="w-full mt-5">                  {isLoading ? <Loader type="all" /> : "Confirm"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewPassword;
