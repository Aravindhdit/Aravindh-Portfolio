import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { MapPin, GraduationCap, Briefcase } from "lucide-react";
import { profile } from "../data/profile";
import profilePhoto from "../assets/profile/profile.jpg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const INFO_ITEMS = [
  { icon: MapPin,         label: profile.location },
  { icon: GraduationCap, label: profile.qualification },
  { icon: Briefcase,     label: profile.status },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-[#161b27]">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="section-heading">About Me</h2>
          <div className="section-divider" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Photo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.1 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative w-60 sm:w-72 lg:w-80">
              <div className="absolute inset-0 rounded-lg bg-accent-100 dark:bg-accent-900/20 translate-x-3 translate-y-3" aria-hidden="true" />
              <img
                src={profilePhoto}
                alt="Aravindh D. — profile photograph"
                className="relative w-full rounded-lg object-cover border border-gray-200 dark:border-gray-700 shadow-card"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* About text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.15 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Hello! I'm {profile.firstName}.
            </h3>
            <div className="prose prose-sm prose-gray dark:prose-invert max-w-none">
              {profile.aboutMe.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 last:mb-0"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Info chips */}
            <div className="mt-7 flex flex-col gap-3">
              {INFO_ITEMS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center">
                    <Icon size={15} className="text-accent-600 dark:text-accent-400" />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
