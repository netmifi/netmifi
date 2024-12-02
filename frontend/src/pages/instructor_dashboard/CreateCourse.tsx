import FroalaEditor from "react-froala-wysiwyg";
import { useState } from "react";
import { createCourseFormSchema } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/Form/CustomFormField";
import CustomRichTextEditor from "@/components/Form/CustomRichTextEditor";

const CreateCourse = () => {
  const formSchema = createCourseFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const config = {
    placeholderText: "Course Description",
    charCounterCount: true,
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {};

  return (
    <main className="px-2 sm:px-4 bg-popover rounded-lg h-auto shadow-sm">
      <header className="w-full py-3 text-md sm:text-lg">
        Create New Course
      </header>

      <section className="bg-secondary py-3 px-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <section className="flex gap-3">
              <div className="flex flex-col gap-2 flex-grow">
                <CustomFormField
                  control={form.control}
                  name="title"
                  placeholder="Input course title"
                />

                <CustomRichTextEditor
                  control={form.control}
                  name="description"
                  label="course description"
                  config={config}
                />

                
         
              </div>
              <div className="flex flex-col"></div>
            </section>
          </form>
        </Form>
      </section>
    </main>
  );
};

export default CreateCourse;
