import { cn } from "@/lib/utils";

const Jumbotron = ({
  className,
  image,
  imageClassName,
  title,
  titleClassName,
  body,
  bodyClassName,
  button,
}: JumbotronProps) => {
  return (
    <section
      className={cn(
        " min-h-fit flex md:justify-between items-center max-sm:flex-wrap max-sm:flex-col gap-3 padding-x padding-y",
        className
      )}
    >
      <div className="flex flex-col gap-3 md:basis-[60%]">
        <h1 className={cn(" sm:text-6xl text-4xl capitalize", titleClassName)}>
          {title}
        </h1>
        <p className={cn("font-montserrat text-lg sm:text-xl", bodyClassName)}>
          {body}
        </p>

        {button && <div className="mt-5">{button}</div>}
      </div>

      <div className="md:basis-[40%]">
        <img
          src={image}
          className={cn(
            "object-contain size-[30rem] md:ml-auto",
            imageClassName
          )}
          alt=""
        />
      </div>
    </section>
  );
};

export default Jumbotron;
