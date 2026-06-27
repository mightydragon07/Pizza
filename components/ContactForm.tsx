"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { IconCheck } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-line bg-surface p-8 text-center shadow-card"
      >
        <motion.span
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 18 }}
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <IconCheck className="h-6 w-6" />
        </motion.span>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">
          Message sent
        </h3>
        <p className="mt-2 text-sm text-ink-muted">
          Thanks for reaching out — we&apos;ll get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-primary hover:text-primary-dark"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-line bg-surface p-8 shadow-card"
    >
      <div>
        <label htmlFor="name" className="sr-only">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Your email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your email"
          required
          className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Your message"
          required
          className="w-full resize-none rounded-xl border border-line bg-bg px-4 py-3 text-sm text-ink placeholder:text-ink-muted focus:border-primary focus:outline-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-primary" role="alert">
          {errorMsg}
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "submitting"}
        whileHover={{ scale: status === "submitting" ? 1 : 1.01 }}
        whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
        className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </motion.button>
    </form>
  );
}
