import { Calendar } from "@/components/ui/calendar";
import { ChevronRight } from "lucide-react";
import { FaPersonChalkboard } from "react-icons/fa6";
import PostAvatar from "@/components/PostAvatar";

const UserActivityPanel = ({ user, date, setDate }: { user: any; date: Date; setDate: (date: Date) => void }) => {
  return (
    <div className="pt-14 space-y-10">
      {/* Profile Card */}
      <section className="h-56 border-2 border-gray-400 rounded-xl py-8 px-8 flex flex-col justify-between">
        <div className="flex items-start gap-3">
          <PostAvatar
            isVerified={false}
            profileName={`${user?.firstName} ${user?.lastName}`}
            profileURL=""
            profileImage={user?.profile ?? ""}
            profileImageClassName="md:size-16 text-xl md:text-2xl"
            onlyAvatar
          />
          <div className="flex flex-col gap-px justify-center text-sm">
            <h4 className="text-lg font-bold flex items-center gap-1">
              {user?.firstName}, {user?.lastName}
              <span className="font-thin text-sm">20h</span>
            </h4>
            <h6>Content Producer . 19k followers</h6>
            <p><b>1047</b> Points Earned</p>
          </div>
        </div>
        <div className="flex justify-between">
          {[
            { label: "Day Streak", value: "10" },
            { label: "Tasks Completed", value: "7" },
            { label: "Leaderboard", value: "47" },
          ].map(({ label, value }, i) => (
            <div key={i} className="flex flex-col text-sm rounded-lg items-center justify-center p-2 border border-red-500">
              <b>{value}</b>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Weekly Streak */}
      <section className="space-y-5 w-full max-w-lg">
        <h3 className="font-bold">Weekly Streak</h3>
        <hr className="border-gray-400" />
        <div className="flex justify-between text-xs font-semibold">
          <p><span className="text-red">503</span> Points</p>
          <p>Get <span className="text-red">x2</span> points by wed 21</p>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="w-full bg-white text-black border border-gray-400 rounded-xl"
          classNames={{
            cell: "md:w-10 lg:w-12 space-x-2 text-center",
            head_cell: "text-muted-foreground font-semibold tracking-wide",
            day: "h-8 w-8 flex items-center justify-center p-0 font-medium hover:bg-red-200 rounded",
            day_selected: "bg-red text-white hover:bg-red",
            day_today: "bg-red-100 text-white font-bold border border-red",
            caption_label: "text-lg font-bold",
          }}
        />
      </section>

      {/* Upcoming Test */}
      <section className="space-y-5">
        <h3 className="font-bold">Upcoming Test</h3>
        <div className="border border-gray-400 rounded-lg p-4 h-20 flex justify-between items-center">
          <div className="size-14 rounded-md bg-red text-white flex items-center justify-center">
            <FaPersonChalkboard className="size-10" />
          </div>
          <div className="w-1/2">
            <h4 className="font-bold">Web Development</h4>
            <div className="flex justify-between text-xs">
              <p>Virtual Test</p>
              <p>23 July, 2025</p>
            </div>
          </div>
          <ChevronRight className="size-9" />
        </div>
      </section>
    </div>
  );
};

export default UserActivityPanel;
