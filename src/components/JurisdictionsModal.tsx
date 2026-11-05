import React from 'react';
import { X, Sparkles, Building2 } from 'lucide-react';
import { PROFILES } from '../data/quizData';
import { Emblem } from './Emblem';
import { IdentitySpiritPortrait } from './IdentitySpiritPortrait';

interface JurisdictionsModalProps {
  onClose: () => void;
}

export const JurisdictionsModal: React.FC<JurisdictionsModalProps> = ({ onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="jurisdictions-modal-title"
      className="fixed inset-0 z-50 bg-[#0E1A2B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="paper-card w-full max-w-4xl rounded-sm border border-[#D5CBBA] p-6 sm:p-8 relative shadow-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4DEC9]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#6B7B8E]">
              Bureau Gazeteer · 12 Recognized Sectors
            </div>
            <h3 id="jurisdictions-modal-title" className="font-serif text-2xl sm:text-3xl font-semibold text-[#0E1A2B]">
              Multiverse Jurisdictions
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-[#EAE4D2] text-[#475569] hover:text-[#0E1A2B] transition-colors"
            aria-label="Close jurisdictions"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of 12 vocations */}
        <div className="overflow-y-auto py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pr-1 flex-1">
          {PROFILES.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-[#FAF7EE] border border-[#ECE5D3] rounded-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] uppercase font-bold text-[#1D4ED8]">
                    Sector {p.universeCode}
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center text-[#64748B]" title="Secondary Bureau Emblem">
                    <Emblem name={p.emblemKey} size={20} className="w-5 h-5 opacity-70" />
                  </div>
                </div>

                {/* Authentic Soft Glowing Creature Portrait on Dark Indigo Showcase */}
                <div className="my-3 py-3 flex items-center justify-center bg-[#0d1222] rounded-sm border border-[#1e293b] shadow-inner relative overflow-hidden group">
                  <div className="absolute inset-0 bg-radial from-[#3b82f6]/10 via-transparent to-transparent pointer-events-none" />
                  <IdentitySpiritPortrait profileId={p.id} size={160} />
                </div>

                <h4 className="font-serif text-lg font-bold text-[#0E1A2B] mt-1">
                  {p.title}
                </h4>
                <div className="font-mono text-[11px] text-[#526071] mb-1.5">
                  {p.universeName}
                </div>
                <p className="text-xs text-[#475569] font-serif leading-relaxed line-clamp-3">
                  {p.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#ECE5D3] font-mono text-[10px] text-[#718096]">
                Hours: {p.officeHours}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E4DEC9] flex items-center justify-between">
          <span className="font-mono text-xs text-[#78889B]">
            All 12 vocations are reachable via diagnostic alignment.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0E1A2B] text-white font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-[#1A2E4B] transition-colors"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
