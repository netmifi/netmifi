import CustomFormField from "@/components/Form/CustomFormField";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { onlyEmailFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const ViaEmail = () => {
  const formSchema = onlyEmailFormSchema();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();

  const handleSubmit = (email: string) => {
    setIsLoading(true);
    console.log(email);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/auth/otp-verification", {
        state: {
          type: "forgot",
          email: email
        },
      });
    }, 2000);
  };

  return (
    <>
      <div className="flex flex-col gap-1 w-full mb-8">
        <h3 className="text-xl sm:text-2xl font-bold">
          Input your email address
        </h3>

        <p className="text-base">
          Your will receive an email with your verification code
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(({ email }) => handleSubmit(email))}
        >
          <CustomFormField
            control={form.control}
            name={"email"}
            inputType="email"
            label="Email address"
            placeholder="Input email address here"
          />
            <Button disabled={isLoading} className="w-full mt-8"> {isLoading ? <Loader type="all" /> : "Continue"}</Button>
        </form>
      </Form>
    </>
  );
};

export default ViaEmail;
