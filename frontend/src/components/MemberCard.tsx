import { cn } from "@/lib/utils";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const MemberCard = ({
  className,
  title,
  titleClassName,
  body,
  bodyClassName,
  members,
}: MemberCardProp) => {
  const titleWord = title.split(" ");
  const titleFirstWord = titleWord.shift();
  const titleRemainingWords = titleWord.join(" ");
  return (
    <section className={cn("padding-x padding-y", className)}>
      <h1 className={cn("text-center font-bold mb-4", titleClassName)}>
        <span className="text-destructive">{titleFirstWord}</span>{" "}
        {titleRemainingWords}
      </h1>
      <p className={cn("text-center mb-6 text-xl", bodyClassName)}>{body}</p>

      <Carousel opts={{ align: "center" }} className="w-full">
        <CarouselContent className="-ml-1">
          {members.map((member, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <Card key={index} className="w-full text-center">
                <CardHeader>
                  <img
                    className="rounded-full w-[200px] mx-auto"
                    src={member.image}
                    alt="${member.name} image"
                  />
                  <CardTitle className="pt-3 text-high-contrast">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-lg font-bold">
                    {member.role}
                  </CardDescription>
                </CardHeader>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 top-[40%]" />
        <CarouselNext className="right-0 top-[40%]" />
      </Carousel>
    </section>
  );
};

export default MemberCard;
