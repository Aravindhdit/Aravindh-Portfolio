import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { profile } from "../data/profile";

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: profile.githubUrl,
    icon: FaGithub,
    description: "View my code repositories",
  },
  {
    label: "LinkedIn",
    href: profile.linkedinUrl,
    icon: FaLinkedinIn,
    description: "Connect with me professionally",
  },
  {
    label: "Email",
    href: `mailto:${profile.email}`,
    icon: Mail,
    description: profile.email,
  },
];

export default function SocialLinks() {
  return (
    <section
      id="social"
      className="section-padding bg-gray-50 dark:bg-[#161b27]"
      aria-label="Social profiles"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-heading">My Social Pages</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon, description }, i) => (
            <motion.a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="pro-card flex items-center gap-4 px-5 py-4 hover:shadow-card-hover hover:border-accent-300 dark:hover:border-accent-600 transition-all duration-200 group"
              aria-label={`${label} — ${description}`}
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-50 dark:group-hover:bg-accent-900/30 transition-colors duration-200">
                <Icon
                  size={20}
                  className="text-gray-600 dark:text-gray-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-200"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-[180px]">
                  {description}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
