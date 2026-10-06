import { useEffect, useMemo, useRef } from "react";

const SIZE = 860;
const C = SIZE / 2;
const INNER_R = 190;
const OUTER_R = 350;
const NODE = 64;
const CENTER = 180;
const DURATION = 3.6;
const WAIT = 2; // seconds of pause between runs
const CYCLE = DURATION + WAIT;

const place = (items, radius, offset = 0) =>
  items.map((src, i) => {
    const a = (i / items.length) * 2 * Math.PI - Math.PI / 2 + offset;
    return { src, x: C + radius * Math.cos(a), y: C + radius * Math.sin(a) };
  });

// your exact beam (same stops, blur 4, width 6, opacity 0.7, core 1.8) drawn ONCE per length, then stamped
function makeSprite(L, dpr) {
  const PAD = 14;
  const H = 40;
  const c = document.createElement("canvas");
  c.width = Math.ceil((L + PAD * 2) * dpr);
  c.height = H * dpr;
  const s = c.getContext("2d");
  s.scale(dpr, dpr);

  const grad = () => {
    const g = s.createLinearGradient(PAD, 0, PAD + L, 0);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.4, "#f8b9dd");
    g.addColorStop(0.7, "#e8c7f5f6");
    g.addColorStop(1, "rgba(244,114,233,0)");
    return g;
  };

  // glow layer
  s.save();
  s.filter = "blur(0px)";
  s.globalAlpha = 0.1;
  s.strokeStyle = grad();
  s.lineWidth = 6;
  s.beginPath();
  s.moveTo(PAD, H / 2);
  s.lineTo(PAD + L, H / 2);
  s.stroke();
  s.restore();

  // sharp core
  s.strokeStyle = grad();
  s.lineWidth = 1.8;
  s.lineCap = "round";
  s.beginPath();
  s.moveTo(PAD, H / 2);
  s.lineTo(PAD + L, H / 2);
  s.stroke();

  return { c, PAD, H, L };
}

export default function TechStackBeam({ images,name="Skills & Tools"}) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);

  const nodes = useMemo(() => {
    const half = Math.floor(images.length / 2);
    return [
      ...place(images.slice(0, half), INNER_R),
      // half-step offset -> outer lines pass between two inner logos
      ...place(images.slice(half, half * 2), OUTER_R, Math.PI / half),
    ].map((n, i) => {
      const len = Math.hypot(C - n.x, C - n.y);
      return {
        ...n,
        len,
        angle: Math.atan2(C - n.y, C - n.x),
        phase: ((i * 0.17) % DURATION) / DURATION,
      };
    });
  }, [images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    // one sprite per ring (beam length = 0.4 * line length, same as your gradient)
    const sprites = {
      [INNER_R]: makeSprite(INNER_R * 0.4, dpr),
      [OUTER_R]: makeSprite(OUTER_R * 0.4, dpr),
    };

    let raf = 0;
    let visible = true;

    const draw = (now) => {
      ctx.clearRect(0, 0, SIZE, SIZE);

      // dotted circles
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.11)";
      ctx.setLineDash([4, 8]);
      [INNER_R, OUTER_R].forEach((r) => {
        ctx.beginPath();
        ctx.arc(C, C, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // base lines
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.beginPath();
      for (const n of nodes) {
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(C, C);
      }
      ctx.stroke();

      // 2 pulses per line, half a cycle apart
      const t = now / 1000 / DURATION;
      for (const n of nodes) {
        const sp = sprites[Math.round(n.len)] || (n.len < 270 ? sprites[INNER_R] : sprites[OUTER_R]);
        const { c, PAD, H, L } = sp;
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.angle);
        for (let k = 0; k < 2; k++) {
          const p = (t + n.phase + k * 0.5) % 1;
          const head = p * (n.len + L);
          const start = Math.max(0, head - L);
          const end = Math.min(head, n.len);
          if (end <= start) continue;
          const sx = PAD + (start - (head - L));
          const sw = end - start;
          ctx.drawImage(c, sx * dpr, 0, sw * dpr, H * dpr, start, -H / 2, sw, H);
        }
        ctx.restore();
      }
    };

    const loop = (now) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      visible ? start() : stop();
    });
    io.observe(wrapRef.current);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    start();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [nodes]);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden select-none">
      <div ref={wrapRef} className="relative" style={{ width: SIZE, height: SIZE }}>
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0"
          style={{ width: SIZE, height: SIZE }}
        />

        {nodes.map((n, i) => (
          <div
            key={i}
            className="absolute z-10 flex items-center justify-center rounded-full bg-black/95 p-3 ring-1 ring-purple/20"
            style={{ width: NODE, height: NODE, left: n.x - NODE / 2, top: n.y - NODE / 2 }}
          >
            <img src={n.src} alt="" decoding="async" className="h-full rounded-md w-full object-contain" />
          </div>
        ))}

        <div
          className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/5 bg-[#111111] text-center text-4xl font-[Nabla] tracking-wide text-white"
          style={{ left: C, top: C, width: CENTER, height: CENTER }}
        
 >
          {/* <img src={imagephoto} alt="" srcset="" className="rounded-full object-cover"/> */}
          {name}
        </div>
      </div>
    </div>
  );
}