import CustomFormField from "@/components/Form/CustomFormField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { createCollectionFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateListDialog = ({
  triggerChild,
  courseId,
}: {
  triggerChild: React.ReactNode;
  courseId: string;
}) => {
  const formSchema = createCollectionFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> Create List</DialogTitle>
        </DialogHeader>
        <hr />
        <Form {...form}>
          <form>
            <CustomFormField
              control={form.control}
              name="collection"
              placeholder="Type text here"
            />
            <CustomFormField
              control={form.control}
              name="courseId"
              value={courseId}
              hidden
              disabled
            />
          </form>
        </Form>

        <DialogFooter>
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListDialog;
