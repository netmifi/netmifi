import { commentFormSchema } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import CustomFormField from "../Form/CustomFormField";
import { FaPaperPlane } from "react-icons/fa6";
import { useState } from "react";
import PostAvatar from "../PostAvatar";

const CommentBox = ({ page, state, postId, commentId, replyTo }: CommentBoxProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formSchema = commentFormSchema(state);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    });

    const handleFocus = () => {
        console.log("focused")
    }
    const handleSubmit = (data, state) => {

        console.log(data);
        // handle submit form here
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => handleSubmit(data, state))} onFocus={handleFocus}>
                <CustomFormField control={form.control} name="postId" placeholder="" type="input" defaultValue={postId} isNotLabeled={true} disabled={true} hidden={true} />

                <CustomFormField control={form.control} name="comment" placeholder="What's on your mind?" type="textarea" textareaType="comment" />

                <div className="w-full flex justify-between gap-2 mt-2">
                    <PostAvatar onlyAvatar={true} profileName="jerry thompson" isVerified={true} profileURL="/user/thompson" />
                    <div className="flex gap-3">
                        <Button type="button" variant={'secondary'} className="hover:border-1 rounded-full" onClick={form.reset}>Clear</Button>
                        <Button variant={'blue'} className="rounded-full"><FaPaperPlane /></Button>
                    </div>
                </div>
            </form>
        </Form>

    )
}

export default CommentBox