import { useRef, useCallback } from "react";
import gsap from "gsap";

const STRAND_COUNT = 8;
const COLORS = ["#D142DA", "#A855F7"];
const WAVES = 3;            // how many bends run down each strand's height
const AMPLITUDE = 18;       // how far the edge wobbles, in % of the strand's own width
const OVERLAP = 4;          // small baseline so the resting edge sits just past the column's border
const BOTTOM_BIAS = 0.65;   // fraction of strands that rise from the bottom vs. hang from the top
const GROW_DURATION = 0.8;  // seconds each strand takes to grow once it starts
const MAX_STAGGER = 0.45;   // random spread in when each strand starts growing

// One wavy blob path: walks down the left edge, back up the right edge,
// both edges wiggling via sine waves. AMPLITUDE must be bigger than OVERLAP
// or the wave never swings back into view and you just get a straight rectangle.
function buildStrandPath(phase, seed) {
  const segments = 12;
  const left = [];
  const right = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const y = t * 100;
    const leftX = -OVERLAP + AMPLITUDE * Math.sin(t * WAVES * Math.PI * 2 + phase + seed);
    const rightX = 100 + OVERLAP + AMPLITUDE * Math.sin(t * WAVES * Math.PI * 2 + phase * 1.2 + seed + 3);
    left.push({ x: leftX, y });
    right.push({ x: rightX, y });
  }
  const points = [...left, ...right.reverse()];

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    d += ` Q ${prev.x} ${prev.y} ${(prev.x + curr.x) / 2} ${(prev.y + curr.y) / 2}`;
  }
  return d + " Z";
}

const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeIn = (t) => t * t * t;

// amount: 0 = fully hidden, 1 = fully shown. Uses clip-path instead of scale
// so the wave shape itself never gets stretched/squashed while growing.
function applyClip(el, anchor, amount) {
  el.style.clipPath =
    anchor === "bottom"
      ? `inset(${(1 - amount) * 100}% 0 0 0)`
      : `inset(0 0 ${(1 - amount) * 100}% 0)`;
}

/* Setup:
   1. Render <StrandOverlay overlayRef={overlayRef} strandRefs={strandRefs} pathRefs={pathRefs} />
      once near your app root.
   2. Call play(() => switchSection()) on nav click. */

export function useStrandTransition() {
  const overlayRef = useRef(null);
  const strandRefs = useRef([]);
  const pathRefs = useRef([]);
  const meta = useRef([]);
  const tickerFn = useRef(null);

  const play = useCallback((onCovered) => {
    // if a previous transition is still mid-flight (fast double-click), stop it first
    if (tickerFn.current) gsap.ticker.remove(tickerFn.current);

    meta.current = Array.from({ length: STRAND_COUNT }, () => ({
      phase: Math.random() * 10,
      seed: Math.random() * 10,
      anchor: Math.random() < BOTTOM_BIAS ? "bottom" : "top",
      delay: Math.random() * MAX_STAGGER,
    }));

    meta.current.forEach((m, i) => {
      pathRefs.current[i]?.setAttribute("d", buildStrandPath(m.phase, m.seed));
      applyClip(strandRefs.current[i], m.anchor, 0);
    });
    gsap.set(overlayRef.current, { display: "block" });

    const phaseDuration = MAX_STAGGER + GROW_DURATION;
    const start = performance.now();
    let stage = "cover"; // "cover" -> "uncover"
    let stageStart = 0;
    let covered = false;

    tickerFn.current = () => {
      const elapsed = (performance.now() - start) / 1000;

      meta.current.forEach((m, i) => {
        m.phase += 0.02; // wobble keeps running the whole time, cover and uncover both
        pathRefs.current[i]?.setAttribute("d", buildStrandPath(m.phase, m.seed));

        const el = strandRefs.current[i];
        if (stage === "cover") {
          const t = Math.min(Math.max((elapsed - m.delay) / GROW_DURATION, 0), 1);
          applyClip(el, m.anchor, easeOut(t));
        } else {
          const t = Math.min(Math.max((elapsed - stageStart - m.delay) / GROW_DURATION, 0), 1);
          applyClip(el, m.anchor, 1 - easeIn(t));
        }
      });

      if (stage === "cover" && !covered && elapsed >= phaseDuration) {
        covered = true;
        onCovered?.(); // fully covered right here — switch section now
        stage = "uncover";
        stageStart = elapsed;
      } else if (stage === "uncover" && elapsed - stageStart >= phaseDuration) {
        gsap.ticker.remove(tickerFn.current);
        gsap.set(overlayRef.current, { display: "none" });
      }
    };
    gsap.ticker.add(tickerFn.current);
  }, []);

  return { overlayRef, strandRefs, pathRefs, play };
}

export function StrandOverlay({ overlayRef, strandRefs, pathRefs }) {
  return (
    <div ref={overlayRef} style={{ display: "none", position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none" }}>
      {Array.from({ length: STRAND_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (strandRefs.current[i] = el)}
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            left: `${(i / STRAND_COUNT) * 100}%`,
            width: `${100 / STRAND_COUNT}%`,
          }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%">
            <path ref={(el) => (pathRefs.current[i] = el)} fill={COLORS[i % COLORS.length]} />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* Example usage in your Nav:

import { useStrandTransition, StrandOverlay } from "./StrandTransition";

function Nav() {
  const { overlayRef, strandRefs, pathRefs, play } = useStrandTransition();

  return (
    <>
      <StrandOverlay overlayRef={overlayRef} strandRefs={strandRefs} pathRefs={pathRefs} />
      <button onClick={() => play(() => scrollToSection("about"))}>About</button>
    </>
  );
}
*/