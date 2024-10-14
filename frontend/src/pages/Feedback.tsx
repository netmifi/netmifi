import { IllustrationsSvg, SeoCourseSvg } from "@/assets/svg";
import Jumbotron from "@/components/Jumbotron";
import MessageEmailForm from "@/components/MessageEmailForm";

const Feedback = () => {
  return (
    <main className="flex flex-col gap-20">
      <Jumbotron
        className="bg-red"
        image={SeoCourseSvg}
        title="FeedBack"
        titleClassName="text-accent"
        body="Give us an honest feedback based on your experience on Netmifi. Rate our platform, report bugs or an issue."
        bodyClassName="text-accent/50"
      />

      <section className="flex flex-col gap-10">
        <h3 className="text-xl text-center"></h3>

        <MessageEmailForm />
      </section>
    </main>
  );
};

export default Feedback;
