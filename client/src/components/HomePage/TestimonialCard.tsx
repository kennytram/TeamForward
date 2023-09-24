import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import RatingStar from "./RatingStar";

type TestimonalCardProps = {
  image: StaticImageData;
  name: string;
  position: string;
  rating: number;
  review: string;
};

const TestimonialCard = ({
  image,
  name,
  position,
  rating,
  review,
}: TestimonalCardProps) => {
  return (
    <div className="mb-6 lg:mb-0">
      <div className="relative block h-full rounded-lg border border-gray-light bg-white shadow-xl ">
        <div className="relative m-6 h-64 overflow-hidden rounded-md">
          <Link href="#!">
            <Image
              src={image}
              className="w-full object-cover"
              alt="a man with glasses"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </Link>
        </div>

        <div className="p-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-x-4">
            <h5 className="text-lg font-bold">{name}</h5>
            <RatingStar rating={rating} />
          </div>

          <h6 className="mb-4 font-medium text-green">{position}</h6>

          <p>{review}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
