// this is s reuseable card element

import { CardContent } from "./ui/card";

const CustomCard = ({ title, description, logo }) => {
  return (
    <CardContent className="flex gap-6 items-start border rounded-xl p-3">
      <div className="rounded-xl p-1 flex items-center justify-center bg-gray-200 w-14 h-14">
              {logo}
      </div>
      <div className="flex flex-col">
        <p className="text-xl text-black">{title}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
    </CardContent>
  );
};

export default CustomCard;
