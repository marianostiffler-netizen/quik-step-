"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  w: number; h: number;
  opacity: number;
  color: string;
  rotation: number;
  rotSpeed: number;
}

// Paleta cálida: aserrín y polvo de madera iluminados lateralmente
const PALETTE = ["#C8956A", "#B07840", "#F0C080", "#8B5E3C", "#D4965A", "#E8B060", "#A0693A"];

function makeParticle(canvas: HTMLCanvasElement, atBottom = false): Particle {
  return {
    x: Math.random() * canvas.width,
    y: atBottom ? canvas.height + 8 : Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.22,
    vy: -(Math.random() * 0.38 + 0.10),
    w: Math.random() * 3.5 + 1.2,
    h: Math.random() * 1.4 + 0.4,
    opacity: Math.random() * 0.48 + 0.06,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    rotation: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.016,
  };
}

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];

    const onResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      // Repoblar si el resize vacía el canvas
      if (particles.length === 0) {
        for (let i = 0; i < 150; i++) particles.push(makeParticle(canvas, false));
      }
    };

    onResize();
    for (let i = 0; i < 150; i++) particles.push(makeParticle(canvas, false));

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        // Elipse elongada — simula viruta/polvo de madera
        ctx.beginPath();
        ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Física: deriva suave + oscilación sinusoidal lateral
        p.x += p.vx + Math.sin(p.y * 0.009 + p.rotation) * 0.06;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Opacidad: respira sutilmente
        p.opacity += (Math.random() - 0.5) * 0.007;
        p.opacity = Math.max(0.04, Math.min(0.62, p.opacity));

        if (p.y < -10) Object.assign(p, makeParticle(canvas, true));
      }

      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      particles = [];
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  );
}
