import React from 'react';
import { Compass, Sparkles, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-16">
      {/* Top Bureau Masthead */}
      <div className="paper-card p-6 md:p-12 relative overflow-hidden rounded-sm border border-[#E3DCB] shadow-sm">
        {/* Subtle decorative watermark/seal in background */}
        <div className="absolute -right-12 -top-12 w-64 h-64 border border-[#0E1A2B]/10 rounded-full pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 border border-dashed border-[#0E1A2B]/10 rounded-full" />
        </div>

        {/* Bureau Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E4DEC9] text-xs font-mono text-[#526071]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 border border-[#0E1A2B] bg-[#E04836]" />
            <span className="tracking-widest uppercase font-semibold text-[#0E1A2B]">
              Interdimensional Identity Bureau
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>FORM IIB-702</span>
            <span aria-hidden="true">·</span>
            <span>DIVISION OF TEMPORAL TRANSIT</span>
          </div>
        </div>

        {/* Rubber stamp preview on landing */}
        <div className="mt-8 flex justify-start">
          <div className="rubber-stamp text-xs md:text-sm">
            STATUS: ADMISSIBLE
          </div>
        </div>

        {/* Main Headline */}
        <div className="mt-6 max-w-2xl">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold text-[#0E1A2B] leading-[1.15] tracking-tight">
            Your application to another universe has been approved.
          </h1>
          <p className="mt-4 font-serif text-xl sm:text-2xl text-[#394B61] italic leading-relaxed">
            We just need to figure out who you are over there.
          </p>
        </div>

        {/* Archival Note */}
        <div className="mt-8 p-5 bg-[#FAF7EE] border border-[#ECE5D3] rounded-sm max-w-xl text-sm text-[#475569] leading-relaxed">
          <p>
            Due to minor anomalies in the local continuum, your earthly credentials cannot be honored in the parallel quadrant. Please complete this brief diagnostic docket so the Bureau may issue your legitimate vocation, office hours, and transit jurisdiction.
          </p>
        </div>

        {/* CTA and Metadata */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <button
            onClick={onStart}
            className="group px-7 py-3.5 bg-[#0E1A2B] text-[#FFFDF8] font-mono text-sm tracking-wider uppercase font-semibold rounded-sm hover:bg-[#1A2E4B] transition-colors flex items-center gap-3 shadow-md focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:ring-offset-2"
          >
            <span>Begin transfer</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#E04836]" />
          </button>

          {/* Clean unboxed metadata with typographic separators - compliant with anti-slop zero pill rules */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#5E6D82]">
            <span>6 strange questions</span>
            <span aria-hidden="true">·</span>
            <span>About 2 minutes</span>
            <span aria-hidden="true">·</span>
            <span>A fictional identity quiz, just for fun</span>
          </div>
        </div>

        {/* Reassurance Footer */}
        <div className="mt-12 pt-6 border-t border-[#E4DEC9]/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#78889B]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
            <span>No name, email, or personal data collected.</span>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#78889B]" />
            <span>Local deterministic evaluation. Answers remain in your browser.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
