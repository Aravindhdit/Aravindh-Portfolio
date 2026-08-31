import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Lock,
  Send,
} from "lucide-react";
import { profile } from "../data/profile";
import { useTheme } from "../hooks/useTheme";
import { Sun, Moon } from "lucide-react";

// ── Available document categories ──────────────────────────────────
const DOCUMENT_TYPES = [
  "Identity Verification Documents",
  "Date of Birth / Government Records",
  "Class X Academic Records",
  "Class XII Academic Records",
  "Bachelor's Degree Records",
  "Provisional Degree Certificate",
  "Academic Credentials",
  "Professional Certificates",
];

type FormState = "idle" | "submitting" | "success" | "error";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: d },
  }),
};

export default function CredentialVerification() {
  const [theme, toggleTheme] = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const toggleDoc = (doc: string) => {
    setSelectedDocs((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  };

  const validate = (data: FormData): Record<string, string> => {
    const errs: Record<string, string> = {};
    if (!data.get("fullName")?.toString().trim()) errs.fullName = "Full name is required.";
    const email = data.get("officialEmail")?.toString().trim() ?? "";
    if (!email) {
      errs.officialEmail = "Official email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.officialEmail = "Enter a valid email address.";
    }
    if (!data.get("phone")?.toString().trim()) errs.phone = "Phone number is required.";
    if (!data.get("company")?.toString().trim()) errs.company = "Company / organisation is required.";
    if (selectedDocs.length === 0) errs.documents = "Please select at least one document type.";
    if (!data.get("reason")?.toString().trim()) errs.reason = "Please provide a reason for the request.";
    if (!agreed) errs.agreed = "You must confirm the accuracy of the information.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setFormState("submitting");

    // Build a readable message for the email
    const messageBody = `
Credential Verification Request
================================
Full Name:          ${data.get("fullName")}
Official Email:     ${data.get("officialEmail")}
Phone:              ${data.get("phone")}
Company:            ${data.get("company")}
Designation:        ${data.get("designation") || "Not specified"}
Documents Required: ${selectedDocs.join(", ")}
Reason:             ${data.get("reason")}
    `.trim();

    if (!profile.credentialFormAccessKey || profile.credentialFormAccessKey.startsWith("YOUR_")) {
      await new Promise((r) => setTimeout(r, 900));
      setFormState("success");
      formRef.current?.reset();
      setSelectedDocs([]);
      setAgreed(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("access_key", profile.credentialFormAccessKey);
      submitData.append("subject", "Portfolio Credential Verification Request");
      submitData.append("from_name", data.get("fullName")?.toString() ?? "");
      submitData.append("email", data.get("officialEmail")?.toString() ?? "");
      submitData.append("message", messageBody);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData,
      });
      const json = await res.json();
      if (json.success) {
        setFormState("success");
        formRef.current?.reset();
        setSelectedDocs([]);
        setAgreed(false);
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-md border px-4 py-3 text-sm bg-white dark:bg-[#1f2937] text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500 ${
      errors[field]
        ? "border-red-400 dark:border-red-500"
        : "border-gray-300 dark:border-gray-600"
    }`;

  return (
    <div className="min-h-screen bg-white dark:bg-[#111827]">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="section-container flex items-center justify-between h-14">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            aria-label="Back to portfolio"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </header>

      <main className="section-container py-12 sm:py-16">
        {/* ── Hero block ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto text-center mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck size={28} className="text-accent-600 dark:text-accent-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Credential Verification
          </h1>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-lg mx-auto">
            Academic and identity-related documents are available only upon a legitimate,
            verified request. Documents will{" "}
            <strong className="text-gray-700 dark:text-gray-300">not</strong> be automatically
            released after submitting this form.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ── Left: Available documents ── */}
          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="lg:col-span-2"
          >
            <div className="pro-card p-5">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                Documents Available
              </h2>
              <ul className="space-y-2.5" role="list">
                {DOCUMENT_TYPES.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <CheckCircle
                      size={15}
                      className="text-green-500 flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {doc}
                  </li>
                ))}
              </ul>

              {/* Privacy notice */}
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-start gap-2 text-xs text-gray-400 dark:text-gray-500">
                <Lock size={13} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Documents are shared only after manual verification by the portfolio owner.
                  No files are exposed publicly.
                </span>
              </div>
            </div>
          </motion.aside>

          {/* ── Right: Request form ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="lg:col-span-3"
          >
            {formState === "success" ? (
              <div className="pro-card p-8 flex flex-col items-center gap-4 text-center">
                <CheckCircle size={44} className="text-green-500" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                    Request Submitted
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
                    Your request has been received. I will review the details and contact you
                    at the email address provided if the request is approved.
                  </p>
                </div>
                <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                  <Lock size={12} />
                  Documents will not be shared automatically.
                </div>
                <button
                  onClick={() => setFormState("idle")}
                  className="btn-secondary mt-1"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="pro-card p-6 flex flex-col gap-4"
                aria-label="Credential verification request form"
              >
                <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                  Request Access
                </h2>

                {/* Full Name */}
                <Field label="Full Name" required error={errors.fullName}>
                  <input
                    id="cred-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="Your full name"
                    className={inputClass("fullName")}
                    aria-required="true"
                  />
                </Field>

                {/* Official Email */}
                <Field label="Official Email Address" required error={errors.officialEmail}>
                  <input
                    id="cred-email"
                    name="officialEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="official@company.com"
                    className={inputClass("officialEmail")}
                    aria-required="true"
                  />
                </Field>

                {/* Phone */}
                <Field label="Phone Number" required error={errors.phone}>
                  <input
                    id="cred-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+91 XXXXXXXXXX"
                    className={inputClass("phone")}
                    aria-required="true"
                  />
                </Field>

                {/* Company */}
                <Field label="Company / Organisation" required error={errors.company}>
                  <input
                    id="cred-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    placeholder="Organisation name"
                    className={inputClass("company")}
                    aria-required="true"
                  />
                </Field>

                {/* Designation */}
                <Field label="Designation" error={undefined}>
                  <input
                    id="cred-designation"
                    name="designation"
                    type="text"
                    autoComplete="organization-title"
                    placeholder="e.g. HR Recruiter (optional)"
                    className={inputClass("designation")}
                  />
                </Field>

                {/* Documents required */}
                <div>
                  <p className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Documents Required{" "}
                    <span className="text-red-500" aria-hidden="true">*</span>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {DOCUMENT_TYPES.map((doc) => (
                      <label
                        key={doc}
                        className={`flex items-start gap-2.5 p-2.5 rounded-md border cursor-pointer text-xs transition-colors duration-150 ${
                          selectedDocs.includes(doc)
                            ? "border-accent-400 dark:border-accent-500 bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300"
                            : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 accent-accent-600 flex-shrink-0"
                          checked={selectedDocs.includes(doc)}
                          onChange={() => toggleDoc(doc)}
                          aria-label={doc}
                        />
                        {doc}
                      </label>
                    ))}
                  </div>
                  {errors.documents && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.documents}
                    </p>
                  )}
                </div>

                {/* Reason */}
                <Field label="Reason for Request" required error={errors.reason}>
                  <textarea
                    id="cred-reason"
                    name="reason"
                    rows={3}
                    placeholder="e.g. Employment background verification for a fresher hire."
                    className={`${inputClass("reason")} resize-none`}
                    aria-required="true"
                  />
                </Field>

                {/* Agreement */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5 accent-accent-600 flex-shrink-0"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      aria-required="true"
                      aria-label="I confirm that the information provided is accurate"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      I confirm that the information provided above is accurate and that this
                      request is for a legitimate verification purpose.
                    </span>
                  </label>
                  {errors.agreed && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.agreed}
                    </p>
                  )}
                </div>

                {formState === "error" && (
                  <p className="text-sm text-red-500 flex items-center gap-1.5">
                    <AlertCircle size={14} /> Something went wrong. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn-primary justify-center"
                  disabled={formState === "submitting"}
                  aria-label="Submit credential verification request"
                >
                  {formState === "submitting" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      <Send size={15} /> Request Access
                    </>
                  )}
                </button>

                {/* Bottom notice */}
                <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 pt-1">
                  <Lock size={12} aria-hidden="true" />
                  Documents will NOT be shared automatically after submission.
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// ── Helper: labelled form field ────────────────────────────────────
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
        {required && (
          <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}
