import React, { useState, useEffect, useRef } from 'react';
import { QuizEvaluationResult, generateCounterfactualSummary } from '../data/quizData';
import { UserAnswers } from '../types';
import { Emblem } from './Emblem';
import { IdentitySpiritPortrait } from './IdentitySpiritPortrait';
import { downloadIdentityCard } from '../utils/cardCanvas';
import { ReviewModal } from './ReviewModal';
import { MethodologyModal } from './MethodologyModal';
import {
  Send,
  Download,
  RotateCcw,
  FileSearch,
  HelpCircle,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Info,
  X,
} from 'lucide-react';
import { soundManager } from '../audio/synthAudio';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  isError?: boolean;
}

interface KeeperChatViewProps {
  evaluation: QuizEvaluationResult;
  userAnswers: UserAnswers;
  onReset: () => void;
}

const SUGGESTED_PROMPTS = [
  'Why this identity?',
  'What is a day in my other life like?',
  'What if I chose another door?',
  'What is my strangest occupational hazard?',
];

export const KeeperChatView: React.FC<KeeperChatViewProps> = ({
  evaluation,
  userAnswers,
  onReset,
}) => {
  const { profile, serialNumber } = evaluation;

  // Modals
  const [showReview, setShowReview] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isMissingKey, setIsMissingKey] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  // Scroll to bottom of transcript
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Download Identity Card PNG
  const handleDownload = async () => {
    setIsDownloading(true);
    soundManager.playSelect(0);
    try {
      await downloadIdentityCard(profile, serialNumber);
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  // Pre-generate counterfactual table for this specific user's answers
  const counterfactualsSummary = React.useMemo(() => {
    return generateCounterfactualSummary(userAnswers);
  }, [userAnswers]);

  // Grounded context payload
  const contextPayload = React.useMemo(() => {
    return {
      profile,
      serialNumber,
      scores: evaluation.scores,
      answeredOptions: evaluation.answeredOptions,
      counterfactualsSummary,
    };
  }, [profile, serialNumber, evaluation, counterfactualsSummary]);

  // Send message to server Gemini endpoint
  const sendMessageToServer = async (history: { role: 'user' | 'model'; content: string }[]) => {
    setIsLoading(true);
    setApiError(null);
    setIsMissingKey(false);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: history,
          context: contextPayload,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === 'MISSING_API_KEY') {
          setIsMissingKey(true);
          setApiError(data.message || 'GEMINI_API_KEY is not configured on the server.');
        } else {
          setApiError(data.message || 'The cosmic connection was interrupted. Please retry.');
        }
        return;
      }

      if (data.reply) {
        const modelMsg: ChatMessage = {
          id: `model-${Date.now()}`,
          role: 'model',
          content: data.reply,
        };
        setMessages((prev) => [...prev, modelMsg]);
        soundManager.playSelect(1);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setApiError(error?.message || 'Network error communicating with the bureau server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger initial greeting from The Keeper
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Send introductory prompt for The Keeper to greet and reveal occupation
    const initialPrompt = `Greetings, Keeper. I have stepped through the twilight portal into the Bureau. What is my assigned interdimensional identity dossier?`;

    sendMessageToServer([{ role: 'user', content: initialPrompt }]);
  }, []);

  // Handle user submitting a message
  const handleSend = (textToSend?: string) => {
    const text = (textToSend ?? inputValue).trim();
    if (!text || isLoading) return;

    soundManager.playSelect(2);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');

    // Format history for server
    const historyPayload = newMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    sendMessageToServer(historyPayload);
  };

  // Retry the last message or initial greeting
  const handleRetry = () => {
    if (isLoading) return;
    setApiError(null);

    const historyPayload = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    if (historyPayload.length === 0) {
      // Re-trigger initial greeting
      const initialPrompt = `Greetings, Keeper. I have stepped through the twilight portal into the Bureau. What is my assigned interdimensional identity dossier?`;
      sendMessageToServer([{ role: 'user', content: initialPrompt }]);
    } else {
      sendMessageToServer(historyPayload);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-5 py-3 md:py-5 flex flex-col h-[94vh] max-h-[920px]">
      {/* 1. Compact Top Bureau Identity Badge featuring the Authentic Matched Creature */}
      <header className="shrink-0 mb-3 bg-[#0d0924]/90 border border-[#373063] rounded-sm p-3.5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Prominent Identity Creature Portrait (116px) + Designation Details */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Matched Spirit Creature Portrait */}
          <div className="relative p-2 bg-[#FFFDF7] border-2 border-[#D8CFB8] rounded-sm shrink-0 flex items-center justify-center shadow-md">
            <IdentitySpiritPortrait profileId={profile.id} size={116} />
            {/* Small Secondary Seal in Corner */}
            <div
              className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#FFFDF7] border border-[#C7BC9F] rounded-full flex items-center justify-center shadow-xs"
              title="Official Insignia Seal"
            >
              <Emblem name={profile.emblemKey} size={18} className="w-4 h-4 text-[#0E1A2B]" />
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] text-[#818cf8] uppercase tracking-wider font-semibold">
                Universe {profile.universeCode} · {profile.universeName}
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#E04836]/20 text-[#f87171] border border-[#E04836]/40 rounded-2xs">
                APPROVED
              </span>
            </div>

            <div className="font-mono text-[10px] text-[#38bdf8] uppercase tracking-wider mt-0.5 font-medium">
              Your Assigned Multiverse Entity
            </div>

            <h1 className="font-serif text-xl sm:text-2xl text-white font-bold leading-tight truncate mt-0.5">
              {profile.title}
            </h1>

            <div className="font-mono text-[11px] text-[#94a3b8] flex items-center gap-2 mt-0.5">
              <span>Serial: {serialNumber}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#c7d2fe]">Status: Cleared for Entry</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex flex-wrap items-center justify-end gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="px-3.5 py-2 bg-[#4338ca] hover:bg-[#4f46e5] text-white font-mono text-xs font-semibold rounded-sm border border-[#6366f1]/60 flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            title="Download official archival credential PNG with matched creature portrait"
          >
            <Download className="w-3.5 h-3.5 text-[#fbcfe8]" />
            <span>{isDownloading ? 'Rendering PNG...' : 'Save card (PNG)'}</span>
          </button>

          <button
            onClick={() => setShowReview(true)}
            className="px-2.5 py-2 bg-[#140f35] hover:bg-[#1e174a] text-[#c7d2fe] font-mono text-xs rounded-sm border border-[#3b3560] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Review your 6 recorded choices"
          >
            <FileSearch className="w-3.5 h-3.5 text-[#818cf8]" />
            <span className="hidden sm:inline">Review</span>
          </button>

          <button
            onClick={() => setShowMethodology(true)}
            className="px-2.5 py-2 bg-[#140f35] hover:bg-[#1e174a] text-[#c7d2fe] font-mono text-xs rounded-sm border border-[#3b3560] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="How identities are assigned"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#94a3b8]" />
            <span className="hidden sm:inline">Methodology</span>
          </button>

          <button
            onClick={onReset}
            className="px-2.5 py-2 bg-[#140f35] hover:bg-[#1e174a] text-[#94a3b8] hover:text-white font-mono text-xs rounded-sm border border-[#3b3560] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Start a new application from the beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* 2. Main Atmospheric Stage & Twilight Dialogue Chamber */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-3.5">
        {/* Desktop Left Character Stage (~250px wide): Full Body Floating Keeper */}
        <aside className="hidden lg:flex flex-col w-[240px] xl:w-[260px] shrink-0 bg-[#0d0924]/90 border border-[#373063] rounded-sm p-4 backdrop-blur-md items-center justify-between shadow-xl relative overflow-hidden">
          {/* Subtle Starlight Background Glow */}
          <div className="absolute inset-0 bg-radial from-[#4338ca]/25 via-transparent to-transparent pointer-events-none" />

          {/* Top Stage Header */}
          <div className="z-10 w-full text-center pb-2 border-b border-[#2d2654]">
            <div className="font-mono text-[10px] text-[#818cf8] uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#fde047]" />
              <span>Bureau Guide</span>
            </div>
          </div>

          {/* Full-Body Tall Keeper Image with Gentle Slow Float */}
          <div className="z-10 relative my-auto py-2 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#818cf8]/15 blur-2xl rounded-full" />
            <img
              src="/assets/the-keeper.png"
              alt="The Keeper — celestial guide with luminous faceted head, gold orbit rings, and fibrous paper cloak"
              className="w-[200px] xl:w-[220px] max-h-[380px] object-contain animate-keeper-float relative z-10 filter drop-shadow-[0_10px_30px_rgba(129,140,248,0.35)] select-none pointer-events-none"
            />
          </div>

          {/* Bottom Stage Caption */}
          <div className="z-10 w-full text-center pt-2.5 border-t border-[#2d2654]">
            <h2 className="font-serif text-lg font-bold text-white tracking-wide">
              The Keeper
            </h2>
            <div className="font-mono text-[10px] text-[#a5b4fc] mt-0.5">
              Celestial Archivist
            </div>
            <p className="font-serif text-xs text-[#94a3b8] italic mt-1 leading-snug">
              "Tending the ledgers at the crossroads of all possible worlds."
            </p>
          </div>
        </aside>

        {/* Right: Conversational Chat Column */}
        <main className="flex-1 min-w-0 flex flex-col bg-[#0b081e]/85 border border-[#312a57] rounded-sm backdrop-blur-md shadow-2xl overflow-hidden relative">
          {/* Header Bar */}
          <div className="shrink-0 px-4 py-2.5 bg-[#120d30]/90 border-b border-[#28214b] flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2.5">
              {/* Keeper Avatar (Visible on all viewports, especially mobile where side stage is hidden) */}
              <img
                src="/assets/the-keeper-avatar.png"
                alt="The Keeper Avatar"
                className="w-7 h-7 rounded-full border border-[#818cf8]/70 object-cover shadow-sm shrink-0"
              />

              <div>
                <span className="font-semibold text-white">The Keeper</span>
                <span className="text-[#818cf8] text-[11px] ml-2 font-normal hidden sm:inline">
                  Interdimensional Identity Bureau Guide
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPrivacyInfo(true)}
                className="text-[#94a3b8] hover:text-[#c7d2fe] flex items-center gap-1 transition-colors text-[11px] cursor-pointer"
                title="Privacy & Data flow details"
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Data Info</span>
              </button>

              {apiError ? (
                <div className="flex items-center gap-1.5 text-[10px] text-[#f87171] bg-[#4c0519]/40 px-2 py-0.5 rounded-full border border-[#f43f5e]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
                  <span>Unavailable</span>
                </div>
              ) : messages.some((m) => m.role === 'model') ? (
                <div className="flex items-center gap-1.5 text-[10px] text-[#34d399] bg-[#064e3b]/30 px-2 py-0.5 rounded-full border border-[#059669]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-ping" />
                  <span>Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] text-[#38bdf8] bg-[#0c4a6e]/30 px-2 py-0.5 rounded-full border border-[#0284c7]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                  <span>Ready</span>
                </div>
              )}
            </div>
          </div>

          {/* Scrollable Conversation Transcript */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((msg) => {
              const isModel = msg.role === 'model';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isModel ? 'items-start justify-start' : 'items-end justify-end'}`}
                >
                  {isModel && (
                    <img
                      src="/assets/the-keeper-avatar.png"
                      alt="The Keeper"
                      className="w-8 h-8 rounded-full border border-[#818cf8]/80 object-cover shadow-sm shrink-0 mt-0.5"
                    />
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-sm p-3.5 sm:p-4 text-sm leading-relaxed transition-all ${
                      isModel
                        ? 'bg-[#18133b] border border-[#4338ca]/40 text-[#e2e8f0] font-serif shadow-md'
                        : 'bg-[#4338ca] text-white font-sans rounded-br-xs shadow-md ml-auto'
                    }`}
                  >
                    {isModel ? (
                      <div className="space-y-2 whitespace-pre-wrap">{msg.content}</div>
                    ) : (
                      <div>{msg.content}</div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <img
                  src="/assets/the-keeper-avatar.png"
                  alt="The Keeper"
                  className="w-8 h-8 rounded-full border border-[#818cf8]/80 object-cover shadow-sm shrink-0 mt-0.5 animate-pulse"
                />
                <div className="p-3.5 bg-[#18133b]/80 border border-[#4338ca]/30 rounded-sm text-xs font-mono text-[#a5b4fc] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#818cf8] animate-ping" />
                  <span>The Keeper is consulting the cosmic ledger...</span>
                </div>
              </div>
            )}

            {/* Error & Retry State */}
            {apiError && (
              <div className="p-4 bg-[#23121d] border border-[#f43f5e]/50 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#fca5a5]">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#f43f5e] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono font-semibold text-white">Transmission Notice</div>
                    <div className="font-sans text-[#fecdd3] mt-0.5">{apiError}</div>
                    {isMissingKey && (
                      <div className="font-mono text-[11px] text-[#e2e8f0] mt-1">
                        To enable live dialogue, add your <code className="bg-[#4c0519] px-1 py-0.5 rounded text-[#f43f5e]">GEMINI_API_KEY</code> in the AI Studio Secrets panel.
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleRetry}
                  className="px-3.5 py-1.5 bg-[#9f1239] hover:bg-[#be123c] text-white font-mono text-xs rounded-sm transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry transmission</span>
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. Suggested Prompt Chips (Wrapped to avoid horizontal cutoff) */}
          <div className="shrink-0 px-4 py-2.5 border-t border-[#231d44] bg-[#0e0a26]/90 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] text-[#64748b] uppercase tracking-wider shrink-0 mr-1">
              Suggest:
            </span>
            {SUGGESTED_PROMPTS.map((promptText, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(promptText)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#1c1642] hover:bg-[#2b2260] text-[#c7d2fe] border border-[#3b3560] hover:border-[#6366f1] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {promptText}
              </button>
            ))}
          </div>

          {/* 4. Freeform Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="shrink-0 p-3 sm:p-4 bg-[#0d0924] border-t border-[#2d2654] flex items-center gap-2.5"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask The Keeper about your parallel life, duties, or other doors..."
              disabled={isLoading}
              className="flex-1 bg-[#161038] border border-[#373063] focus:border-[#818cf8] focus:ring-1 focus:ring-[#818cf8] text-white placeholder-[#64748b] text-sm px-3.5 py-2.5 rounded-sm font-sans outline-hidden transition-all disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-4 py-2.5 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] hover:from-[#6366f1] hover:to-[#8b5cf6] text-white rounded-sm font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </main>
      </div>

      {/* Footer Reassurance & Honest Privacy Notice */}
      <footer className="shrink-0 mt-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#94a3b8]/70 px-1">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Scoring & PNG card render 100% browser-local. Chat powered by server-side Google Gemini.</span>
        </div>
        <div>
          <span>Department of Temporal Transit · Sector In-Between</span>
        </div>
      </footer>

      {/* Review Modal */}
      {showReview && (
        <ReviewModal
          evaluation={evaluation}
          onClose={() => setShowReview(false)}
        />
      )}

      {/* Methodology Modal */}
      {showMethodology && (
        <MethodologyModal
          scores={evaluation.scores}
          onClose={() => setShowMethodology(false)}
        />
      )}

      {/* Privacy & Architecture Info Modal */}
      {showPrivacyInfo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0E1A2B]/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="paper-card w-full max-w-lg rounded-sm border border-[#D5CBBA] p-6 relative shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#E4DEC9]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
                <h3 className="font-serif text-lg font-semibold text-[#0E1A2B]">
                  Privacy & System Boundaries
                </h3>
              </div>
              <button
                onClick={() => setShowPrivacyInfo(false)}
                className="p-1 text-[#64748b] hover:text-[#0E1A2B] rounded-sm cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 font-sans text-xs text-[#334155] leading-relaxed">
              <p>
                <strong>1. Deterministic Local Evaluation:</strong> Your dimensional vector calculations, archetypal profile assignment, and identity card PNG generation are executed entirely inside your browser. No external API can alter your assigned identity.
              </p>
              <p>
                <strong>2. Real Gemini Chat Relay:</strong> When speaking with The Keeper, your chat messages and fictional quiz choices are transmitted to the app’s backend server, which queries Google Gemini using a secure server-side API key. The API key is never exposed to your browser.
              </p>
              <p>
                <strong>3. Zero Personal Data:</strong> No real names, emails, biometrics, or personal trackers are collected, stored, or indexed. No database is connected.
              </p>
            </div>

            <div className="pt-3 border-t border-[#E4DEC9] flex justify-end">
              <button
                onClick={() => setShowPrivacyInfo(false)}
                className="px-4 py-1.5 bg-[#0E1A2B] text-white font-mono text-xs uppercase tracking-wider rounded-sm hover:bg-[#1A2E4B] cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
