import { EmailSubscriptionSvg } from "@/assets/svg";
import { onlyEmailFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import Loader from "./Loader";
import CustomFormField from "./Form/CustomFormField";
import { toast } from "sonner";
import { useNewsletterSignup } from "@/api/hooks/useNewsletter";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";

const Newsletter = () => {
  const formSchema = onlyEmailFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const mutation = useNewsletterSignup();

  const handleSubmit = async (email: string) => {
    try {
      const { data } = await mutation.mutateAsync({ email });
      toast.success(
        "Newsletter activated, we would let you know all updates on our platform.",
        {
          duration: 4000,
          richColors: true,
          dismissible: true,
          important: true,
        }
      );
      console.log(data);
    } catch (error) {
      mutationErrorHandler(mutation, error);
    }
  };
  return (
    <section className="w-full padding-x py-10 flex max-md:flex-wrap gap-5 items-center justify-evenly max-md:justify-center">
      <div className="basis-full sm:basis-[40%]">
        <img src={EmailSubscriptionSvg} className="" alt="" />
      </div>

      <div className="flex flex-col gap-5 md:gap-10">
        <div className="flex flex-col">
          <h3 className="text-red text-2xl">Signup to our newsletter</h3>
          <p className="text-low-contrast">
            Be the first to know about any updated, give-away packages and lots
            more.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(({ email }) => handleSubmit(email))}
            className="flex flex-col gap-5"
          >
            <CustomFormField
              control={form.control}
              name="email"
              label="Enter email address"
              placeholder="eg.johndoe.demo.com"
              
            />

            <Button disabled={mutation.isPending}>
              {mutation.isPending ? <Loader type="all" /> : "Subscribe"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Newsletter;
