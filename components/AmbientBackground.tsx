"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let particles: Particle[] = [];
    let animationId = 0;
    let isNight = theme === "night";

    const particleCount = window.innerWidth < 768 ? 26 : 48;

    function makeParticle(): Particle {
      const maxLife = 600 + Math.random() * 600;
      return {
        x: Math.random() * width,
        y: isNight ? height + Math.random() * 100 : Math.random() * height,
        r: isNight ? 1 + Math.random() * 2.4 : 1 + Math.random() * 2,
        speed: isNight ? 0.3 + Math.random() * 0.7 : 0.08 + Math.random() * 0.18,
        drift: (Math.random() - 0.5) * 0.6,
        opacity: 0.15 + Math.random() * 0.5,
        hue: isNight ? 18 + Math.random() * 24 : 38 + Math.random() * 18,
        life: Math.random() * maxLife,
        maxLife,
      };
    }

    function init() {
      particles = Array.from({ length: particleCount }, makeParticle);
    }
    init();

    function resize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);

    function drawGlow() {
      if (!ctx) return;
      if (isNight) {
        // Warm oven glow rising from the bottom
        const glow = ctx.createRadialGradient(
          width * 0.5,
          height * 1.05,
          0,
          width * 0.5,
          height * 1.05,
          width * 0.75
        );
        glow.addColorStop(0, "rgba(232, 93, 44, 0.18)");
        glow.addColorStop(1, "rgba(232, 93, 44, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Soft daylight wash from the top
        const glow = ctx.createRadialGradient(
          width * 0.5,
          -height * 0.1,
          0,
          width * 0.5,
          -height * 0.1,
          width * 0.9
        );
        glow.addColorStop(0, "rgba(217, 154, 63, 0.16)");
        glow.addColorStop(1, "rgba(217, 154, 63, 0)");
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);
      }
    }

    function tick() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawGlow();

      for (const p of particles) {
        p.life += 1;
        p.x += p.drift;
        p.y += isNight ? -p.speed : p.speed * 0.6;

        if (isNight) {
          // embers flicker
          const flicker = 0.5 + 0.5 * Math.sin(p.life * 0.05);
          ctx.beginPath();
          ctx.fillStyle = `hsla(${p.hue}, 85%, 60%, ${p.opacity * flicker})`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // flour dust, gentle
          ctx.beginPath();
          ctx.fillStyle = `hsla(${p.hue}, 70%, 85%, ${p.opacity * 0.6})`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }

        const offscreen =
          p.y < -20 || p.y > height + 20 || p.life > p.maxLife;
        if (offscreen) {
          const fresh = makeParticle();
          p.x = fresh.x;
          p.y = isNight ? height + 10 : -10;
          p.r = fresh.r;
          p.speed = fresh.speed;
          p.drift = fresh.drift;
          p.opacity = fresh.opacity;
          p.hue = fresh.hue;
          p.life = 0;
          p.maxLife = fresh.maxLife;
        }
      }

      animationId = requestAnimationFrame(tick);
    }

    if (!prefersReducedMotion) {
      tick();
    } else {
      drawGlow();
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
