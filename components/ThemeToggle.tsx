"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { IconMoon, IconSun } from "./Icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isNight = theme === "night";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isNight ? "Switch to day mode" : "Switch to night mode"}
      title={isNight ? "Switch to day mode" : "Switch to night mode"}
      className="relative flex h-9 w-16 shrink-0 items-center rounded-full border border-line bg-bg-soft px-1 transition-colors duration-500"
    >
      <motion.span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white shadow-card"
        animate={{ x: isNight ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isNight ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="flex"
            >
              <IconMoon className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25 }}
              className="flex"
            >
              <IconSun className="h-4 w-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
