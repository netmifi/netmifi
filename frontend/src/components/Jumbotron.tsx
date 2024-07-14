const Jumbotron = ({
  className,
  image,
  imageStyle,
  title,
  titleStyle,
  body,
  bodyStyle,
  button,
}: JumbotronProps) => {
  return (
    <section
      className={
        className +
        " min-h-fit lg:min-h-screen flex flex-wrap lg:items-center max-lg:flex-col gap-4 lg:gap-0  padding-x padding-y"
      }
    >
      <div className="flex flex-col gap-3 md:basis-[60%]">
        <h1
          className={titleStyle + "text-white sm:text-6xl text-4xl capitalize"}
        >
          {title}
        </h1>
        <p className={bodyStyle + " font-montserrat text-lg sm:text-xl"}>
          {body}
        </p>

        {button && <div className="mt-5">{button}</div>}
      </div>

      <div className="md:basis-[40%]">
        <img
          src={image}
          className={imageStyle + " object-cover h-[300px] w-[400px] md:w-full md:h-[500px]"}
          alt=""
        />
      </div>
    </section>
  );
};

export default Jumbotron;
