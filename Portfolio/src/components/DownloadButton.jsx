import { useEffect, useRef, useState } from "react";

const W = 136;
const H = 60;

const SHADOW_UP = [
  "0 1px 0 #1b1c1f",
  "0 2px 0 #191a1d",
  "0 3px 0 #17181b",
  "0 4px 0 #151619",
  "0 5px 0 #131417",
  "0 6px 0 #101113",
  "0 12px 14px rgba(0,0,0,0.55)",
  "inset 0 1px 0 rgba(255,255,255,0.10)",
].join(",");

const SHADOW_DOWN = [
  "0 1px 0 #101113",
  "0 2px 5px rgba(0,0,0,0.6)",
  "inset 0 1px 0 rgba(255,255,255,0.06)",
].join(",");

export default function BackspaceKey({ onPress, listen = true }) {
  const [down, setDown] = useState(false);
  const audioRef = useRef(null);

  const thock = () => {
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!audioRef.current) audioRef.current = new AC();
      const ctx = audioRef.current;
      ctx.resume?.();
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(190, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.07);
      g.gain.setValueAtTime(0.18, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      osc.connect(g).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);

      const len = Math.floor(ctx.sampleRate * 0.02);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
      const noise = ctx.createBufferSource();
      const ng = ctx.createGain();
      ng.gain.value = 0.12;
      noise.buffer = buf;
      noise.connect(ng).connect(ctx.destination);
      noise.start(t);
    } catch {}
  };

  const press = () => {
    setDown(true);
    thock();
    onPress?.();
  };
  const release = () => setDown(false);

  useEffect(() => {
    if (!listen) return;
    const kd = (e) => {
      if (e.key === "Backspace") press();
    };
    const ku = (e) => {
      if (e.key === "Backspace") release();
    };
    window.addEventListener("keydown", kd);
    window.addEventListener("keyup", ku);
    return () => {
      window.removeEventListener("keydown", kd);
      window.removeEventListener("keyup", ku);
    };
  }, [listen]);

  return (
    <div
      style={{
        display: "inline-block",
        padding: "6px 6px 18px",
        borderRadius: 14,
        background: "#0b0b0d",
      }}
    >
      <button
        type="button"
        aria-label="Backspace"
        onPointerDown={press}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        style={{
          display: "block",
          width: W,
          height: H,
          padding: "4px 4px 6px",
          border: "none",
          borderRadius: 10,
          background: "linear-gradient(180deg, #0f0f0f 0%, #222327 100%)",
          cursor: "pointer",
          transform: `translateY(${down ? 5 : 0}px)`,
          boxShadow: down ? SHADOW_DOWN : SHADOW_UP,
          transition: "transform 60ms ease-out, box-shadow 60ms ease-out",
          outline: "none",
          WebkitTapHighlightColor: "transparent",
          userSelect: "none",
        }}
      >
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            width: "100%",
            height: "100%",
            padding: "0 12px",
            boxSizing: "border-box",
            borderRadius: 7,
            background:
              "radial-gradient(130% 150% at 10% 15%, #292b2d 0%, #131315 55%, #252528 100%)",
            boxShadow: [
              "inset 0 1px 0 rgba(17, 16, 16, 0.18)",
              "inset 0 -2px 3px rgba(49, 45, 45, 0.35)",
              "inset 1px 0 0 rgba(25, 22, 22, 0.05)",
              "inset -1px 0 0 rgba(0,0,0,0.2)",
            ].join(","),
            color: "#eceef1",
            font: "600 11px/1 ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
            letterSpacing: "0.04em",
            textAlign: "left",
          }}
        >
          <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M14 2.26953V6.40007C14 6.96012 14 7.24015 14.109 7.45406C14.2049 7.64222 14.3578 7.7952 14.546 7.89108C14.7599 8.00007 15.0399 8.00007 15.6 8.00007H19.7305M14 17H8M16 13H8M20 9.98822V17.2C20 18.8802 20 19.7202 19.673 20.362C19.3854 20.9265 18.9265 21.3854 18.362 21.673C17.7202 22 16.8802 22 15.2 22H8.8C7.11984 22 6.27976 22 5.63803 21.673C5.07354 21.3854 4.6146 20.9265 4.32698 20.362C4 19.7202 4 18.8802 4 17.2V6.8C4 5.11984 4 4.27976 4.32698 3.63803C4.6146 3.07354 5.07354 2.6146 5.63803 2.32698C6.27976 2 7.11984 2 8.8 2H12.0118C12.7455 2 13.1124 2 13.4577 2.08289C13.7638 2.15638 14.0564 2.27759 14.3249 2.44208C14.6276 2.6276 14.887 2.88703 15.4059 3.40589L18.5941 6.59411C19.113 7.11297 19.3724 7.3724 19.5579 7.67515C19.7224 7.94356 19.8436 8.2362 19.9171 8.5423C20 8.88757 20 9.25445 20 9.98822Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>
          <span>Resume!</span>
        </span>
      </button>
    </div>
  );
}