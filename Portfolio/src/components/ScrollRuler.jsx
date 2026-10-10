import { useEffect, useRef } from "react";

const COLORS = { done: "#ffffff", rest: "#ffffff", head: "#ef10dd" }; // dark mode: swap these
const STEP = 7;      // gap between ticks
const BASE = 5;      // base tick height
const BOOST = 18;    // extra height at the head
const SPREAD = 55;   // magnifier width in px
const EASE = 0.14;   // lower = more lag

export default function ScrollRuler() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    let W = 0, cur = 0, raf;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth;
      cv.width = W * dpr;
      cv.height = 34 * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      cur += (p * (W - 4) + 2 - cur) * EASE;

      ctx.clearRect(0, 0, W, 34);
      for (let x = 2; x < W; x += STEP) {
        const d = x - cur;
        const h = BASE + Math.exp(-(d * d) / (2 * SPREAD * SPREAD)) * BOOST;
        ctx.strokeStyle = x <= cur ? COLORS.done : COLORS.rest;
        ctx.lineWidth = x <= cur ? 1.25 : 1;
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 2);
        ctx.lineTo(x + 0.5, 2 + h);
        ctx.stroke();
      }
      ctx.fillStyle = COLORS.head;
      ctx.fillRect(Math.round(cur) - 1, 0, 2, 28);

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: 34,
        zIndex: 40,
        pointerEvents: "none",
      }}
    />
  );
}