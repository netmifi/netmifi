import { ContactUsSvg } from "@/assets/svg";
import Jumbotron from "@/components/Jumbotron";
import MessageEmailForm from "@/components/MessageEmailForm";

const Contact = () => {
  return (
    <main className="flex flex-col gap-16">
      <Jumbotron
        className="bg-background/70"
        image={ContactUsSvg}
        title="contact us"
        titleClassName="text-primary font-open-sans"
        bodyClassName="text-primary/70"
        body="Send us a message. Please login if you haven't so we can tailor your support message to you."
      />

      <section className="padding-x">
        <MessageEmailForm />
      </section>
    </main>
  );
};

export default Contact;
