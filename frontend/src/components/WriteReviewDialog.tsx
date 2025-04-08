import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
// import Rating from "react-rating";
import { useState } from "react";
import { Star } from "lucide-react";
import { reviewFormSchema } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import CustomFormField from "./form/CustomFormField";
import Rating from "react-rating";

const WriteReviewDialog = ({ child, postId }: RateDialogProps) => {
  const formSchema = reviewFormSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [value, setValue] = useState(0.5);
  const [valueTranslation, setValueTranslation] =
    useState<RatingTranslation>("very poor");

  const handleRatingClick = (value: number) => {
    if (value === 5) setValueTranslation("perfect");
    else if (value === 4.5) setValueTranslation("phenomenal");
    else if (value === 4) setValueTranslation("outstanding");
    else if (value === 3.5) setValueTranslation("excellent");
    else if (value === 3) setValueTranslation("average");
    else if (value === 2.5) setValueTranslation("very good");
    else if (value === 2) setValueTranslation("good");
    else if (value === 1.5) setValueTranslation("fair");
    else if (value === 1) setValueTranslation("poor");
    else if (value === 0.5) setValueTranslation("very poor");
    else setValueTranslation("no rating");

    setValue(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{child}</DialogTrigger>

      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rate this Course</DialogTitle>
          <DialogDescription className="text-base capitalize">
            {value} {valueTranslation}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="flex flex-col gap-3">
            <Rating
              start={0}
              stop={5}
              fractions={2}
              initialRating={value}
              emptySymbol={<Star />}
              fullSymbol={<Star className="fill-yellow-500" />}
              onClick={(value) => handleRatingClick(value)}
            />

            <CustomFormField
              control={form.control}
              name="review"
              placeholder="Write an honest review"
              type="input"
            />

            <CustomFormField
              control={form.control}
              name="rating"
              placeholder=""
              type="input"
              value={value}
              disabled
              hidden
              isNotLabeled
            />

            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default WriteReviewDialog;
