import { useEffect, useRef } from "react";

const COLORS = { done: "#FFFFFF", rest: "#b9b5aa", head: "#d922ab" };
const STEP = 7;
const BASE = 5;
const BOOST = 18;
const SPREAD = 55;
const EASE = 0.14;
const SIZE = 34; // canvas width

export default function ScrollRuler() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    let H = 0, cur = 0, raf;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      H = window.innerHeight;
      cv.width = SIZE * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      cur += (p * (H - 4) + 2 - cur) * EASE;

      ctx.clearRect(0, 0, SIZE, H);
      for (let y = 2; y < H; y += STEP) {
        const d = y - cur;
        const h = BASE + Math.exp(-(d * d) / (2 * SPREAD * SPREAD)) * BOOST;
        ctx.strokeStyle = y <= cur ? COLORS.done : COLORS.rest;
        ctx.lineWidth = y <= cur ? 1.25 : 1;
        ctx.beginPath();
        ctx.moveTo(SIZE - 2, y + 0.5);
        ctx.lineTo(SIZE - 2 - h, y + 0.5);
        ctx.stroke();
      }
      ctx.fillStyle = COLORS.head;
      ctx.fillRect(SIZE - 30, Math.round(cur) - 1, 28, 2);

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
        right: 0,
        width: SIZE,
        height: "100%",
        zIndex: 60,
        pointerEvents: "none",
      }}
    />
  );
}