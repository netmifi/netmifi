import AboutHero from "@/components/about/AboutHero";
import { ModeToggle } from "@/components/mode-toggle";

const About = ({ className }: PageProps) => {
  return (
    <main className={className}>
      <AboutHero />
      <ModeToggle />
    </main>
  );
};

export default About;
