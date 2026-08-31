import { useRef } from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { profile } from "../data/profile";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const scrollToWork = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToResume = () => {
    document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[90vh] flex flex-col justify-center pt-20 pb-12 section-container"
      aria-label="Introduction"
    >
      <div className="max-w-2xl">
        {/* Greeting label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-sm font-medium text-accent-600 dark:text-accent-400 mb-3 tracking-wide"
        >
          Hello, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.1}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight"
        >
          {profile.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="mt-3 text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium"
        >
          {profile.title}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
          className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400"
        >
          {profile.tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-8 flex flex-wrap gap-3"
        >
          <button
            onClick={scrollToWork}
            className="btn-primary"
            aria-label="View my projects"
          >
            View My Work
          </button>
          <button
            onClick={scrollToResume}
            className="btn-secondary"
            aria-label="View my resume"
          >
            View Resume
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown
          size={18}
          className="animate-bounce"
          style={{ animationDuration: "1.8s" }}
        />
      </motion.div>
    </section>
  );
}
