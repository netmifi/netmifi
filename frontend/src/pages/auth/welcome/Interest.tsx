import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useIntrestAdSource } from "@/api/hooks/useInterestAdSource";
import { useApp } from "@/app/app-provider";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { categories } from "@/constants";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Interest = () => {
  // const interests = [
  //   "article writing",
  //   "content creation",
  //   "copywriting",
  //   "graphics design",
  //   "digital marketing",
  //   "digital photography",
  //   "email marketing",
  //   "video editing",
  //   "technical writing",
  //   "content marketing strategy",
  //   "sound editing",
  //   "UI/UX design",
  //   "videography",
  //   "voiceover work",
  // ];

  const mediaSources = [
    "facebook",
    "influencer marketing",
    "google search",
    "google ads",
    "instagram",
    "x (formerly twitter)",
    "from a friend",
    "others",
  ];

  const { setUser } = useApp();
  const interestAdMutation = useIntrestAdSource();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedMediaSources, setSelectedMediaSources] = useState<string[]>(
    []
  );

  const navigate = useNavigate();

  const handleSelectInterest = (interest: string) => {
    const newArray = selectedInterests.includes(interest)
      ? selectedInterests.filter((item) => interest !== item)
      : [...selectedInterests, interest];

    setSelectedInterests(newArray);
  };

  const handleCheck = (source: string) => {
    const newArray = selectedMediaSources.includes(source)
      ? selectedMediaSources.filter((item) => source !== item)
      : [...selectedMediaSources, source];

    setSelectedMediaSources(newArray);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await interestAdMutation.mutateAsync({
        interests: selectedInterests,
        adSource: selectedMediaSources,
      });
      setUser(data);
      navigate("/");
      toast.success("Thank you for choosing netmifi", {
        duration: 4000,
        richColors: true,
        dismissible: true,
        important: true,
      });
    } catch (error) {
      mutationErrorHandler(interestAdMutation, error);
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg sm:text-xl">
            Choose your interests
          </h2>
          <p className="text-sm sm:text-base">
            Get better course recommendations depending on your interests.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-4">
          {categories.map((interest) => (
            <Button
              key={interest}
              variant="secondary"
              className={cn(
                "rounded-full text-sm sm:text-base capitalize hover:text-popover hover:bg-red",
                { "bg-red text-popover": selectedInterests.includes(interest) }
              )}
              onClick={() => handleSelectInterest(interest)}
            >
              {interest}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg sm:text-xl">
            How did you get to know about us!
          </h2>
          <p className="text-sm sm:text-base">
            Please start by telling us how you heard about us.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {mediaSources.map((source) => (
            <div key={source} className="flex gap-2 items-center">
              <Checkbox
                id={source}
                checked={selectedMediaSources.includes(source)}
                onCheckedChange={() => handleCheck(source)}
              />
              <Label htmlFor={source} className="capitalize text-base">
                {source}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        disabled={
          selectedInterests.length < 1 ||
          selectedMediaSources.length < 1 ||
          interestAdMutation.isPending
        }
        className="sm:ml-auto sm:py-6 sm:px-16 text-sm sm:text-base"
        onClick={handleSubmit}
      >
        {interestAdMutation.isPending ? <Loader type="all" /> : "Continue"}
      </Button>
    </div>
  );
};

export default Interest;
