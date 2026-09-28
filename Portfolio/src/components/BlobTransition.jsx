import { useRef, useCallback } from "react";
import gsap from "gsap";

// ---- core ----
const FILL = "#D142DA";      // main blob color
const SPECKLE = "#A855F7";   // the little dotted pixels inside the blobs
const SHADOW = "#0d0612";    // hard offset shadow behind every blob
const SPECKLE_DENSITY = 0.18;
const POP = 0.05;            // how long (in timeline units) one blob takes to pop in

const rand = (a, b) => a + Math.random() * (b - a);
const easeOutBack = (t) => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);

// One blob = an oval with a slightly bumpy outline (r = random radius per point).
function makeStamp(x, y, angle, a, b, t) {
  const r = Array.from({ length: 14 }, () => rand(0.86, 1.14));
  return { x, y, angle, a, b, r, t };
}

// Draws the blob's outline as a smooth closed curve. k = size multiplier, ox/oy = offset (used for the shadow).
function tracePath(ctx, s, k, ox, oy) {
  const n = s.r.length;
  const cos = Math.cos(s.angle);
  const sin = Math.sin(s.angle);
  const pts = [];
  for (let i = 0; i < n; i++) {
    const th = (i / n) * Math.PI * 2;
    const lx = Math.cos(th) * s.a * s.r[i] * k;
    const ly = Math.sin(th) * s.b * s.r[i] * k;
    pts.push([s.x + ox + lx * cos - ly * sin, s.y + oy + lx * sin + ly * cos]);
  }
  const mid = (p, q) => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
  const start = mid(pts[n - 1], pts[0]);
  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  for (let i = 0; i < n; i++) {
    const m = mid(pts[i], pts[(i + 1) % n]);
    ctx.quadraticCurveTo(pts[i][0], pts[i][1], m[0], m[1]);
  }
  ctx.closePath();
}

// Decides where every blob goes and WHEN it appears (t: 0 = start, 1 = end).
// 1) a few chains start at random screen edges and walk inward, dropping a blob every step
// 2) chains randomly branch off sideways
// 3) leftover empty areas get filled last, growing outward from the chains
function generateStamps(W, H) {
  const m = Math.min(W, H);
  const b = m * 0.075;
  const a = b * 1.7;
  const step = a * 2.25;
  const margin = a * 1.5;
  const MAX_CHAIN_STAMPS = 260;
  const stamps = [];
  const inside = (x, y) => x > -margin && x < W + margin && y > -margin && y < H + margin;

  function chain(x, y, angle, t0, maxSteps, depth) {
    let t = t0;
    for (let k = 0; k < maxSteps && stamps.length < MAX_CHAIN_STAMPS; k++) {
      if (!inside(x, y)) break;
      stamps.push(makeStamp(x, y, angle, a * rand(0.85, 1.15), b * rand(0.85, 1.15), t));
      if (depth < 2 && Math.random() < 0.22) {
        const dir = Math.random() < 0.5 ? 1 : -1;
        chain(
          x + Math.cos(angle + dir * 1.2) * step,
          y + Math.sin(angle + dir * 1.2) * step,
          angle + dir * rand(0.7, 1.3),
          t + 0.03,
          Math.floor(rand(4, 9)),
          depth + 1
        );
      }
      angle += rand(-0.35, 0.35);
      x += Math.cos(angle) * step;
      y += Math.sin(angle) * step;
      t += 0.028;
    }
  }

  for (let i = 0; i < 6; i++) {
    const side = Math.floor(Math.random() * 4);
    let x, y, ang;
    if (side === 0) { x = rand(0, W); y = -a * 0.5; ang = Math.PI / 2; }
    else if (side === 1) { x = W + a * 0.5; y = rand(0, H); ang = Math.PI; }
    else if (side === 2) { x = rand(0, W); y = H + a * 0.5; ang = -Math.PI / 2; }
    else { x = -a * 0.5; y = rand(0, H); ang = 0; }
    chain(x, y, ang + rand(-0.9, 0.9), rand(0, 0.12), 40, 0);
  }

  const chainStamps = stamps.slice();
  const cell = b * 1.2;
  for (let gx = -cell; gx < W + cell; gx += cell) {
    for (let gy = -cell; gy < H + cell; gy += cell) {
      const x = gx + rand(-0.25, 0.25) * b;
      const y = gy + rand(-0.25, 0.25) * b;
      let nearest = Infinity;
      for (const s of chainStamps) nearest = Math.min(nearest, Math.hypot(s.x - x, s.y - y));
      if (nearest < b * 0.9) continue;
      const t = Math.min(0.93, 0.2 + 0.6 * Math.min(1, nearest / (m * 0.6)) + rand(0, 0.08));
      stamps.push(makeStamp(x, y, rand(0, Math.PI * 2), a * rand(0.75, 1), b * rand(0.85, 1.1), t));
    }
  }

  stamps.forEach((s) => (s.t = Math.min(s.t, 0.93)));
  return stamps.sort((p, q) => p.t - q.t);
}

// Tile of the main color with random speckle pixels; repeated across the whole canvas.
function makeSpeckleTile(block) {
  const cells = 96;
  const c = document.createElement("canvas");
  c.width = c.height = cells * block;
  const g = c.getContext("2d");
  g.fillStyle = FILL;
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = SPECKLE;
  for (let y = 0; y < cells; y++)
    for (let x = 0; x < cells; x++)
      if (Math.random() < SPECKLE_DENSITY) g.fillRect(x * block, y * block, block, block);
  return c;
}

// p = progress from 0 (nothing) to 1 (everything). Draws every blob whose time has come.
function render(ctx, W, H, stamps, pattern, p) {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = pattern;
  if (p > 0.9) {
    // safety net: fade in a solid layer at the very end so no gap can survive
    ctx.globalAlpha = Math.min(1, (p - 0.9) / 0.1);
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }
  for (const s of stamps) {
    const local = (p - s.t) / POP;
    if (local <= 0) continue;
    const k = easeOutBack(Math.min(local, 1));
    tracePath(ctx, s, k, -s.b * 0.28, s.b * 0.24); // shadow first (down-left)
    ctx.fillStyle = SHADOW;
    ctx.fill();
    tracePath(ctx, s, k, 0, 0); // then the blob itself
    ctx.fillStyle = pattern;
    ctx.fill();
  }
}
// ---- end core ----

/* Setup:
   1. Render <BlobOverlay canvasRef={canvasRef} /> once (Navbar is fine, it's position:fixed).
   2. Call play(() => switchSection()) on nav click. The callback fires when the screen is fully covered. */

export function useBlobTransition() {
  const canvasRef = useRef(null);
  const tlRef = useRef(null);

  const play = useCallback((onCovered) => {
    const canvas = canvasRef.current;
    if (!canvas) return onCovered?.();
    tlRef.current?.kill();

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const W = (canvas.width = Math.round(window.innerWidth * dpr));
    const H = (canvas.height = Math.round(window.innerHeight * dpr));
    const ctx = canvas.getContext("2d");
    const stamps = generateStamps(W, H);
    const pattern = ctx.createPattern(makeSpeckleTile(Math.round(3 * dpr)), "repeat");

    const state = { p: 0 };
    const draw = () => render(ctx, W, H, stamps, pattern, state.p);
    canvas.style.display = "block";
    draw();

    tlRef.current = gsap
      .timeline({ onComplete: () => (canvas.style.display = "none") })
      .to(state, { p: 1, duration: 2.2, ease: "power1.inOut", onUpdate: draw })
      .call(() => onCovered?.()) // fully covered — switch section now
      .to(state, { p: 0, duration: 1.6, ease: "power1.inOut", onUpdate: draw }, "+=0.15");
  }, []);

  return { canvasRef, play };
}

export function BlobOverlay({ canvasRef }) {
  return (
    <canvas
      ref={canvasRef}
      style={{ display: "none", position: "fixed", inset: 0, width: "100vw", height: "100vh", zIndex: 9999 }}
    />
  );
}