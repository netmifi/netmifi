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

const MessageEmailForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = contactUsEmailFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = ({
    message,
    name,
    email,
    title,
  }: {
    message: string;
    name: string;
    email: string;
    title: string;
  }) => {
    alert();
    setIsLoading(true);
    console.log(message, name, email, title);

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
        <div className="flex gap-4 *:flex-grow flex-wrap">
          <CustomFormField
            control={form.control}
            name="name"
            placeholder="Enter your name"
            value={"Name"}
            // defaultValue={"Name"}
          />
          <CustomFormField
            control={form.control}
            name="Your email"
            inputType="email"
            placeholder="Email to receive our reply"
          />
        </div>

        <CustomFormField
          control={form.control}
          name="title"
          placeholder="Type title text here"
        />
        <CustomFormField
          control={form.control}
          name="message"
          type="textarea"
          placeholder="Type message here"
        />

        <Button type="submit" variant={"primary"} className="lg:mr-auto">
          {isLoading ? <Loader type="all" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default MessageEmailForm;
