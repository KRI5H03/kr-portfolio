"use client";

import { useEffect, useRef } from "react";

export default function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Grid settings
    const gridSize = 50;
    const dotRadius = 3.5;
    const maxDistance = 60;
    let mouseX = -1000;
    let mouseY = -1000;

    // Get accent color from CSS variable (emerald-400)
    const accentColor =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "16, 185, 129";

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    // Create dots
    const dots: { x: number; y: number; baseX: number; baseY: number }[] = [];
    const cols = Math.ceil(canvas.offsetWidth / gridSize);
    const rows = Math.ceil(canvas.offsetHeight / gridSize);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * gridSize + gridSize / 2;
        const y = row * gridSize + gridSize / 2;
        dots.push({ x, y, baseX: x, baseY: y });
      }
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (so dots appear on top)
      dots.forEach((dot, i) => {
        dots.forEach((otherDot, j) => {
          if (j <= i) return;

          const dx = otherDot.x - dot.x;
          const dy = otherDot.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < gridSize * 1.8) {
            const opacity = (1 - dist / (gridSize * 1.8)) * 0.15;
            ctx.strokeStyle = `rgba(${accentColor}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(otherDot.x, otherDot.y);
            ctx.stroke();
          }
        });
      });

      // Update and draw dots
      dots.forEach((dot) => {
        // Calculate distance from mouse
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Apply mouse repulsion
        if (distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          dot.x -= Math.cos(angle) * force * 15;
          dot.y -= Math.sin(angle) * force * 15;
        }

        // Spring back to original position
        const dx2 = dot.baseX - dot.x;
        const dy2 = dot.baseY - dot.y;
        dot.x += dx2 * 0.05;
        dot.y += dy2 * 0.05;

        // Calculate opacity based on mouse distance
        const opacity =
          distance < maxDistance
            ? 0.4 + (1 - distance / maxDistance) * 0.6
            : 0.4;

        // Draw dot
        ctx.fillStyle = `rgba(${accentColor}, ${opacity})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ background: "transparent" }}
    />
  );
}
