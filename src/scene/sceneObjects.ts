import * as THREE from 'three';

/**
 * Recursively attaches userData.choiceId to an object and all its children
 * so raycasting detects the choice with 100% precision.
 */
export function tagChoice(obj: THREE.Object3D, choiceId: 'A' | 'B' | 'C' | 'D') {
  obj.userData.choiceId = choiceId;
  obj.traverse((child) => {
    child.userData.choiceId = choiceId;
  });
}

/**
 * Creates an ultra-crisp high-contrast canvas texture for door signs
 * Warm ivory plaque, midnight navy typography, gold filigree border.
 */
export function createSignTexture(title: string, choiceId: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Warm ivory plaque background
  ctx.fillStyle = '#FFFDF5';
  ctx.fillRect(0, 0, 1024, 512);

  // Outer gold rim
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 14;
  ctx.strokeRect(16, 16, 992, 480);

  // Inner decorative border
  ctx.strokeStyle = '#1E1B4B';
  ctx.lineWidth = 4;
  ctx.strokeRect(32, 32, 960, 448);

  // Brass corner rivets
  ctx.fillStyle = '#B45309';
  [
    [48, 48],
    [976, 48],
    [48, 464],
    [976, 464],
  ].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
  });

  // Top Monospace Choice Label
  ctx.fillStyle = '#4338CA';
  ctx.font = '700 34px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '4px';
  ctx.fillText(`PORTAL ${choiceId}`, 512, 105);

  // Gold divider rule
  ctx.strokeStyle = '#D97706';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(180, 130);
  ctx.lineTo(844, 130);
  ctx.stroke();

  // Primary Sign Title (Large bold serif, high contrast midnight navy)
  ctx.fillStyle = '#0E1A2B';
  ctx.font = 'bold 54px "Cormorant Garamond", Georgia, serif';
  ctx.textBaseline = 'middle';

  // Word wrap
  const words = title.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (ctx.measureText(testLine).width > 860) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  const startY = 280 - ((lines.length - 1) * 64) / 2;
  lines.forEach((line, idx) => {
    ctx.fillText(line, 512, startY + idx * 64);
  });

  // Bottom subtitle
  ctx.fillStyle = '#64748B';
  ctx.font = '500 22px "Space Mono", monospace';
  ctx.fillText('PARALLEL JURISDICTION CLEARANCE', 512, 450);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/**
 * Procedural Landing Scene: Floating walkway & impossible doorway
 * Shifted towards x = 2.6 on the right side of the screen so it is
 * immediately visible beside the left-aligned intro text panel!
 */
export function buildLandingScene(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'scene_landing';

  const walkwayX = 2.5;

  // Lighter twilight stone walkway
  const walkwayMat = new THREE.MeshStandardMaterial({
    color: 0x37306b,
    roughness: 0.25,
    metalness: 0.55,
  });

  for (let z = 9; z >= -4; z -= 2.2) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.45, 2.0), walkwayMat);
    step.position.set(walkwayX, -0.15 - (9 - z) * 0.05, z);
    step.receiveShadow = true;
    group.add(step);

    // Glowing cyan/lavender step edge light
    const edge = new THREE.Mesh(
      new THREE.BoxGeometry(3.85, 0.1, 0.15),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
    );
    edge.position.set(walkwayX, 0.12 - (9 - z) * 0.05, z + 0.95);
    group.add(edge);

    // Small starlight guide lamps on both sides of walkway
    [-2.1, 2.1].forEach((dx) => {
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.8),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9 })
      );
      post.position.set(walkwayX + dx, 0.3 - (9 - z) * 0.05, z);
      group.add(post);

      const lamp = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xfef08a })
      );
      lamp.position.set(walkwayX + dx, 0.75 - (9 - z) * 0.05, z);
      group.add(lamp);
    });
  }

  // Grand Doorway Frame at far end
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x4f46e5,
    roughness: 0.2,
    metalness: 0.65,
  });

  const portalZ = -5.5;

  const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 6.4, 0.7), frameMat);
  leftPillar.position.set(walkwayX - 1.8, 3.2, portalZ);
  group.add(leftPillar);

  const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 6.4, 0.7), frameMat);
  rightPillar.position.set(walkwayX + 1.8, 3.2, portalZ);
  group.add(rightPillar);

  const lintel = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.85, 0.9), frameMat);
  lintel.position.set(walkwayX, 6.5, portalZ);
  group.add(lintel);

  // Pediment / Triangle top
  const pediment = new THREE.Mesh(new THREE.ConeGeometry(2.6, 1.2, 4), frameMat);
  pediment.rotation.y = Math.PI / 4;
  pediment.position.set(walkwayX, 7.5, portalZ);
  group.add(pediment);

  // Glowing Portal Plane
  const portalPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(3.1, 5.8),
    new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.96,
      side: THREE.DoubleSide,
    })
  );
  portalPlane.position.set(walkwayX, 3.2, portalZ);
  group.add(portalPlane);

  // Rich point light illuminating walkway from the portal
  const portalLight = new THREE.PointLight(0xfbbf24, 3.0, 25);
  portalLight.position.set(walkwayX, 3.6, portalZ + 1.5);
  group.add(portalLight);

  // Concentric celestial brass rings
  for (let r = 1; r <= 3; r++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(r * 1.15, 0.045, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.8 - r * 0.15 })
    );
    ring.position.set(walkwayX, 3.2, portalZ - 0.1);
    group.add(ring);
  }

  return group;
}

/**
 * Question 1 Scene: FOUR Freestanding Visible Doors
 * Desktop/Tablet: ALL 4 doors side-by-side in one shallow arc with crisp gaps.
 * Portrait Mobile: Elevated mezzanine terrace so C and D sit physically above A and B.
 */
export function buildQ1Doors(
  doorTexts: { id: 'A' | 'B' | 'C' | 'D'; text: string }[],
  isPortrait = false
): {
  group: THREE.Group;
  doorMeshes: { id: 'A' | 'B' | 'C' | 'D'; doorGroup: THREE.Group; doorPanel: THREE.Mesh }[];
} {
  const group = new THREE.Group();
  group.name = 'scene_q1';
  const doorMeshes: { id: 'A' | 'B' | 'C' | 'D'; doorGroup: THREE.Group; doorPanel: THREE.Mesh }[] = [];

  // Desktop & Tablet: ALL 4 DOORS SIDE-BY-SIDE in one shallow arc.
  // Distinct X projection for all 4 doors!
  const layout = isPortrait
    ? [
        { x: -1.45, y: -0.6, z: 1.4, rotY: 0.08 },
        { x: 1.45, y: -0.6, z: 1.4, rotY: -0.08 },
        { x: -1.45, y: 4.4, z: -2.2, rotY: 0.08 },
        { x: 1.45, y: 4.4, z: -2.2, rotY: -0.08 },
      ]
    : [
        { x: -3.45, y: 0, z: 0.25, rotY: 0.14 },
        { x: -1.15, y: 0, z: -0.15, rotY: 0.05 },
        { x: 1.15, y: 0, z: -0.15, rotY: -0.05 },
        { x: 3.45, y: 0, z: 0.25, rotY: -0.14 },
      ];

  const portalColors = [0xf59e0b, 0x818cf8, 0x34d399, 0xf43f5e];

  // If portrait, add elevated mezzanine platform under C and D
  if (isPortrait) {
    const mezzPlatform = new THREE.Mesh(
      new THREE.BoxGeometry(6.2, 0.4, 3.2),
      new THREE.MeshStandardMaterial({ color: 0x312b59, roughness: 0.35, metalness: 0.5 })
    );
    mezzPlatform.position.set(0, 4.2, -2.2);
    group.add(mezzPlatform);
  }

  doorTexts.forEach((d, idx) => {
    const cfg = layout[idx];
    const doorGroup = new THREE.Group();
    doorGroup.position.set(cfg.x, cfg.y, cfg.z);
    doorGroup.rotation.y = cfg.rotY;

    // Lighter, luminous lavender-indigo frame
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x37306b,
      roughness: 0.25,
      metalness: 0.55,
    });

    // Frame Pillars
    const fLeft = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.4, 0.35), frameMat);
    fLeft.position.set(-1.05, 2.2, 0);
    doorGroup.add(fLeft);

    const fRight = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.4, 0.35), frameMat);
    fRight.position.set(1.05, 2.2, 0);
    doorGroup.add(fRight);

    const fTop = new THREE.Mesh(new THREE.BoxGeometry(2.34, 0.3, 0.35), frameMat);
    fTop.position.set(0, 4.35, 0);
    doorGroup.add(fTop);

    // Gold pediment arch on top
    const pediment = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.12, 0.4),
      new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.8 })
    );
    pediment.position.set(0, 4.56, 0);
    doorGroup.add(pediment);

    // Inner glowing portal plane
    const portalGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.86, 4.1),
      new THREE.MeshBasicMaterial({
        color: portalColors[idx],
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      })
    );
    portalGlow.position.set(0, 2.15, -0.04);
    doorGroup.add(portalGlow);

    // Door Panel (hinged at left edge)
    const panelPivot = new THREE.Group();
    panelPivot.position.set(-0.93, 0, 0); // hinge position

    // Rich blue-indigo panel
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x4338ca,
      roughness: 0.25,
      metalness: 0.4,
    });
    const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(1.86, 4.1, 0.1), panelMat);
    doorPanel.position.set(0.93, 2.15, 0.02);
    doorPanel.castShadow = true;
    panelPivot.add(doorPanel);

    // Polished Brass Knob
    const knob = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.15, metalness: 0.9 })
    );
    knob.position.set(1.68, 2.05, 0.12);
    panelPivot.add(knob);

    // Large, high-resolution readable sign
    const signTex = createSignTexture(d.text, d.id);
    const signMat = new THREE.MeshBasicMaterial({ map: signTex });
    const signMesh = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.92, 0.04), signMat);
    signMesh.position.set(0.93, 2.7, 0.09);
    panelPivot.add(signMesh);

    doorGroup.add(panelPivot);

    // Plinth platform beneath door
    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(1.4, 1.6, 0.25, 32),
      new THREE.MeshStandardMaterial({ color: 0x2e2954, roughness: 0.35, metalness: 0.4 })
    );
    platform.position.set(0, -0.12, 0);
    doorGroup.add(platform);

    // Tag all meshes with exact choiceId for precision raycasting
    tagChoice(doorGroup, d.id);

    group.add(doorGroup);
    doorMeshes.push({ id: d.id, doorGroup, doorPanel });
  });

  return { group, doorMeshes };
}

/**
 * Question 2 Scene: Four Objects on Floating Plinths
 * All four plinths arranged side-by-side in shallow arc.
 */
export function buildQ2Objects(isPortrait = false): {
  group: THREE.Group;
  items: { id: 'A' | 'B' | 'C' | 'D'; group: THREE.Group }[];
} {
  const group = new THREE.Group();
  group.name = 'scene_q2';
  const items: { id: 'A' | 'B' | 'C' | 'D'; group: THREE.Group }[] = [];

  const layout = isPortrait
    ? [
        { x: -1.4, y: -0.4, z: 1.2 },
        { x: 1.4, y: -0.4, z: 1.2 },
        { x: -1.4, y: 3.2, z: -2.0 },
        { x: 1.4, y: 3.2, z: -2.0 },
      ]
    : [
        { x: -3.45, y: 0, z: 0.2 },
        { x: -1.15, y: 0, z: -0.15 },
        { x: 1.15, y: 0, z: -0.15 },
        { x: 3.45, y: 0, z: 0.2 },
      ];

  const ids: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  layout.forEach(({ x, y, z }, idx) => {
    const plinthGroup = new THREE.Group();
    plinthGroup.position.set(x, y, z);

    // Lighter indigo marble plinth
    const plinth = new THREE.Mesh(
      new THREE.CylinderGeometry(0.68, 0.82, 2.2, 32),
      new THREE.MeshStandardMaterial({ color: 0x37306b, roughness: 0.25, metalness: 0.5 })
    );
    plinth.position.y = 1.1;
    plinthGroup.add(plinth);

    // Glowing top rim
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.7, 0.035, 16, 48),
      new THREE.MeshBasicMaterial({ color: 0x818cf8 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 2.22;
    plinthGroup.add(ring);

    // Floating Object
    const objGroup = new THREE.Group();
    objGroup.position.set(0, 2.9, 0);

    const id = ids[idx];

    if (id === 'A') {
      // A: Brass Skeleton Key
      const keyMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.15, metalness: 0.95 });
      const bow = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.08, 16, 32), keyMat);
      bow.position.y = 0.5;
      objGroup.add(bow);

      const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.9, 16), keyMat);
      shaft.position.y = 0;
      objGroup.add(shaft);

      const bit1 = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.1, 0.06), keyMat);
      bit1.position.set(0.12, -0.3, 0);
      objGroup.add(bit1);

      const bit2 = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.08, 0.06), keyMat);
      bit2.position.set(0.09, -0.42, 0);
      objGroup.add(bit2);
    } else if (id === 'B') {
      // B: Self-Drawing Folded Map
      const mapMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.4 });
      for (let f = -2; f <= 1; f++) {
        const fold = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.8, 0.02), mapMat);
        fold.position.set(f * 0.26, 0, (f % 2) * 0.08);
        fold.rotation.y = (f % 2 === 0 ? 1 : -1) * 0.35;
        objGroup.add(fold);
      }
      const compass = new THREE.Mesh(
        new THREE.RingGeometry(0.15, 0.2, 16),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide })
      );
      compass.position.set(0, 0, 0.08);
      objGroup.add(compass);
    } else if (id === 'C') {
      // C: Glass Bottle of Ocean Sounds
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0.65,
        roughness: 0.1,
        metalness: 0.1,
      });
      const bottleBody = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.9, 24), glassMat);
      objGroup.add(bottleBody);

      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.18, 0.38, 24), glassMat);
      neck.position.y = 0.58;
      objGroup.add(neck);

      const cork = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.1, 0.16, 16),
        new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8 })
      );
      cork.position.y = 0.78;
      objGroup.add(cork);

      const wave = new THREE.Mesh(
        new THREE.TorusGeometry(0.2, 0.05, 12, 24, Math.PI * 1.5),
        new THREE.MeshBasicMaterial({ color: 0x2563eb })
      );
      wave.rotation.x = Math.PI / 3;
      objGroup.add(wave);
    } else {
      // D: Unsent Sealed Letter
      const envMat = new THREE.MeshStandardMaterial({ color: 0xfffbeb, roughness: 0.4 });
      const envelope = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.58, 0.04), envMat);
      objGroup.add(envelope);

      const seal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.14, 0.04, 20),
        new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.2, metalness: 0.3 })
      );
      seal.rotation.x = Math.PI / 2;
      seal.position.set(0, 0, 0.035);
      objGroup.add(seal);
    }

    plinthGroup.add(objGroup);

    tagChoice(plinthGroup, id);

    group.add(plinthGroup);
    items.push({ id, group: plinthGroup });
  });

  return { group, items };
}

/**
 * Question 3 Scene: Miniature Floating City with 4 Destinations
 */
export function buildQ3City(): {
  group: THREE.Group;
  destinations: { id: 'A' | 'B' | 'C' | 'D'; group: THREE.Group }[];
} {
  const group = new THREE.Group();
  group.name = 'scene_q3';
  const destinations: { id: 'A' | 'B' | 'C' | 'D'; group: THREE.Group }[] = [];

  // Central floating island base
  const islandMat = new THREE.MeshStandardMaterial({ color: 0x241d45, roughness: 0.7 });
  const island = new THREE.Mesh(new THREE.CylinderGeometry(5.4, 3.6, 2.0, 32), islandMat);
  island.position.y = -1.0;
  group.add(island);

  // Pavement top surface
  const paveMat = new THREE.MeshStandardMaterial({ color: 0x312b59, roughness: 0.3, metalness: 0.4 });
  const pave = new THREE.Mesh(new THREE.CylinderGeometry(5.45, 5.45, 0.1, 32), paveMat);
  pave.position.y = 0.05;
  group.add(pave);

  // A: High observation tower
  const towerGroup = new THREE.Group();
  towerGroup.position.set(-2.6, 0, -1.8);

  const towerBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.95, 4.6, 16),
    new THREE.MeshStandardMaterial({ color: 0x4338ca, roughness: 0.25, metalness: 0.6 })
  );
  towerBase.position.y = 2.3;
  towerGroup.add(towerBase);

  const deck = new THREE.Mesh(
    new THREE.CylinderGeometry(1.1, 0.7, 0.4, 16),
    new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.8 })
  );
  deck.position.y = 4.8;
  towerGroup.add(deck);

  const spire = new THREE.Mesh(new THREE.ConeGeometry(0.25, 2.0, 8), new THREE.MeshBasicMaterial({ color: 0xfef08a }));
  spire.position.y = 6.0;
  towerGroup.add(spire);

  tagChoice(towerGroup, 'A');
  group.add(towerGroup);
  destinations.push({ id: 'A', group: towerGroup });

  // B: Only shop still lit
  const shopGroup = new THREE.Group();
  shopGroup.position.set(2.5, 0, -1.6);

  const shopBuilding = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 2.6, 1.8),
    new THREE.MeshStandardMaterial({ color: 0x37306b, roughness: 0.35 })
  );
  shopBuilding.position.y = 1.3;
  shopGroup.add(shopBuilding);

  const windowGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.3, 1.0),
    new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide })
  );
  windowGlow.position.set(0, 1.2, 0.92);
  shopGroup.add(windowGlow);

  const awning = new THREE.Mesh(
    new THREE.BoxGeometry(1.5, 0.08, 0.7),
    new THREE.MeshStandardMaterial({ color: 0xe11d48 })
  );
  awning.rotation.x = 0.3;
  awning.position.set(0, 1.85, 1.15);
  shopGroup.add(awning);

  tagChoice(shopGroup, 'B');
  group.add(shopGroup);
  destinations.push({ id: 'B', group: shopGroup });

  // C: Suspicious little animal
  const animalGroup = new THREE.Group();
  animalGroup.position.set(-2.3, 0, 1.9);

  const alleyWall = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 2.0, 0.25),
    new THREE.MeshStandardMaterial({ color: 0x312b59 })
  );
  alleyWall.position.set(0, 1.0, -0.4);
  animalGroup.add(alleyWall);

  const lampPost = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 1.8),
    new THREE.MeshStandardMaterial({ color: 0xfbbf24 })
  );
  lampPost.position.set(0.7, 0.9, 0.2);
  animalGroup.add(lampPost);

  const lampBulb = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), new THREE.MeshBasicMaterial({ color: 0x34d399 }));
  lampBulb.position.set(0.7, 1.8, 0.2);
  animalGroup.add(lampBulb);

  const creatureMat = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,
    emissive: 0xd97706,
    emissiveIntensity: 0.6,
  });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.18, 0.35, 8, 16), creatureMat);
  body.rotation.z = Math.PI / 2.8;
  body.position.set(0, 0.3, 0.2);
  animalGroup.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), creatureMat);
  head.position.set(0.25, 0.48, 0.2);
  animalGroup.add(head);

  tagChoice(animalGroup, 'C');
  group.add(animalGroup);
  destinations.push({ id: 'C', group: animalGroup });

  // D: Quiet bench
  const benchGroup = new THREE.Group();
  benchGroup.position.set(2.3, 0, 1.9);

  const benchMat = new THREE.MeshStandardMaterial({ color: 0xa78bfa, roughness: 0.4 });
  const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.45), benchMat);
  benchSeat.position.y = 0.5;
  benchGroup.add(benchSeat);

  const benchBack = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.06), benchMat);
  benchBack.position.set(0, 0.8, -0.2);
  benchGroup.add(benchBack);

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.16, 2.4),
    new THREE.MeshStandardMaterial({ color: 0x6d28d9 })
  );
  trunk.position.set(-0.6, 1.2, -0.5);
  benchGroup.add(trunk);

  const canopy = new THREE.Mesh(
    new THREE.SphereGeometry(0.9, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xc4b5fd, wireframe: true, transparent: true, opacity: 0.5 })
  );
  canopy.position.set(-0.6, 2.4, -0.5);
  benchGroup.add(canopy);

  tagChoice(benchGroup, 'D');
  group.add(benchGroup);
  destinations.push({ id: 'D', group: benchGroup });

  return { group, destinations };
}

/**
 * Question 4 Scene: Fading Star + 4 Action Altars
 */
export function buildQ4Star(): {
  group: THREE.Group;
  starMesh: THREE.Mesh;
  altars: { id: 'A' | 'B' | 'C' | 'D'; group: THREE.Group }[];
} {
  const group = new THREE.Group();
  group.name = 'scene_q4';
  const altars: { id: 'A' | 'B' | 'C' | 'D'; group: THREE.Group }[] = [];

  const starGeo = new THREE.IcosahedronGeometry(1.1, 1);
  const starMat = new THREE.MeshStandardMaterial({
    color: 0xfef08a,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.95,
    roughness: 0.1,
    metalness: 0.8,
  });
  const starMesh = new THREE.Mesh(starGeo, starMat);
  starMesh.position.set(0, 3.2, 0);
  group.add(starMesh);

  const coords = [
    { id: 'A' as const, x: -3.45, z: -0.2 },
    { id: 'B' as const, x: -1.15, z: 2.2 },
    { id: 'C' as const, x: 1.15, z: 2.2 },
    { id: 'D' as const, x: 3.45, z: -0.2 },
  ];

  coords.forEach(({ id, x, z }) => {
    const altar = new THREE.Group();
    altar.position.set(x, 0, z);

    const base = new THREE.Mesh(
      new THREE.CylinderGeometry(0.78, 0.92, 1.8, 24),
      new THREE.MeshStandardMaterial({ color: 0x37306b, roughness: 0.35, metalness: 0.5 })
    );
    base.position.y = 0.9;
    altar.add(base);

    const actionProp = new THREE.Group();
    actionProp.position.y = 2.4;

    if (id === 'A') {
      const needleMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.95 });
      const needle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.01, 1.1), needleMat);
      needle.rotation.z = Math.PI / 4;
      actionProp.add(needle);

      const spool = new THREE.Mesh(
        new THREE.TorusGeometry(0.32, 0.07, 16, 32),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8 })
      );
      actionProp.add(spool);
    } else if (id === 'B') {
      const bookMat = new THREE.MeshStandardMaterial({ color: 0xa855f7 });
      const lPage = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 0.04), bookMat);
      lPage.rotation.y = -0.3;
      lPage.position.x = -0.22;
      actionProp.add(lPage);

      const rPage = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 0.04), bookMat);
      rPage.rotation.y = 0.3;
      rPage.position.x = 0.22;
      actionProp.add(rPage);
    } else if (id === 'C') {
      const archMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e });
      const arch = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.07, 16, 32, Math.PI), archMat);
      arch.position.y = 0.15;
      actionProp.add(arch);

      const sun = new THREE.Mesh(new THREE.CircleGeometry(0.24, 32), new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
      sun.position.y = 0.15;
      actionProp.add(sun);
    } else {
      const pouch = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.65, 0.35), new THREE.MeshStandardMaterial({ color: 0xb45309 }));
      actionProp.add(pouch);
    }

    altar.add(actionProp);

    tagChoice(altar, id);
    group.add(altar);
    altars.push({ id, group: altar });
  });

  return { group, starMesh, altars };
}

/**
 * Question 5 Scene: Four Surreal Clock/Rule Totems
 */
export function buildQ5Totems(isPortrait = false): {
  group: THREE.Group;
  totems: { id: 'A' | 'B' | 'C' | 'D'; group: THREE.Group }[];
} {
  const group = new THREE.Group();
  group.name = 'scene_q5';
  const totems: { id: 'A' | 'B' | 'C' | 'D'; group: THREE.Group }[] = [];

  const layout = isPortrait
    ? [
        { x: -1.4, y: -0.4, z: 1.2 },
        { x: 1.4, y: -0.4, z: 1.2 },
        { x: -1.4, y: 3.2, z: -2.0 },
        { x: 1.4, y: 3.2, z: -2.0 },
      ]
    : [
        { x: -3.45, y: 0, z: 0.2 },
        { x: -1.15, y: 0, z: -0.15 },
        { x: 1.15, y: 0, z: -0.15 },
        { x: 3.45, y: 0, z: 0.2 },
      ];

  const ids: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  layout.forEach(({ x, y, z }, idx) => {
    const totem = new THREE.Group();
    totem.position.set(x, y, z);

    const obelisk = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 2.8, 0.9),
      new THREE.MeshStandardMaterial({ color: 0x312b59, roughness: 0.35, metalness: 0.5 })
    );
    obelisk.position.y = 1.4;
    totem.add(obelisk);

    const symbolGroup = new THREE.Group();
    symbolGroup.position.set(0, 3.4, 0);

    const id = ids[idx];

    if (id === 'A') {
      const clockFace = new THREE.Mesh(
        new THREE.CylinderGeometry(0.58, 0.58, 0.18, 32),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.85 })
      );
      clockFace.rotation.x = Math.PI / 2;
      symbolGroup.add(clockFace);

      const slash = new THREE.Mesh(
        new THREE.BoxGeometry(1.25, 0.1, 0.22),
        new THREE.MeshBasicMaterial({ color: 0xe11d48 })
      );
      slash.rotation.z = Math.PI / 4;
      symbolGroup.add(slash);
    } else if (id === 'B') {
      const bubble = new THREE.Mesh(
        new THREE.SphereGeometry(0.62, 24, 24),
        new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, transmission: 0.65, roughness: 0.2 })
      );
      symbolGroup.add(bubble);
    } else if (id === 'C') {
      const portalArch = new THREE.Mesh(
        new THREE.TorusGeometry(0.58, 0.08, 16, 32, Math.PI),
        new THREE.MeshBasicMaterial({ color: 0xc084fc })
      );
      symbolGroup.add(portalArch);

      const silhouette = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.18, 0.55, 8, 16),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6 })
      );
      symbolGroup.add(silhouette);
    } else {
      const moon = new THREE.Mesh(
        new THREE.TorusGeometry(0.46, 0.14, 16, 32, Math.PI * 1.4),
        new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xfef08a, emissiveIntensity: 0.3 })
      );
      symbolGroup.add(moon);
    }

    totem.add(symbolGroup);

    tagChoice(totem, id);
    group.add(totem);
    totems.push({ id, group: totem });
  });

  return { group, totems };
}

/**
 * Question 6 Scene: Four Visible Gifts Left Behind
 */
export function buildQ6Gifts(isPortrait = false): {
  group: THREE.Group;
  gifts: { id: 'A' | 'B' | 'C' | 'D'; group: THREE.Group }[];
} {
  const group = new THREE.Group();
  group.name = 'scene_q6';
  const gifts: { id: 'A' | 'B' | 'C' | 'D'; group: THREE.Group }[] = [];

  const layout = isPortrait
    ? [
        { x: -1.4, y: -0.4, z: 1.2 },
        { x: 1.4, y: -0.4, z: 1.2 },
        { x: -1.4, y: 3.2, z: -2.0 },
        { x: 1.4, y: 3.2, z: -2.0 },
      ]
    : [
        { x: -3.45, y: 0, z: 0.2 },
        { x: -1.15, y: 0, z: -0.15 },
        { x: 1.15, y: 0, z: -0.15 },
        { x: 3.45, y: 0, z: 0.2 },
      ];

  const ids: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  layout.forEach(({ x, y, z }, idx) => {
    const giftGroup = new THREE.Group();
    giftGroup.position.set(x, y, z);

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(0.95, 1.15, 0.25, 32),
      new THREE.MeshStandardMaterial({ color: 0x37306b, roughness: 0.35, metalness: 0.5 })
    );
    platform.position.y = 0.12;
    giftGroup.add(platform);

    const id = ids[idx];
    const item = new THREE.Group();
    item.position.y = 0.25;

    if (id === 'A') {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.65, 0.08, 16, 32), new THREE.MeshStandardMaterial({ color: 0xfbbf24 }));
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.1;
      item.add(ring);

      const shaft = new THREE.Mesh(
        new THREE.CylinderGeometry(0.42, 0.58, 3.2, 24),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 })
      );
      shaft.position.y = 1.6;
      item.add(shaft);
    } else if (id === 'B') {
      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 1.1, 1.1),
        new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6 })
      );
      cabin.position.y = 0.55;
      item.add(cabin);

      const roof = new THREE.Mesh(new THREE.ConeGeometry(1.1, 0.8, 4), new THREE.MeshStandardMaterial({ color: 0xe11d48 }));
      roof.rotation.y = Math.PI / 4;
      roof.position.y = 1.5;
      item.add(roof);

      const windowGlow = new THREE.Mesh(
        new THREE.PlaneGeometry(0.4, 0.4),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24, side: THREE.DoubleSide })
      );
      windowGlow.position.set(0, 0.55, 0.56);
      item.add(windowGlow);
    } else if (id === 'C') {
      const chest = new THREE.Mesh(
        new THREE.BoxGeometry(1.1, 0.7, 0.8),
        new THREE.MeshStandardMaterial({ color: 0x6b21a8, roughness: 0.3, metalness: 0.7 })
      );
      chest.position.y = 0.35;
      item.add(chest);

      const brassBand = new THREE.Mesh(
        new THREE.BoxGeometry(1.12, 0.72, 0.18),
        new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9 })
      );
      brassBand.position.y = 0.35;
      item.add(brassBand);
    } else {
      for (let l = 0; l < 3; l++) {
        const lantern = new THREE.Mesh(
          new THREE.CylinderGeometry(0.22, 0.18, 0.55, 16),
          new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0xea580c, emissiveIntensity: 0.7 })
        );
        lantern.position.set((l - 1) * 0.4, 1.1 + l * 0.35, (l % 2) * 0.25);
        item.add(lantern);
      }
    }

    giftGroup.add(item);

    tagChoice(giftGroup, id);
    group.add(giftGroup);
    gifts.push({ id, group: giftGroup });
  });

  return { group, gifts };
}

/**
 * Reveal Scene: Floating Bureau Pavilion
 */
export function buildRevealBureau(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'scene_reveal';

  const floor = new THREE.Mesh(
    new THREE.CylinderGeometry(5.5, 6.0, 0.5, 32),
    new THREE.MeshStandardMaterial({ color: 0x312b59, roughness: 0.3, metalness: 0.5 })
  );
  group.add(floor);

  const pillarMat = new THREE.MeshStandardMaterial({ color: 0x4338ca, roughness: 0.25, metalness: 0.6 });
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2;
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.25, 4.2, 16), pillarMat);
    pillar.position.set(Math.cos(angle) * 4.4, 2.35, Math.sin(angle) * 4.4);
    group.add(pillar);
  }

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(4.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0x241d45, roughness: 0.35, metalness: 0.7 })
  );
  dome.position.y = 4.4;
  group.add(dome);

  return group;
}
