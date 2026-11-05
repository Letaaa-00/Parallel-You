import React, { useState } from 'react';
import { QuizEvaluationResult } from '../data/quizData';
import { Emblem } from './Emblem';
import { IdentitySpiritPortrait } from './IdentitySpiritPortrait';
import { downloadIdentityCard } from '../utils/cardCanvas';
import { ReviewModal } from './ReviewModal';
import { MethodologyModal } from './MethodologyModal';
import {
  Download,
  RotateCcw,
  CheckCircle2,
  FileSearch,
  HelpCircle,
  Clock,
  Sparkles,
  AlertTriangle,
  Briefcase,
  Compass,
} from 'lucide-react';

interface ResultViewProps {
  evaluation: QuizEvaluationResult;
  onReset: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ evaluation, onReset }) => {
  const { profile, serialNumber, observations, scores } = evaluation;
  const [showReview, setShowReview] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadIdentityCard(profile, serialNumber);
    } finally {
      setTimeout(() => setIsDownloading(false), 500);
    }
  };

  return (
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 md:py-14 my-auto overflow-y-auto max-h-[96vh]">
      {/* Action Banner on Top */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 bg-[#0e0a24]/85 border border-[#2e2652] p-3 rounded-sm backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-2 font-mono text-xs text-[#c7d2fe]">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
          <span>DOSSIER #{serialNumber}</span>
          <span aria-hidden="true">·</span>
          <span>OFFICIAL PARALLEL REGISTRATION</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowReview(true)}
            className="px-3.5 py-1.5 text-xs font-mono text-[#334155] border border-[#D5CBBA] bg-[#FFFDF8] hover:bg-[#F2EDDE] rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <FileSearch className="w-3.5 h-3.5 text-[#1D4ED8]" />
            <span>Review my answers</span>
          </button>

          <button
            onClick={() => setShowMethodology(true)}
            className="px-3.5 py-1.5 text-xs font-mono text-[#334155] border border-[#D5CBBA] bg-[#FFFDF8] hover:bg-[#F2EDDE] rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#526071]" />
            <span>How identities are assigned</span>
          </button>
        </div>
      </div>

      {/* The Physical-Style Identity Document */}
      <div className="paper-card p-6 sm:p-10 md:p-12 rounded-sm border-2 border-[#D8CFB8] relative shadow-lg overflow-hidden">
        {/* Subtle decorative security line watermark across card top */}
        <div className="pb-6 border-b border-[#E4DEC9] flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-[#5E6D82]">
              Multiverse Registry · Department of Temporal Transit
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0E1A2B] tracking-tight mt-1">
              Parallel Identity Credential
            </h1>
          </div>

          {/* Rubber Stamp */}
          <div className="shrink-0 pt-1">
            <div className="rubber-stamp text-xs sm:text-sm">
              APPROVED
            </div>
          </div>
        </div>

        {/* Top Identification Block: Emblem + Primary Titles */}
        <div className="mt-8 flex flex-col md:flex-row items-center md:items-start gap-8 pb-8 border-b border-[#E4DEC9]">
          {/* Portrait Frame with Matched Spirit Creature */}
          <div className="shrink-0 p-3 bg-[#FFFDF7] border-2 border-[#D8CFB8] rounded-sm shadow-md flex flex-col items-center justify-center relative">
            <IdentitySpiritPortrait profileId={profile.id} size={112} />
            <div
              className="absolute -bottom-2 -right-2 w-7 h-7 bg-[#FFFDF7] border border-[#C7BC9F] rounded-full flex items-center justify-center shadow-xs"
              title="Official Insignia Seal"
            >
              <Emblem name={profile.emblemKey} size={18} className="w-4 h-4 text-[#0E1A2B]" />
            </div>
          </div>

          {/* Titles & Jurisdiction */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="font-mono text-xs text-[#1D4ED8] font-bold tracking-widest uppercase">
              Universe {profile.universeCode} // {profile.universeName}
            </div>

            <div className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0E1A2B] leading-tight">
              {profile.title}
            </div>

            <p className="font-serif text-lg text-[#334155] italic max-w-xl leading-relaxed">
              "{profile.summary}"
            </p>

            <div className="pt-2 font-mono text-xs text-[#526071] flex flex-wrap items-center justify-center md:justify-start gap-3">
              <span>Serial: {serialNumber}</span>
              <span aria-hidden="true">·</span>
              <span>Status: Cleared for Entry</span>
              <span aria-hidden="true">·</span>
              <span>Class: First Rank</span>
            </div>
          </div>
        </div>

        {/* Detailed Fields Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-[#E4DEC9]">
          {/* Primary Mandate */}
          <div className="space-y-1.5 md:col-span-2">
            <div className="flex items-center gap-2 font-mono text-xs text-[#6B7B8E] uppercase tracking-wider">
              <Briefcase className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>Job Description & Daily Mandate</span>
            </div>
            <p className="font-serif text-lg text-[#0E1A2B] leading-relaxed">
              {profile.jobDescription}
            </p>
          </div>

          {/* Special Ability */}
          <div className="p-4 bg-[#FAF7EE] border border-[#ECE5D3] rounded-sm space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs text-[#1E40AF] uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>Inherent Special Ability</span>
            </div>
            <p className="font-serif text-base text-[#0E1A2B] leading-relaxed">
              {profile.specialAbility}
            </p>
          </div>

          {/* Occupational Hazard */}
          <div className="p-4 bg-[#FAF7EE] border border-[#ECE5D3] rounded-sm space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs text-[#B45309] uppercase tracking-wider font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Documented Occupational Hazard</span>
            </div>
            <p className="font-serif text-base text-[#0E1A2B] leading-relaxed">
              {profile.occupationalHazard}
            </p>
          </div>

          {/* Office Hours */}
          <div className="p-4 bg-[#FAF7EE] border border-[#ECE5D3] rounded-sm space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs text-[#6B7B8E] uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#6B7B8E]" />
              <span>Authorized Office Hours</span>
            </div>
            <p className="font-serif text-base text-[#0E1A2B] leading-relaxed">
              {profile.officeHours}
            </p>
          </div>

          {/* Current Assignment */}
          <div className="p-4 bg-[#FAF7EE] border border-[#ECE5D3] rounded-sm space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs text-[#6B7B8E] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>Current Priority Assignment</span>
            </div>
            <p className="font-serif text-base text-[#0E1A2B] leading-relaxed">
              {profile.currentAssignment}
            </p>
          </div>
        </div>

        {/* "Why this universe chose you" section */}
        <div className="mt-8 space-y-4">
          <div className="font-mono text-xs uppercase tracking-wider text-[#0E1A2B] font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1D4ED8]" />
            <span>Why This Universe Chose You</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {observations.map((obs, index) => (
              <div
                key={index}
                className="p-4 border-l-2 border-[#1D4ED8] bg-[#FAF8F2] text-sm text-[#334155] font-serif leading-relaxed"
              >
                {obs}
              </div>
            ))}
          </div>
        </div>

        {/* Document Footer Verification */}
        <div className="mt-10 pt-6 border-t border-[#E4DEC9] flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-[#64748B]">
          <div>
            <span>FORM IIB-702-APPROVED</span>
            <span aria-hidden="true" className="mx-2">·</span>
            <span>ISSUED BY REGISTRAR OF PARALLEL SELVES</span>
          </div>
          <div>
            <span>STATION COORD: 44.18°N // PARALLEL QUADRANT B</span>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons Below Identity Document */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="w-full sm:w-auto px-7 py-3.5 bg-[#0E1A2B] text-[#FFFDF8] font-mono text-xs tracking-wider uppercase font-semibold rounded-sm hover:bg-[#1A2E4B] transition-colors flex items-center justify-center gap-2.5 shadow-md cursor-pointer"
        >
          <Download className="w-4 h-4 text-[#E04836]" />
          <span>{isDownloading ? 'Rendering credential...' : 'Save identity card (PNG)'}</span>
        </button>

        <button
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-3.5 bg-transparent border border-[#D5CBBA] text-[#334155] font-mono text-xs tracking-wider uppercase rounded-sm hover:bg-[#F2EDDE] hover:border-[#0E1A2B] transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#526071]" />
          <span>Start a new application</span>
        </button>
      </div>

      {/* Required Clarification Footer */}
      <footer className="mt-16 pt-8 border-t border-[#E4DEC9] text-center space-y-2">
        <p className="text-xs font-mono text-[#6A7B8E]">
          Parallel You is a fictional entertainment quiz. No personal records, emails, or biometric identifiers are stored.
        </p>
        <p className="text-[11px] font-mono text-[#8B98A8]">
          All dimensional calculations, card graphics, and downloads are processed locally inside your browser.
        </p>
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
          scores={scores}
          onClose={() => setShowMethodology(false)}
        />
      )}
    </div>
  );
};
