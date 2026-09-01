"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function Hero3DCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth || 500);
    let height = (canvas.height = canvas.offsetHeight || 500);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth || 500;
      height = canvas.height = canvas.offsetHeight || 500;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // 3D Icosahedron Core Vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: [number, number, number][] = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    const vertices = rawVertices.map(([x, y, z]) => {
      const len = Math.sqrt(x * x + y * y + z * z);
      return [x / len, y / len, z / len] as [number, number, number];
    });

    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i][0] - vertices[j][0];
        const dy = vertices[i][1] - vertices[j][1];
        const dz = vertices[i][2] - vertices[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.15) {
          edges.push([i, j]);
        }
      }
    }

    // Outer Dual Orbit Ring Points
    const orbitCount = 32;
    const orbitRadius = 1.45;
    const orbitPoints: [number, number, number][] = [];
    for (let i = 0; i < orbitCount; i++) {
      const theta = (i / orbitCount) * Math.PI * 2;
      orbitPoints.push([
        Math.cos(theta) * orbitRadius,
        Math.sin(theta) * orbitRadius * 0.35,
        Math.sin(theta) * orbitRadius * 0.85,
      ]);
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetMouseX = (e.clientX - cx) / (rect.width / 2);
      targetMouseY = (e.clientY - cy) / (rect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let angleX = 0.3;
    let angleY = 0.4;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Inertial spring smoothing
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      if (!prefersReducedMotion) {
        angleX += 0.004 + mouseY * 0.008;
        angleY += 0.006 + mouseX * 0.008;
      }

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const radius = Math.min(width, height) * 0.36;
      const centerX = width / 2;
      const centerY = height / 2;

      // Project core icosahedron vertices
      const projected: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < vertices.length; i++) {
        let [vx, vy, vz] = vertices[i];

        let x1 = vx * cosY - vz * sinY;
        let z1 = vx * sinY + vz * cosY;

        let y2 = vy * cosX - z1 * sinX;
        let z2 = vy * sinX + z1 * cosX;

        const distance = 2.2;
        const fov = 1 / (distance - z2 * 0.4);
        const px = centerX + x1 * radius * fov;
        const py = centerY + y2 * radius * fov;

        projected.push({ x: px, y: py, z: z2 });
      }

      // Draw Edges with high-contrast emerald & cyan gradients
      for (const [i, j] of edges) {
        const v1 = projected[i];
        const v2 = projected[j];
        const avgZ = (v1.z + v2.z) / 2;
        const alpha = Math.max(0.15, Math.min(0.85, (avgZ + 1) / 2));

        const gradient = ctx.createLinearGradient(v1.x, v1.y, v2.x, v2.y);
        gradient.addColorStop(0, `rgba(16, 185, 129, ${alpha})`); // Emerald
        gradient.addColorStop(1, `rgba(56, 189, 248, ${alpha})`); // Cyan

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(v1.x, v1.y);
        ctx.lineTo(v2.x, v2.y);
        ctx.stroke();
      }

      // Draw Vertices
      for (const p of projected) {
        const alpha = Math.max(0.3, Math.min(1.0, (p.z + 1) / 2));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2 * alpha, 0, Math.PI * 2);
        ctx.fill();

        // Inner core glow
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(16, 185, 129, 0.8)";
      }
      ctx.shadowBlur = 0; // reset

      // Project and draw outer dual orbit ring
      const orbitProjected: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i < orbitPoints.length; i++) {
        let [vx, vy, vz] = orbitPoints[i];
        let x1 = vx * Math.cos(angleY * 0.7) - vz * Math.sin(angleY * 0.7);
        let z1 = vx * Math.sin(angleY * 0.7) + vz * Math.cos(angleY * 0.7);
        let y2 = vy * Math.cos(angleX * 0.7) - z1 * Math.sin(angleX * 0.7);
        let z2 = vy * Math.sin(angleX * 0.7) + z1 * Math.cos(angleX * 0.7);

        const distance = 2.2;
        const fov = 1 / (distance - z2 * 0.4);
        const px = centerX + x1 * radius * fov;
        const py = centerY + y2 * radius * fov;
        orbitProjected.push({ x: px, y: py, z: z2 });
      }

      ctx.lineWidth = 1.0;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.4)"; // Purple orbit ring
      ctx.beginPath();
      for (let i = 0; i < orbitProjected.length; i++) {
        const p = orbitProjected[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] lg:w-[560px] lg:h-[560px] opacity-90 transition-opacity duration-500 hover:opacity-100"
      />
    </div>
  );
}

