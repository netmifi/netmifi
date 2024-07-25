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
import Rating from "react-rating";
import { useState } from "react";
import { Star } from "lucide-react";

const RateDialog = ({ child }: RateDialogProps) => {
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate this Course</DialogTitle>
          <DialogDescription className="text-base capitalize">
            {value} {valueTranslation}
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col">
          <Rating
            start={0}
            stop={5}
            fractions={2}
            initialRating={value}
            emptySymbol={<Star />}
            fullSymbol={<Star className="fill-yellow-500" />}
            onClick={(value) => handleRatingClick(value)}
          />

          <DialogFooter>
            <Button type="button">Rate</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RateDialog;
