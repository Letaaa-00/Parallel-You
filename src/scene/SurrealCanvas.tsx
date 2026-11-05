import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  buildLandingScene,
  buildQ1Doors,
  buildQ2Objects,
  buildQ3City,
  buildQ4Star,
  buildQ5Totems,
  buildQ6Gifts,
  buildRevealBureau,
} from './sceneObjects';
import { QUESTIONS } from '../data/quizData';
import { soundManager } from '../audio/synthAudio';

export type StageKey = 'landing' | 'q1' | 'q2' | 'q3' | 'q4' | 'q5' | 'q6' | 'reveal';

interface SurrealCanvasProps {
  currentStage: StageKey;
  selectedChoice?: 'A' | 'B' | 'C' | 'D';
  onSelectChoice: (choice: 'A' | 'B' | 'C' | 'D') => void;
  isTransitioning?: boolean;
}

// Camera base targets for each stage
const CAMERA_PRESETS: Record<StageKey, { pos: [number, number, number]; lookAt: [number, number, number] }> = {
  landing: { pos: [-0.6, 2.5, 9.8], lookAt: [2.2, 2.6, -4.5] },
  q1: { pos: [0, 2.2, 7.2], lookAt: [0, 2.0, 0] },
  q2: { pos: [0, 2.6, 7.2], lookAt: [0, 2.1, 0] },
  q3: { pos: [0, 3.6, 7.8], lookAt: [0, 1.5, 0] },
  q4: { pos: [0, 3.0, 7.6], lookAt: [0, 2.2, 0] },
  q5: { pos: [0, 2.6, 7.2], lookAt: [0, 2.1, 0] },
  q6: { pos: [0, 2.6, 7.2], lookAt: [0, 1.6, 0] },
  reveal: { pos: [0, 3.6, 10.2], lookAt: [0, 2.8, 0] },
};

export const SurrealCanvas: React.FC<SurrealCanvasProps> = ({
  currentStage,
  selectedChoice,
  onSelectChoice,
  isTransitioning,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);
  const currentStageRef = useRef(currentStage);
  const isTransitioningRef = useRef(isTransitioning);
  const onSelectChoiceRef = useRef(onSelectChoice);

  currentStageRef.current = currentStage;
  isTransitioningRef.current = isTransitioning;
  onSelectChoiceRef.current = onSelectChoice;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Probe software GL & capabilities
    let isSoftware = false;
    try {
      const probe = document.createElement('canvas').getContext('webgl2');
      if (!probe) {
        setWebGlSupported(false);
        return;
      }
      const ext = probe.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
      const gpu = String(probe.getParameter(param));
      probe.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftware = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    } catch {
      setWebGlSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x130f2c);
    scene.fog = new THREE.FogExp2(0x191438, 0.022);

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;
    let aspect = width / height;

    // Only narrow mobile portrait phones (< 0.72) use vertical mezzanine 2x2.
    // Fullscreen 1113x984 (aspect 1.13), square (1.0), tablet (0.75+) and desktop ALWAYS use side-by-side 4 doors!
    let isPortrait = aspect < 0.72;

    const camera = new THREE.PerspectiveCamera(48, aspect, 0.1, 150);
    const initialPreset = CAMERA_PRESETS[currentStageRef.current] || CAMERA_PRESETS.landing;
    camera.position.set(...initialPreset.pos);
    const lookAtTarget = new THREE.Vector3(...initialPreset.lookAt);
    camera.lookAt(lookAtTarget);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftware,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftware ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Multi-Point Studio Twilight Lighting Rig
    const ambLight = new THREE.AmbientLight(0xdbeafe, 1.2);
    scene.add(ambLight);

    const hemiLight = new THREE.HemisphereLight(0xe0e7ff, 0x4338ca, 1.7);
    scene.add(hemiLight);

    const moonLight = new THREE.DirectionalLight(0xf8fafc, 2.4);
    moonLight.position.set(8, 16, 12);
    scene.add(moonLight);

    const frontFill = new THREE.DirectionalLight(0xc7d2fe, 1.4);
    frontFill.position.set(0, 5, 12);
    scene.add(frontFill);

    const rimLight = new THREE.DirectionalLight(0x818cf8, 1.5);
    rimLight.position.set(-6, 10, -10);
    scene.add(rimLight);

    const centerWarm = new THREE.PointLight(0xfde047, 2.0, 30);
    centerWarm.position.set(0, 5, 2);
    scene.add(centerWarm);

    // Reflective Twilight Floor Plane
    const floorGeo = new THREE.PlaneGeometry(120, 120, 1, 1);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x1d173d,
      roughness: 0.22,
      metalness: 0.5,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Floor coordinate rings
    for (let r = 3; r <= 36; r += 5) {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(r, r + 0.05, 64),
        new THREE.MeshBasicMaterial({ color: 0x4338ca, side: THREE.DoubleSide })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.01;
      scene.add(ring);
    }

    // Drifting Starfield Particles
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 70;
      starPositions[i * 3 + 1] = Math.random() * 30 + 0.5;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 70;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xe0e7ff,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // Build stage groups with responsive layout
    let q1Data = buildQ1Doors(QUESTIONS[0].options.map((o) => ({ id: o.id, text: o.text })), isPortrait);
    let q2Data = buildQ2Objects(isPortrait);
    let q3Data = buildQ3City();
    let q4Data = buildQ4Star();
    let q5Data = buildQ5Totems(isPortrait);
    let q6Data = buildQ6Gifts(isPortrait);
    let landingGroup = buildLandingScene();
    let revealGroup = buildRevealBureau();

    const stageGroups: Record<StageKey, THREE.Group> = {
      landing: landingGroup,
      q1: q1Data.group,
      q2: q2Data.group,
      q3: q3Data.group,
      q4: q4Data.group,
      q5: q5Data.group,
      q6: q6Data.group,
      reveal: revealGroup,
    };

    (Object.keys(stageGroups) as StageKey[]).forEach((key) => {
      stageGroups[key].visible = key === currentStageRef.current;
      scene.add(stageGroups[key]);
    });

    const updateVisibility = () => {
      (Object.keys(stageGroups) as StageKey[]).forEach((key) => {
        stageGroups[key].visible = key === currentStageRef.current;
      });
    };

    // Immediate first-frame rendering: guarantees Landing 3D walkway and portal are visible instantly!
    updateVisibility();
    renderer.render(scene, camera);

    // Raycasting & Pointer Interactions attached STRICTLY to renderer.domElement
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let hoveredChoice: 'A' | 'B' | 'C' | 'D' | null = null;
    const canvasEl = renderer.domElement;

    const onPointerMove = (e: PointerEvent) => {
      if (e.target !== canvasEl) {
        mouse.set(-999, -999);
        hoveredChoice = null;
        document.body.style.cursor = 'default';
        return;
      }
      const rect = canvasEl.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onPointerLeave = () => {
      mouse.set(-999, -999);
      hoveredChoice = null;
      document.body.style.cursor = 'default';
    };

    const onPointerDown = (e: PointerEvent) => {
      // Ignore any click/tap event that did not originate directly on the 3D canvas element
      if (e.target !== canvasEl) return;
      if (isTransitioningRef.current) return;
      if (hoveredChoice) {
        soundManager.playSelect(['A', 'B', 'C', 'D'].indexOf(hoveredChoice));
        onSelectChoiceRef.current(hoveredChoice);
      }
    };

    canvasEl.addEventListener('pointermove', onPointerMove);
    canvasEl.addEventListener('pointerleave', onPointerLeave);
    canvasEl.addEventListener('pointerdown', onPointerDown);

    // Resize Handler with Dynamic Aspect Ratio & Safe Bounds Calculation
    const onResize = () => {
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      aspect = width / height;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    // Animation Loop
    let animId = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      updateVisibility();

      // DYNAMIC BOUNDING BOX FRAMING:
      // Calculate exact distance required so the entire horizontal span fits between top HUD and bottom answer bar
      const stage = currentStageRef.current;
      const targetPreset = CAMERA_PRESETS[stage] || CAMERA_PRESETS.landing;
      const targetPos = new THREE.Vector3(...targetPreset.pos);
      const targetLook = new THREE.Vector3(...targetPreset.lookAt);

      if (['q1', 'q2', 'q5', 'q6'].includes(stage)) {
        // Horizontal span for the 4 side-by-side objects is ~9.0 units (half-width 4.5).
        // With safety margins for plaques and labels: half-width = 5.25.
        // Vertical FOV = 48 deg -> tan(24 deg) = 0.445.
        // Visible half-width at distance D is: D * 0.445 * aspect.
        // D_needed = 5.25 / (0.445 * aspect) = 11.8 / aspect.
        const requiredHalfWidth = 5.25;
        const fovHalfRad = (camera.fov * 0.5 * Math.PI) / 180;
        const distNeeded = requiredHalfWidth / (Math.tan(fovHalfRad) * Math.max(aspect, 0.4));
        targetPos.z = Math.max(targetPreset.pos[2], distNeeded);
        targetPos.y = targetPreset.pos[1] + (targetPos.z - targetPreset.pos[2]) * 0.12;
      } else if (stage === 'q3' || stage === 'q4') {
        const requiredHalfWidth = 4.2;
        const fovHalfRad = (camera.fov * 0.5 * Math.PI) / 180;
        const distNeeded = requiredHalfWidth / (Math.tan(fovHalfRad) * Math.max(aspect, 0.4));
        targetPos.z = Math.max(targetPreset.pos[2], distNeeded);
      } else if (stage === 'landing') {
        // Landing framing: aim toward walkway and impossible door on the right
        if (aspect < 1.15) {
          targetPos.z = targetPreset.pos[2] + (1.15 - aspect) * 3.5;
        }
      }

      // Gentle mouse parallax
      targetPos.x += mouse.x * 0.3;
      targetPos.y += mouse.y * 0.18;

      camera.position.lerp(targetPos, delta * 4.2);
      lookAtTarget.lerp(targetLook, delta * 4.2);
      camera.lookAt(lookAtTarget);

      // Starfield rotation
      starField.rotation.y = elapsed * 0.012;

      // Micro animations
      if (stage === 'q1') {
        q1Data.doorMeshes.forEach((d) => {
          const isHovered = hoveredChoice === d.id;
          const targetRot = isHovered ? -0.42 : 0;
          d.doorPanel.parent!.rotation.y = THREE.MathUtils.lerp(d.doorPanel.parent!.rotation.y, targetRot, delta * 8);
        });
      } else if (stage === 'q2') {
        q2Data.items.forEach((item, idx) => {
          const isHovered = hoveredChoice === item.id;
          const objInner = item.group.children[2];
          if (objInner) {
            objInner.rotation.y += delta * (isHovered ? 2.0 : 0.6);
            objInner.position.y = 2.9 + Math.sin(elapsed * 2 + idx) * 0.12 + (isHovered ? 0.22 : 0);
          }
        });
      } else if (stage === 'q3') {
        stageGroups.q3.rotation.y = Math.sin(elapsed * 0.25) * 0.06;
      } else if (stage === 'q4') {
        q4Data.starMesh.rotation.y = elapsed * 0.45;
        q4Data.starMesh.rotation.x = elapsed * 0.25;
        const scale = 1 + Math.sin(elapsed * 3) * 0.08;
        q4Data.starMesh.scale.set(scale, scale, scale);
      } else if (stage === 'q5') {
        q5Data.totems.forEach((totem, idx) => {
          const sym = totem.group.children[1];
          if (sym) {
            sym.position.y = 3.4 + Math.sin(elapsed * 1.8 + idx) * 0.1;
          }
        });
      } else if (stage === 'q6') {
        q6Data.gifts.forEach((gift, idx) => {
          const item = gift.group.children[1];
          if (item) {
            item.position.y = 0.25 + Math.sin(elapsed * 2 + idx) * 0.08;
          }
        });
      }

      // Exact Hierarchy Raycasting: traverse parent chain to find userData.choiceId
      if (['q1', 'q2', 'q3', 'q4', 'q5', 'q6'].includes(stage)) {
        raycaster.setFromCamera(mouse, camera);
        const activeGroup = stageGroups[stage];

        let detected: 'A' | 'B' | 'C' | 'D' | null = null;
        if (activeGroup) {
          const intersects = raycaster.intersectObjects(activeGroup.children, true);
          for (const hit of intersects) {
            let curr: THREE.Object3D | null = hit.object;
            while (curr && curr !== activeGroup) {
              if (curr.userData && curr.userData.choiceId) {
                detected = curr.userData.choiceId;
                break;
              }
              curr = curr.parent;
            }
            if (detected) break;
          }
        }

        if (detected !== hoveredChoice) {
          hoveredChoice = detected;
          if (detected) {
            soundManager.playHover();
            document.body.style.cursor = 'pointer';
          } else {
            document.body.style.cursor = 'default';
          }
        }
      } else {
        document.body.style.cursor = 'default';
        hoveredChoice = null;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      canvasEl.removeEventListener('pointermove', onPointerMove);
      canvasEl.removeEventListener('pointerleave', onPointerLeave);
      canvasEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', onResize);
      document.body.style.cursor = 'default';

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-auto">
      {webGlSupported ? (
        <div ref={mountRef} className="w-full h-full" />
      ) : (
        <div className="w-full h-full bg-radial from-[#1e1b40] via-[#0f0c22] to-[#070514] flex items-center justify-center p-8">
          <div className="text-center font-mono text-xs text-[#a5b4fc]">
            [ Twilight Space // Fallback Render Mode ]
          </div>
        </div>
      )}
    </div>
  );
};
