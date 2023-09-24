import {
  Hero,
  NewsletterForm,
  Testimonials,
  ThreeStepProcess,
} from "@/components/HomePage";

const Home = () => {
  return (
    <main>
      <Hero />
      <ThreeStepProcess />
      <Testimonials />
      <NewsletterForm />
    </main>
  );
};

export default Home;
