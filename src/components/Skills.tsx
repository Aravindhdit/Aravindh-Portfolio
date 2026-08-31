import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { FaJava, FaWindows } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
import { SiPython, SiHtml5, SiCss, SiMysql, SiNginx, SiLinux } from "react-icons/si";
import { TbSql } from "react-icons/tb";
import { BarChart3, Code2 } from "lucide-react";
import { programmingLanguages, technicalTools } from "../data/skills";
import type { Skill } from "../data/skills";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Map data icon keys → react-icons JSX
const ICON_MAP: Record<string, React.ReactNode> = {
  java:    <FaJava />,
  python:  <SiPython />,
  sql:     <TbSql />,
  html:    <SiHtml5 />,
  css:     <SiCss />,
  nginx:   <SiNginx />,
  mysql:   <SiMysql />,
  powerbi: <BarChart3 size={20} />,
  excel:   <FaFileExcel />,
  windows: <FaWindows />,
  linux:   <SiLinux />,
};

function SkillCard({ name, icon }: Skill) {
  return (
    <div
      className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1f2937] hover:border-accent-300 dark:hover:border-accent-600 hover:shadow-card transition-all duration-200 cursor-default group"
      title={name}
      aria-label={name}
    >
      <span className="text-[22px] text-gray-600 dark:text-gray-300 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-200">
        {ICON_MAP[icon] ?? <Code2 size={22} />}
      </span>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

function SkillGroup({ title, skills }: { title: string; skills: Skill[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="section-heading">Technical Skills</h2>
          <div className="section-divider" />
          <p className="section-subheading">Technologies and tools I work with.</p>
        </motion.div>

        {/* Two columns */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14"
        >
          <SkillGroup title="Programming & Development" skills={programmingLanguages} />
          <SkillGroup title="Technical Tools & IT" skills={technicalTools} />
        </motion.div>
      </div>
    </section>
  );
}
