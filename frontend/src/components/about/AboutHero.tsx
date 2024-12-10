import { AboutUsSvg } from "@/assets/svg/index.ts";

const AboutHero = () => {
  return (
    <section className="h-screen bg-red py-16 padding-x items-center justify-center">
      <div className="flex">
        <div className="basis-2/5">
          <h1 className="text-secondary-foreground">
            We empower creators to discover their potential
          </h1>
        </div>

        <div className="basis-3/5">
          <img className="bg-cover" src={AboutUsSvg} />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
