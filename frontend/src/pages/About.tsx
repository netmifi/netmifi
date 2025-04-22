import Jumbotron from "@/components/Jumbotron";
import { Button } from "@/components/ui/button";
import Newsletter from "@/components/Newsletter";
import AboutContact from "@/components/about/AboutContact";
import MemberCard from "@/components/MemberCard";
import {
  AboutUsSvg,
  ContactSvg,
  Pic1Svg,
  Pic2Svg,
  Pic3Svg,
  Pic4Svg,
  Pic5Svg,
  AddToCartSvg,
} from "@/assets/svg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const About = () => {
  return (
    <main>
      <Jumbotron
        image={AboutUsSvg}
        title="About Us"
        body="We empower creators to discover their potentials"
        titleClassName="font-montserrat"
        bodyClassName="font-poppins text-base sm:text-lg"
      />

      {/* Intro section */}
      <section className="padding-x padding-y leading-7">
        <h1 className="text-destructive font-bold">Introduction</h1>
        <p className="py-5 text-xl">
          <strong className="text-transform: uppercase">Netmifi,</strong> an
          E-learning and social commerce platform that is set to revolutionize
          how creators learn, produce, collaborate and sell their digital
          products globally, with seamless payment solutions
        </p>
        <p className="pb-5 text-xl">
          <strong>The Challenge: </strong> In a world that craves original,
          engaging content, the barries to entry for aspiring and immediate
          creators can be overwhelming. The challanges they face includes
          accessing quality education, collaboration with same like mind,
          navigating a competetive industry, and to receive payments from their
          global audience with multiple payment options.
        </p>
        <p className="text-xl">
          <strong>Netmifi</strong> is not just a company, It's a movement, a
          catalyst for change. We offer comprehensive suite of services designed
          to nuture the creativity for budding creators, elevate their skill,
          and provide them with opportunities to share.
        </p>
      </section>

      {/* Service section */}
      <section className="flex flex-col md:flex-row padding-x padding-y">
        <div className="md:w-1/2 mb-5 md:mb-0">
          <img src={AddToCartSvg} alt="service image" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-destructive font-bold">Our Services</h1>
          <p className="leading-7 py-5 text-xl">
            Our niche focus on empowering aspiring creators uniquely positions
            us to capture a significant share of this market.
          </p>
          <ul className="list-disc list-inside text-lg capitalize">
            <li>
              <strong>E-learning platform for creators</strong>
            </li>
            <li>
              <strong>Social commerce</strong>
            </li>
            <li>
              <strong>Community building</strong>
            </li>
            <li>
              <strong>Content creation agency</strong>
            </li>
          </ul>
          <Button className="rounded-full px-8 mt-5 hover:bg-secondary hover:text-destructive">
            Explore
          </Button>
        </div>
      </section>

      {/* Our Mission and Vision section */}
      <section className="padding-x padding-y">
        <div className="mb-5">
          <h2 className="text-center text-destructive font-bold pb-5">
            Our Mission
          </h2>
          <p className="leading-7 text-xl">
            To empower creators and learners worldwide by providing an engaging
            e-learning platform that combines social commerce, seamless payment
            solutions, and global accessiblities, making education and
            entrepreneurship more inclusive and fun.
          </p>
        </div>

        <div>
          <h2 className="text-center text-destructive font-bold pb-5">
            Our Vision
          </h2>
          <p className="leading-7 text-xl">
            To revolutionize the E-learning landscape by creating a vibrant,
            social, and interactive platform that inspires creativity, fosters
            community, bridges the gap between learning and earning, making it
            easy for creators to succeed and learners to thrive.
          </p>
        </div>
      </section>
{/* 
      <MemberCard
        title="Meet Our Team"
        body="Meet our team of innovators who drive our missions and vision forward."
        members={[
          { name: "Onyeka Nnaemena", role: "CEO", image: Pic2Svg },
          { name: "Okenwa Victor", role: "CTO", image: Pic4Svg },
          { name: "Emmanuel Chukwu", role: "COO", image: Pic3Svg },
        ]}
      /> */}
      <MemberCard
        title="Meet Our Instructors"
        body="Over 400 industry professionals from content creation hottest companies are our instructors"
        members={[
          { name: "Annah Jesse", role: "Video Editor", image: Pic5Svg },
          { name: "Tina Vee", role: "Content Writer", image: Pic1Svg },
          { name: "Okenwa Victor", role: "Digital Marketer", image: Pic3Svg },
          { name: "Onyeka Nnaemena", role: "Video Editor", image: Pic2Svg },
        ]}
      />

      {/* Stats */}
      <section className="bg-high-contrast padding-x padding-y md:my-14 my-8 text-muted">
        <div className="pb-7">
          <h2 className="capitalize text-center font-bold pb-1">
            <span className="text-destructive">Netmifi</span> by the numbers
          </h2>
          <p className="text-center text-xl">
            Thousands of students have taken our courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="">
            <h4 className="text-destructive">Students Enrolled</h4>
            <h3 className="text-muted font-bold">50,000+</h3>
          </div>
          <div className="">
            <h4 className="text-destructive">Certified</h4>
            <h3 className="text-muted font-bold">20,000+</h3>
          </div>
          <div className="">
            <h4 className="text-destructive">Skillful Courses</h4>
            <h3 className="text-muted font-bold">1,000</h3>
          </div>
          <div className="">
            <h4 className="text-destructive">Expert Instructors</h4>
            <h3 className="text-muted font-bold">700</h3>
          </div>
          <div className="">
            <h4 className="text-destructive">Skilled Mentors</h4>
            <h3 className="text-muted font-bold">500</h3>
          </div>
        </div>
      </section>

      {/* Faq section */}
      <section className="padding-x padding-y">
        <h2 className="text-center font-bold mb-5">
          Frequently Asked <span className="text-destructive">Questions</span>
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem className="" value="item-1">
            <AccordionTrigger className="capitalize text-xl">
              Does netmifi supports community building?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              <span className="font-bold">Community building: </span>Netmifi is
              not just education and services, It's about community. We are
              building a global network of creators who can connect collaborate,
              and share their journeys. Our mission is to foster a supportiive
              environment that propel's creators to new heights.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="capitalize text-xl">
              Does netmifi offer content production services?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="capitalize text-xl">
              Which kind of services does netmifi offer?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="capitalize text-xl">
              How can i enroll in a course on netmifi?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="capitalize text-xl">
              List of courses and ebooks to buy on netmifi?
            </AccordionTrigger>
            <AccordionContent className="text-lg">
              Yes. It's animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Contact Us */}

      <section className="flex flex-col md:flex-row padding-x padding-y">
        <div className="md:w-1/2 mb-5 md:mb-0 flex justify-center ml-6">
          <img src={ContactSvg} alt="service image" />
        </div>
        <div className="md:w-1/2">
          <h1 className="font-bold capitalize">
            <span className="text-destructive">Contact us</span> let's help you?
          </h1>
          <p className="leading-7 py-5 text-xl">
            Please kindly share your thoughts and challanges, we will love to
            help you out.
          </p>
          <AboutContact />
        </div>
      </section>

      <Newsletter />
    </main>
  );
};

export default About;
