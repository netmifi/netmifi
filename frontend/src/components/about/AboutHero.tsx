import { aboutHeroIlustrator } from "@/assets/images";

const AboutHero = () => {
  return (
    <section className="h-screen bg-red">
      <div className="flex">
        <div className="basis-2/5">
          <h1 className="text-4xl text-secondary-foreground">
            We empower creators to discover their potential
          </h1>
        </div>

        <div className="basis-3/5">
          <img className="bg-cover" src={aboutHeroIlustrator} />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
