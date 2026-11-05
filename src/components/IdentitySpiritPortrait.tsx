import React from 'react';

export const SPIRIT_PIDS = [
  'cloud_mender',
  'dream_archivist',
  'moon_lost_found',
  'time_gardener',
  'night_shift_shopkeeper',
  'door_cartographer',
  'ocean_memory_librarian',
  'comet_postperson',
  'weather_translator',
  'stardust_baker',
  'midnight_lighthouse_keeper',
  'gravity_tailor',
] as const;

export type SpiritProfileId = (typeof SPIRIT_PIDS)[number];

export const SPIRIT_METADATA: Record<
  SpiritProfileId,
  {
    col: number;
    row: number;
    xPercent: string;
    yPercent: string;
    name: string;
    propDescription: string;
  }
> = {
  cloud_mender: {
    col: 0,
    row: 0,
    xPercent: '0%',
    yPercent: '0%',
    name: 'Cloud Mender',
    propDescription: 'Golden spirit stitching altocumulus clouds with glowing needle',
  },
  dream_archivist: {
    col: 1,
    row: 0,
    xPercent: '33.333333%',
    yPercent: '0%',
    name: 'Dream Archivist',
    propDescription: 'Dewdrop spirit reading illuminated book with crescent moon',
  },
  moon_lost_found: {
    col: 2,
    row: 0,
    xPercent: '66.666667%',
    yPercent: '0%',
    name: 'Moon Lost-and-Found Clerk',
    propDescription: 'Crescent-horned spirit holding oversized antique brass key',
  },
  time_gardener: {
    col: 3,
    row: 0,
    xPercent: '100%',
    yPercent: '0%',
    name: 'Time Gardener',
    propDescription: 'Sproutling spirit holding hourglass and fresh seedling leaf',
  },
  night_shift_shopkeeper: {
    col: 0,
    row: 1,
    xPercent: '0%',
    yPercent: '50%',
    name: 'Interstellar Night-Shift Shopkeeper',
    propDescription: 'Lantern-stalked spirit with apron and grocery bag of jars and stars',
  },
  door_cartographer: {
    col: 1,
    row: 1,
    xPercent: '33.333333%',
    yPercent: '50%',
    name: 'Secret Door Cartographer',
    propDescription: 'Keyhole-crested spirit reading living celestial chart with travel pack',
  },
  ocean_memory_librarian: {
    col: 2,
    row: 1,
    xPercent: '66.666667%',
    yPercent: '50%',
    name: 'Ocean Memory Librarian',
    propDescription: 'Bioluminescent jellyfish spirit holding bottle of captured ocean waves',
  },
  comet_postperson: {
    col: 3,
    row: 1,
    xPercent: '100%',
    yPercent: '50%',
    name: 'Comet Postperson',
    propDescription: 'Streaming starlight spirit with satchel delivering intergalactic letter',
  },
  weather_translator: {
    col: 0,
    row: 2,
    xPercent: '0%',
    yPercent: '100%',
    name: 'Weather Translator',
    propDescription: 'Radiant cloaked spirit sheltered beneath gentle raincloud and mist',
  },
  stardust_baker: {
    col: 1,
    row: 2,
    xPercent: '33.333333%',
    yPercent: '100%',
    name: 'Stardust Baker',
    propDescription: 'Plump baker spirit with toque and apron holding sugar-dusted star cookie',
  },
  midnight_lighthouse_keeper: {
    col: 2,
    row: 2,
    xPercent: '66.666667%',
    yPercent: '100%',
    name: 'Midnight Lighthouse Keeper',
    propDescription: 'Hooded glowing spirit bearing high brass beacon staff',
  },
  gravity_tailor: {
    col: 3,
    row: 2,
    xPercent: '100%',
    yPercent: '100%',
    name: 'Gravity Tailor',
    propDescription: 'Nimble spirit holding shears and tailoring shimmering spacetime ribbon',
  },
};

interface IdentitySpiritPortraitProps {
  profileId: string;
  size?: number | string;
  className?: string;
  alt?: string;
}

export const IdentitySpiritPortrait: React.FC<IdentitySpiritPortraitProps> = ({
  profileId,
  size = 160,
  className = '',
  alt,
}) => {
  const pid = (profileId as SpiritProfileId) in SPIRIT_METADATA ? (profileId as SpiritProfileId) : 'cloud_mender';
  const meta = SPIRIT_METADATA[pid];
  const sizePx = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`relative shrink-0 select-none aspect-square filter drop-shadow-[0_4px_16px_rgba(251,191,36,0.35)] ${className}`}
      style={{
        width: sizePx,
        height: sizePx,
        backgroundImage: "url('/assets/identity-spirits-atlas.png')",
        backgroundSize: '400% 300%',
        backgroundPosition: `${meta.xPercent} ${meta.yPercent}`,
        backgroundRepeat: 'no-repeat',
      }}
      role="img"
      aria-label={alt || `${meta.name} spirit creature (${meta.propDescription})`}
      title={`${meta.name} — ${meta.propDescription}`}
    />
  );
};

