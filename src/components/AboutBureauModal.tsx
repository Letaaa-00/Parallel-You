import React from 'react';
import { X, Building, ShieldCheck, Compass } from 'lucide-react';

interface AboutBureauModalProps {
  onClose: () => void;
}

export const AboutBureauModal: React.FC<AboutBureauModalProps> = ({ onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-bureau-title"
      className="fixed inset-0 z-50 bg-[#0E1A2B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="paper-card w-full max-w-xl rounded-sm border border-[#D5CBBA] p-6 sm:p-8 relative shadow-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4DEC9]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#6B7B8E]">
              Bureau Charter & Mandate
            </div>
            <h3 id="about-bureau-title" className="font-serif text-2xl font-semibold text-[#0E1A2B]">
              The Interdimensional Identity Bureau
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-[#EAE4D2] text-[#475569] hover:text-[#0E1A2B] transition-colors"
            aria-label="Close about modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-5 space-y-4 text-left text-sm font-serif text-[#334155] leading-relaxed flex-1">
          <p>
            Established during the Great Alignment of 1928, the <strong>Interdimensional Identity Bureau (IIB)</strong> oversees the dignified transit and civic placement of conscious entities crossing parallel reality planes.
          </p>

          <p>
            When an applicant is approved for dimensional transfer, earthly vocations (such as spreadsheets, middle management, or suburban commute coordination) rarely translate cleanly into worlds governed by barometric diplomacy, cloud acoustics, or stardust fermentation.
          </p>

          <div className="p-4 bg-[#FAF7EE] border border-[#ECE5D3] rounded-sm font-sans text-xs text-[#526071] space-y-2">
            <div className="font-mono font-bold uppercase tracking-wider text-[#0E1A2B]">
              Classroom & Deployment Principles
            </div>
            <p>
              • Deterministic local vector scoring and offline Canvas 2D PNG generation.<br />
              • In-world Keeper conversational dialogue relayed via server to Google Gemini (gemini-3.8-flash).<br />
              • Zero real personal data, accounts, biometrics, or tracking databases.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E4DEC9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0E1A2B] text-white font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-[#1A2E4B] transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
