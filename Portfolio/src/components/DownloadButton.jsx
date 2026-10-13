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
        background: "#0c0d0f",
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
          background: "linear-gradient(180deg, #34363b 0%, #26282c 100%)",
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
              "radial-gradient(130% 150% at 30% 15%, #4b4e55 0%, #3b3d43 55%, #313338 100%)",
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.18)",
              "inset 0 -2px 3px rgba(0,0,0,0.35)",
              "inset 1px 0 0 rgba(255,255,255,0.05)",
              "inset -1px 0 0 rgba(0,0,0,0.2)",
            ].join(","),
            color: "#eceef1",
            font: "600 11px/1 ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
            letterSpacing: "0.04em",
            textAlign: "left",
          }}
        >
          <svg
            width="26"
            height="14"
            viewBox="0 0 26 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M24 7H3M8 2L3 7l5 5" />
          </svg>
          <span>Download</span>
        </span>
      </button>
    </div>
  );
}