import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";

const Interest = () => {
  const interests = [
    "article writing",
    "content creation",
    "copywriting",
    "graphics design",
    "digital marketing",
    "digital photography",
    "email marketing",
    "video editing",
    "technical writing",
    "content marketing strategy",
    "sound editing",
    "UI/UX design",
    "videography",
    "voiceover work",
  ];

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

  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedMediaSources, setSelectedMediaSources] = useState<string[]>(
    []
  );

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
          {interests.map((interest) => (
            <Button
              key={interest}
              variant="secondary"
              className={cn(
                "rounded-full text-base sm:text-lg capitalize hover:text-popover hover:bg-red",
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
          isLoading
        }

        className="sm:ml-auto sm:py-6 sm:px-16 text-sm sm:text-base"
      >
        {isLoading ? <Loader type="all" /> : "Continue"}
      </Button>
    </div>
  );
};

export default Interest;

{
  /* <FormField
control={form.control}
name="mobile"
render={({ field }) => (
  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
    <FormControl>
      <Checkbox
        checked={field.value}
        onCheckedChange={field.onChange}
      />
    </FormControl>
    <div className="space-y-1 leading-none">
      <FormLabel>
        Use different settings for my mobile devices
      </FormLabel>
      <FormDescription>
        You can manage your mobile notifications in the{" "}
        <Link href="/examples/forms">mobile settings</Link> page.
      </FormDescription>
    </div>
  </FormItem>
)}
/> */
}
