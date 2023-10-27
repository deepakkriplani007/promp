import Feed from "@components/Feed";
const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">Discove & Share</h1>
      <br className="max-md:hiddien" />
      <span className="orange_gradient text-center">AI-powered Prompts</span>
      <p className="desc text-center">
        Promptopia is an open source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      {/* feed component */}
      <Feed />
    </section>
  );
};

export default Home;
