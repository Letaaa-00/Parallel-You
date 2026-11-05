import React from 'react';
import { X, Sparkles, Sliders, Shield, BookOpen } from 'lucide-react';
import { DimensionKey } from '../types';

interface MethodologyModalProps {
  scores: Record<DimensionKey, number>;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ scores, onClose }) => {
  const dimensions = [
    {
      key: 'care_repair' as DimensionKey,
      title: 'Care & Repair',
      score: scores.care_repair,
      description: 'Your instinct to restore frayed structures, tenderly mend dying light, and create safe harbor for others.',
    },
    {
      key: 'curiosity_exploration' as DimensionKey,
      title: 'Curiosity & Exploration',
      score: scores.curiosity_exploration,
      description: 'Your appetite for uncharted doorways, living maps, rooftop panoramas, and wandering off the marked path.',
    },
    {
      key: 'memory_story' as DimensionKey,
      title: 'Memory & Story',
      score: scores.memory_story,
      description: 'Your reverence for lost artifacts, unsent dispatches, ocean archives, and the emotional weight of history.',
    },
    {
      key: 'independence_play' as DimensionKey,
      title: 'Independence & Play',
      score: scores.independence_play,
      description: 'Your commitment to personal sovereignty, eccentric working hours, cheerful defiance, and joyful celebration.',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="methodology-title"
      className="fixed inset-0 z-50 bg-[#0E1A2B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="paper-card w-full max-w-2xl rounded-sm border border-[#D5CBBA] p-6 sm:p-8 relative shadow-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4DEC9]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#6B7B8E]">
              Bureau Regulatory Directive · Index Calculation
            </div>
            <h3 id="methodology-title" className="font-serif text-2xl font-semibold text-[#0E1A2B]">
              How Identities Are Assigned
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-[#EAE4D2] text-[#475569] hover:text-[#0E1A2B] transition-colors"
            aria-label="Close explanation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto py-4 space-y-6 text-left pr-1 flex-1">
          <p className="font-serif text-base text-[#334155] leading-relaxed">
            The Interdimensional Identity Bureau relies on a deterministic weighted vector model rather than chance or arbitrary personality buckets. Each question weights four fundamental navigational vectors:
          </p>

          {/* Dimension Breakdown with User Scores */}
          <div className="space-y-4">
            {dimensions.map((dim) => (
              <div key={dim.key} className="p-4 bg-[#FAF7EE] border border-[#ECE5D3] rounded-sm">
                <div className="flex items-center justify-between font-mono text-xs mb-1">
                  <span className="font-bold text-[#0E1A2B] uppercase tracking-wider">
                    {dim.title}
                  </span>
                  <span className="text-[#1D4ED8] font-bold">
                    Index Score: {dim.score} pts
                  </span>
                </div>
                <p className="text-xs text-[#526071] font-sans leading-relaxed">
                  {dim.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 border-l-2 border-[#E04836] bg-[#FFFBF8] text-xs font-mono text-[#526071] space-y-2">
            <div className="font-bold uppercase tracking-wider text-[#0E1A2B]">
              Deterministic Multiverse Guarantee
            </div>
            <p>
              Submitting the exact same combination of choices will always calculate the exact same coordinate distance, assigning you to the identical universe, title, and serial registration.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E4DEC9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0E1A2B] text-white font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-[#1A2E4B] transition-colors"
          >
            Close & Return
          </button>
        </div>
      </div>
    </div>
  );
};
