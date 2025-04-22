// REUSABLE COMPONENT FOR ROBOTRON/HERO SECTIONS 
import { cn } from "@/lib/utils";

const Robotron = ({
  className,
  image,
  imageClassName,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  button,
}: RobotronProps) => {
  return (
    <section
      className={cn(
        "max-h-36 min-h-36 md:min-h-full md:max-h-full pt-6 flex md:justify-between items-center bg-gradient-to-r from-black to-red max-sm:flex-wrap max-sm:flex-col md:gap-3 px- md:padding-x ",
        className
      )}
    >
      <div className="flex flex-col gap-3 md:basis-[60%] md:max-w-fit max-w-60">
        <h1 className={cn(" md:text-2xl text-sm capitalize", titleClassName)}>
          {title}
        </h1>
        <p className={cn("font-montserrat text-[10px] md:text-base", subtitleClassName)}>
          {subtitle}
        </p>

        {button && <div className="mt-">{button}</div>}
      </div>

      <div className="md:basis-[40%]">
        <img
          src={image}
          className={cn(
            "object-contain object-bottom w-[120px] xl:size-48 md: ml-auto",
            imageClassName
          )}
          alt=""
        />
      </div>
    </section>
  );
};

export default Robotron;
