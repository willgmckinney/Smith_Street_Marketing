import { useEffect, useState } from "react";

interface CliffFaceProps {
  scrollProgress: number;
}

export const CliffFace = ({ scrollProgress }: CliffFaceProps) => {
  const [particles, setParticles] = useState<
    { x: number; y: number; size: number; delay: number; opacity: number }[]
  >([]);

  useEffect(() => {
    // Generate snow/dust particles
    const newParticles = Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  // Peak visibility starts at 70% scroll
  const peakOpacity = Math.max(0, (scrollProgress - 70) / 30);
  // Sky color transitions from deep night to dawn
  const skyLightness = Math.min(scrollProgress * 0.15, 12);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Sky gradient - lightens as you ascend */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: `linear-gradient(180deg, 
            hsl(222, 47%, ${8 + skyLightness}%) 0%, 
            hsl(217, 33%, ${12 + skyLightness * 0.5}%) 40%,
            hsl(222, 47%, ${6 + skyLightness * 0.3}%) 100%)`,
        }}
      />

      {/* Distant mountains - slowest parallax */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          transform: `translateY(${scrollProgress * 0.1}px)`,
          willChange: "transform",
        }}
      >
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          style={{ height: "60vh" }}
        >
          <path
            d="M0,400 L0,280 Q120,200 240,260 Q360,180 480,220 Q600,140 720,180 Q840,100 960,160 Q1080,80 1200,140 Q1320,60 1440,120 L1440,400 Z"
            fill="#1a1d24"
            opacity="0.8"
          />
          <path
            d="M0,400 L0,300 Q180,220 360,280 Q540,200 720,260 Q900,180 1080,240 Q1260,160 1440,200 L1440,400 Z"
            fill="#252830"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Mid-ground rock formations */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          transform: `translateY(${scrollProgress * 0.3}px)`,
          willChange: "transform",
        }}
      >
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          style={{ height: "80vh" }}
        >
          <defs>
            <linearGradient id="rockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3D4451" />
              <stop offset="100%" stopColor="#2A2D34" />
            </linearGradient>
          </defs>
          <path
            d="M0,600 L0,350 Q60,300 120,340 L200,280 Q280,320 320,300 L400,200 Q440,240 500,220 L600,150 Q680,200 720,170 L800,120 Q860,160 920,140 L1000,80 Q1080,120 1120,100 L1200,60 Q1280,100 1360,70 L1440,40 L1440,600 Z"
            fill="url(#rockGrad)"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Rock texture overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <filter id="rockNoise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.9"
                numOctaves="4"
                seed="1"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#rockNoise)" />
        </svg>
      </div>

      {/* Peak / Summit glow (appears at top of scroll) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] transition-opacity duration-1000"
        style={{ opacity: peakOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(100,181,246,0.15) 0%, rgba(100,181,246,0.05) 40%, transparent 70%)",
          }}
        />
        {/* Summit flag */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 text-center transition-all duration-700"
          style={{
            opacity: Math.max(0, (scrollProgress - 85) / 15),
            transform: `translateX(-50%) translateY(${Math.max(0, 20 - (scrollProgress - 85))}px)`,
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <svg
              className="w-8 h-8 text-sunrise-amber"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 21V4l8 4.5L12 4l8 4.5V21" />
              <path d="M4 4l8 4.5" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            <span className="font-mono text-xs text-sunrise-amber/80 tracking-[0.2em] uppercase">
              Summit
            </span>
          </div>
        </div>
      </div>

      {/* Atmospheric snow/dust particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity * Math.max(0.3, scrollProgress / 100),
            animation: `snow-fall ${8 + p.delay * 2}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Vertical gradient overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.3) 50%, rgba(15,23,42,0.6) 100%)",
        }}
      />
    </div>
  );
};
