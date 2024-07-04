import { commentFormSchema } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import CustomFormField from "./Form/CustomFormField";
import { FaPaperPlane } from "react-icons/fa6";

const Comments = ({ data, postId }: CommentsProps) => {
  const [isReply, setIsReply] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = commentFormSchema(isReply);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const handleSubmit = (data, isReply) => {

    console.log(data);
    // handle submit form here
  }

  return (
    <div className='flex flex-col'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => handleSubmit(data, isReply))}>
          <CustomFormField control={form.control} name="postId" placeholder="" type="input" defaultValue={postId} isNotLabeled={true} disabled={true} hidden={true}  />
          <CustomFormField control={form.control} name="comment" placeholder="What's on your mind?" type="textarea" />
          <Button className="px-16 mt-5"><FaPaperPlane /></Button>
        </form>
      </Form>
    </div>
  )
}

export default Comments