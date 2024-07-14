import { buzzCall } from "@/assets/images";

const Jumbotron = () => {
  return (
    <section className="min-h-screen bg-secondary flex flex-wrap items-center max-md:flex-col-reverse gap-0 padding-x padding-y">
      <img
        src={buzzCall}
        className="h-[300px] w-[400px] md:w-[600px] md:h-[500px]"
        alt=""
      />

      <div className="flex flex-col gap-5">
        <h1 className="text-7xl font-bold">Blogs</h1>
        <p className="text-lg font-montserrat">
          Exploring ideas, Inspiring minds: Where creativity meets insight.
          <br />A Tapestry of Bloggers Sharing stories, tips ands ideas.
        </p>
      </div>
    </section>
  );
};

export default Jumbotron;
