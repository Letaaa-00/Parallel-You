import React, { useEffect } from 'react';
import { Question } from '../types';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

interface QuestionViewProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: 'A' | 'B' | 'C' | 'D' | undefined;
  onSelectOption: (optionId: 'A' | 'B' | 'C' | 'D') => void;
  onNext: () => void;
  onPrev: () => void;
}

export const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onNext,
  onPrev,
}) => {
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const canContinue = Boolean(selectedOption);

  // Keyboard shortcut support: A/B/C/D or 1/2/3/4 and Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input (none here, but good practice)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') {
        onSelectOption('A');
      } else if (key === 'B' || key === '2') {
        onSelectOption('B');
      } else if (key === 'C' || key === '3') {
        onSelectOption('C');
      } else if (key === 'D' || key === '4') {
        onSelectOption('D');
      } else if (e.key === 'Enter' && canContinue) {
        onNext();
      } else if (e.key === 'Backspace' && currentIndex > 0) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canContinue, currentIndex, onNext, onPrev, onSelectOption]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Form Container */}
      <div className="paper-card p-6 md:p-10 rounded-sm border border-[#E3DCB] shadow-sm relative">
        {/* Progress & Micro-labels */}
        <div className="flex items-center justify-between pb-5 border-b border-[#E4DEC9] font-mono text-xs text-[#5E6D82]">
          <div className="flex items-center gap-2">
            <span className="text-[#0E1A2B] font-bold">SECTION {currentIndex + 1}</span>
            <span aria-hidden="true">/</span>
            <span>DIAGNOSTIC QUERY</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-bold text-[#0E1A2B]">
              {currentIndex + 1} <span className="font-normal text-[#8090A4]">of</span> {totalQuestions}
            </span>
          </div>
        </div>

        {/* Subtle Progress Bar */}
        <div className="w-full h-1 bg-[#EDE8D9] mt-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1D4ED8] transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question Prompt */}
        <div className="mt-8 mb-8">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[#79889B] mb-2">
            Inquiry Item 0{currentIndex + 1}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2rem] font-semibold text-[#0E1A2B] leading-snug">
            {question.prompt}
          </h2>
          <p className="mt-2 text-xs font-mono text-[#6A7B8E] italic">
            Ref: {question.contextHint}
          </p>
        </div>

        {/* 4 Answers Cards */}
        <fieldset className="space-y-3">
          <legend className="sr-only">Choose one response for question {currentIndex + 1}</legend>
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id;
            return (
              <label
                key={option.id}
                onClick={() => onSelectOption(option.id)}
                className={`w-full text-left p-4 sm:p-5 rounded-sm border transition-all cursor-pointer flex items-center justify-between gap-4 group ${
                  isSelected
                    ? 'bg-[#F2EDDE] border-[#0E1A2B] ring-1 ring-[#0E1A2B] shadow-xs'
                    : 'bg-[#FFFDF8] border-[#E2DCB] hover:border-[#B5A88B] hover:bg-[#FAF7EE]'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Monospaced Letter Label */}
                  <span
                    className={`w-7 h-7 shrink-0 font-mono text-xs font-bold rounded-sm border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#0E1A2B] text-[#FFFDF8] border-[#0E1A2B]'
                        : 'bg-[#FAF7EE] text-[#475569] border-[#D5CBBA] group-hover:border-[#0E1A2B]'
                    }`}
                  >
                    {option.id}
                  </span>

                  <span className="font-serif text-lg sm:text-xl text-[#0E1A2B] leading-snug pt-0.5">
                    {option.text}
                  </span>
                </div>

                {/* Radio indicator */}
                <div
                  className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-[#0E1A2B] bg-[#0E1A2B] text-white'
                      : 'border-[#CBD5E1] bg-white group-hover:border-[#94A3B8]'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </label>
            );
          })}
        </fieldset>

        {/* Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-[#E4DEC9] flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2.5 font-mono text-xs tracking-wider uppercase rounded-sm border transition-colors flex items-center gap-2 ${
              currentIndex === 0
                ? 'opacity-30 border-transparent text-[#94A3B8] cursor-not-allowed'
                : 'border-[#D5CBBA] text-[#334155] hover:bg-[#F2EDDE] hover:border-[#0E1A2B]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[11px] font-mono text-[#8B98A8]">
              Press A–D or 1–4, Enter to proceed
            </span>
            <button
              type="button"
              onClick={onNext}
              disabled={!canContinue}
              className={`px-6 py-2.5 font-mono text-xs tracking-wider uppercase font-semibold rounded-sm transition-all flex items-center gap-2 shadow-xs ${
                canContinue
                  ? 'bg-[#0E1A2B] text-[#FFFDF8] hover:bg-[#1A2E4B] cursor-pointer'
                  : 'bg-[#E5DFCF] text-[#9CA3AF] cursor-not-allowed'
              }`}
            >
              <span>{isLastQuestion ? 'Issue my identity' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E04836]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
