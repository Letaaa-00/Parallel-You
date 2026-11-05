import React from 'react';

interface EmblemProps {
  name: string;
  className?: string;
  size?: number;
}

export const Emblem: React.FC<EmblemProps> = ({ name, className = 'w-16 h-16', size = 64 }) => {
  switch (name) {
    case 'cloud_mender':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Cloud outline */}
          <path d="M18 42h28a12 12 0 0 0 4-23.3 14 14 0 0 0-26.6-4.2A11 11 0 0 0 18 42z" />
          {/* Sewing needle */}
          <line x1="48" y1="14" x2="36" y2="28" stroke="#E04836" strokeWidth="2" />
          <circle cx="49" cy="13" r="1.5" fill="#E04836" />
          {/* Mending stitches */}
          <line x1="26" y1="36" x2="30" y2="34" strokeDasharray="2 2" stroke="#1D4ED8" />
          <line x1="33" y1="35" x2="37" y2="33" strokeDasharray="2 2" stroke="#1D4ED8" />
          {/* Gentle rain drops */}
          <line x1="22" y1="47" x2="20" y2="52" />
          <line x1="32" y1="47" x2="30" y2="53" />
          <line x1="42" y1="47" x2="40" y2="52" />
        </svg>
      );

    case 'dream_archivist':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Open archival ledger */}
          <path d="M10 44c8-3 18-3 22 2 4-5 14-5 22-2V16c-8-3-18-3-22 2-4-5-14-5-22-2v28z" />
          <line x1="32" y1="18" x2="32" y2="46" />
          {/* Crescent moon rising from book */}
          <path d="M37 13a7 7 0 0 0 7-7 6 6 0 1 1-7 7z" stroke="#1D4ED8" strokeWidth="1.75" />
          {/* Constellation sparkles */}
          <circle cx="21" cy="24" r="1" fill="currentColor" />
          <circle cx="26" cy="30" r="1" fill="currentColor" />
          <circle cx="17" cy="34" r="1" fill="currentColor" />
          <line x1="21" y1="24" x2="26" y2="30" strokeDasharray="1.5 1.5" />
          <line x1="26" y1="30" x2="17" y2="34" strokeDasharray="1.5 1.5" />
          {/* Bookmark ribbon */}
          <path d="M32 46v6l3-2 3 2v-6" stroke="#E04836" fill="none" />
        </svg>
      );

    case 'moon_lost_found':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Large crescent moon cradle */}
          <path d="M38 10a20 20 0 1 0 14 28 17 17 0 0 1-14-28z" stroke="#0E1A2B" strokeWidth="2" />
          {/* Vintage skeleton key */}
          <circle cx="24" cy="28" r="5" stroke="#E04836" />
          <line x1="29" y1="28" x2="46" y2="28" stroke="#E04836" strokeWidth="2" />
          <line x1="42" y1="28" x2="42" y2="33" stroke="#E04836" />
          <line x1="46" y1="28" x2="46" y2="32" stroke="#E04836" />
          {/* Tag hanging */}
          <path d="M22 38l6 6h8l4-4-6-6h-8z" stroke="#1D4ED8" />
          <circle cx="25" cy="41" r="1" fill="#1D4ED8" />
        </svg>
      );

    case 'time_gardener':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Hourglass plates */}
          <line x1="18" y1="12" x2="46" y2="12" strokeWidth="2.5" />
          <line x1="18" y1="52" x2="46" y2="52" strokeWidth="2.5" />
          {/* Hourglass glass bulbs */}
          <path d="M22 12c0 14 10 18 10 20s-10 6-10 20h20c0-14-10-18-10-20s10-6 10-20H22z" />
          {/* Sprouting leaf through waist */}
          <path d="M32 32c5-3 9-1 12 3-3 5-7 5-12-3z" stroke="#1D4ED8" fill="#1D4ED8" fillOpacity="0.1" />
          <path d="M32 32c-5 3-9 1-12-3 3-5 7-5 12 3z" stroke="#E04836" fill="#E04836" fillOpacity="0.1" />
          {/* Dripping grain */}
          <circle cx="32" cy="42" r="1.5" fill="currentColor" />
          <circle cx="32" cy="46" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'night_shift_shopkeeper':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Hanging shop lantern */}
          <path d="M32 10v6" strokeWidth="2" />
          <polygon points="24,18 40,18 44,40 20,40" />
          <line x1="20" y1="40" x2="44" y2="40" strokeWidth="2" />
          <polygon points="26,40 38,40 35,46 29,46" fill="currentColor" fillOpacity="0.2" />
          {/* Interior warm flame / kettle steam */}
          <circle cx="32" cy="28" r="4" stroke="#E04836" fill="#E04836" fillOpacity="0.2" />
          {/* Radiating quiet night rays */}
          <line x1="14" y1="28" x2="18" y2="28" stroke="#1D4ED8" strokeDasharray="2 2" />
          <line x1="46" y1="28" x2="50" y2="28" stroke="#1D4ED8" strokeDasharray="2 2" />
          <line x1="18" y1="18" x2="21" y2="21" stroke="#1D4ED8" strokeDasharray="2 2" />
          <line x1="46" y1="18" x2="43" y2="21" stroke="#1D4ED8" strokeDasharray="2 2" />
          {/* Little counter cup */}
          <path d="M26 54h12v-4H26v4z" />
          <path d="M38 51h2a2 2 0 0 1 0 2h-2" />
        </svg>
      );

    case 'door_cartographer':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Arched doorway */}
          <path d="M20 52V28a12 12 0 0 1 24 0v24" strokeWidth="2" />
          <line x1="16" y1="52" x2="48" y2="52" strokeWidth="2.5" />
          {/* Keyhole */}
          <circle cx="32" cy="34" r="3" stroke="#E04836" />
          <polygon points="30.5,36 33.5,36 34,42 30,42" stroke="#E04836" fill="#E04836" />
          {/* Cartographer's quadrant coordinates & compass arc */}
          <circle cx="32" cy="28" r="18" strokeDasharray="3 3" stroke="#1D4ED8" />
          <line x1="32" y1="6" x2="32" y2="10" stroke="#1D4ED8" strokeWidth="2" />
          <line x1="10" y1="28" x2="14" y2="28" stroke="#1D4ED8" strokeWidth="2" />
          <line x1="50" y1="28" x2="54" y2="28" stroke="#1D4ED8" strokeWidth="2" />
        </svg>
      );

    case 'ocean_memory_librarian':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Apothecary glass specimen jar */}
          <rect x="24" y="10" width="16" height="5" rx="1.5" strokeWidth="2" />
          <path d="M26 15v4c-6 4-8 10-8 16 0 10 6 16 14 16s14-6 14-16c0-6-2-12-8-16v-4" strokeWidth="1.75" />
          {/* Gentle trapped wave ripples */}
          <path d="M22 36c3-2 6 2 9 0s6-2 9 0" stroke="#1D4ED8" strokeWidth="1.75" />
          <path d="M24 42c3-2 5 2 8 0s5-2 8 0" stroke="#1D4ED8" strokeWidth="1.75" />
          {/* Miniature message parchment */}
          <rect x="29" y="24" width="6" height="8" rx="1" stroke="#E04836" />
          <line x1="31" y1="27" x2="33" y2="27" stroke="#E04836" />
        </svg>
      );

    case 'comet_postperson':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Flying postal letter */}
          <rect x="18" y="22" width="28" height="20" rx="2" strokeWidth="2" transform="rotate(-12 32 32)" />
          <path d="M19 23l14 11 13-11" transform="rotate(-12 32 32)" stroke="#E04836" />
          {/* Comet tail & orbital speed lines */}
          <path d="M10 46c10-2 20-8 28-20" stroke="#1D4ED8" strokeWidth="2" strokeDasharray="4 2" />
          <path d="M14 52c10-2 18-7 24-18" stroke="#1D4ED8" strokeWidth="1.5" />
          <circle cx="50" cy="16" r="3" fill="#E04836" />
          <circle cx="50" cy="16" r="6" stroke="#E04836" strokeDasharray="2 2" />
        </svg>
      );

    case 'weather_translator':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Barometer dial circle */}
          <circle cx="32" cy="32" r="22" strokeWidth="2" />
          <circle cx="32" cy="32" r="17" strokeDasharray="3 3" stroke="#0E1A2B" strokeOpacity="0.4" />
          {/* Compass/dial pointer */}
          <polygon points="32,16 34.5,32 32,34 29.5,32" stroke="#E04836" fill="#E04836" />
          <circle cx="32" cy="32" r="2.5" fill="#0E1A2B" />
          {/* Dialogue balloon accent */}
          <path d="M42 12c4 0 7 2 7 5 0 2-2 4-5 5l-1 3-2-2c-1 0-3 0-3-1" stroke="#1D4ED8" strokeWidth="1.5" />
          {/* Gentle wind marks */}
          <path d="M12 40h6" stroke="#1D4ED8" />
          <path d="M15 44h8" stroke="#1D4ED8" />
        </svg>
      );

    case 'stardust_baker':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Baker's peel shovel */}
          <circle cx="32" cy="27" r="15" strokeWidth="2" />
          <line x1="32" y1="42" x2="32" y2="56" strokeWidth="2.5" />
          {/* Twinkling star croissant on peel */}
          <path d="M24 28c3-6 13-6 16 0-3 2-13 2-16 0z" stroke="#E04836" fill="#E04836" fillOpacity="0.1" />
          {/* 4-point star accent */}
          <path d="M32 17l1.5 4.5L38 23l-4.5 1.5L32 29l-1.5-4.5L26 23l4.5-1.5z" stroke="#1D4ED8" fill="#1D4ED8" fillOpacity="0.3" />
          {/* Flour specks */}
          <circle cx="20" cy="18" r="1" fill="#E04836" />
          <circle cx="44" cy="20" r="1" fill="#E04836" />
          <circle cx="42" cy="36" r="1" fill="#1D4ED8" />
        </svg>
      );

    case 'midnight_lighthouse_keeper':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Lighthouse tower */}
          <polygon points="26,52 38,52 35,22 29,22" strokeWidth="2" />
          {/* Lantern room and dome */}
          <rect x="27" y="16" width="10" height="6" strokeWidth="1.5" />
          <path d="M28 16c0-3 4-5 4-5s4 2 4 5" strokeWidth="1.5" />
          {/* Light beam */}
          <polygon points="37,18 56,10 56,26 37,20" stroke="#1D4ED8" fill="#1D4ED8" fillOpacity="0.1" strokeDasharray="3 2" />
          {/* Base rock */}
          <path d="M16 52c6-2 10 0 16-1s12 1 18 1" strokeWidth="2.5" />
          <circle cx="32" cy="19" r="1.5" fill="#E04836" />
        </svg>
      );

    case 'gravity_tailor':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Antique tailor's shears */}
          <circle cx="22" cy="46" r="5" strokeWidth="1.75" />
          <circle cx="42" cy="46" r="5" strokeWidth="1.75" />
          <line x1="26" y1="42" x2="38" y2="18" strokeWidth="2" stroke="#E04836" />
          <line x1="38" y1="42" x2="26" y2="18" strokeWidth="2" stroke="#E04836" />
          <circle cx="32" cy="30" r="1.75" fill="#0E1A2B" />
          {/* Curved warp / spacetime grid lines */}
          <path d="M12 24c12 6 28 6 40 0" stroke="#1D4ED8" strokeDasharray="2.5 2.5" />
          <path d="M12 36c12 6 28 6 40 0" stroke="#1D4ED8" strokeDasharray="2.5 2.5" />
          <circle cx="32" cy="14" r="1.5" fill="#1D4ED8" />
        </svg>
      );

    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
        >
          <circle cx="32" cy="32" r="22" />
          <circle cx="32" cy="32" r="8" strokeDasharray="3 3" />
        </svg>
      );
  }
};
