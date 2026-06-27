"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { IconPizza } from "./Icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const leftLinks = links.slice(0, 2);
  const rightLinks = links.slice(2);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-xl transition-colors duration-500">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        {/* Mobile: logo left, controls right */}
        <Link
          href="/"
          className="group flex items-center gap-2 md:hidden"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <IconPizza className="h-[18px] w-[18px] animate-spin-slower group-hover:animate-spin-slow" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Orca Pizza
          </span>
        </Link>

        {/* Desktop: three-column grid keeps the logo truly centered */}
        <nav className="hidden w-full grid-cols-3 items-center md:grid">
          <ul className="flex items-center gap-8 justify-self-start">
            {leftLinks.map((link) => (
              <NavItem key={link.href} link={link} pathname={pathname} />
            ))}
          </ul>

          <Link
            href="/"
            className="group flex items-center justify-center gap-2.5 justify-self-center"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <IconPizza className="h-5 w-5 animate-spin-slower group-hover:animate-spin-slow" />
            </span>
            <span className="font-display text-2xl font-semibold tracking-tight text-ink">
              Orca Pizza
            </span>
          </Link>

          <div className="flex items-center gap-8 justify-self-end">
            <ul className="flex items-center gap-8">
              {rightLinks.map((link) => (
                <NavItem key={link.href} link={link} pathname={pathname} />
              ))}
            </ul>
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-0.5 w-6 bg-ink transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-ink transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-ink transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-1 overflow-hidden border-t border-line bg-bg px-6 py-4 md:hidden"
          >
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="py-1"
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 font-sans text-base ${
                    pathname === link.href
                      ? "bg-bg-soft font-semibold text-primary"
                      : "text-ink-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavItem({
  link,
  pathname,
}: {
  link: { href: string; label: string };
  pathname: string;
}) {
  const active = pathname === link.href;
  return (
    <li>
      <Link
        href={link.href}
        className={`inline-flex rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
          active
            ? "bg-primary/10 text-primary"
            : "text-ink-muted hover:text-ink hover:bg-bg-soft"
        }`}
      >
        {link.label}
      </Link>
    </li>
  );
}
