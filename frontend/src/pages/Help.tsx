import { HelpCenterSvg } from "@/assets/svg";
import Jumbotron from "@/components/Jumbotron";
import MessageEmailForm from "@/components/MessageEmailForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Help = () => {
  const FAQ = [
    {
      question: "how can i become an instructor?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad maiores iusto odit deleniti ducimus praesentium mollitia incidunt quasi itaque fugiat obcaecati qui quas repellat, ab tenetur, at officia pariatur ullam cupiditate, facilis libero delectus labore ex culpa! Repudiandae ullam commodi laudantium, dolor distinctio accusantium eligendi, repellat et ipsa laboriosam aut.",
    },
    {
      question: "how can i rate a course?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad maiores iusto odit deleniti ducimus praesentium mollitia incidunt quasi itaque fugiat obcaecati qui quas repellat, ab tenetur, at officia pariatur ullam cupiditate, facilis libero delectus labore ex culpa! Repudiandae ullam commodi laudantium, dolor distinctio accusantium eligendi, repellat et ipsa laboriosam aut.",
    },
    {
      question: "how can i buy a course?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad maiores iusto odit deleniti ducimus praesentium mollitia incidunt quasi itaque fugiat obcaecati qui quas repellat, ab tenetur, at officia pariatur ullam cupiditate, facilis libero delectus labore ex culpa! Repudiandae ullam commodi laudantium, dolor distinctio accusantium eligendi, repellat et ipsa laboriosam aut.",
    },
    {
      question: "how can i share a course?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad maiores iusto odit deleniti ducimus praesentium mollitia incidunt quasi itaque fugiat obcaecati qui quas repellat, ab tenetur, at officia pariatur ullam cupiditate, facilis libero delectus labore ex culpa! Repudiandae ullam commodi laudantium, dolor distinctio accusantium eligendi, repellat et ipsa laboriosam aut.",
    },
  ];
  return (
    <main className="flex flex-col gap-20">
      <Jumbotron
        className="bg-accent"
        image={HelpCenterSvg}
        title="Help center"
              titleClassName="text-primary"
              body="We are always ready to help you on Netmifi. Search Frequently asked questions or ask a send us an email with your question"
              bodyClassName="text-primary/70"
      />

      <section className="padding-x flex flex-col gap-6">
        <h3 className="text-xl text-center">
          Frequently Asked Questions <span className="text-red">(FAQ)</span>
        </h3>

        {FAQ.length > 0 ? (
          <div className="flex flex-col">
            {FAQ.map((item, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem value={item.answer}>
                  <AccordionTrigger className="bg-secondary px-3 hover:no-underline text-sm *:first-letter:uppercase">
                    <h4>{item.question}</h4>
                  </AccordionTrigger>
                  <AccordionContent className="p-5 flex flex-col gap-3 text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        ) : (
          <h3 className="text-xl text-primary/50 text-center">
            No Frequently Asked Questions found
          </h3>
        )}
      </section>

      <section className="flex flex-col gap-10">
        <h3 className="text-xl text-center">
          Send us an email with your question if the FAQ section didn't help
        </h3>

        <MessageEmailForm />
      </section>
    </main>
  );
};

export default Help;
