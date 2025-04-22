import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const ClipsCard = ({ className, clip }: ClipsCardProps) => {

  return (
    <Card key={clip.id} className={cn("", className)}>
      <CardContent className="p-0 relative mb-auto">
        <div className="overflow-hidden">
          <NavLink to={`/courses/clips/${clip.id}/`}>
            <video
              src={clip.video}
              className="w-52 h-80 object-cover"
              autoPlay
              muted
              loop
            />
          </NavLink>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClipsCard;
