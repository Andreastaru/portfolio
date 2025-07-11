/* eslint-disable react-hooks/exhaustive-deps */
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [active, setActive] = useState(0);
  const [isAutoplaying, setIsAutoplaying] = useState(autoplay);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    setIsAutoplaying(autoplay);
  }, [autoplay]);

  useEffect(() => {
    if (isAutoplaying) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoplaying]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <>
      <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20"></div>
      <article
        className="relative grid grid-cols-1 md:grid-cols-2 gap-20"
        onMouseEnter={() => setIsAutoplaying(false)}
        onMouseLeave={() => setIsAutoplaying(true)}
        onTouchStart={() => setIsAutoplaying(false)}
        onTouchEnd={() => {
          setTimeout(() => setIsAutoplaying(true), 5000);
        }}
      >
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.logo}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.logo}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold  text-white">
              {testimonials[active].name}
            </h3>

            <motion.p className="text-lg text-neutral-300">
              {testimonials[active].from.split(" ").map((word, index) => (
                <motion.span
                  key={`${testimonials[active].name}-${index}`}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  From {word}
                </motion.span>
              ))}
            </motion.p>
            <p
              className="text-sm text-gray-500 dark:text-neutral-500 hover:dark:text-white"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 1)" }}
            >
              <a
                href={testimonials[active].cert_url}
                target="_blank"
                rel="noreferrer"
                onChange={!autoplay}
              >
                Check out {testimonials[active].name}&apos;s certification here!
              </a>
            </p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0 padding-top-mobile">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-neutral-800  flex items-center justify-center group/button hover:cursor-pointer"
            >
              <FaArrowLeft className="h-5 w-5  text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300 hover:cursor-pointer" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full  bg-neutral-800 flex items-center justify-center group/button hover:cursor-pointer"
            >
              <FaArrowRight className="h-5 w-5  text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300 hover:cursor-pointer" />
            </button>
          </div>
        </div>
      </article>
    </>
  );
};

AnimatedTestimonials.propTypes = {
  testimonials: PropTypes.array.isRequired,
  autoplay: PropTypes.bool,
};
