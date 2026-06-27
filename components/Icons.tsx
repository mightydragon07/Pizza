import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

/** Pizza slice mark — used as the brand icon, animated in the Navbar/Footer */
export function IconPizza(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.5 21.5 19a10.6 10.6 0 0 0-19 0L12 2.5Z" />
      <circle cx="12" cy="9.4" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9.3" cy="13.4" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.7" cy="13.6" r="0.9" fill="currentColor" stroke="none" />
      <path d="M5.3 16.2c4.6-2.3 9-2.3 13.4 0" />
    </svg>
  );
}

export function IconSun(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
    </svg>
  );
}

export function IconMoon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 14.2A8.5 8.5 0 1 1 9.8 4 6.8 6.8 0 0 0 20 14.2Z" />
    </svg>
  );
}

export function IconFlame(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5c4 0 6.5-2.6 6.5-6 0-2.4-1.2-3.8-2.3-5.1-.4 1.4-1.2 2.2-2 2.2.5-2.6-.4-5-3-7.1-.3 2.6-1.4 4-2.8 5.4C7 12.3 5.5 13.9 5.5 16c0 3.1 2.5 5.5 6.5 5.5Z" />
    </svg>
  );
}

export function IconLeaf(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 4.2c-9.5 0-15.5 5.8-15.5 13.3 0 .9.1 1.7.3 2.3 8.5-1 13.6-5.9 15.2-15.6Z" />
      <path d="M5 19.5c2.6-3 5.6-5.8 9-8.3" />
    </svg>
  );
}

export function IconHeart(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20.2C6.5 16.7 3 13.6 3 9.6 3 6.8 5.1 4.7 7.7 4.7c1.7 0 3.2.9 4.3 2.4 1.1-1.5 2.6-2.4 4.3-2.4 2.6 0 4.7 2.1 4.7 4.9 0 4-3.5 7.1-9 10.6Z" />
    </svg>
  );
}

export function IconWheat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 22V3" />
      <path d="M12 5.5 9.5 4M12 5.5 14.5 4M12 9 9.2 7.3M12 9 14.8 7.3M12 12.5 9.2 10.8M12 12.5 14.8 10.8M12 16 9.4 14.4M12 16 14.6 14.4" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8.5" cy="8" r="2.6" />
      <circle cx="16" cy="9.2" r="2.1" />
      <path d="M3.2 19c.5-3 2.6-4.8 5.3-4.8s4.8 1.8 5.3 4.8M14.3 14.8c2.2.2 3.9 1.8 4.5 4.2" />
    </svg>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21.5S5 15.4 5 10a7 7 0 1 1 14 0c0 5.4-7 11.5-7 11.5Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3.2 2" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.5 3.5h3l1.5 4-2 1.7a13 13 0 0 0 6.3 6.3l1.7-2 4 1.5v3a2 2 0 0 1-2.1 2C10.3 19.6 4.4 13.7 3.5 5.6a2 2 0 0 1 2-2.1Z" />
    </svg>
  );
}

export function IconChefHat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7 11.5a3.6 3.6 0 0 1 1-7c.4-1.7 1.9-2.8 3.6-2.8.9 0 1.7.3 2.3.9a3.3 3.3 0 0 1 4.6 3c0 .3 0 .6-.1.9a3.3 3.3 0 0 1-.4 6V19H7v-7.5Z" />
      <path d="M7 19h10v2.5H7z" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3 11 15.3 16.2 9" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15.5M14 6l5.5 6-5.5 6" />
    </svg>
  );
}
