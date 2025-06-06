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
        "max-h-32 md:max-h-48 py-4 flex flex-col md:padding-x items-start h-full bg-gradient-to-r from-black to-red ",
        className
      )}
    >
      <h1 className={cn(" md:text-2xl text-sm capitalize text-white", titleClassName)}>
        {title}
      </h1>
      <div className="flex max-sm:flex-wrap justify-between w-full">
        <div className="flex flex-col gap-2 pt-2 md:pt-4 md:gap-4 md:basis- [60%] md:max-w-fit max-w-60">
          <p
            className={cn(
              "font-montserrat text-[10px] md:text-base",
              subtitleClassName
            )}
          >
            {subtitle}
          </p>

          {/* {button && <div className="mt-">{button}</div>} */}
        </div>

        <div className="md:basis-[40%]">
          <img
            src={image}
            className={cn(
              "object-contain object-bottom w-[116px] md:w-[180px] ml-auto",
              imageClassName
            )}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default Robotron;
