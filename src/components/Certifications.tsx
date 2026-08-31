import { useState } from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";
import { certificates } from "../data/certificates";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: (i % 6) * 0.07 },
  }),
};

function PdfThumbnail({ url }: { url: string }) {
  const [error, setError] = useState(false);

  if (error) {
    return <Award size={40} className="text-gray-400 dark:text-gray-500" />;
  }

  return (
    <Document
      file={url}
      onLoadError={(err) => {
        console.error("PDF load error:", err);
        setError(true);
      }}
      loading={
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-xs text-gray-400 dark:text-gray-500 animate-pulse">
            Loading preview...
          </span>
        </div>
      }
      className="w-full h-full flex items-center justify-center overflow-hidden bg-white"
    >
      <Page
        pageNumber={1}
        width={400}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        className="w-full h-full flex items-center justify-center"
      />
    </Document>
  );
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="section-padding bg-gray-50 dark:bg-[#161b27]"
    >
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-heading">Certifications</h2>
          <div className="section-divider" />
          <p className="section-subheading">
            Courses and credentials I have completed.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {certificates.map((cert, i) => {
            const isImage =
              cert.credentialUrl.endsWith(".png") ||
              cert.credentialUrl.endsWith(".jpg") ||
              cert.credentialUrl.endsWith(".jpeg");

            return (
              <motion.article
                key={cert.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="pro-card hover:shadow-card-hover group flex flex-col"
                aria-label={`${cert.title} certificate`}
              >
                {/* Thumbnail / preview */}
                <div className="h-40 rounded-t-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center relative border-b border-gray-100 dark:border-gray-700">
                  {isImage ? (
                    <img
                      src={cert.credentialUrl}
                      alt={`${cert.title} certificate`}
                      className="w-full h-full object-cover bg-white"
                      loading="lazy"
                    />
                  ) : (
                    <PdfThumbnail url={cert.credentialUrl} />
                  )}
                  {/* Overlay for hover effect */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200 pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1 gap-1">
                  <h3
                    className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2"
                    title={cert.title}
                  >
                    {cert.title}
                  </h3>
                  <p className="text-xs text-accent-600 dark:text-accent-400 font-medium">
                    {cert.issuer}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-3">
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {cert.date}
                    </span>
                    {cert.credentialUrl &&
                      !cert.credentialUrl.startsWith("YOUR_") && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-accent-600 dark:text-accent-400 hover:underline"
                          aria-label={`View ${cert.title} certificate`}
                        >
                          View <ExternalLink size={11} />
                        </a>
                      )}
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
