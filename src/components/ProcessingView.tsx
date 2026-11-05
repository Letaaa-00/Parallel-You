import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ProcessingViewProps {
  onComplete: () => void;
}

const STEPS = [
  'Cross-indexing timeline divergence coefficients...',
  'Retrieving jurisdictional clearance from Central Transit...',
  'Calculating emotional weight & vocational compatibility...',
  'Engraving interdimensional identity credentials...',
  'Applying authorized Bureau approval seal...',
];

export const ProcessingView: React.FC<ProcessingViewProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showStamp, setShowStamp] = useState(false);

  useEffect(() => {
    // Step forward every 450ms
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setShowStamp(true);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // When stamp triggers, wait 600ms then call onComplete
  useEffect(() => {
    if (showStamp) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 750);
      return () => clearTimeout(timeout);
    }
  }, [showStamp, onComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="paper-card p-8 md:p-14 rounded-sm border border-[#E3DCB] shadow-sm relative overflow-hidden">
        {/* Bureau Header */}
        <div className="font-mono text-xs text-[#6B7B8E] tracking-widest uppercase pb-4 border-b border-[#E4DEC9]">
          INTERDIMENSIONAL TRANSIT BUREAU · TERMINAL PROCESSING
        </div>

        {/* Processing Spinner or Animation */}
        <div className="py-12 flex flex-col items-center justify-center">
          {!showStamp ? (
            <div className="relative w-20 h-20 flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-dashed border-[#1D4ED8]/30 rounded-full animate-spin" />
              <div className="w-12 h-12 border border-[#0E1A2B] rounded-full flex items-center justify-center bg-[#FAF7EE]">
                <Loader2 className="w-6 h-6 text-[#0E1A2B] animate-spin" />
              </div>
            </div>
          ) : (
            <div className="transform scale-110 transition-transform duration-200">
              <div className="rubber-stamp text-xl md:text-2xl shadow-sm">
                APPROVED
              </div>
            </div>
          )}

          {/* Current Bureau Status Message */}
          <div className="mt-8 font-serif text-2xl text-[#0E1A2B] font-medium min-h-[3rem] px-4">
            {STEPS[currentStepIndex]}
          </div>

          <div className="mt-4 font-mono text-xs text-[#7B8B9E] tracking-wider uppercase">
            Step 0{currentStepIndex + 1} of 05 · Calibration in progress
          </div>
        </div>

        {/* Skip button for accessibility */}
        <div className="pt-4 border-t border-[#E4DEC9]/60">
          <button
            onClick={onComplete}
            className="text-xs font-mono text-[#6A7B8E] hover:text-[#0E1A2B] underline underline-offset-4 cursor-pointer"
          >
            Skip waiting & open identity document
          </button>
        </div>
      </div>
    </div>
  );
};
