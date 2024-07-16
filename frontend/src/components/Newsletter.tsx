import { EmailSubscriptionSvg } from "@/assets/svg";
import { newsletterFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Loader from "./Loader";

const Newsletter = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = newsletterFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (email: string) => {
    alert(email);
    setIsLoading(true);
  };
  return (
    <section className="w-full padding-x py-10 flex max-md:flex-wrap gap-5 items-center justify-between max-md:justify-center">
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
            className="max-sm:mx-auto"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="bg-transparent">
                  <FormLabel className="text-primary-foreground">
                    Enter your email address
                  </FormLabel>

                  <div className="flex gap-1">
                    <FormControl className=" basis-4/6 px-3 bg-secondary border outline-none focus-visible:bg-background focus-visible:ring-0">
                      <Input
                        placeholder="eg. myname@example.com"
                        {...field}
                        className="rounded-e-0 rounded-s-4"
                      />
                    </FormControl>
                    <Button
                      disabled={isLoading}
                      className="rounded-s-0 rounded-e-4 bg-red hover:brightness-75 hover:bg-red"
                    >
                      {isLoading ? <Loader type="loader" /> : "Sign up"}
                    </Button>
                  </div>
                  <FormMessage className="form-message" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Newsletter;
