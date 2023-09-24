import Link from "next/link";

import { Button } from "@/components/ui/button";
import HeroImage from "./HeroImage";

const Hero = () => {
  return (
    <section className="bg-gradient-dark overflow-hidden text-white">
      <div className="container mx-auto flex flex-col items-center gap-16 px-4 pt-24 lg:flex-row lg:px-8">
        <div className="w-full text-center lg:text-left">
          <h2 className="text-3xl font-bold leading-none sm:text-4xl">
            Time for{" "}
            <span className="bg-gradient-to-t from-green to-green-secondary bg-clip-text text-transparent">
              wellness
            </span>
          </h2>
          <p className="mt-2">
            Find your wellness buddy at work and exercise together.
          </p>
          <Link href="/SignUp">
            <Button className="mt-2 px-7 text-base font-normal">
              Get Started
            </Button>
          </Link>
        </div>
        <HeroImage />
      </div>
    </section>
  );
};

export default Hero;
