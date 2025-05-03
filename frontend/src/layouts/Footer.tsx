import { Link, NavLink } from "react-router-dom";
import {
  AiFillFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineWhatsApp,
  AiOutlineX,
} from "react-icons/ai";
import { ChevronRight, LinkIcon, Mail } from "lucide-react";
import { CustomLogo } from "@/components/CustomLogo";

const Footer = () => {
  const year = new Date().getFullYear().toString();

  const quickLinks = [
    {
      label: "home",
      href: "/",
    },
    {
      label: "about us",
      href: "/about",
    },
    {
      label: "contact us",
      href: "/contact",
    },
    {
      label: "become an instructor",
      href: "/auth/welcome/instructor-application",
    },
  ];

  const socialLinks = [
    {
      icon: AiOutlineWhatsApp,
      href: "https://chat.whatsapp.com/IYZvFhKf6YQ44Jamwm8NBi",
    },
    {
      icon: AiOutlineLinkedin,
      href: "https://www.linkedin.com/company/getnetmifi/",
    },
    {
      icon: AiOutlineX,
      href: "https://x.com/GetNetmifi_hq?t=Ikt-aAbTKvfX0FIS6ecE1A&s=09",
    },
  ];

  return (
    <footer>
      <div
        className="padding-x padding-y bg-accent/40 relative overflow-hidden
      "
      >
        <div className="w-full h-full flex flex-wrap gap-5 z-10">
        <div className="flex flex-col ">
          <CustomLogo className="w-[7rem]" />
          <p className="py-5 text-sm sm:text-sm break-all">
            <strong className="text-transform: uppercase">Netmifi,</strong> an
            E-learning and social commerce platform that is set to revolutionize
            how creators learn, produce, collaborate and sell their digital
            products globally, with seamless payment solutions
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h2 className="text-lg font-bold">Quick Links</h2>
          <div className="flex flex-col">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="capitalize text-primary/80 hover:text-primary hover:translate-x-1 transition-all flex gap-1 items-center"
              >
                {" "}
                <LinkIcon className="size-5" /> {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <h2 className="text-lg font-bold">Get In Touch</h2>

          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-1">
              <Mail />{" "}
              <Link to={"mailto:get.netmifi@gmail.com"}>
                {" "}
                get.netmifi@gmail.com
              </Link>
            </div>
            <div className="border-t-2 border-primary/10 w-[30%] h-1 p-[0.5px]"></div>

            <div className="flex flex-wrap">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-2xl rounded-lg shadow-lg size-fit p-3 transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  <link.icon />
                </Link>
              ))}
            </div>
          </div>
        </div>
        </div>

        {/* <div className="footer-circle-container"> */}
          <div className="absolute rounded-full size-20 bg-red opacity-20 -top-[2.3em] -left-[2.3em]"></div>
          <div className="footer-circle footer-circle-2"></div>
        {/* </div> */}
      </div>

      <div className="bg-background py-3 text-center text-xs sm:text border-t-2">
        Copyright &copy; {year}, Netmifi Edutech Ltd. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
