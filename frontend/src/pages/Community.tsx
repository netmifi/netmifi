import { FaTelegram, FaWhatsapp } from "react-icons/fa"; // Cancel icon
import {  FaXTwitter } from "react-icons/fa6";
import { ExternalLink, Linkedin} from "lucide-react";
import NavWaitlist from "@/components/navbar/NavbarWaitlist";

const Community = () => {

  return (
    <div className="bg-default w-auto lg:w-dvw h-dvh relative">
      <div className="absolute flex z-0 items-center justify-center min-h-dvh bg-white/90 top-0 right-0 left-0 bottom-0"></div>  
      <NavWaitlist/>

      <div className="mt-36 lg:mt-56 flex justify-center lg:space-x-10">
        <div className="lg:flex flex-col hidden justify-between py-10 text-white h-[60vh]">
          <div className="bg-[#1DA1F2] px-2 text-center rounded-lg text-lg -skew-x-[9.62deg] skew-y-[9.62deg]">
            Adventurous
          </div>

          <div className="bg-[#A66CFF] px-2 text-center rounded-lg text-lg skew-x-[7.96deg] -skew-y-[7.96deg]">
            Community-driven
          </div>
        </div>
        <div className="flex flex-col items-start lg:items-center gap-4 z-10 p-5 lg:px-0">
                  <h1 className="text-3xl lg:text-[2.05rem] font-bold lg:text-center lg:max-w-[700px]">
          JOIN OUR COMMUNITY!
          </h1>
          <p className="lg:max-w-[650px] lg:text-center text-[#1A0F28] text-medium lg:text-lg">
          Join our vibrant community to share ideas, learn from expert
          instructors, publish & sell digital assets and stay informed about the
          latest developments in e-learning.
          </p>

        <div className="lg:w-[534px] w-full p-3 space-y-2 lg:space-y-5  rounded-xl ring-[1px] ring-[#D9D9D94D] bg-[#D9D9D94D]/30">
          <p className="font-bold lg:text-xl"> CLICK TO JOIN</p>

          <a
            href="https://x.com/GetNetmifi_hq?t=Ikt-aAbTKvfX0FIS6ecE1A&s=09"
            className="px-5 w-full bg-[#CCCCCC] text-black flex items-center justify-between py-4 ring-[1px] ring-[#CCCCCC] rounded-xl"
          >
            <span className="flex items-center lg:gap-5 gap-3 lg:w-1/2">
              {" "}
              <FaXTwitter className="bg-black text-white p-1 w-6 h-6 rounded-full" />{" "}
              <span>X (Formerly Twitter)</span>{" "}
            </span>
            <ExternalLink className="hover:text-gray-600" />
          </a>
          <a
            href="https://t.me/+q6hHBgYw53phYzI0"
            className="px-5 w-full bg-[#CCCCCC] text-black flex items-center justify-between py-4 ring-[1px] ring-[#CCCCCC] rounded-xl"
          >
            <span className="flex items-center gap-3 lg:gap-5 lg:w-1/2">
              {" "}
              <FaTelegram className="text-black p-1 w-8 h-8 rounded-full" />{" "}
              <span>Telegram</span>{" "}
            </span>
            <ExternalLink className="hover:text-gray-600" />
          </a>
          <a
            href="https://chat.whatsapp.com/IYZvFhKf6YQ44Jamwm8NBi"
            className="px-5 w-full bg-[#CCCCCC] text-black flex items-center justify-between py-4 ring-[1px] ring-[#CCCCCC] rounded-xl"
          >
            <span className="flex items-center lg:gap-5 gap-3 lg:w-1/2">
              {" "}
              <FaWhatsapp className="text-black p-1 w-8 h-8" />{" "}
              <span>Whatsapp</span>{" "}
            </span>
            <ExternalLink className="hover:text-gray-600" />
          </a>
          <a
            href="https://www.linkedin.com/company/getnetmifi/"
            className="px-5 w-full bg-[#CCCCCC] text-black flex items-center justify-between py-4 ring-[1px] ring-[#CCCCCC] rounded-xl"
          >
            <span className="flex items-center lg:gap-5 gap-3 lg:w-1/2">
              {" "}
              <Linkedin fill="" className=" text-black p-1 w-8 h-8" />{" "}
              <span>Linkedin</span>{" "}
            </span>
            <ExternalLink className="hover:text-gray-600" />
          </a>
        </div>
      </div>
        
        <div className="lg:flex flex-col hidden justify-between py-10 text-white h-[60vh]">
          <div className="bg-[#84C50E] px-4 text-center rounded-lg text-lg skew-x-[7.96deg] -skew-y-[7.96deg]">
            Growth
          </div>

          <div className="bg-[#FF5000] px-4 text-center rounded-lg text-lg -skew-x-[9.62deg] skew-y-[9.62deg]">
            Rewarding
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
