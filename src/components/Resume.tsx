import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { profile } from "../data/profile";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Resume() {
  const handleDownload = () => {
    if (!profile.resumeDownloadUrl || profile.resumeDownloadUrl.startsWith("YOUR_")) {
      alert("Resume download URL not configured yet.");
      return;
    }
    window.open(profile.resumeDownloadUrl, "_blank", "noopener,noreferrer");
  };

  const hasPreviewUrl =
    profile.resumePreviewUrl && !profile.resumePreviewUrl.startsWith("YOUR_");

  // To embed Google Drive properly, we should use the /preview endpoint instead of /view
  const embedUrl = profile.resumePreviewUrl.replace(
    "/view?usp=sharing",
    "/preview"
  );

  return (
    <section id="resume" className="section-padding">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="section-heading">My Resume</h2>
              <div className="section-divider" />
              <p className="section-subheading max-w-xl">
                Take a look at my education, projects, technical skills and qualifications.
              </p>
            </div>
            {/* Download Button moved to top right next to heading on desktop */}
            <button
              onClick={handleDownload}
              className="btn-primary w-fit"
              aria-label="Download resume"
            >
              <Download size={16} /> Download Resume
            </button>
          </div>
        </motion.div>

        {/* Embedded Resume */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          className="mt-8 max-w-4xl mx-auto"
        >
          <div className="w-full bg-white dark:bg-[#1f2937] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm flex flex-col">
            {hasPreviewUrl ? (
              <iframe
                src={embedUrl}
                title="Aravindh's Resume"
                className="w-full aspect-[1/1.4] sm:aspect-auto sm:h-[800px] border-0 bg-gray-50 dark:bg-gray-800"
                loading="lazy"
                allow="autoplay"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-32 px-8 text-center bg-gray-50 dark:bg-gray-800">
                <FileText size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  Resume preview not configured
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
