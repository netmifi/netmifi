import CountryFormSelect from "@/components/Form/CountryFormSelect";
import CustomFormField from "@/components/Form/CustomFormField";
import { Form } from "@/components/ui/form";
import { instructorFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCountries } from "react-countries";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInstructor = () => {
  const [isLoading, setIsLoading] = useState();
  const [countryCode, setCountryCode] = useState('');
  const formSchema = instructorFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { countries } = useCountries();

  console.log(countries);

  const handleSubmit = (data) => {};

  return (
    <div className="mt-5 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-wrap justify between gap-3 *:flex-grow *:min-w-[45%]"
        >
          <CustomFormField
            name="fullName"
            control={form.control}
            placeholder="Enter your full name"
            label="full name"
          />
          <CustomFormField
            name="email"
            control={form.control}
            placeholder="Enter your full name"
            label="email address"
          />

          <CountryFormSelect
            form={form}
            control={form.control}
            countries={countries}
            name={"country"}
            label="country"
          />
        </form>
      </Form>
    </div>
  );
};

export default SignInstructor;
