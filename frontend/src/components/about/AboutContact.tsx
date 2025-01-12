import CustomFormField from "@/components/Form/CustomFormField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { contactUsEmailFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";

const AboutContact = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = contactUsEmailFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = ({
    message,
    name,
    email,
  }: {
    message: string;
    name: string;
    email: string;
  }) => {
    alert();
    setIsLoading(true);
    console.log(message, name, email);

    setTimeout(() => {
      setIsLoading(false);
      toast("Message sent", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
        description: "We will reply ass soon as possible.",
        closeButton: true,
        className: "bg-green-500",
      });
    }, 500);
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-7"
      >
        <CustomFormField
          control={form.control}
          name="Full name"
          placeholder="Enter your full name"
          value={"Full Name"}
          // defaultValue={"Name"}
        />
        <CustomFormField
          control={form.control}
          name="Email"
          inputType="email"
          placeholder="Enter your email"
        />
        <CustomFormField
          control={form.control}
          name="Message"
          type="textarea"
          placeholder="Type your message here"
        />

        <Button
          type="submit"
          variant={"destructive"}
          className="lg:mr-auto rounded-full hover:bg-muted hover:text-primary px-5"
        >
          {isLoading ? <Loader type="all" /> : "Submit Message"}
        </Button>
      </form>
    </Form>
  );
};

export default AboutContact;
