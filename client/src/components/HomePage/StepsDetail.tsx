import { LucideIcon } from "lucide-react";

type StepsDetailProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const StepsDetail = ({ title, description, icon: Icon }: StepsDetailProps) => {
  return (
    <li className="flex h-full flex-col items-center justify-center rounded-lg border border-gray-light bg-white p-9 text-center shadow-xl">
      <div className="mb-4 rounded-lg bg-green p-4">
        <Icon color="white" size={40} />
      </div>
      <h3 className="mb-2 text-xl font-medium tracking-tight">{title}</h3>
      <p className="text-gray">{description}</p>
    </li>
  );
};

export default StepsDetail;
