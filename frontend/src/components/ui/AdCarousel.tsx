import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Robotron from "../Robotron"; 

type Ad = {
  image: string;
  title: string;
  subtitle: string;
};

interface Props {
  ads: Ad[];
  interval?: number;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
};

// const swipeConfidenceThreshold = 10000;

const AdCarousel = ({ ads, interval = 10000 }: Props) => {
  const [[currentIndex, direction], setIndex] = useState<[number, number]>([0, 0]);

  const paginate = (newIndex: number) => {
    const dir = newIndex > currentIndex ? 1 : -1;
    setIndex([newIndex, dir]);
  };

  const swipeHandler = (offsetX: number) => {
    if (Math.abs(offsetX) > 100) {
      paginate((currentIndex + (offsetX < 0 ? 1 : -1) + ads.length) % ads.length);
    }
  };

  // Auto-slide
  useState(() => {
    const timer = setInterval(() => {
      paginate((currentIndex + 1) % ads.length);
    }, interval);
    return () => clearInterval(timer);
  });

  return (
    <section className="relative overflow-hidden">
      <AnimatePresence custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, { offset }) => swipeHandler(offset.x)}
        >
          <Robotron
            className="bg-popover transition-all duration-500"
            image={ads[currentIndex].image}
            title={ads[currentIndex].title}
            titleClassName="md:text-base max-w-40 text-white text-sm"
            subtitle={ads[currentIndex].subtitle}
            subtitleClassName="text-gray-300 text-xs md:text-sm"
            button={
              <Button
                size={'sm'}
                className="rounded-full text-sm md:text-base bg-white text-red mr-auto"
                onClick={() => console.log("Buy Now clicked")}
              >
                Buy Now
              </Button>
            }
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2 z-10 relative">
        {ads.map((_, idx) => (
          <button
            key={idx}
            onClick={() => paginate(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default AdCarousel;
