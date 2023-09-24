import { Bike, Map, MessagesSquare } from "lucide-react";

import { StepsDetail } from "@/components/HomePage";

const steps = [
  {
    title: "Choose your activity",
    description: "Choose the activity you are interested in.",
    icon: Bike,
  },
  {
    title: "Choose your location",
    description: "Choose the location you want to explore.",
    icon: Map,
  },
  {
    title: "Choose your guide",
    description: "Choose the guide you want to explore.",
    icon: MessagesSquare,
  },
];

const ThreeStepProcess = () => (
  <section className="container mx-auto my-16 px-4 text-gray-800 lg:my-24 lg:px-8">
    <div className="gap-y mb-16 flex flex-col items-center justify-between lg:flex-row">
      <h2 className="text-2xl font-bold">
        Connect with colleagues and stay fit together
      </h2>
      <p className="mt-2">
        Discover your shared interests, connect, and organize meet ups
      </p>
    </div>

    <ul className="grid gap-8 lg:grid-cols-3">
      {steps.map(({ title, description, icon }) => (
        <StepsDetail
          key={title}
          title={title}
          description={description}
          icon={icon}
        />
      ))}
    </ul>
  </section>
);

export default ThreeStepProcess;
