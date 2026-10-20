import React, { useEffect, useRef } from 'react';
import { HomeIcon } from 'lucide-animated';

/**
 * NotFoundPage - Clean, Minimal Luxury 404 Fragrance Evaporated Page
 * 
 * - Minimal, elegant, uncluttered design.
 * - Compact canvas with broken crystal flacon & delicate evaporating scent vapor.
 * - Single direct "Return to Collection" button.
 */
const NotFoundPage = ({ onReturnHome }) => {
  const canvasRef = useRef(null);

  // Compact, smooth scent evaporation canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = 240;
    const height = 180;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId;
    let step = 0;

    // Delicate rising vapor particles
    const particles = Array.from({ length: 28 }, () => ({
      x: 120 + (Math.random() - 0.5) * 36,
      y: 110 + Math.random() * 50,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.5 - Math.random() * 0.65,
      radius: 1.0 + Math.random() * 2.2,
      maxRadius: 3.5 + Math.random() * 4.0,
      alpha: 0.15 + Math.random() * 0.45,
      life: Math.random() * 80,
      maxLife: 80 + Math.random() * 50
    }));

    const render = () => {
      step += 0.03;
      ctx.clearRect(0, 0, width, height);

      // 1. Broken Crystal Flacon Silhouette
      ctx.save();
      ctx.lineWidth = 1.3;
      ctx.lineJoin = 'round';

      // Thick Base
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.strokeRect(96, 150, 48, 10);

      // Bottle Left Half (Intact)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.30)';
      ctx.beginPath();
      ctx.moveTo(112, 92);
      ctx.lineTo(100, 100);
      ctx.quadraticCurveTo(92, 108, 92, 118);
      ctx.lineTo(92, 150);
      ctx.stroke();

      // Bottle Right Half (Fractured / Broken edge)
      ctx.beginPath();
      ctx.moveTo(128, 92);
      ctx.lineTo(140, 100);
      ctx.quadraticCurveTo(148, 108, 148, 118);
      ctx.lineTo(148, 134);
      ctx.lineTo(143, 140);
      ctx.lineTo(148, 145);
      ctx.lineTo(148, 150);
      ctx.stroke();

      // Dislodged/Tilted Cap
      ctx.save();
      ctx.translate(116, 75);
      ctx.rotate(-0.16);
      ctx.fillStyle = '#141414';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.roundRect(-12, -10, 24, 18, 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Crack lines
      const crackPulse = 0.35 + Math.sin(step * 2) * 0.15;
      ctx.strokeStyle = `rgba(255, 255, 255, ${crackPulse})`;
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(114, 94);
      ctx.lineTo(110, 112);
      ctx.lineTo(122, 126);
      ctx.lineTo(118, 138);
      ctx.lineTo(130, 150);
      ctx.stroke();

      // Small shards on floor
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.fillRect(86, 158, 4, 2);
      ctx.fillRect(152, 157, 5, 2.5);
      ctx.fillRect(142, 160, 3, 2);

      // 2. Rising Evaporating Scent Vapor Particles
      particles.forEach((p) => {
        p.life++;
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.04 + step) * 0.3;

        const progress = p.life / p.maxLife;
        const currentRadius = p.radius + (p.maxRadius - p.radius) * progress;
        const currentAlpha = p.alpha * Math.sin(progress * Math.PI);

        if (currentAlpha > 0.01) {
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
          grad.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha * 0.85})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        if (p.life >= p.maxLife || p.y < 15) {
          p.life = 0;
          p.x = 118 + (Math.random() - 0.5) * 30;
          p.y = 105 + Math.random() * 45;
          p.radius = 1.0 + Math.random() * 1.8;
          p.alpha = 0.15 + Math.random() * 0.40;
        }
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-8 text-center animate-fade-in select-none">
      {/* Compact Canvas Visual */}
      <div className="relative w-[240px] h-[170px] flex items-center justify-center mb-2">
        <canvas
          ref={canvasRef}
          style={{ width: 240, height: 180 }}
          className="pointer-events-none"
        />
      </div>

      {/* Typography: Clean, Minimal, Impactful */}
      <div className="space-y-2 max-w-sm mx-auto">
        <h1 className="text-5xl sm:text-6xl font-light tracking-tight text-white font-serif">
          404
        </h1>
        <h2 className="text-base sm:text-lg font-medium text-neutral-200 tracking-tight">
          Fragrance Evaporated
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
          The requested perfume page or link was broken and has evaporated into thin air.
        </p>
      </div>

      {/* Single Clean Action Button */}
      <div className="mt-8 w-full max-w-xs">
        <button
          onClick={onReturnHome}
          className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl active:scale-95 group"
        >
          <HomeIcon size={16} animateOnHover={true} />
          <span>Return to Collection</span>
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
