import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CredentialCTA() {
  return (
    <section
      className="section-padding"
      aria-label="Credential verification"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="pro-card p-7 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          {/* Icon */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center flex-shrink-0">
            <ShieldCheck size={26} className="text-accent-600 dark:text-accent-400" />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Credential Verification
            </h2>
            <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              Need to verify my academic or professional credentials? Private documents
              are not publicly accessible. Verified organisations may request access for
              legitimate verification purposes.
            </p>
          </div>

          {/* CTA */}
          <Link
            to="/credentials"
            className="btn-primary whitespace-nowrap flex-shrink-0"
            aria-label="Request access to credential verification"
          >
            Request Access <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
