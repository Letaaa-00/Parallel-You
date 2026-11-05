import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface Landing3DProps {
  onEnter: () => void;
}

export const Landing3D: React.FC<Landing3DProps> = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 z-10 flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden bg-gradient-to-b from-[#090718] via-[#0f0c26] to-[#070514]">
      {/* Top Bar Monogram */}
      <div className="z-20 flex items-center justify-between font-mono text-xs text-[#c7d2fe]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e] animate-pulse" />
          <span className="tracking-widest uppercase font-semibold text-white">
            Interdimensional Identity Bureau
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[#94a3b8]">
          <span>SECTOR TRANSIT // FORM IIB-702</span>
        </div>
      </div>

      {/* Main Split Viewport: Left Intro Panel + Right Guaranteed-Visible CSS3D/SVG Portal Artwork */}
      <div className="z-20 my-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 w-full max-w-6xl mx-auto py-4">
        {/* Left Side: Editorial Intro & CTA */}
        <div className="w-full lg:max-w-md xl:max-w-lg text-left p-6 sm:p-8 bg-[#0b081e]/85 border border-[#4338ca]/50 rounded-sm backdrop-blur-md shadow-2xl">
          <div className="font-mono text-[11px] uppercase tracking-widest text-[#818cf8] mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span>Multiverse Diagnostic Portal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.12]">
            Parallel You
          </h1>

          <p className="mt-3 font-serif text-lg sm:text-xl text-[#e2e8f0] italic leading-relaxed">
            Somewhere, another version of you is waiting.
          </p>

          <p className="mt-3 text-xs sm:text-sm text-[#94a3b8] font-sans leading-relaxed">
            Step onto the liminal walkway. Six spatial choices across the twilight void will determine your parallel identity, office hours, and multiverse jurisdiction.
          </p>

          <div className="mt-6 flex flex-col items-start gap-4">
            <button
              onClick={onEnter}
              className="group px-7 py-3.5 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] text-white font-mono text-xs tracking-widest uppercase font-semibold rounded-sm hover:from-[#6366f1] hover:to-[#8b5cf6] transition-all flex items-center gap-3 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 cursor-pointer"
            >
              <span>Enter the in-between</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#fbcfe8]" />
            </button>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-[#94a3b8]">
              <span>6 spatial questions</span>
              <span aria-hidden="true">·</span>
              <span>About 2 minutes</span>
              <span aria-hidden="true">·</span>
              <span>A fictional identity quiz, just for fun</span>
            </div>
          </div>
        </div>

        {/* Right Side: Guaranteed-Visible Procedural CSS3D / SVG Twilight Portal & Floating Walkway */}
        <div className="w-full lg:flex-1 h-[340px] sm:h-[420px] lg:h-[480px] relative flex items-center justify-center pointer-events-none select-none">
          {/* Ambient Moonlight Glow Backdrop */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-[#3b82f6]/20 via-[#8b5cf6]/25 to-transparent blur-3xl pointer-events-none" />
          </div>

          <svg
            className="w-full h-full max-w-[500px]"
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Portal Radial Glow */}
              <radialGradient id="portalGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFBEB" stopOpacity="1" />
                <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#D97706" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4338CA" stopOpacity="0" />
              </radialGradient>

              {/* Step Glow Gradient */}
              <linearGradient id="stepGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#37306B" />
                <stop offset="100%" stopColor="#1E1B4B" />
              </linearGradient>

              {/* Neon Cyan Edge */}
              <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
              </linearGradient>

              {/* Stone Column Gradient */}
              <linearGradient id="pillarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4338CA" />
                <stop offset="50%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#312E81" />
              </linearGradient>
            </defs>

            {/* Constellation Stars */}
            <g opacity="0.85">
              <circle cx="80" cy="70" r="1.5" fill="#E0E7FF" />
              <circle cx="140" cy="45" r="2" fill="#FFFFFF" />
              <circle cx="210" cy="85" r="1.5" fill="#C7D2FE" />
              <circle cx="390" cy="65" r="2.5" fill="#FDE047" />
              <circle cx="440" cy="110" r="1.5" fill="#E0E7FF" />
              <circle cx="410" cy="180" r="1.8" fill="#FFFFFF" />
              <circle cx="95" cy="160" r="1.5" fill="#C7D2FE" />
              <circle cx="60" cy="220" r="2" fill="#E0E7FF" />
              <line x1="80" y1="70" x2="140" y2="45" stroke="#4338CA" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="140" y1="45" x2="210" y2="85" stroke="#4338CA" strokeWidth="0.75" strokeDasharray="3 3" />
              <line x1="390" y1="65" x2="440" y2="110" stroke="#4338CA" strokeWidth="0.75" strokeDasharray="3 3" />
            </g>

            {/* Glowing Crescent Moon */}
            <g transform="translate(370, 45)">
              <circle cx="25" cy="25" r="22" fill="#FEF08A" opacity="0.15" filter="blur(6px)" />
              <path
                d="M32 8 A 20 20 0 1 0 46 36 A 16 16 0 1 1 32 8 Z"
                fill="#FEF08A"
              />
            </g>

            {/* Celestial Concentric Orbital Rings */}
            <g transform="translate(250, 195)">
              <circle cx="0" cy="0" r="115" stroke="#FDE047" strokeWidth="1.2" strokeDasharray="4 6" opacity="0.5" />
              <circle cx="0" cy="0" r="95" stroke="#818CF8" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
              <circle cx="0" cy="0" r="75" stroke="#F59E0B" strokeWidth="1.5" opacity="0.7" />
            </g>

            {/* Impossible Neoclassical Doorway Frame */}
            {/* Pediment Roof */}
            <polygon points="180,105 250,60 320,105" fill="url(#pillarGrad)" stroke="#F59E0B" strokeWidth="2" />
            <rect x="170" y="105" width="160" height="16" rx="2" fill="#37306B" stroke="#F59E0B" strokeWidth="1.5" />

            {/* Left Pillar */}
            <rect x="180" y="121" width="22" height="150" fill="url(#pillarGrad)" stroke="#312E81" strokeWidth="1" />
            <rect x="176" y="265" width="30" height="10" rx="1" fill="#4338CA" stroke="#F59E0B" strokeWidth="1" />

            {/* Right Pillar */}
            <rect x="298" y="121" width="22" height="150" fill="url(#pillarGrad)" stroke="#312E81" strokeWidth="1" />
            <rect x="294" y="265" width="30" height="10" rx="1" fill="#4338CA" stroke="#F59E0B" strokeWidth="1" />

            {/* Radiant Swirling Portal Light */}
            <ellipse cx="250" cy="195" rx="46" ry="74" fill="url(#portalGlow)" />

            {/* Inner Portal Light Beams */}
            <ellipse cx="250" cy="195" rx="24" ry="48" fill="#FFFBEB" opacity="0.85" />
            <ellipse cx="250" cy="195" rx="12" ry="26" fill="#FFFFFF" />

            {/* Perspective Floating Walkway Slabs (Receding from front-bottom to doorway) */}
            {/* Step 4 (Far) */}
            <polygon points="212,274 288,274 296,290 204,290" fill="url(#stepGrad)" stroke="#4338CA" strokeWidth="1" />
            <line x1="204" y1="290" x2="296" y2="290" stroke="url(#neonCyan)" strokeWidth="3" />

            {/* Step 3 */}
            <polygon points="196,296 304,296 316,322 184,322" fill="url(#stepGrad)" stroke="#4338CA" strokeWidth="1" />
            <line x1="184" y1="322" x2="316" y2="322" stroke="url(#neonCyan)" strokeWidth="3.5" />

            {/* Step 2 */}
            <polygon points="172,330 328,330 345,368 155,368" fill="url(#stepGrad)" stroke="#4338CA" strokeWidth="1.2" />
            <line x1="155" y1="368" x2="345" y2="368" stroke="url(#neonCyan)" strokeWidth="4" />

            {/* Step 1 (Nearest Foreground Step) */}
            <polygon points="140,378 360,378 385,432 115,432" fill="url(#stepGrad)" stroke="#6366F1" strokeWidth="1.5" />
            <line x1="115" y1="432" x2="385" y2="432" stroke="url(#neonCyan)" strokeWidth="5" />

            {/* Walkway Side Starlight Lanterns */}
            <g transform="translate(132, 345)">
              <line x1="0" y1="0" x2="0" y2="24" stroke="#FBBF24" strokeWidth="2.5" />
              <circle cx="0" cy="-4" r="7" fill="#FEF08A" filter="drop-shadow(0 0 6px #F59E0B)" />
            </g>
            <g transform="translate(368, 345)">
              <line x1="0" y1="0" x2="0" y2="24" stroke="#FBBF24" strokeWidth="2.5" />
              <circle cx="0" cy="-4" r="7" fill="#FEF08A" filter="drop-shadow(0 0 6px #F59E0B)" />
            </g>

            {/* Bottom Horizon Cosmic Ring */}
            <ellipse cx="250" cy="460" rx="190" ry="25" stroke="#4338CA" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* Bottom Reassurance */}
      <div className="z-20 flex items-center justify-between font-mono text-[11px] text-[#94a3b8]/80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Local quiz evaluation & PNG generation. In-world Keeper chat relayed via server to Google Gemini. No accounts or tracking.</span>
        </div>
      </div>
    </div>
  );
};
