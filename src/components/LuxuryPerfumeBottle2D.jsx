import React, { useState, useRef, useEffect } from 'react';

const LuxuryPerfumeBottle2D = ({
  oilPercent = 18,
  alcoholPercent = 82,
  concentrationCode = 'EDP',
  isAttar = false
}) => {
  // Common states
  const [sprayDepletion, setSprayDepletion] = useState(0);

  // Spray Perfume States (EDC, EDT, EDP, PP, Extrait)
  const [capOpen, setCapOpen] = useState(false);
  const [sprayCount, setSprayCount] = useState(0);
  const [isSpraying, setIsSpraying] = useState(false);
  const [isMixing, setIsMixing] = useState(false);
  const [particles, setParticles] = useState([]);
  const animFrameRef = useRef(null);

  // Attar Tola Wand States
  const [wandLifted, setWandLifted] = useState(false);
  const [dabCount, setDabCount] = useState(0);
  const [isDabbing, setIsDabbing] = useState(false);

  // 1. Web Audio Aerosol Mist Hiss (for Spray Perfumes)
  const playAtomizerSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const duration = 0.20;
      const bufferSize = Math.floor(ctx.sampleRate * duration);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2800;
      filter.Q.value = 1.1;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + duration + 0.01);
    } catch {
      // AudioContext unavailable
    }
  };

  // 2. Web Audio Warm Harmonic Chime (for Pure Attar Oil Dab)
  const playDabSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.32);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.36);
    } catch {
      // AudioContext unavailable
    }
  };

  // Spray Perfume: Cap Toggle & Mixing
  const handleToggleCap = () => {
    const willOpen = !capOpen;
    setCapOpen(willOpen);
    if (willOpen) {
      setIsMixing(true);
      setTimeout(() => setIsMixing(false), 1600);
    }
  };

  const triggerSpray = () => {
    if (!capOpen) {
      setCapOpen(true);
      setIsMixing(true);
      setTimeout(() => {
        executeSprayAction();
      }, 350);
    } else {
      setIsMixing(true);
      executeSprayAction();
    }
  };

  const executeSprayAction = () => {
    setIsSpraying(true);
    playAtomizerSound();
    setSprayCount((prev) => prev + 1);
    setSprayDepletion((prev) => Math.min(prev + 1.8, 38));

    setTimeout(() => {
      setIsSpraying(false);
    }, 180);

    setTimeout(() => {
      setIsMixing(false);
    }, 1400);

    const newParticles = [];
    for (let i = 0; i < 32; i++) {
      const angle = -0.32 + (Math.random() - 0.45) * 0.65;
      const speed = 2.6 + Math.random() * 5.0;
      newParticles.push({
        id: Math.random() + Date.now(),
        x: 107,
        y: 56,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.2 + Math.random() * 2.2,
        alpha: 0.85 + Math.random() * 0.15,
        decay: 0.020 + Math.random() * 0.02
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  };

  // Attar Dabber Actions
  const handleToggleWand = () => {
    setWandLifted((prev) => !prev);
  };

  const triggerDab = () => {
    if (!wandLifted) {
      setWandLifted(true);
      setTimeout(() => {
        executeDabAction();
      }, 350);
    } else {
      executeDabAction();
    }
  };

  const executeDabAction = () => {
    setIsDabbing(true);
    playDabSound();
    setDabCount((prev) => prev + 1);
    setSprayDepletion((prev) => Math.min(prev + 0.4, 30));

    setTimeout(() => {
      setIsDabbing(false);
    }, 700);
  };

  // Particle Physics Animation Loop for Spray Mist
  useEffect(() => {
    if (particles.length === 0) return;

    const updateParticles = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx * 0.94,
            vy: p.vy * 0.94 + 0.04,
            radius: p.radius + 0.12,
            alpha: p.alpha - p.decay
          }))
          .filter((p) => p.alpha > 0.02 && p.x < 240 && p.y > 0)
      );
      animFrameRef.current = requestAnimationFrame(updateParticles);
    };

    animFrameRef.current = requestAnimationFrame(updateParticles);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [particles]);

  // Dimension Calculations
  const chamberTop = 106;
  const chamberBottom = 236;
  const liquidMaxTop = chamberTop + 20 + sprayDepletion;
  const totalLiquidH = Math.max(10, chamberBottom - liquidMaxTop);

  const safeOilRatio = Math.max(0.02, Math.min(oilPercent / 100, 1.0));
  const oilHeight = totalLiquidH * safeOilRatio;
  const oilY = chamberBottom - oilHeight;
  const alcoholHeight = Math.max(0, oilY - liquidMaxTop);

  // Organic Fluid Meniscus Shapes (Natural curvature, NO sharp rectangular cutoffs)
  const topFluidCurve = `M 48 ${liquidMaxTop} Q 100 ${liquidMaxTop + 3.2} 152 ${liquidMaxTop} V ${chamberBottom} H 48 Z`;
  const oilFluidCurve = `M 48 ${oilY} Q 100 ${oilY + 3.0} 152 ${oilY} V ${chamberBottom} H 48 Z`;
  const alcoholFluidCurve = `M 48 ${liquidMaxTop} Q 100 ${liquidMaxTop + 3.2} 152 ${liquidMaxTop} V ${oilY} Q 100 ${oilY + 3.0} 48 ${oilY} Z`;

  const getBlendedColor = () => {
    switch (concentrationCode) {
      case 'EDC':
        return 'rgba(253, 224, 71, 0.30)';
      case 'EDT':
        return 'rgba(245, 158, 11, 0.40)';
      case 'EDP':
        return 'rgba(234, 150, 16, 0.52)';
      case 'PP':
        return 'rgba(217, 119, 6, 0.62)';
      case 'Extrait':
        return 'rgba(180, 83, 9, 0.72)';
      default:
        return 'rgba(234, 150, 16, 0.52)';
    }
  };

  // =========================================================================
  // RENDER 1: TRADITIONAL LUXURY CRYSTAL ATTAR / ITTAR TOLA FLACON
  // =========================================================================
  if (isAttar) {
    const attarTop = Math.min(218, 134 + sprayDepletion * 1.5);
    const attarFluidCurve = `M 80 ${attarTop} Q 100 ${attarTop + 2.5} 120 ${attarTop} V 224 H 80 Z`;

    return (
      <div className="flex flex-col items-center select-none w-full max-w-xs">
        {/* Slender Royal Crystal Attar Tola Flacon (Authentic 1-Tola Miniature Scale) */}
        <div
          onClick={triggerDab}
          className="relative w-[210px] h-[270px] cursor-pointer flex items-center justify-center filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] group"
          title="Click to dab pure concentrated attar oil on pulse points"
        >
          <svg
            viewBox="0 0 200 270"
            className="w-full h-full overflow-hidden"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="attarPureOil" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="25%" stopColor="#f59e0b" />
                <stop offset="60%" stopColor="#d97706" />
                <stop offset="85%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              <linearGradient id="attarGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="18%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="82%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>

              <linearGradient id="crystalFacet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.50)" />
                <stop offset="25%" stopColor="rgba(220, 240, 255, 0.22)" />
                <stop offset="50%" stopColor="rgba(254, 240, 138, 0.40)" />
                <stop offset="75%" stopColor="rgba(255, 255, 255, 0.18)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.45)" />
              </linearGradient>

              <clipPath id="attarChamberClip">
                <path d="M 80 134 C 80 125, 120 125, 120 134 V 214 C 120 224, 80 224, 80 214 Z" />
              </clipPath>
            </defs>

            {/* 1. SOLID CRYSTAL PEDESTAL BASE */}
            <path
              d="M 72 242 H 128 L 124 234 H 76 Z"
              fill="rgba(255, 255, 255, 0.08)"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.2"
            />
            <line x1="78" y1="238" x2="122" y2="238" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" />

            {/* 2. SLENDER FLUTED CRYSTAL TOLA FLACON OUTLINE */}
            <path
              d="M 87 114 L 72 132 V 222 L 76 234 H 124 L 128 222 V 132 L 113 114 Z"
              fill="#000000"
              stroke="rgba(255, 255, 255, 0.38)"
              strokeWidth="1.5"
            />

            {/* Crystal Facet Bevel Lines (Jewel Cut Refraction) */}
            <path
              d="M 82 128 V 226 M 118 128 V 226"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="1.0"
            />
            <path
              d="M 72 132 L 82 138 M 128 132 L 118 138"
              stroke="rgba(255, 255, 255, 0.25)"
              strokeWidth="1.0"
            />
            <path
              d="M 72 222 L 82 226 M 128 222 L 118 226"
              stroke="rgba(255, 255, 255, 0.20)"
              strokeWidth="0.8"
            />

            {/* 3. 100% PURE BOTANICAL OIL CAVITY (Inner Teardrop Sanctuary) */}
            <g clipPath="url(#attarChamberClip)">
              {/* Inner Cavity Backdrop */}
              <rect x="78" y="124" width="44" height="102" fill="rgba(255, 255, 255, 0.04)" />

              {/* Viscous Botanical Oil with Liquid Meniscus */}
              <path
                d={attarFluidCurve}
                fill="url(#attarPureOil)"
                className="transition-all duration-300 ease-out"
              />

              {/* Internal Viscous Sheen Reflection */}
              <rect
                x="82"
                y={attarTop}
                width="6"
                height={Math.max(8, 224 - attarTop)}
                fill="rgba(254, 240, 138, 0.30)"
              />

              {/* Natural Fluid Surface Meniscus Curves */}
              <path
                d={`M 80 ${attarTop} Q 100 ${attarTop + 2.5} 120 ${attarTop}`}
                stroke="#fef08a"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M 82 ${attarTop + 1.0} Q 100 ${attarTop + 3.2} 118 ${attarTop + 1.0}`}
                stroke="#d97706"
                strokeWidth="0.8"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Inner Glass Contour Stroke */}
            <path
              d="M 80 134 C 80 125, 120 125, 120 134 V 214 C 120 224, 80 224, 80 214 Z"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1.0"
              fill="none"
            />

            {/* Specular Edge Glow on Exterior Glass */}
            <line x1="74" y1="138" x2="74" y2="216" stroke="rgba(255, 255, 255, 0.40)" strokeWidth="0.9" />

            {/* 4. ORNATE ROYAL GOLD NECK & COLLAR */}
            <rect
              x="87"
              y="98"
              width="26"
              height="16"
              rx="1.5"
              fill="url(#attarGold)"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="0.8"
            />
            <line x1="87" y1="102" x2="113" y2="102" stroke="#78350f" strokeWidth="0.9" />
            <line x1="87" y1="106" x2="113" y2="106" stroke="#fef08a" strokeWidth="0.9" />
            <line x1="87" y1="110" x2="113" y2="110" stroke="#78350f" strokeWidth="0.9" />

            {/* 5. CRYSTAL JEWEL STOPPER & GLASS APPLICATOR WAND (DABBER) */}
            <g
              onClick={(e) => {
                e.stopPropagation();
                handleToggleWand();
              }}
              className="cursor-pointer transition-all duration-500 ease-out hover:brightness-125"
              style={{
                transform: wandLifted
                  ? 'translate(22px, -26px) rotate(12deg)'
                  : 'translate(0px, 0px)',
                transformOrigin: '100px 96px'
              }}
              title={wandLifted ? 'Click to insert applicator wand' : 'Click to lift applicator wand'}
            >
              {/* Slender Glass Applicator Dip-Rod */}
              <rect
                x="98.8"
                y="98"
                width="2.4"
                height="116"
                rx="1"
                fill="rgba(255, 255, 255, 0.65)"
                stroke="rgba(255, 255, 255, 0.85)"
                strokeWidth="0.4"
              />
              <line
                x1="99.5"
                y1="100"
                x2="99.5"
                y2="212"
                stroke="#ffffff"
                strokeWidth="0.6"
              />
              {/* Rounded Glass Applicator Tip Bulb */}
              <circle
                cx="100"
                cy="215"
                r="3.0"
                fill="rgba(255, 255, 255, 0.85)"
                stroke="#fef08a"
                strokeWidth="0.8"
              />

              {/* Suspended Glistening Droplet of Pure Attar Oil */}
              {wandLifted && (
                <g className={isDabbing ? 'animate-bounce' : 'animate-pulse'}>
                  <path
                    d="M 100 216 C 97 221, 97 225, 100 227 C 103 225, 103 221, 100 216 Z"
                    fill="#fef08a"
                    stroke="#d97706"
                    strokeWidth="0.8"
                  />
                  <circle cx="99.2" cy="223" r="0.8" fill="#ffffff" />
                </g>
              )}

              {/* Gold Ferrule Base */}
              <rect
                x="91"
                y="90"
                width="18"
                height="8"
                rx="1"
                fill="url(#attarGold)"
                stroke="rgba(255, 255, 255, 0.40)"
                strokeWidth="0.8"
              />

              {/* Faceted Crystal Jewel Spire Crown Stopper */}
              <path
                d="M 100 52 L 110 68 L 107 90 H 93 L 90 68 Z"
                fill="url(#crystalFacet)"
                stroke="rgba(255, 255, 255, 0.60)"
                strokeWidth="1.2"
              />
              {/* Facet Refraction Cuts */}
              <line x1="100" y1="52" x2="100" y2="90" stroke="rgba(255, 255, 255, 0.75)" strokeWidth="0.9" />
              <line x1="100" y1="68" x2="93" y2="90" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
              <line x1="100" y1="68" x2="107" y2="90" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />
              {/* Jewel Finial Tip Gem */}
              <circle cx="100" cy="52" r="2.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.7" />
            </g>

            {/* Tactile Dab Pulse Aura when applied */}
            {isDabbing && (
              <g className="animate-ping" style={{ transformOrigin: '136px 148px' }}>
                <circle cx="136" cy="148" r="12" fill="none" stroke="#fef08a" strokeWidth="1.8" />
                <circle cx="136" cy="148" r="5" fill="#f59e0b" opacity="0.6" />
              </g>
            )}
          </svg>
        </div>

        {/* Traditional Attar Atelier Controls */}
        <div className="flex flex-col items-center gap-3 pt-1 w-full px-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleWand}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition active:scale-95 ${
                wandLifted
                  ? 'bg-amber-400 text-black border-amber-300 shadow-md shadow-amber-400/20'
                  : 'bg-black hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
              }`}
            >
              {wandLifted ? 'Insert Wand' : 'Lift Applicator Wand'}
            </button>

            <button
              onClick={triggerDab}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-black hover:bg-white/10 active:scale-95 border border-amber-400/30 hover:border-amber-400 text-xs font-semibold text-amber-300 hover:text-white transition shadow-lg group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
              <span>Dab on Skin</span>
              {dabCount > 0 && (
                <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-[10px] text-amber-300 font-mono font-bold">
                  {dabCount}x
                </span>
              )}
            </button>

            {sprayDepletion > 0 && (
              <button
                onClick={() => setSprayDepletion(0)}
                className="px-2.5 py-1.5 rounded-xl bg-black hover:bg-white/10 text-xs font-mono text-neutral-400 hover:text-white border border-white/10 transition active:scale-95"
                title="Refill to full 1 Tola capacity"
              >
                ↺ Refill
              </button>
            )}
          </div>

          <div className="flex flex-col items-center gap-1.5 pt-1 w-full max-w-[220px]">
            <div className="w-full h-1 bg-black rounded-full overflow-hidden flex border border-white/10">
              <div className="w-full h-full bg-amber-400 shadow-sm" />
            </div>
            <div className="flex items-center justify-between w-full text-[10px] uppercase font-mono tracking-wider text-neutral-400">
              <span className="text-amber-400 font-semibold mx-auto tracking-wider">
                100% Pure Botanical Oil · Alcohol-Free
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER 2: WESTERN LUXURY SPRAY FLACON (EDC, EDT, EDP, PP, EXTRAIT)
  // =========================================================================
  return (
    <div className="flex flex-col items-center select-none w-full max-w-sm">
      {/* 2D Luxury Spray Flacon Atelier Visualizer */}
      <div
        onClick={triggerSpray}
        className="relative w-[280px] h-[330px] cursor-pointer flex items-center justify-center filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] group"
        title="Click to spray fine fragrance mist"
      >
        <svg
          viewBox="0 0 240 280"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Dark Obsidian Cap Gradient */}
            <linearGradient id="obsidianCap" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a0a0d" />
              <stop offset="25%" stopColor="#1e1e24" />
              <stop offset="50%" stopColor="#383842" />
              <stop offset="53%" stopColor="#7a7a8c" />
              <stop offset="65%" stopColor="#282830" />
              <stop offset="100%" stopColor="#08080a" />
            </linearGradient>

            {/* Polished Gold Gradient */}
            <linearGradient id="goldPolish" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="25%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="75%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>

            {/* Heavy Crystal Glass Pedestal Base */}
            <linearGradient id="crystalPedestal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.08)" />
              <stop offset="40%" stopColor="rgba(255, 255, 255, 0.18)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.04)" />
            </linearGradient>

            {/* Clip Path for Liquids Inside Glass Chamber */}
            <clipPath id="chamberClip">
              <rect x="48" y="106" width="104" height="130" rx="10" />
            </clipPath>
          </defs>

          {/* 1. OUTER FLACON BACKDROP & GLASS OUTLINE */}
          <path
            d="M86 86 L64 96 C52 101 42 111 42 124 V238 C42 251 52 261 65 261 H135 C148 261 158 251 158 238 V124 C158 111 148 101 136 96 L114 86 Z"
            fill="#000000"
            stroke="rgba(255, 255, 255, 0.32)"
            strokeWidth="1.6"
          />

          {/* 2. LIQUID SYSTEM (Organic Fluid Surface & Natural Diffusion Mixing) */}
          <g clipPath="url(#chamberClip)">
            {/* Clean, Crystal Clear Chamber Ambient Glass */}
            <rect
              x="48"
              y="106"
              width="104"
              height="130"
              fill="rgba(255, 255, 255, 0.02)"
            />

            {/* 2A. UNIFIED BLENDED PERFUME LIQUID (Active when Cap is Open) */}
            <path
              d={topFluidCurve}
              fill={getBlendedColor()}
              style={{
                opacity: capOpen ? 1 : 0,
                transition: 'opacity 0.7s ease-in-out'
              }}
            />

            {/* 2B. SEPARATED STATE (Active when Cap is Closed) */}
            {alcoholPercent > 0 && alcoholHeight > 2 && (
              <g
                style={{
                  opacity: capOpen ? 0 : 1,
                  transition: 'opacity 0.7s ease-in-out'
                }}
              >
                {/* Clear Alcohol Carrier Body */}
                <path
                  d={alcoholFluidCurve}
                  fill="rgba(255, 255, 255, 0.06)"
                  className="transition-all duration-300 ease-out"
                />
              </g>
            )}

            {/* Pure Fragrance Essential Oil Layer (Naturally Expands Upward when Mixed) */}
            <path
              d={capOpen ? topFluidCurve : oilFluidCurve}
              fill="#f59e0b"
              style={{
                opacity: capOpen ? 0 : 1,
                transition: 'opacity 0.7s ease-in-out, d 0.7s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            />

            {/* Interface Meniscus between Separated Oil and Alcohol (Curved, NOT Sharp Straight Line) */}
            {alcoholPercent > 0 && (
              <path
                d={`M 48 ${oilY} Q 100 ${oilY + 3.0} 152 ${oilY}`}
                stroke="#fef08a"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                style={{
                  opacity: capOpen ? 0 : 1,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              />
            )}



            {/* Top Liquid Meniscus (Natural Curved Surface Tension, NO Sharp Straight Line) */}
            <path
              d={`M 48 ${liquidMaxTop} Q 100 ${liquidMaxTop + 3.2} 152 ${liquidMaxTop}`}
              stroke={capOpen ? '#fef08a' : 'rgba(255, 255, 255, 0.55)'}
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              className="transition-colors duration-500"
            />
            <path
              d={`M 52 ${liquidMaxTop + 1.2} Q 100 ${liquidMaxTop + 4.2} 148 ${liquidMaxTop + 1.2}`}
              stroke={capOpen ? '#d97706' : 'rgba(255, 255, 255, 0.20)'}
              strokeWidth="0.8"
              strokeLinecap="round"
              fill="none"
              className="transition-colors duration-500"
            />

            {/* 2C. GLASS DIP TUBE */}
            <path
              d="M100 86 C105 130, 95 185, 102 232"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="2.0"
              strokeLinecap="round"
            />
            <path
              d="M99.3 86 C104.3 130, 94.3 185, 101.3 232"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="0.6"
              strokeLinecap="round"
            />

            {/* Internal Glass Reflection Sheen on Left Edge */}
            <rect
              x="48"
              y="106"
              width="6"
              height="130"
              fill="rgba(255, 255, 255, 0.06)"
            />
          </g>

          {/* 3. SOLID CRYSTAL BASE & STUDIO REFLECTIONS */}
          <path
            d="M44 236 C44 246 48 259 60 259 H140 C152 259 156 246 156 236 V242 C156 253 148 261 138 261 H62 C52 261 44 253 44 242 Z"
            fill="url(#crystalPedestal)"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1.2"
          />
          <path
            d="M52 259 Q100 248 148 259"
            stroke="rgba(255, 255, 255, 0.40)"
            strokeWidth="1.2"
          />

          {/* Inner Chamber Outline */}
          <rect
            x="48"
            y="106"
            width="104"
            height="130"
            rx="10"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="1.2"
          />

          {/* Left Studio Softbox Rim Reflection */}
          <path
            d="M44 124 V236 C44 244 48 250 56 252"
            stroke="rgba(255, 255, 255, 0.50)"
            strokeWidth="1.4"
          />

          {/* Right Shoulder Reflection */}
          <path
            d="M156 124 L138 98"
            stroke="rgba(255, 255, 255, 0.28)"
            strokeWidth="1.0"
          />

          {/* 4. GOLD SPRAY COLLAR & ACTUATOR PUMP */}
          <rect
            x="86"
            y="70"
            width="28"
            height="16"
            fill="url(#goldPolish)"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="0.8"
          />

          {/* Gold Spray Actuator Pump Button */}
          <g
            className="transition-transform duration-100 ease-out"
            style={{
              transform: isSpraying ? 'translateY(5px)' : 'translateY(0px)'
            }}
          >
            <rect
              x="90"
              y="48"
              width="20"
              height="22"
              rx="2"
              fill="url(#goldPolish)"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="0.8"
            />
            <circle
              cx="107"
              cy="56"
              r="1.4"
              fill="#08080a"
              stroke="#fef08a"
              strokeWidth="0.5"
            />
          </g>

          {/* 5. REMOVABLE LUXURY STOPPER CAP ("DHAKKAN") */}
          <g
            onClick={(e) => {
              e.stopPropagation();
              handleToggleCap();
            }}
            className="cursor-pointer transition-all duration-300 ease-out hover:brightness-125"
            style={{
              transform: capOpen
                ? 'translate(55px, -42px) rotate(14deg)'
                : 'translate(0px, 0px)',
              transformOrigin: '100px 70px'
            }}
            title={capOpen ? 'Click to put cap on (separate)' : 'Click to remove cap (mix)'}
          >
            <rect x="74" y="24" width="52" height="48" fill="transparent" />

            <rect
              x="78"
              y="28"
              width="44"
              height="42"
              rx="3"
              fill="url(#obsidianCap)"
              stroke="rgba(255, 255, 255, 0.24)"
              strokeWidth="1.2"
            />
            <line
              x1="80"
              y1="30"
              x2="120"
              y2="30"
              stroke="rgba(255, 255, 255, 0.40)"
              strokeWidth="1.2"
            />
            <rect
              x="97"
              y="29"
              width="5"
              height="40"
              fill="rgba(255, 255, 255, 0.08)"
            />
            <line
              x1="78"
              y1="68"
              x2="122"
              y2="68"
              stroke="url(#goldPolish)"
              strokeWidth="2.5"
            />
          </g>

          {/* 6. DYNAMIC 2D SPRAY MIST PARTICLES */}
          {particles.map((p) => (
            <circle
              key={p.id}
              cx={p.x}
              cy={p.y}
              r={p.radius}
              fill="rgba(255, 255, 255, 0.95)"
              opacity={p.alpha}
              filter="blur(0.5px)"
            />
          ))}
        </svg>
      </div>

      {/* Clean, Minimal Atelier Controls Bar */}
      <div className="flex flex-col items-center gap-3 pt-1 w-full px-2">
        <div className="flex items-center gap-2">
          {/* Cap Toggle Button */}
          <button
            onClick={handleToggleCap}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition active:scale-95 ${
              capOpen
                ? 'bg-amber-400 text-black border-amber-300 shadow-md shadow-amber-400/20'
                : 'bg-black hover:bg-white/10 text-neutral-300 hover:text-white border-white/10'
            }`}
          >
            {capOpen ? 'Put Cap On' : 'Remove Cap (Mix)'}
          </button>

          {/* Spray Mist Atomizer */}
          <button
            onClick={triggerSpray}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-black hover:bg-white/10 active:scale-95 border border-white/10 hover:border-amber-400/40 text-xs font-semibold text-neutral-200 hover:text-white transition shadow-lg group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
            <span>Spray Mist</span>
            {sprayCount > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-[10px] text-amber-300 font-mono font-bold">
                {sprayCount}x
              </span>
            )}
          </button>

          {/* Refill Button */}
          {sprayDepletion > 0 && (
            <button
              onClick={() => setSprayDepletion(0)}
              className="px-2.5 py-1.5 rounded-xl bg-black hover:bg-white/10 text-xs font-mono text-neutral-400 hover:text-white border border-white/10 transition active:scale-95"
              title="Refill flacon to full capacity"
            >
              ↺ Refill
            </button>
          )}
        </div>

        {/* Minimalist Atelier Ratio / State Indicator */}
        <div className="flex flex-col items-center gap-1.5 pt-1 w-full max-w-[210px]">
          {/* Dual-color Slim Balance Bar */}
          <div className="w-full h-1 bg-black rounded-full overflow-hidden flex border border-white/10">
            {capOpen ? (
              <div className="w-full h-full bg-amber-400 transition-all duration-500" />
            ) : (
              <>
                {alcoholPercent > 0 && (
                  <div
                    style={{ width: `${alcoholPercent}%` }}
                    className="h-full bg-sky-200/60 transition-all duration-300"
                  />
                )}
                <div
                  style={{ width: `${oilPercent}%` }}
                  className="h-full bg-amber-400 transition-all duration-300"
                />
              </>
            )}
          </div>

          {/* Clean Muted Typography */}
          <div className="flex items-center justify-between w-full text-[10px] uppercase font-mono tracking-wider text-neutral-400">
            {capOpen ? (
              <span className="text-amber-300 font-semibold mx-auto tracking-wider">
                Mixed & Blended Solution ({concentrationCode})
              </span>
            ) : (
              <>
                {alcoholPercent > 0 && (
                  <span>
                    Alcohol <span className="text-neutral-200 font-semibold">{alcoholPercent}%</span>
                  </span>
                )}
                <span className="text-amber-400/90 font-semibold ml-auto">
                  Oil <span className="text-amber-300 font-bold">{oilPercent}%</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryPerfumeBottle2D;
