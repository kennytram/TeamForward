import Image from "next/image";

import { Star } from "lucide-react";

import { cycling, hike, yoga } from "@public/assets";
import TestimonialCard from "./TestimonialCard";

const reviews = [
  {
    image: cycling,
    name: "John Doe",
    position: "Product Owner",
    rating: 5,
    review:
      "As a junior PO networking and finding mentors can be a challenging task. However, Team forward has made it easier for me to connect and engage with the community. With the app's features, I'm able to create a support system and connect with like-minded individuals who share the same interests and hobbies.",
  },
  {
    image: yoga,
    name: "Halley Frank",
    position: "Senior Developer",
    rating: 4.5,
    review:
      "Team Forward has truly transformed my onboarding experience when joining a new company, especially during the pandemic where connecting with coworkers has been challenging due to remote work. With this app, I can now easily connect with my colleagues, join clubs, and create a support system.",
  },
  {
    image: hike,
    name: "Lisa Trey",
    position: "Lead Designer",
    rating: 5,
    review:
      "Team Forward completely transformed my experience of visiting a new city in Canada. I was initially nervous about making new friends in an unfamiliar city, but the app changed all of that. With its help, I was able to connect with a teammate who lived in the same neighborhood as me and shared similar interests and hobbies.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="bg-gray-light py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="mb-8 pb-4 text-center text-3xl font-bold lg:text-4xl">
          Hear From Our Members
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-12">
          {reviews.map(({ image, name, position, rating, review }) => (
            <TestimonialCard
              key={name}
              image={image}
              name={name}
              position={position}
              rating={rating}
              review={review}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

{
  /*As a junior PO networking and finding mentors can be a challenging
task. However, Team forward has made it easier for me to connect and
engage with the community. With the app&apos;s features, I&apos;m
able to create a support system and connect with like-minded
individuals who share the same interests and hobbies.
 I&apos;ve also been able to find new
jogging buddies, which has been a great way to stay active
while building strong relationships with my colleagues. The
app has helped me find new friends, create a safe space where
I can learn and thrive, while also allowing me to expand my
network and stay connected with the industry. Overall, this
app has been a game-changer in my career as a new PO. */
}

{
  /*Team Forward has truly transformed my onboarding experience
when joining a new company, especially during the pandemic
where connecting with coworkers has been challenging due to
remote work. With this app, I can now easily connect with my
colleagues, join clubs, and create a support system.
 I&apos;ve
found like-minded buddies who share similar interests, such as
jogging in the morning, and I&apos;m now able to jog with my
teammate who happens to be my neighbor. This has been a great
opportunity for us to bond and discuss both work and personal
life. Thanks to your app, I no longer feel like an outsider at
work. */
}

{
  /* Team Forward completely transformed my experience of visiting
a new city in Canada. I was initially nervous about making new
friends in an unfamiliar city, but the app changed all of
that. With its help, I was able to connect with a teammate who
lived in the same neighborhood as me and shared similar
interests and hobbies.
We decided to meet up for ice cream and
quickly realized we had so much more in common. Not only did
this app help me to make new friends in a new city, but it
also allowed me to build a strong friendship with my teammate.
Overall, this social application made my trip to Canada much
more enjoyable and helped me form lasting connections with new
people. */
}
