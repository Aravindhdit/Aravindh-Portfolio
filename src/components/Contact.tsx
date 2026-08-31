import { useState, useRef } from "react";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { profile } from "../data/profile";

type FormState = "idle" | "submitting" | "success" | "error";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (data: FormData): Record<string, string> => {
    const errs: Record<string, string> = {};
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const message = data.get("message")?.toString().trim();

    if (!name) errs.name = "Your name is required.";
    if (!email) {
      errs.email = "Your email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!message || message.length < 10) {
      errs.message = "Please write at least 10 characters.";
    }
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

    // Check if Web3Forms key is configured
    if (!profile.contactFormAccessKey || profile.contactFormAccessKey.startsWith("YOUR_")) {
      // Simulate success in dev mode
      await new Promise((r) => setTimeout(r, 800));
      setFormState("success");
      formRef.current?.reset();
      return;
    }

    try {
      data.append("access_key", profile.contactFormAccessKey);
      data.append("subject", `Portfolio Contact: Message from ${data.get("name")}`);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setFormState("success");
        formRef.current?.reset();
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
    <section id="contact" className="section-padding">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="section-heading">Contact Me</h2>
          <div className="section-divider" />
          <p className="section-subheading">
            Have an opportunity or want to discuss something? Feel free to reach out.
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          className="mt-8 max-w-xl"
        >
          {formState === "success" ? (
            <div className="pro-card p-8 flex flex-col items-center gap-3 text-center">
              <CheckCircle size={40} className="text-green-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Message Sent!</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Thank you for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setFormState("idle")}
                className="btn-secondary mt-2"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4"
              aria-label="Contact form"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Full Name <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  className={inputClass("name")}
                  aria-required="true"
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && (
                  <p id="contact-name-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Email Address <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass("email")}
                  aria-required="true"
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && (
                  <p id="contact-email-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Message <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Write your message here…"
                  className={`${inputClass("message")} resize-none`}
                  aria-required="true"
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                />
                {errors.message && (
                  <p id="contact-message-error" className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.message}
                  </p>
                )}
              </div>

              {formState === "error" && (
                <p className="text-sm text-red-500 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  Something went wrong. Please try again or email me directly.
                </p>
              )}

              <button
                type="submit"
                className="btn-primary justify-center"
                disabled={formState === "submitting"}
                aria-label="Send message"
              >
                {formState === "submitting" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={15} /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
