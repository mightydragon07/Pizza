import type { Metadata } from "next";
import { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { IconClock, IconMapPin, IconPhone } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact — Orca Pizza",
  description:
    "Visit Orca Pizza in Galle, call us, or send a message — we'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Get in touch
          </span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink md:text-5xl">
            Visit us
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <Reveal className="space-y-6">
            <ContactItem
              icon={<IconMapPin className="h-5 w-5" />}
              title="Location"
              lines={["123 Pizza Street", "Cross Road, Galle"]}
            />
            <ContactItem
              icon={<IconClock className="h-5 w-5" />}
              title="Hours"
              lines={["Mon – Thu: 11am – 10pm", "Fri – Sun: 11am – 11pm"]}
            />
            <ContactItem
              icon={<IconPhone className="h-5 w-5" />}
              title="Contact"
              lines={["(123) 123-PIZZA", "hello@orcapizza.com"]}
            />
          </Reveal>

          <Reveal delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon,
  title,
  lines,
}: {
  icon: ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-line bg-surface p-6 shadow-card transition-transform duration-300 hover:-translate-y-1">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">
          {title}
        </h3>
        {lines.map((line) => (
          <p key={line} className="mt-0.5 text-sm text-ink-muted">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
