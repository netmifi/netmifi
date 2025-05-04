import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Robotron from "./Robotron";

interface Ad {
  image: string;
  title: string;
  subtitle: string;
}

interface AdCarouselProps {
  ads: Ad[];
  interval?: number;
}

export const AdCarousel = ({ ads, interval = 60000 }: AdCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, interval);

    return () => clearInterval(timer);
  }, [ads.length, interval]);

  return (
    <div className="relative w-full mx-auto lg:max-w-7xl h-[200px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Robotron
            image={ads[currentIndex].image}
            title={ads[currentIndex].title}
            subtitle={ads[currentIndex].subtitle}
            showButton={false}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-primary scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
