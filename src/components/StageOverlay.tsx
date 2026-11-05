import React, { useEffect, useState } from 'react';
import { Question } from '../types';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../audio/synthAudio';

interface StageOverlayProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: 'A' | 'B' | 'C' | 'D' | undefined;
  onSelectOption: (optionId: 'A' | 'B' | 'C' | 'D') => void;
  onPrev: () => void;
  isTransitioning?: boolean;
}

export const StageOverlay: React.FC<StageOverlayProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  onSelectOption,
  onPrev,
  isTransitioning,
}) => {
  const [soundOn, setSoundOn] = useState(soundManager.enabled);

  const toggleSound = () => {
    const newState = soundManager.toggle();
    setSoundOn(newState);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      if (key === 'A' || key === '1') {
        soundManager.playSelect(0);
        onSelectOption('A');
      } else if (key === 'B' || key === '2') {
        soundManager.playSelect(1);
        onSelectOption('B');
      } else if (key === 'C' || key === '3') {
        soundManager.playSelect(2);
        onSelectOption('C');
      } else if (key === 'D' || key === '4') {
        soundManager.playSelect(3);
        onSelectOption('D');
      } else if (e.key === 'BACKSPACE' && currentIndex > 0) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isTransitioning, onPrev, onSelectOption]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-3 sm:p-5 md:p-6">
      {/* Top Streamlined Single-Row HUD: Maximum vertical clearance for 3D objects */}
      <header
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        className="pointer-events-auto max-w-4xl mx-auto w-full flex items-center justify-between gap-3 bg-[#0d0924]/85 border border-[#3b3560]/80 px-4 py-2.5 rounded-sm backdrop-blur-md shadow-lg"
      >
        {/* Left: Back button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          disabled={currentIndex === 0 || isTransitioning}
          className={`px-3 py-1 text-xs font-mono rounded-sm border border-[#4338ca]/60 flex items-center gap-1.5 transition-colors ${
            currentIndex === 0 || isTransitioning
              ? 'opacity-30 cursor-not-allowed text-[#64748b]'
              : 'hover:border-[#818cf8] hover:text-white cursor-pointer text-[#c7d2fe]'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Center: Slim, readable question prompt */}
        <div className="flex-1 text-center px-2 min-w-0">
          <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-[#818cf8] uppercase tracking-wider">
            <span>Query 0{currentIndex + 1} of 0{totalQuestions}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#94a3b8]">Click 3D Object or Card Below</span>
          </div>
          <h2 className="font-serif text-base sm:text-lg md:text-xl text-white font-medium truncate mt-0.5">
            {question.prompt}
          </h2>
        </div>

        {/* Right: Sound toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSound();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          aria-label={soundOn ? 'Mute ambient chime' : 'Enable ambient chime'}
          className="px-3 py-1 text-xs font-mono rounded-sm border border-[#4338ca]/60 text-[#c7d2fe] hover:border-[#818cf8] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          {soundOn ? <Volume2 className="w-3.5 h-3.5 text-[#38bdf8]" /> : <VolumeX className="w-3.5 h-3.5 text-[#94a3b8]" />}
          <span className="hidden md:inline">{soundOn ? 'Sound On' : 'Sound Off'}</span>
        </button>
      </header>

      {/* Central Viewport is completely clear for the 3D scene */}

      {/* Bottom Dock: 4 Accessible Spatial Choice Cards */}
      <footer
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        className="pointer-events-auto max-w-4xl mx-auto w-full"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {question.options.map((option, idx) => {
            const isSelected = selectedOption === option.id;
            return (
              <button
                key={option.id}
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isTransitioning) return;
                  soundManager.playSelect(idx);
                  onSelectOption(option.id);
                }}
                disabled={isTransitioning}
                className={`p-3 rounded-sm border text-left transition-all duration-200 group flex items-start gap-2.5 backdrop-blur-md cursor-pointer ${
                  isSelected
                    ? 'bg-[#272152]/95 border-[#818cf8] ring-1 ring-[#818cf8] shadow-lg scale-[1.01]'
                    : 'bg-[#0f0c26]/85 border-[#2e2652] hover:border-[#6366f1] hover:bg-[#1a153c]/90'
                }`}
              >
                <span
                  className={`w-5 h-5 shrink-0 font-mono text-[11px] font-bold rounded-sm border flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-[#818cf8] text-[#0b081e] border-[#818cf8]'
                      : 'bg-[#1d173d] text-[#c7d2fe] border-[#4338ca] group-hover:border-[#818cf8]'
                  }`}
                >
                  {option.id}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="font-serif text-sm sm:text-base text-white group-hover:text-[#e0e7ff] leading-snug line-clamp-2">
                    {option.text}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
};
