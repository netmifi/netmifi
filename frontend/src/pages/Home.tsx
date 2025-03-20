import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaTimes } from "react-icons/fa"; // Cancel icon
import { FaRegCheckCircle } from "react-icons/fa"; // Done (red) button icon
import NavWaitlist from "@/components/navbar/NavbarWaitlist";
import { useNavigate } from "react-router-dom";
import { updateWaitlistSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import mutationErrorHandler from "@/api/handlers/mutationErrorHandler";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const Home = () => {
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch("http://localhost:3000/services/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });

      // if (!response.ok) {
      //   throw new Error("Failed to submit form");
      // }

      return await response.json();
    },
    onSuccess: (data) => {
      if (data.state?.isSuccess) {
        setIsModalOpen(true);
      } else if (data.state?.isBlocked) {
        toast.error(data.message, {
          className: "bg-white ring-1 font-[500] ring-red-700 text-red-700 shadow-lg",
        });
      } else {
        toast.error(data.message || "An unexpected error occurred", {
          className: "bg-red-700 text-white shadow-lg",
        });
      }
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error(error.message || "Submission failed, please try again.", {
        className: "bg-red-700 text-white shadow-lg",
      });
    },
  });

  const formSchema = updateWaitlistSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Remove empty values
      const cleanedValues = Object.fromEntries(
        Object.entries(values).filter(([_, v]) => v != null && v !== "")
      );

      // Create FormData object
      const formData = new FormData();
      if (cleanedValues.email) {
        formData.append("email", cleanedValues.email as string);
      }
      if (cleanedValues.name) {
        formData.append("name", cleanedValues.name as string);
      }

      // Trigger the mutation
      await mutation.mutateAsync(formData);
    } catch (error) {
      console.error("Mutation error:", error);
      mutationErrorHandler(mutation, error);
    }
  };

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/community");
  };

  return (
    <div className="bg-default w-auto lg:w-dvw h-dvh relative">
      <div className="absolute flex z-0 items-center justify-center min-h-dvh bg-white/90 top-0 right-0 left-0 bottom-0"></div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-xl p-6 w-[70%] lg:w-[25%] space-y-5">
            {/* Modal Header with Close Icon */}
            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="text-black p-1 rounded-full bg-gray-300"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col items-center gap-5">
              {/* Green Check Icon */}
              <div className="text-[#1B6909]">
                <AiFillCheckCircle size={120} />
              </div>
              <p className="text-center text-xl max-w-72 text-[#0F2816] font-bold">
                We’ve added you to our waiting list!
              </p>
              <p className="text-center text-xs max-w-60 text-[#000000B2]/70">
                Thanks for joining our waiting list, we’ll let you know when
                Netmifi is ready.
              </p>
            </div>

            {/* Done Button */}
            <div className="flex justify-center">
              <button
                className="bg-[#9E0000] hover:bg-[#CF8080] text-white py-3 justify-center w-5/6 text-sm rounded-xl flex items-center gap-2"
                onClick={closeModal}
              >
                <FaRegCheckCircle size={16} />
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <NavWaitlist />
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
            THE ULTIMATE LAUNCHPAD FOR ADDICTIVE LEARNING AND SOCIALIZING!
          </h1>
          <p className="lg:max-w-[650px] lg:text-center text-[#1A0F28] text-medium lg:text-lg">
            Get exclusive access to our groundbreaking All-in-One e-learning and
            social commerce platform for creators! Join our launch list to be
            among the first to try it out and shape the future of edtech.
          </p>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="lg:w-[534px] w-full space-y-5"
          >
            <p className="font-bold text-xl">JOIN OUR WAITLIST</p>
            <div className="px-5 flex flex-col py-2 ring-[1px] ring-black rounded-xl hover:ring-[#9E0000]">
              <label className="lg:text-sm text-[#CE2600]" htmlFor="name">
                Full name
              </label>
              <input
                {...form.register("name")}
                className="outline-none text-base text-[#1A0F28]"
                type="text"
                name="name"
                id="name"
                required
                placeholder="Enter your full name"
              />
            </div>
            <div className="px-5 flex flex-col py-2 ring-[1px] ring-black rounded-xl hover:ring-[#9E0000]">
              <label className="lg:text-sm text-[#CE2600]" htmlFor="name">
                Email
              </label>
              <input
                {...form.register("email")}
                className="outline-none text-base text-[#1A0F28]"
                type="email"
                name="email"
                id="email"
                required
                placeholder="Example@gmail.com"
              />
            </div>
            <button
              className="px-5 w-full bg-[#9E0000] hover:bg-[#CF8080] text-white flex justify-center py-4 ring-[1px] ring-[#CF8080] rounded-xl"
              type="submit"
            >
              Join Waitlist
            </button>
          </form>
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

export default Home;
