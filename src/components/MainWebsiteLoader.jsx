import React, { useState, useEffect, useRef } from 'react';

const MainWebsiteLoader = ({ perfumes = [], onLoaded }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const canvasRef = useRef(null);

  const progressTargetRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    // Preload first 20 perfume bottle images
    const imagesToPreload = perfumes
      .map((p) => p.image)
      .filter(Boolean)
      .slice(0, 20);

    const total = imagesToPreload.length || 1;
    let completedCount = 0;

    const startTime = Date.now();
    const minDisplayDuration = 2700; // Smooth, slow, peaceful luxury fill
    let finishTriggered = false;

    // Smooth baseline progression
    const smoothProgressInterval = setInterval(() => {
      progressTargetRef.current = Math.min(progressTargetRef.current + 1.1, 92);
    }, 40);

    const triggerCompletion = () => {
      if (finishTriggered) return;
      finishTriggered = true;
      clearInterval(smoothProgressInterval);
      progressTargetRef.current = 100;

      // Allow fluid level to fill completely to the shoulder
      const checkFullInterval = setInterval(() => {
        if (currentProgressRef.current >= 98) {
          clearInterval(checkFullInterval);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              if (onLoaded) onLoaded();
            }, 650);
          }, 350);
        }
      }, 40);
    };

    const handleOneAssetLoaded = () => {
      completedCount++;
      const percent = Math.round((completedCount / total) * 100);
      progressTargetRef.current = Math.max(progressTargetRef.current, Math.min(percent, 92));

      if (completedCount >= total) {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minDisplayDuration - elapsed);
        setTimeout(() => {
          triggerCompletion();
        }, remainingTime);
      }
    };

    if (imagesToPreload.length === 0) {
      setTimeout(() => triggerCompletion(), minDisplayDuration);
    } else {
      imagesToPreload.forEach((src) => {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.src = src;
        img.onload = img.onerror = handleOneAssetLoaded;
      });
    }

    const safetyTimeout = setTimeout(() => {
      triggerCompletion();
    }, 4800);

    return () => {
      clearInterval(smoothProgressInterval);
      clearTimeout(safetyTimeout);
    };
  }, [perfumes, onLoaded]);

  // Canvas Realistic Fluid Dynamics (Monochrome / Silver / White)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // High-DPI sharpness scaling
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const logicalWidth = 160;
    const logicalHeight = 220;
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;
    ctx.scale(dpr, dpr);

    let animationFrameId;
    let step = 0;

    // Realistic micro-bubbles inside clear perfume oil
    const bubbles = Array.from({ length: 14 }, () => ({
      x: 48 + Math.random() * 64,
      y: 195 + Math.random() * 20,
      radius: 0.6 + Math.random() * 1.3,
      speed: 0.20 + Math.random() * 0.38,
      wobbleSpeed: 0.04 + Math.random() * 0.03,
      wobbleAmp: 0.4 + Math.random() * 0.7,
      opacity: 0.25 + Math.random() * 0.55
    }));

    const render = () => {
      step += 0.032;

      // Ultra-smooth viscous fluid easing
      const diff = progressTargetRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.026;

      const fillRatio = Math.max(0.04, Math.min(currentProgressRef.current / 100, 1.0));

      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      // Inner chamber geometry (thick glass walls & solid crystal base)
      const chamberLeft = 40;
      const chamberRight = 120;
      const chamberWidth = chamberRight - chamberLeft; // 80px
      const chamberTop = 86;
      const chamberBottom = 196;
      const totalChamberHeight = chamberBottom - chamberTop;
      const liquidLevelY = chamberBottom - (totalChamberHeight * fillRatio);

      // 1. Clip path strictly inside the inner bottle cavity
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(chamberLeft + 6, chamberTop);
      ctx.lineTo(chamberRight - 6, chamberTop);
      ctx.quadraticCurveTo(chamberRight, chamberTop, chamberRight, chamberTop + 6);
      ctx.lineTo(chamberRight, chamberBottom - 10);
      ctx.quadraticCurveTo(chamberRight, chamberBottom, chamberRight - 10, chamberBottom);
      ctx.lineTo(chamberLeft + 10, chamberBottom);
      ctx.quadraticCurveTo(chamberLeft, chamberBottom, chamberLeft, chamberBottom - 10);
      ctx.lineTo(chamberLeft, chamberTop + 6);
      ctx.quadraticCurveTo(chamberLeft, chamberTop, chamberLeft + 6, chamberTop);
      ctx.closePath();
      ctx.clip();

      // 2. Empty inner cavity ambient depth
      const emptyGradient = ctx.createLinearGradient(0, chamberTop, 0, chamberBottom);
      emptyGradient.addColorStop(0, 'rgba(255, 255, 255, 0.012)');
      emptyGradient.addColorStop(1, 'rgba(255, 255, 255, 0.025)');
      ctx.fillStyle = emptyGradient;
      ctx.fill();

      // 3. Fluid Wave Dynamics with Physical Meniscus (Surface tension climbing up glass walls)
      const waveAmplitude = fillRatio >= 0.96 ? 0.30 : Math.max(0.6, (1 - fillRatio) * 2.0);
      const waveFreq = 0.065;

      ctx.beginPath();
      ctx.moveTo(chamberLeft - 5, chamberBottom + 10);
      ctx.lineTo(chamberLeft - 5, liquidLevelY);

      // Draw meniscus and multi-harmonic fluid surface wave
      for (let x = chamberLeft - 4; x <= chamberRight + 4; x += 1.5) {
        // Capillary action: liquid curves upwards near walls
        const distFromLeft = Math.max(0, 14 - (x - chamberLeft));
        const distFromRight = Math.max(0, 14 - (chamberRight - x));
        const meniscusRise = (Math.pow(distFromLeft / 14, 2) + Math.pow(distFromRight / 14, 2)) * 3.6;

        const wave =
          Math.sin(x * waveFreq + step) * waveAmplitude +
          Math.cos(x * 0.032 - step * 0.75) * (waveAmplitude * 0.40) -
          meniscusRise;

        ctx.lineTo(x, liquidLevelY + wave);
      }

      ctx.lineTo(chamberRight + 5, chamberBottom + 10);
      ctx.closePath();

      // 4. Pure Luxury Grey-White / Silver Liquid Extrait Gradient (Theme Matched)
      const liquidGradient = ctx.createLinearGradient(0, liquidLevelY - 4, 0, chamberBottom);
      liquidGradient.addColorStop(0, 'rgba(255, 255, 255, 0.58)');
      liquidGradient.addColorStop(0.18, 'rgba(235, 238, 242, 0.38)');
      liquidGradient.addColorStop(0.55, 'rgba(205, 210, 218, 0.25)');
      liquidGradient.addColorStop(0.85, 'rgba(175, 182, 192, 0.22)');
      liquidGradient.addColorStop(1, 'rgba(150, 158, 168, 0.28)');

      ctx.fillStyle = liquidGradient;
      ctx.fill();

      // 5. Internal Soft Radial Light Bloom (Clean pure white/silver glow)
      const causticX = chamberLeft + chamberWidth * 0.45;
      const causticY = liquidLevelY + (chamberBottom - liquidLevelY) * 0.45;
      const causticRadius = Math.max(16, (chamberBottom - liquidLevelY) * 0.65);
      const causticGlow = ctx.createRadialGradient(
        causticX,
        causticY,
        4,
        causticX,
        causticY,
        causticRadius
      );
      causticGlow.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
      causticGlow.addColorStop(0.5, 'rgba(240, 243, 248, 0.06)');
      causticGlow.addColorStop(1, 'rgba(220, 225, 235, 0)');
      ctx.fillStyle = causticGlow;
      ctx.fillRect(chamberLeft, liquidLevelY, chamberWidth, chamberBottom - liquidLevelY);

      // 6. Liquid Surface Meniscus Highlight (Crisp pure white surface rim)
      ctx.beginPath();
      for (let x = chamberLeft; x <= chamberRight; x += 1.5) {
        const distFromLeft = Math.max(0, 14 - (x - chamberLeft));
        const distFromRight = Math.max(0, 14 - (chamberRight - x));
        const meniscusRise = (Math.pow(distFromLeft / 14, 2) + Math.pow(distFromRight / 14, 2)) * 3.6;

        const wave =
          Math.sin(x * waveFreq + step) * waveAmplitude +
          Math.cos(x * 0.032 - step * 0.75) * (waveAmplitude * 0.40) -
          meniscusRise;

        if (x === chamberLeft) {
          ctx.moveTo(x, liquidLevelY + wave);
        } else {
          ctx.lineTo(x, liquidLevelY + wave);
        }
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 1.6;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.65)';
      ctx.shadowBlur = 4;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Secondary fine silver sheen line
      ctx.beginPath();
      for (let x = chamberLeft + 2; x <= chamberRight - 2; x += 2) {
        const distFromLeft = Math.max(0, 14 - (x - chamberLeft));
        const distFromRight = Math.max(0, 14 - (chamberRight - x));
        const meniscusRise = (Math.pow(distFromLeft / 14, 2) + Math.pow(distFromRight / 14, 2)) * 3.6;
        const wave =
          Math.sin(x * waveFreq + step) * waveAmplitude +
          Math.cos(x * 0.032 - step * 0.75) * (waveAmplitude * 0.40) -
          meniscusRise + 2.0;

        if (x === chamberLeft + 2) {
          ctx.moveTo(x, liquidLevelY + wave);
        } else {
          ctx.lineTo(x, liquidLevelY + wave);
        }
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 0.9;
      ctx.stroke();

      // 7. Pure White Micro-Bubbles
      bubbles.forEach((b) => {
        if (b.y > liquidLevelY + 4 && b.y < chamberBottom - 4) {
          const wobble = Math.sin(b.y * b.wobbleSpeed + step * 2) * b.wobbleAmp;
          ctx.beginPath();
          ctx.arc(b.x + wobble, b.y, b.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity})`;
          ctx.fill();

          if (b.radius > 1.0) {
            ctx.beginPath();
            ctx.arc(b.x + wobble - b.radius * 0.25, b.y - b.radius * 0.25, b.radius * 0.32, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.90)';
            ctx.fill();
          }
        }

        b.y -= b.speed;
        if (b.y <= liquidLevelY + 2) {
          b.y = chamberBottom - 2;
          b.x = chamberLeft + 6 + Math.random() * (chamberWidth - 12);
        }
      });

      // 8. Lateral Internal Glass Reflection Glint (Soft left side sheen)
      const leftGleam = ctx.createLinearGradient(chamberLeft, 0, chamberLeft + 8, 0);
      leftGleam.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
      leftGleam.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = leftGleam;
      ctx.fillRect(chamberLeft, liquidLevelY, 8, chamberBottom - liquidLevelY);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#070707] flex flex-col items-center justify-center select-none transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <style>{`
        @keyframes softPulse {
          0%, 100% {
            opacity: 0.50;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.02);
          }
        }
        @keyframes ambientAura {
          0%, 100% {
            opacity: 0.20;
            transform: scale(0.96);
          }
          50% {
            opacity: 0.38;
            transform: scale(1.04);
          }
        }
        .animate-soft-pulse {
          animation: softPulse 2.8s ease-in-out infinite;
        }
        .animate-ambient-aura {
          animation: ambientAura 4s ease-in-out infinite;
        }
      `}</style>

      {/* Atmospheric Studio Backlight: Clean Monochrome Soft Silver Halo */}
      <div className="absolute w-80 h-80 rounded-full bg-white/[0.035] blur-3xl pointer-events-none animate-ambient-aura" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xs w-full space-y-6">
        {/* Perfume Bottle Assembly with Realistic Fluid Canvas and 3D Crystal Silhouette */}
        <div className="relative w-40 h-56 flex items-center justify-center">
          {/* Layer 1: HTML5 Fluid Simulation Canvas */}
          <canvas
            ref={canvasRef}
            style={{ width: 160, height: 220 }}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          />

          {/* Layer 2: Photorealistic 3D Crystal Glass & Brushed Platinum / Silver Cap SVG Overlay */}
          <svg
            viewBox="0 0 160 220"
            className="absolute inset-0 w-full h-full pointer-events-none z-20 filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Cap Metallic Dark Obsidian / Gunmetal Gradient */}
              <linearGradient id="metallicCap" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0a0a0a" />
                <stop offset="25%" stopColor="#181818" />
                <stop offset="50%" stopColor="#2c2c2c" />
                <stop offset="75%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#0d0d0d" />
              </linearGradient>

              {/* Cap Bevel Top Specular Highlight */}
              <linearGradient id="capBevel" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.25)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
              </linearGradient>

              {/* Dark Gunmetal Spray Collar */}
              <linearGradient id="darkCollar" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#121212" />
                <stop offset="30%" stopColor="#222222" />
                <stop offset="55%" stopColor="#383838" />
                <stop offset="80%" stopColor="#202020" />
                <stop offset="100%" stopColor="#0f0f0f" />
              </linearGradient>

              {/* Thick Crystal Bottom Pedestal Gradient */}
              <linearGradient id="crystalBase" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
                <stop offset="50%" stopColor="rgba(255, 255, 255, 0.16)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.04)" />
              </linearGradient>
            </defs>

            {/* --- 1. Luxury Dark Obsidian / Magnetic Stopper Cap --- */}
            {/* Cap main body */}
            <rect
              x="58"
              y="16"
              width="44"
              height="34"
              rx="3"
              fill="url(#metallicCap)"
              stroke="rgba(255, 255, 255, 0.20)"
              strokeWidth="1.2"
            />
            {/* Cap top specular chamfer */}
            <line
              x1="60"
              y1="18"
              x2="100"
              y2="18"
              stroke="url(#capBevel)"
              strokeWidth="1.2"
            />
            {/* Cap vertical subtle reflection stripe */}
            <rect
              x="77"
              y="17"
              width="5"
              height="32"
              fill="rgba(255, 255, 255, 0.06)"
            />
            {/* Cap bottom subtle metallic ring */}
            <line
              x1="58"
              y1="46"
              x2="102"
              y2="46"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />

            {/* --- 2. Dark Gunmetal Spray Collar --- */}
            <rect
              x="69"
              y="50"
              width="22"
              height="16"
              fill="url(#darkCollar)"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="0.8"
            />

            {/* --- 3. Authentic Snake-Type Dip Tube (Natural smooth curved clear pipe, NO dotted lines) --- */}
            {/* Outer transparent tube body */}
            <path
              d="M80 52 C80.5 75, 77 105, 78 135 C79 162, 83 182, 81 195"
              stroke="rgba(255, 255, 255, 0.40)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Fine inner specular reflection highlight along the pipe */}
            <path
              d="M79.4 52 C79.9 75, 76.4 105, 77.4 135 C78.4 162, 82.4 182, 80.4 195"
              stroke="rgba(255, 255, 255, 0.70)"
              strokeWidth="0.6"
              strokeLinecap="round"
            />

            {/* --- 4. Thick Heavy Solid Crystal Glass Bottom (20px weighted base) --- */}
            <path
              d="M34 196 C34 204 38 212 46 212 H114 C122 212 126 204 126 196 V200 C126 208 120 214 112 214 H48 C40 214 34 208 34 200 Z"
              fill="url(#crystalBase)"
              stroke="rgba(255, 255, 255, 0.30)"
              strokeWidth="1.2"
            />
            {/* Crystal base inner floor reflection curve */}
            <path
              d="M40 196 Q80 200 120 196"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1.3"
            />

            {/* --- 5. Inner Glass Chamber Silhouette (Double glass wall effect) --- */}
            <rect
              x="40"
              y="86"
              width="80"
              height="110"
              rx="8"
              stroke="rgba(255, 255, 255, 0.14)"
              strokeWidth="1"
            />

            {/* --- 6. Outer Glass Flacon Contour (Faceted luxury bevels) --- */}
            <path
              d="M68 66 L48 76 C39 80 32 88 32 98 V194 C32 205 40 214 50 214 H110 C120 214 128 205 128 194 V98 C128 88 121 80 112 76 L92 66 Z"
              stroke="rgba(255, 255, 255, 0.38)"
              strokeWidth="1.6"
            />

            {/* --- 7. Left Rim Light (Photographic Edge Reflection) --- */}
            <path
              d="M34 98 V192 C34 200 38 206 46 208"
              stroke="rgba(255, 255, 255, 0.48)"
              strokeWidth="1.2"
            />

            {/* --- 8. Right Shoulder Subtle Reflection --- */}
            <path
              d="M126 98 L112 78"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.0"
            />
          </svg>
        </div>

        {/* Minimal Luxury Typography */}
        <div className="space-y-1.5 pt-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-white">
            Kushal's Collection
          </h2>
          <p className="text-[11px] text-neutral-400 font-normal tracking-wide animate-soft-pulse">
            Loading fine fragrances...
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainWebsiteLoader;


