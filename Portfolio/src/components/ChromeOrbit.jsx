import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import "./chrome.css";

const CONFIG = {
  rings: 4,
  spacing: 0.11,
  bandWidth: 0.085,
  bandThickness: 0.03,
  roughness: 0.06,
  iridescence: 0.25,
  speed: 1.10,
  tilt: 18,
  parallax: 1,
  gelA: "#3107ec",
  gelB: "#dc90c6",
  intro: true,
  interactive: true,
};

const RING_ROTATIONS = [
  [0.1, 0.12, 0.12],
  [1.05, 0.25, 0.62],
  [0.62, 1.08, -0.42],
  [1.42, 0.82, 1.15],
];

const RING_SPEEDS = [
  [0.34, 0.22, 0.12],
  [-0.24, 0.38, -0.19],
  [0.2, -0.31, 0.27],
  [-0.37, 0.18, 0.32],
];

// Static prefiltered env, rendered once (frames={1})
function ChromeEnvironment() {
  return (
    <Environment resolution={512} frames={1} background={false}>
      <color attach="background" args={["#050505"]} />
      <Lightformer form="rect" intensity={6} color="#ffffff" position={[0, 5, -6]} scale={[14, 2.5, 1]} />
      <Lightformer form="rect" intensity={4} color="#ffffff" position={[-6, 1, 2]} rotation={[0, Math.PI / 2.5, 0]} scale={[8, 1.2, 1]} />
      <Lightformer form="rect" intensity={5} color="#ffffff" position={[6, 0, 3]} rotation={[0, -Math.PI / 2.5, 0]} scale={[10, 0.8, 1]} />
      <Lightformer form="rect" intensity={4} color={CONFIG.gelA} position={[-4, -3, 4]} rotation={[0, Math.PI / 4, 0]} scale={[6, 1.5, 1]} />
      <Lightformer form="rect" intensity={4} color={CONFIG.gelB} position={[4, 3, -4]} rotation={[0, -Math.PI / 4, 0]} scale={[6, 1.5, 1]} />
      <Lightformer form="ring" intensity={2.5} color="#ffffff" position={[0, 0, 7]} scale={4} />
    </Environment>
  );
}

// Lathe + rounded-rect profile: smooth normals, lighter segment count
function createRingGeometry() {
  const R = 1.18;
  const w = CONFIG.bandWidth / 2;
  const h = CONFIG.bandThickness / 2;
  const cr = Math.min(w, h) * 0.6;
  const STEPS = 6;
  const pts = [];
  const arc = (cx, cy, a0, a1) => {
    for (let i = 0; i <= STEPS; i++) {
      const a = a0 + ((a1 - a0) * i) / STEPS;
      pts.push(new THREE.Vector2(R + cx + Math.cos(a) * cr, cy + Math.sin(a) * cr));
    }
  };
  const P = Math.PI;
  arc(w - cr, -h + cr, -P / 2, 0);
  arc(w - cr, h - cr, 0, P / 2);
  arc(-w + cr, h - cr, P / 2, P);
  arc(-w + cr, -h + cr, P, (3 * P) / 2);
  pts.push(pts[0].clone());
  return new THREE.LatheGeometry(pts, 192);
}

function ChromeRing({ index, elapsed, size }) {
  const meshRef = useRef();
  const geometry = useMemo(() => createRingGeometry(), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const speed = RING_SPEEDS[index];
  const ringPosition = index - (CONFIG.rings - 1) / 2;
  const baseScale = ((1.18 + ringPosition * CONFIG.spacing) / 1.18) * size;

  useFrame((_, rawDelta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const delta = Math.min(rawDelta, 1 / 30);

    mesh.rotation.x += speed[0] * CONFIG.speed * delta;
    mesh.rotation.y += speed[1] * CONFIG.speed * delta;
    mesh.rotation.z += speed[2] * CONFIG.speed * delta;

    if (CONFIG.intro) {
      const p = Math.min(elapsed.current / 1.5, 1);
      mesh.scale.setScalar(baseScale * (1 - Math.pow(1 - p, 4)));
    } else {
      mesh.scale.setScalar(baseScale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={RING_ROTATIONS[index]}
      scale={CONFIG.intro ? 0.0001 : baseScale}
    >
      <meshPhysicalMaterial
        color="#afb3d5"
        metalness={1}
        roughness={CONFIG.roughness}
        clearcoat={1}
        clearcoatRoughness={0.03}
        iridescence={CONFIG.iridescence}
        iridescenceIOR={1.3}
        iridescenceThicknessRange={[100, 600]}
        envMapIntensity={1.6}
      />
    </mesh>
  );
}

function OrbitSystem({ elapsed, offsetX, offsetY, size }) {
  const groupRef = useRef();

  useFrame((state, rawDelta) => {
    const group = groupRef.current;
    if (!group) return;
    const delta = Math.min(rawDelta, 1 / 30);
    elapsed.current += delta;

    const targetX =
      THREE.MathUtils.degToRad(CONFIG.tilt) +
      (CONFIG.interactive ? state.pointer.y * CONFIG.parallax * 0.12 : 0);
    const targetZ = CONFIG.interactive ? -state.pointer.x * CONFIG.parallax * 0.12 : 0;

    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, targetX, 3, delta);
    group.rotation.z = THREE.MathUtils.damp(group.rotation.z, targetZ, 3, delta);
    group.position.x = offsetX;
    group.position.y = offsetY;
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: CONFIG.rings }, (_, i) => (
        <ChromeRing key={i} index={i} elapsed={elapsed} size={size} />
      ))}
    </group>
  );
}

function ChromeScene({ offsetX, offsetY, size }) {
  const elapsed = useRef(0);
  return (
    <>
      <color attach="background" args={["#0b0b0d"]} />
      <ChromeEnvironment />
      <ambientLight intensity={0.1} />
      <directionalLight position={[4, 5, 6]} intensity={1.6} />
      <OrbitSystem elapsed={elapsed} offsetX={offsetX} offsetY={offsetY} size={size} />
    </>
  );
}

export default function ChromeOrbit({
  className = "",
  style = {},
  offsetX = 0.59,
  offsetY = -0.31,
  scale = 0.97,
}) {
  const wrapRef = useRef();
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
  const [dpr, setDpr] = useState(isMobile ? 1 : 1.5);

  // Stop rendering entirely when offscreen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0,
      rootMargin: "100px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Stop rendering when tab is hidden
  useEffect(() => {
    const h = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, []);

  return (
    <div ref={wrapRef} className={`chrome-orbit ${className}`} style={{ width: "100%", height: "800px" }}>
      <Canvas
        frameloop={inView && tabVisible ? "always" : "never"}
        dpr={dpr}
        camera={{ position: [0, 0, 4.8], fov: 38 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <PerformanceMonitor
          onDecline={() => setDpr(1)}
          onIncline={() => setDpr(isMobile ? 1 : 1.5)}
        />
        <ChromeScene offsetX={offsetX} offsetY={offsetY} size={scale} />
      </Canvas>
    </div>
  );
}