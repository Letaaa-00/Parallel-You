import React from 'react';
import { QuizEvaluationResult } from '../data/quizData';
import { IdentitySpiritPortrait } from './IdentitySpiritPortrait';
import { X, Check } from 'lucide-react';

interface ReviewModalProps {
  evaluation: QuizEvaluationResult;
  onClose: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ evaluation, onClose }) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      className="fixed inset-0 z-50 bg-[#0E1A2B]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="paper-card w-full max-w-2xl rounded-sm border border-[#D5CBBA] p-6 sm:p-8 relative shadow-xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E4DEC9]">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-[#FAF7EE] border border-[#D5CBBA] rounded-xs shrink-0">
              <IdentitySpiritPortrait profileId={evaluation.profile.id} size={50} />
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#6B7B8E]">
                Bureau Dossier Review · {evaluation.profile.title} (Universe {evaluation.profile.universeCode})
              </div>
              <h3 id="review-modal-title" className="font-serif text-xl sm:text-2xl font-semibold text-[#0E1A2B]">
                Recorded Application Answers
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm hover:bg-[#EAE4D2] text-[#475569] hover:text-[#0E1A2B] transition-colors"
            aria-label="Close review"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Answers List */}
        <div className="overflow-y-auto py-4 space-y-5 pr-1 flex-1">
          {evaluation.answeredOptions.map((item, idx) => (
            <div
              key={item.questionId}
              className="p-4 bg-[#FAF7EE] border border-[#ECE5D3] rounded-sm text-left"
            >
              <div className="flex items-center justify-between font-mono text-[11px] text-[#64748B] mb-1">
                <span>QUERY 0{idx + 1}</span>
                <span className="text-[#0E1A2B] font-semibold">SELECTED: OPTION {item.optionId}</span>
              </div>
              <h4 className="font-serif text-lg text-[#0E1A2B] font-medium leading-snug">
                {item.prompt}
              </h4>
              <div className="mt-2 pl-3 border-l-2 border-[#1D4ED8] text-sm text-[#0E1A2B] font-serif font-semibold">
                "{item.optionText}"
              </div>
              <p className="mt-2 text-xs font-mono text-[#526071] leading-relaxed">
                <span className="font-semibold text-[#1E3A8A]">Bureau Observation:</span> {item.observation}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#E4DEC9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#0E1A2B] text-white font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-[#1A2E4B] transition-colors"
          >
            Return to Identity Card
          </button>
        </div>
      </div>
    </div>
  );
};
