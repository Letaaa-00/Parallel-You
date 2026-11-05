import React, { useState, useEffect, useRef } from 'react';
import { StageKey, SurrealCanvas } from './scene/SurrealCanvas';
import { QUESTIONS, evaluateAnswers, runIntegrityAssertion, QuizEvaluationResult } from './data/quizData';
import { UserAnswers } from './types';
import { Landing3D } from './components/Landing3D';
import { StageOverlay } from './components/StageOverlay';
import { KeeperChatView } from './components/KeeperChatView';
import { JurisdictionsModal } from './components/JurisdictionsModal';
import { AboutBureauModal } from './components/AboutBureauModal';
import { MethodologyModal } from './components/MethodologyModal';
import { soundManager } from './audio/synthAudio';

const STAGES: StageKey[] = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

export default function App() {
  const [currentStage, setCurrentStage] = useState<StageKey>('landing');
  const [answers, setAnswers] = useState<UserAnswers>({});
  const [evaluation, setEvaluation] = useState<QuizEvaluationResult | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Synchronous ref lock and answers ref to guarantee zero race conditions or clobbering
  const transitionLockRef = useRef(false);
  const answersRef = useRef<UserAnswers>({});

  // Run internal assertion on mount to verify [B, C, B, A, D, B] scoring & observation fidelity
  useEffect(() => {
    try {
      const assertion = runIntegrityAssertion();
      console.log('[Parallel You Integrity Check]', assertion.message);
    } catch (err) {
      console.error('[Parallel You Integrity Check FAILED]', err);
    }
  }, []);

  // Nav modals
  const [showJurisdictions, setShowJurisdictions] = useState(false);
  const [showAboutBureau, setShowAboutBureau] = useState(false);
  const [showMethodologyGlobal, setShowMethodologyGlobal] = useState(false);

  // Check prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Determine current question index
  const questionIndex = STAGES.indexOf(currentStage);

  // Handle entering from landing
  const handleEnterInBetween = () => {
    soundManager.playPortalSwoosh();
    transitionLockRef.current = true;
    setIsTransitioning(true);
    setTimeout(
      () => {
        setCurrentStage('q1');
        setIsTransitioning(false);
        transitionLockRef.current = false;
      },
      prefersReducedMotion ? 50 : 380
    );
  };

  // Handle selection of option A, B, C, or D (strictly authoritative)
  const handleSelectChoice = (choice: 'A' | 'B' | 'C' | 'D') => {
    // If a transition is already in progress, drop subsequent events synchronously
    if (transitionLockRef.current) return;
    if (questionIndex === -1 || questionIndex >= QUESTIONS.length) return;

    transitionLockRef.current = true;
    setIsTransitioning(true);

    const currentQuestion = QUESTIONS[questionIndex];
    answersRef.current = {
      ...answersRef.current,
      [currentQuestion.id]: choice,
    };
    setAnswers({ ...answersRef.current });

    const isLast = questionIndex === QUESTIONS.length - 1;

    setTimeout(
      () => {
        if (!isLast) {
          const nextStage = STAGES[questionIndex + 1];
          setCurrentStage(nextStage);
          setIsTransitioning(false);
          transitionLockRef.current = false;
        } else {
          // Final Question answered: evaluate deterministically from authoritative answersRef
          const evalResult = evaluateAnswers(answersRef.current);
          setEvaluation(evalResult);
          setCurrentStage('reveal');
          setIsTransitioning(false);
          transitionLockRef.current = false;
        }
      },
      prefersReducedMotion ? 50 : 450
    );
  };

  // Handle Back button
  const handlePrev = () => {
    if (transitionLockRef.current || isTransitioning) return;
    if (questionIndex > 0) {
      setCurrentStage(STAGES[questionIndex - 1]);
    } else if (questionIndex === 0) {
      setCurrentStage('landing');
    }
  };

  // Reset to landing
  const handleReset = () => {
    transitionLockRef.current = false;
    answersRef.current = {};
    setAnswers({});
    setEvaluation(null);
    setCurrentStage('landing');
    setIsTransitioning(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a081a] text-white select-none">
      {/* 3D WebGL Twilight Experience Background */}
      <SurrealCanvas
        currentStage={currentStage}
        selectedChoice={questionIndex >= 0 ? answers[QUESTIONS[questionIndex].id] : undefined}
        onSelectChoice={handleSelectChoice}
        isTransitioning={isTransitioning}
      />

      {/* Screen 1: Landing Overlay */}
      {currentStage === 'landing' && (
        <Landing3D onEnter={handleEnterInBetween} />
      )}

      {/* Screen 2-7: 6 Spatial Questions (Stages Q1 to Q6) */}
      {questionIndex >= 0 && (
        <StageOverlay
          question={QUESTIONS[questionIndex]}
          currentIndex={questionIndex}
          totalQuestions={QUESTIONS.length}
          selectedOption={answers[QUESTIONS[questionIndex].id]}
          onSelectOption={handleSelectChoice}
          onPrev={handlePrev}
          isTransitioning={isTransitioning}
        />
      )}

      {/* Screen 8: The Keeper In-World Guide & Conversational Identity Reveal */}
      {currentStage === 'reveal' && evaluation && (
        <div className="fixed inset-0 z-20 overflow-hidden flex items-center justify-center p-2 sm:p-4">
          <KeeperChatView
            evaluation={evaluation}
            userAnswers={answers}
            onReset={handleReset}
          />
        </div>
      )}

      {/* Persistent Quiet Top Navigation Controls (Landing screen only to keep questions and chat pristine) */}
      {currentStage === 'landing' && (
        <div className="fixed top-4 right-4 z-30 flex items-center gap-3 font-mono text-xs">
          <button
            onClick={() => setShowAboutBureau(true)}
            className="px-3 py-1.5 rounded-sm border border-[#3b3560] bg-[#0c0922]/80 backdrop-blur-md text-[#c7d2fe] hover:border-[#818cf8] hover:text-white transition-colors cursor-pointer"
          >
            Charter
          </button>
          <button
            onClick={() => setShowJurisdictions(true)}
            className="px-3 py-1.5 rounded-sm border border-[#3b3560] bg-[#0c0922]/80 backdrop-blur-md text-[#c7d2fe] hover:border-[#818cf8] hover:text-white transition-colors cursor-pointer"
          >
            Jurisdictions
          </button>
          <button
            onClick={() => setShowMethodologyGlobal(true)}
            className="px-3 py-1.5 rounded-sm border border-[#3b3560] bg-[#0c0922]/80 backdrop-blur-md text-[#c7d2fe] hover:border-[#818cf8] hover:text-white transition-colors cursor-pointer"
          >
            Methodology
          </button>
        </div>
      )}

      {/* Global Modals */}
      {showJurisdictions && (
        <JurisdictionsModal onClose={() => setShowJurisdictions(false)} />
      )}

      {showAboutBureau && (
        <AboutBureauModal onClose={() => setShowAboutBureau(false)} />
      )}

      {showMethodologyGlobal && (
        <MethodologyModal
          scores={
            evaluation?.scores || {
              care_repair: 0,
              curiosity_exploration: 0,
              memory_story: 0,
              independence_play: 0,
            }
          }
          onClose={() => setShowMethodologyGlobal(false)}
        />
      )}
    </div>
  );
}
