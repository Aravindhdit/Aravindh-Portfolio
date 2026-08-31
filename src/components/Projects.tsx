import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { projects } from "../data/projects";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08 },
  }),
};

// Default project color backgrounds (one per project cycling)
const PROJECT_COLORS = [
  "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
  "from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20",
  "from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20",
  "from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20",
  "from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20",
];

export default function Projects() {
  // Show all projects but visually highlight featured ones
  const displayedProjects = projects;

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-[#161b27]">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-heading">Featured Projects</h2>
          <div className="section-divider" />
          <p className="section-subheading">
            Personal and academic projects I've built.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {displayedProjects.map((project, i) => {
            const colorClass = PROJECT_COLORS[i % PROJECT_COLORS.length];
            const hasLive = project.liveUrl && !project.liveUrl.startsWith("YOUR_") && project.liveUrl !== "";
            const hasGithub = project.githubUrl && !project.githubUrl.startsWith("YOUR_GITHUB");

            return (
              <motion.article
                key={project.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="pro-card group flex flex-col overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
                aria-label={project.title}
              >
                {/* Project image / placeholder */}
                <div
                  className={`h-44 bg-gradient-to-br ${colorClass} overflow-hidden flex items-center justify-center relative`}
                >
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-center px-4">
                      <FaGithub
                        size={36}
                        className="mx-auto text-gray-400 dark:text-gray-500 mb-2"
                      />
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1 gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-1">
                    {hasLive && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary py-1.5 px-3 text-xs"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}
                    <a
                      href={hasGithub ? project.githubUrl : "#"}
                      target={hasGithub ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`btn-secondary py-1.5 px-3 text-xs group/gh ${
                        !hasGithub ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      aria-label={`View ${project.title} on GitHub`}
                      onClick={!hasGithub ? (e) => e.preventDefault() : undefined}
                    >
                      <FaGithub
                        size={13}
                        className="transition-transform duration-150 group-hover/gh:translate-x-0.5"
                      />
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
