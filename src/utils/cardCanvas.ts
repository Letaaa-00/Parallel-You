import { Profile } from '../types';

/**
 * Renders an official archival identity card onto a clean 2D HTML Canvas
 * and downloads it as a PNG file.
 * Zero external network requests, zero cross-origin dependencies.
 */
export async function downloadIdentityCard(profile: Profile, serialNumber: string) {
  const canvas = document.createElement('canvas');
  const width = 1000;
  const height = 1360;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Background Paper Fill (Warm Archival Ivory)
  ctx.fillStyle = '#FBF8F0';
  ctx.fillRect(0, 0, width, height);

  // Subtle paper grain/ruled background
  ctx.strokeStyle = '#F2EBDC';
  ctx.lineWidth = 1;
  for (let y = 80; y < height - 60; y += 32) {
    ctx.beginPath();
    ctx.moveTo(70, y);
    ctx.lineTo(width - 70, y);
    ctx.stroke();
  }

  // 2. Double Archival Border
  ctx.strokeStyle = '#D5CBBA';
  ctx.lineWidth = 2.5;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  ctx.strokeStyle = '#E7DFD0';
  ctx.lineWidth = 1;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Corner ornaments
  drawCornerOrnament(ctx, 40, 40);
  drawCornerOrnament(ctx, width - 40, 40);
  drawCornerOrnament(ctx, 40, height - 40);
  drawCornerOrnament(ctx, width - 40, height - 40);

  // 3. Bureau Header
  ctx.fillStyle = '#101F33';
  ctx.textAlign = 'center';

  // Subheader Monospace
  ctx.font = '600 13px "Space Mono", monospace';
  ctx.letterSpacing = '3px';
  ctx.fillText('INTERDIMENSIONAL IDENTITY BUREAU', width / 2, 95);

  ctx.fillStyle = '#64748B';
  ctx.font = '400 11px "Space Mono", monospace';
  ctx.letterSpacing = '1.5px';
  ctx.fillText('DEPARTMENT OF TEMPORAL TRANSIT · FORM IIB-702 · MULTIVERSE REGISTER', width / 2, 118);

  // Header Divider
  ctx.strokeStyle = '#D5CBBA';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(70, 138);
  ctx.lineTo(width - 70, 138);
  ctx.stroke();

  // 4. Serial & Status Ribbon
  ctx.textAlign = 'left';
  ctx.fillStyle = '#1E40AF';
  ctx.font = '700 13px "Space Mono", monospace';
  ctx.letterSpacing = '1px';
  ctx.fillText(`SERIAL: ${serialNumber}`, 75, 172);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#64748B';
  ctx.font = '500 12px "Space Mono", monospace';
  ctx.letterSpacing = '1px';
  ctx.fillText(`TRANSIT SECTOR ${profile.universeCode.toUpperCase()}`, width - 75, 172);

  // 5. Emblem Portrait Frame
  const emblemBoxX = 75;
  const emblemBoxY = 205;
  const emblemBoxSize = 210;

  ctx.fillStyle = '#FFFDF7';
  ctx.fillRect(emblemBoxX, emblemBoxY, emblemBoxSize, emblemBoxSize);
  ctx.strokeStyle = '#C7BC9F';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(emblemBoxX, emblemBoxY, emblemBoxSize, emblemBoxSize);

  // Emblem inner decorative border
  ctx.strokeStyle = '#E8E1CE';
  ctx.strokeRect(emblemBoxX + 6, emblemBoxY + 6, emblemBoxSize - 12, emblemBoxSize - 12);

  // Draw matched spirit creature from master atlas (col*362, row*362, 362, 362)
  const ATLAS_GRID: Record<string, { col: number; row: number }> = {
    cloud_mender: { col: 0, row: 0 },
    dream_archivist: { col: 1, row: 0 },
    moon_lost_found: { col: 2, row: 0 },
    time_gardener: { col: 3, row: 0 },
    night_shift_shopkeeper: { col: 0, row: 1 },
    door_cartographer: { col: 1, row: 1 },
    ocean_memory_librarian: { col: 2, row: 1 },
    comet_postperson: { col: 3, row: 1 },
    weather_translator: { col: 0, row: 2 },
    stardust_baker: { col: 1, row: 2 },
    midnight_lighthouse_keeper: { col: 2, row: 2 },
    gravity_tailor: { col: 3, row: 2 },
  };

  const gridCoord = ATLAS_GRID[profile.id] || { col: 0, row: 0 };
  let creatureLoaded = false;
  try {
    const atlasImg = new Image();
    atlasImg.crossOrigin = 'anonymous';
    await new Promise<void>((resolve) => {
      atlasImg.onload = () => {
        creatureLoaded = true;
        resolve();
      };
      atlasImg.onerror = () => resolve();
      atlasImg.src = '/assets/identity-spirits-atlas.png';
    });

    if (creatureLoaded && atlasImg.naturalWidth > 0) {
      // Draw sub-rectangle from 1448x1086 master atlas: col*362, row*362, 362, 362
      const sx = gridCoord.col * 362;
      const sy = gridCoord.row * 362;
      ctx.drawImage(
        atlasImg,
        sx,
        sy,
        362,
        362,
        emblemBoxX + 12,
        emblemBoxY + 12,
        emblemBoxSize - 24,
        emblemBoxSize - 24
      );

      // Draw secondary emblem seal in bottom-right corner of the frame
      ctx.fillStyle = '#FAF7EE';
      ctx.fillRect(emblemBoxX + emblemBoxSize - 44, emblemBoxY + emblemBoxSize - 44, 38, 38);
      ctx.strokeStyle = '#C7BC9F';
      ctx.lineWidth = 1;
      ctx.strokeRect(emblemBoxX + emblemBoxSize - 44, emblemBoxY + emblemBoxSize - 44, 38, 38);

      ctx.save();
      ctx.translate(emblemBoxX + emblemBoxSize - 25, emblemBoxY + emblemBoxSize - 25);
      ctx.scale(0.32, 0.32);
      drawEmblemArtwork(ctx, profile.emblemKey, 0, 0);
      ctx.restore();
    } else {
      drawEmblemArtwork(ctx, profile.emblemKey, emblemBoxX + emblemBoxSize / 2, emblemBoxY + emblemBoxSize / 2);
    }
  } catch {
    drawEmblemArtwork(ctx, profile.emblemKey, emblemBoxX + emblemBoxSize / 2, emblemBoxY + emblemBoxSize / 2);
  }

  // 6. Primary Vocation & Identity Header (Beside Emblem)
  const textLeft = 320;
  ctx.textAlign = 'left';

  // Monospace Category Tag
  ctx.fillStyle = '#6B7280';
  ctx.font = '600 12px "Space Mono", monospace';
  ctx.letterSpacing = '2px';
  ctx.fillText('OFFICIAL DESIGNATION', textLeft, 230);

  // Primary Vocation Title (Expressive Editorial Serif)
  ctx.fillStyle = '#0E1A2B';
  ctx.font = '700 38px "Cormorant Garamond", Georgia, serif';
  ctx.letterSpacing = '0px';
  ctx.fillText(profile.title, textLeft, 275);

  // Universe Subtitle
  ctx.fillStyle = '#1D4ED8';
  ctx.font = '600 16px "Space Mono", monospace';
  ctx.letterSpacing = '1px';
  ctx.fillText(`UNIVERSE ${profile.universeCode} // ${profile.universeName.toUpperCase()}`, textLeft, 310);

  // Summary quote
  ctx.fillStyle = '#475569';
  ctx.font = 'italic 16px "Cormorant Garamond", Georgia, serif';
  wrapText(ctx, `"${profile.summary}"`, textLeft, 342, 590, 22);

  // 7. Middle Rule
  ctx.strokeStyle = '#D5CBBA';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(70, 445);
  ctx.lineTo(width - 70, 445);
  ctx.stroke();

  // 8. Detailed Identity Fields
  let currentY = 485;

  // Field: Job Description
  drawFieldSection(
    ctx,
    'PRIMARY MANDATE & JURISDICTION',
    profile.jobDescription,
    75,
    currentY,
    width - 150
  );
  currentY += 120;

  // Field: Special Ability
  drawFieldSection(
    ctx,
    'INHERENT TEMPORAL ABILITY',
    profile.specialAbility,
    75,
    currentY,
    width - 150
  );
  currentY += 105;

  // Field: Occupational Hazard
  drawFieldSection(
    ctx,
    'KNOWN OCCUPATIONAL HAZARD',
    profile.occupationalHazard,
    75,
    currentY,
    width - 150
  );
  currentY += 105;

  // 2-Column Fields for Office Hours & Current Assignment
  const colWidth = (width - 150 - 40) / 2;

  // Field: Office Hours
  drawFieldSection(
    ctx,
    'OPERATIONAL HOURS',
    profile.officeHours,
    75,
    currentY,
    colWidth
  );

  // Field: Current Assignment
  drawFieldSection(
    ctx,
    'ACTIVE PRIORITY ASSIGNMENT',
    profile.currentAssignment,
    75 + colWidth + 40,
    currentY,
    colWidth
  );

  // 9. Coral Rubber "APPROVED" Stamp (Tilted, Authentic Distress)
  drawCoralApprovedStamp(ctx, 640, 890, serialNumber);

  // 10. Bottom Security / Barcode Section
  const bottomY = height - 155;
  ctx.strokeStyle = '#D5CBBA';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(70, bottomY);
  ctx.lineTo(width - 70, bottomY);
  ctx.stroke();

  // Barcode representation
  drawFauxBarcode(ctx, 75, bottomY + 22, 220, 36);

  ctx.fillStyle = '#64748B';
  ctx.font = '500 11px "Space Mono", monospace';
  ctx.letterSpacing = '1px';
  ctx.textAlign = 'left';
  ctx.fillText('IDENTITY CERTIFIED BY PARALLEL REGISTRAR GENERAL', 75, bottomY + 76);

  // Signature line on right
  ctx.strokeStyle = '#64748B';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width - 320, bottomY + 50);
  ctx.lineTo(width - 75, bottomY + 50);
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#64748B';
  ctx.font = '400 11px "Space Mono", monospace';
  ctx.fillText('AUTHORIZED REGISTRAR SIGNATURE', width - 198, bottomY + 68);

  ctx.font = 'italic 20px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#1D4ED8';
  ctx.fillText('E. M. Althea-Thorne, Bureau Chancellor', width - 198, bottomY + 40);

  // Convert canvas to download
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `parallel-you-${profile.id}-identity-card.png`;
  link.href = image;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function drawFieldSection(
  ctx: CanvasRenderingContext2D,
  label: string,
  value: string,
  x: number,
  y: number,
  maxWidth: number
) {
  ctx.textAlign = 'left';
  // Monospace Label
  ctx.fillStyle = '#4B5563';
  ctx.font = '700 11px "Space Mono", monospace';
  ctx.letterSpacing = '1.5px';
  ctx.fillText(label, x, y);

  // Value text
  ctx.fillStyle = '#0E1A2B';
  ctx.font = '500 18px "Cormorant Garamond", Georgia, serif';
  ctx.letterSpacing = '0.2px';
  wrapText(ctx, value, x, y + 26, maxWidth, 26);
}

function drawCornerOrnament(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.fillStyle = '#94A3B8';
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawFauxBarcode(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = '#1E293B';
  let curX = x;
  const pattern = [2, 1, 3, 1, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2, 4, 1, 2, 1];
  for (const barWidth of pattern) {
    ctx.fillRect(curX, y, barWidth * 2, h);
    curX += (barWidth * 2) + 2.5;
    if (curX > x + w) break;
  }
}

function drawCoralApprovedStamp(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  serial: string
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate((-8 * Math.PI) / 180);

  const stampW = 280;
  const stampH = 100;

  // Distressed stamp background border
  ctx.strokeStyle = '#E04836';
  ctx.lineWidth = 3.5;
  ctx.setLineDash([8, 4]);
  ctx.strokeRect(-stampW / 2, -stampH / 2, stampW, stampH);

  ctx.lineWidth = 1;
  ctx.setLineDash([]);
  ctx.strokeRect(-stampW / 2 + 5, -stampH / 2 + 5, stampW - 10, stampH - 10);

  ctx.fillStyle = '#E04836';
  ctx.textAlign = 'center';

  ctx.font = '700 28px "Space Mono", monospace';
  ctx.letterSpacing = '6px';
  ctx.fillText('APPROVED', 0, -4);

  ctx.font = '700 11px "Space Mono", monospace';
  ctx.letterSpacing = '2px';
  ctx.fillText('INTERDIMENSIONAL TRANSIT', 0, 18);

  ctx.font = '500 10px "Space Mono", monospace';
  ctx.letterSpacing = '1px';
  ctx.fillText(`VALIDATED // ${serial.slice(0, 12)}`, 0, 34);

  ctx.restore();
}

function drawEmblemArtwork(
  ctx: CanvasRenderingContext2D,
  emblemKey: string,
  cx: number,
  cy: number
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = '#0E1A2B';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  switch (emblemKey) {
    case 'cloud_mender':
      // Cloud
      ctx.beginPath();
      ctx.arc(-20, 5, 20, Math.PI * 0.8, Math.PI * 1.8);
      ctx.arc(5, -15, 25, Math.PI * 1.1, Math.PI * 2.0);
      ctx.arc(28, 5, 18, Math.PI * 1.5, Math.PI * 0.3);
      ctx.lineTo(-20, 25);
      ctx.stroke();

      // Needle
      ctx.strokeStyle = '#E04836';
      ctx.beginPath();
      ctx.moveTo(35, -35);
      ctx.lineTo(10, -5);
      ctx.stroke();
      break;

    case 'dream_archivist':
      // Ledger Book
      ctx.beginPath();
      ctx.moveTo(-45, 25);
      ctx.quadraticCurveTo(-15, 15, 0, 30);
      ctx.quadraticCurveTo(15, 15, 45, 25);
      ctx.lineTo(45, -20);
      ctx.quadraticCurveTo(15, -30, 0, -15);
      ctx.quadraticCurveTo(-15, -30, -45, -20);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(0, 30);
      ctx.stroke();

      // Crescent Moon
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.arc(18, -32, 14, 0.4, Math.PI * 1.4);
      ctx.stroke();
      break;

    case 'moon_lost_found':
      // Crescent Moon
      ctx.beginPath();
      ctx.arc(0, 0, 45, 0.5, Math.PI * 1.6);
      ctx.stroke();

      // Skeleton Key
      ctx.strokeStyle = '#E04836';
      ctx.beginPath();
      ctx.arc(-15, 0, 12, 0, Math.PI * 2);
      ctx.moveTo(-3, 0);
      ctx.lineTo(35, 0);
      ctx.lineTo(35, 12);
      ctx.moveTo(25, 0);
      ctx.lineTo(25, 10);
      ctx.stroke();
      break;

    case 'time_gardener':
      // Hourglass
      ctx.beginPath();
      ctx.moveTo(-30, -45);
      ctx.lineTo(30, -45);
      ctx.moveTo(-30, 45);
      ctx.lineTo(30, 45);
      ctx.moveTo(-25, -45);
      ctx.bezierCurveTo(-5, -20, -5, -10, 0, 0);
      ctx.bezierCurveTo(5, -10, 5, -20, 25, -45);
      ctx.moveTo(-25, 45);
      ctx.bezierCurveTo(-5, 20, -5, 10, 0, 0);
      ctx.bezierCurveTo(5, 10, 5, 20, 25, 45);
      ctx.stroke();

      // Leaf sprout
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.arc(0, 0, 18, 0, Math.PI * 0.5);
      ctx.stroke();
      break;

    case 'night_shift_shopkeeper':
      // Lantern
      ctx.beginPath();
      ctx.moveTo(0, -35);
      ctx.lineTo(0, -25);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-16, -25);
      ctx.lineTo(16, -25);
      ctx.lineTo(24, 15);
      ctx.lineTo(-24, 15);
      ctx.closePath();
      ctx.stroke();
      // Cup & steam
      ctx.strokeStyle = '#E04836';
      ctx.beginPath();
      ctx.arc(0, -5, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.moveTo(-8, 30);
      ctx.lineTo(8, 30);
      ctx.lineTo(6, 40);
      ctx.lineTo(-6, 40);
      ctx.closePath();
      ctx.stroke();
      break;

    case 'door_cartographer':
      // Arched doorway
      ctx.beginPath();
      ctx.moveTo(-20, 40);
      ctx.lineTo(-20, -10);
      ctx.arc(0, -10, 20, Math.PI, 0);
      ctx.lineTo(20, 40);
      ctx.stroke();
      // Compass coordinates circle
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.arc(0, -10, 32, 0, Math.PI * 2);
      ctx.stroke();
      // Keyhole
      ctx.strokeStyle = '#E04836';
      ctx.beginPath();
      ctx.arc(0, 5, 5, 0, Math.PI * 2);
      ctx.moveTo(-3, 8);
      ctx.lineTo(3, 8);
      ctx.lineTo(4, 18);
      ctx.lineTo(-4, 18);
      ctx.closePath();
      ctx.stroke();
      break;

    case 'ocean_memory_librarian':
      // Apothecary jar
      ctx.beginPath();
      ctx.rect(-16, -38, 32, 8);
      ctx.moveTo(-12, -30);
      ctx.lineTo(-12, -22);
      ctx.bezierCurveTo(-30, -15, -30, 25, -20, 35);
      ctx.lineTo(20, 35);
      ctx.bezierCurveTo(30, 25, 30, -15, 12, -22);
      ctx.lineTo(12, -30);
      ctx.stroke();
      // Waves inside
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.moveTo(-16, 5);
      ctx.quadraticCurveTo(-8, -2, 0, 5);
      ctx.quadraticCurveTo(8, 12, 16, 5);
      ctx.moveTo(-16, 18);
      ctx.quadraticCurveTo(-8, 11, 0, 18);
      ctx.quadraticCurveTo(8, 25, 16, 18);
      ctx.stroke();
      // Message scroll
      ctx.strokeStyle = '#E04836';
      ctx.strokeRect(-6, -14, 12, 12);
      break;

    case 'comet_postperson':
      // Flying letter
      ctx.save();
      ctx.rotate((-12 * Math.PI) / 180);
      ctx.strokeRect(-22, -15, 44, 30);
      ctx.strokeStyle = '#E04836';
      ctx.beginPath();
      ctx.moveTo(-22, -15);
      ctx.lineTo(0, 3);
      ctx.lineTo(22, -15);
      ctx.stroke();
      ctx.restore();
      // Comet orbit trail
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.arc(0, 0, 38, Math.PI * 0.7, Math.PI * 1.8);
      ctx.stroke();
      ctx.strokeStyle = '#E04836';
      ctx.beginPath();
      ctx.arc(30, -22, 5, 0, Math.PI * 2);
      ctx.stroke();
      break;

    case 'weather_translator':
      // Barometer dial
      ctx.beginPath();
      ctx.arc(0, 0, 40, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#E04836';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(18, -22);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.stroke();
      // Dialogue bubble
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.arc(15, -28, 10, 0, Math.PI * 1.7);
      ctx.stroke();
      break;

    case 'stardust_baker':
      // Baker's peel
      ctx.beginPath();
      ctx.arc(0, -8, 28, 0, Math.PI * 2);
      ctx.moveTo(0, 20);
      ctx.lineTo(0, 45);
      ctx.stroke();
      // Croissant star
      ctx.strokeStyle = '#E04836';
      ctx.beginPath();
      ctx.arc(0, -6, 14, Math.PI * 0.9, Math.PI * 2.1);
      ctx.stroke();
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.lineTo(0, 2);
      ctx.moveTo(-10, -8);
      ctx.lineTo(10, -8);
      ctx.stroke();
      break;

    case 'midnight_lighthouse_keeper':
      // Lighthouse tower
      ctx.beginPath();
      ctx.moveTo(-14, 38);
      ctx.lineTo(14, 38);
      ctx.lineTo(8, -12);
      ctx.lineTo(-8, -12);
      ctx.closePath();
      ctx.stroke();
      // Lantern
      ctx.strokeRect(-9, -24, 18, 12);
      // Light beam
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.moveTo(9, -20);
      ctx.lineTo(44, -35);
      ctx.lineTo(44, -5);
      ctx.closePath();
      ctx.stroke();
      break;

    case 'gravity_tailor':
      // Shears
      ctx.beginPath();
      ctx.arc(-14, 28, 10, 0, Math.PI * 2);
      ctx.arc(14, 28, 10, 0, Math.PI * 2);
      ctx.moveTo(-7, 20);
      ctx.lineTo(14, -28);
      ctx.moveTo(7, 20);
      ctx.lineTo(-14, -28);
      ctx.stroke();
      // Spacetime grid warp
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.arc(0, -12, 30, Math.PI * 0.8, Math.PI * 0.2, true);
      ctx.stroke();
      break;

    default:
      // Star / Compass Default
      ctx.beginPath();
      ctx.arc(0, 0, 45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.moveTo(0, -45);
      ctx.lineTo(0, 45);
      ctx.moveTo(-45, 0);
      ctx.lineTo(45, 0);
      ctx.stroke();
      break;
  }

  ctx.restore();
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(' ');
  let line = '';
  let curY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, curY);
      line = words[n] + ' ';
      curY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, curY);
}
